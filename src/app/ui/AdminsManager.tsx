"use client";

import { useState, useEffect } from "react";
import {
  getAdmins,
  createAdmin,
  deleteAdmin,
  changeAdminPassword,
  setAdminRole,
  type AdminAccount,
  type ChangePasswordPayload,
  type Role,
} from "@/app/lib/priceApi";

interface Props {
  currentUsername: string;
  currentRole: Role;
}

const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  staff: "Staff",
  helper: "Helper",
};

const ROLE_BADGE: Record<Role, string> = {
  owner: "badge-warning",
  staff: "badge-primary",
  helper: "badge-neutral",
};

export default function AdminsManager({ currentUsername, currentRole }: Props) {
  const [admins, setAdmins] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Add-admin form
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirm, setNewConfirm] = useState("");
  const [newRole, setNewRole] = useState<Role>("staff");
  const [addError, setAddError] = useState("");
  const [adding, setAdding] = useState(false);

  // Per-row password change
  const [pwdTarget, setPwdTarget] = useState<AdminAccount | null>(null);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdConfirm, setNewPwdConfirm] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdError, setPwdError] = useState("");

  const [deleting, setDeleting] = useState<Set<number>>(new Set());
  const [roleChanging, setRoleChanging] = useState<Set<number>>(new Set());

  useEffect(() => {
    getAdmins()
      .then(setAdmins)
      .catch((e: Error) => setFetchError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    if (newPassword !== newConfirm) {
      setAddError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setAddError("Password must be at least 8 characters");
      return;
    }
    setAdding(true);
    try {
      const created = await createAdmin(newUsername.trim(), newPassword, newRole);
      setAdmins((prev) => [...prev, created]);
      setNewUsername("");
      setNewPassword("");
      setNewConfirm("");
      setNewRole("staff");
    } catch (e: unknown) {
      setAddError(e instanceof Error ? e.message : "Failed to create admin");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(admin: AdminAccount) {
    if (!confirm(`Remove admin "${admin.username}"? They will no longer be able to log in.`)) return;
    setDeleting((s) => new Set(s).add(admin.id));
    try {
      await deleteAdmin(admin.id);
      setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to delete admin");
    } finally {
      setDeleting((s) => { const next = new Set(s); next.delete(admin.id); return next; });
    }
  }

  async function handleRoleChange(admin: AdminAccount, role: Role) {
    setRoleChanging((s) => new Set(s).add(admin.id));
    try {
      const updated = await setAdminRole(admin.id, role);
      setAdmins((prev) => prev.map((a) => a.id === admin.id ? updated : a));
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to change role");
    } finally {
      setRoleChanging((s) => { const next = new Set(s); next.delete(admin.id); return next; });
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (!pwdTarget) return;
    setPwdError("");
    if (newPwd !== newPwdConfirm) { setPwdError("Passwords do not match"); return; }
    if (newPwd.length < 8) { setPwdError("Password must be at least 8 characters"); return; }
    const isSelf = pwdTarget.username === currentUsername;
    if (isSelf && !currentPwd) { setPwdError("Current password is required"); return; }
    setPwdSaving(true);
    try {
      const payload: ChangePasswordPayload = { password: newPwd };
      if (isSelf) payload.currentPassword = currentPwd;
      await changeAdminPassword(pwdTarget.id, payload);
      setPwdTarget(null);
      setCurrentPwd("");
      setNewPwd("");
      setNewPwdConfirm("");
    } catch (e: unknown) {
      setPwdError(e instanceof Error ? e.message : "Failed to change password");
    } finally {
      setPwdSaving(false);
    }
  }

  if (loading) return <span className="loading loading-spinner loading-sm text-primary" />;
  if (fetchError) return <div className="alert alert-error text-sm">{fetchError}</div>;

  const ownerCount = admins.filter((a) => a.role === "owner").length;
  const isOwner = currentRole === "owner";

  return (
    <div className="space-y-5">
      {/* Admin list */}
      <div className="space-y-2">
        {admins.map((admin) => {
          const isSelf = admin.username === currentUsername;
          const isDeleting = deleting.has(admin.id);
          const isChangingRole = roleChanging.has(admin.id);
          const canDelete = isOwner && !isSelf;
          const canChangeRole = isOwner && !isSelf;
          const wouldRemoveLastOwner = admin.role === "owner" && ownerCount <= 1;

          return (
            <div
              key={admin.id}
              className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-base-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm uppercase">
                  {admin.username[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{admin.username}</span>
                    {isSelf && (
                      <span className="badge badge-primary badge-xs">you</span>
                    )}
                    <span className={`badge badge-xs ${ROLE_BADGE[admin.role]}`}>
                      {ROLE_LABELS[admin.role]}
                    </span>
                  </div>
                  <p className="text-xs text-base-content/40">
                    Added {new Date(admin.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Role selector — owners only, not for self */}
                {canChangeRole && (
                  <select
                    className="select select-xs select-bordered"
                    value={admin.role}
                    disabled={isChangingRole}
                    onChange={(e) => handleRoleChange(admin, e.target.value as Role)}
                  >
                    <option value="owner">Owner</option>
                    <option value="staff">Staff</option>
                    <option value="helper">Helper</option>
                  </select>
                )}

                <button
                  className="btn btn-xs btn-ghost"
                  onClick={() => {
                    setPwdTarget(admin);
                    setCurrentPwd("");
                    setNewPwd("");
                    setNewPwdConfirm("");
                    setPwdError("");
                  }}
                >
                  Change password
                </button>

                {isOwner && (
                  <button
                    className="btn btn-xs btn-error btn-ghost"
                    disabled={!canDelete || isDeleting || wouldRemoveLastOwner}
                    title={
                      isSelf
                        ? "You can't remove yourself"
                        : wouldRemoveLastOwner
                          ? "Can't remove the last owner"
                          : `Remove ${admin.username}`
                    }
                    onClick={() => handleDelete(admin)}
                  >
                    {isDeleting ? <span className="loading loading-spinner loading-xs" /> : "Remove"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add new admin — owners only */}
      {isOwner && (
        <div className="border-t border-neutral pt-4">
          <p className="text-xs text-base-content/50 font-medium uppercase tracking-wide mb-3">
            Add Admin
          </p>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                className="input input-sm input-bordered w-44"
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                minLength={2}
                maxLength={50}
                pattern="[a-zA-Z0-9_-]+"
                title="Letters, numbers, _ and - only"
              />
              <input
                type="password"
                className="input input-sm input-bordered w-44"
                placeholder="Password (min 8 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
              <input
                type="password"
                className="input input-sm input-bordered w-44"
                placeholder="Confirm password"
                value={newConfirm}
                onChange={(e) => setNewConfirm(e.target.value)}
                required
              />
              <select
                className="select select-sm select-bordered"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as Role)}
              >
                <option value="staff">Staff</option>
                <option value="helper">Helper</option>
                <option value="owner">Owner</option>
              </select>
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                disabled={adding}
              >
                {adding ? <span className="loading loading-spinner loading-xs" /> : "+ Add Admin"}
              </button>
            </div>
            {addError && <p className="text-error text-sm">{addError}</p>}
          </form>
        </div>
      )}

      {/* Change password modal */}
      {pwdTarget && (
        <div className="modal modal-open">
          <div className="modal-box space-y-4">
            <h3 className="font-bold text-lg">
              Change password for{" "}
              <span className="text-primary">{pwdTarget.username}</span>
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-3">
              {pwdTarget.username === currentUsername && (
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Current password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  required
                  autoFocus
                />
              )}
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="New password (min 8 chars)"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                required
                minLength={8}
                autoFocus={pwdTarget.username !== currentUsername}
              />
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Confirm new password"
                value={newPwdConfirm}
                onChange={(e) => setNewPwdConfirm(e.target.value)}
                required
              />
              {pwdError && <p className="text-error text-sm">{pwdError}</p>}
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setPwdTarget(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={pwdSaving}>
                  {pwdSaving ? <span className="loading loading-spinner loading-sm" /> : "Save Password"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setPwdTarget(null)} />
        </div>
      )}
    </div>
  );
}
