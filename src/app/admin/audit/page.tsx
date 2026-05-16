"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getAuditLog,
  adminLogout,
  type AuditEntry,
  type AuditAction,
} from "@/app/lib/priceApi";

// ── Formatting helpers ────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

const ACTION_LABEL: Record<AuditAction, string> = {
  "item.create": "Created item",
  "item.update": "Updated item",
  "item.delete": "Deleted item",
  "item.bulk_import": "Bulk imported",
  "category.create": "Created category",
  "category.update": "Updated category",
  "category.delete": "Deleted category",
  "submission.approve": "Approved submission",
  "submission.reject": "Rejected submission",
  "admin.create": "Created admin",
  "admin.delete": "Deleted admin",
  "admin.role_change": "Changed role",
  "admin.password_change": "Changed password",
};

const ACTION_COLOR: Record<string, string> = {
  "item.create": "badge-success",
  "item.update": "badge-info",
  "item.delete": "badge-error",
  "item.bulk_import": "badge-info",
  "category.create": "badge-success",
  "category.update": "badge-info",
  "category.delete": "badge-error",
  "submission.approve": "badge-success",
  "submission.reject": "badge-warning",
  "admin.create": "badge-success",
  "admin.delete": "badge-error",
  "admin.role_change": "badge-warning",
  "admin.password_change": "badge-neutral",
};

type ParsedDetails = Record<string, unknown> | null;

function parseDetails(raw: string | null): ParsedDetails {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function DetailsCell({ action, details }: { action: AuditAction; details: ParsedDetails }) {
  if (!details) return <span className="text-base-content/30">—</span>;

  if (action === "item.update" || action === "category.update") {
    const changes = details.changes as Record<string, { from: unknown; to: unknown }> | undefined;
    if (!changes) return <span className="text-base-content/30">—</span>;
    return (
      <div className="space-y-0.5">
        {Object.entries(changes).map(([field, { from, to }]) => (
          <div key={field} className="text-xs">
            <span className="text-base-content/50">{field}:</span>{" "}
            <span className="line-through text-error/70">{String(from ?? "—")}</span>
            {" → "}
            <span className="text-success">{String(to ?? "—")}</span>
          </div>
        ))}
      </div>
    );
  }

  if (action === "item.create") {
    return (
      <span className="text-xs text-base-content/60">
        {details.diamond_price != null ? `${details.diamond_price} ◆` : "no price"}
      </span>
    );
  }

  if (action === "item.bulk_import") {
    return <span className="text-xs text-base-content/60">{String(details.count)} items</span>;
  }

  if (action === "submission.approve") {
    return (
      <span className="text-xs text-base-content/60">
        {details.suggested_price != null ? `${details.suggested_price} ◆` : ""}
        {details.admin_notes ? ` — ${details.admin_notes}` : ""}
      </span>
    );
  }

  if (action === "submission.reject" && details.admin_notes) {
    return <span className="text-xs text-base-content/60">{String(details.admin_notes)}</span>;
  }

  if (action === "admin.create") {
    return <span className="text-xs text-base-content/60">{String(details.role)}</span>;
  }

  if (action === "admin.role_change") {
    return (
      <span className="text-xs">
        <span className="text-base-content/50">{String(details.from_role)}</span>
        {" → "}
        <span className="font-medium">{String(details.to_role)}</span>
      </span>
    );
  }

  if (action === "admin.password_change") {
    return (
      <span className="text-xs text-base-content/60">
        {details.self ? "self" : "reset by owner"}
      </span>
    );
  }

  return <span className="text-base-content/30">—</span>;
}

// ── Filter options ────────────────────────────────────────────────────────────

const ACTION_GROUPS: { label: string; actions: AuditAction[] }[] = [
  { label: "Items", actions: ["item.create", "item.update", "item.delete", "item.bulk_import"] },
  { label: "Categories", actions: ["category.create", "category.update", "category.delete"] },
  { label: "Submissions", actions: ["submission.approve", "submission.reject"] },
  { label: "Admins", actions: ["admin.create", "admin.delete", "admin.role_change", "admin.password_change"] },
];

// ── Page ──────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 50;

export default function AuditLogPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [filterAction, setFilterAction] = useState<AuditAction | "">("");

  const load = useCallback(async (action: AuditAction | "", replace: boolean) => {
    const offset = replace ? 0 : entries.length;
    replace ? setLoading(true) : setLoadingMore(true);
    try {
      const res = await getAuditLog({
        limit: PAGE_SIZE,
        offset,
        action: action || undefined,
      });
      setEntries((prev) => replace ? res.entries : [...prev, ...res.entries]);
      setTotal(res.total);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load";
      if (msg.includes("401") || msg === "Unauthorized") {
        router.push("/admin");
      } else {
        setFetchError(msg);
      }
    } finally {
      replace ? setLoading(false) : setLoadingMore(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries.length, router]);

  useEffect(() => {
    load(filterAction, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterAction]);

  const hasMore = entries.length < total;

  return (
    <main className="min-h-screen bg-base-300 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Audit Log</h1>
            <p className="text-base-content/50 text-sm mt-1">
              {loading ? "Loading…" : `${total.toLocaleString()} total entries`}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/prices" className="btn btn-primary btn-sm">
              ← Price Editor
            </Link>
            <Link href="/admin/submissions" className="btn btn-secondary btn-sm">
              Submissions
            </Link>
            <button
              className="btn btn-ghost btn-sm text-error"
              onClick={() => adminLogout().then(() => router.push("/admin"))}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-base-content/50">Filter:</span>
          <button
            className={`btn btn-xs ${filterAction === "" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setFilterAction("")}
          >
            All
          </button>
          {ACTION_GROUPS.map((group) => (
            <div key={group.label} className="dropdown dropdown-hover">
              <button
                className={`btn btn-xs ${group.actions.includes(filterAction as AuditAction) ? "btn-primary" : "btn-ghost"}`}
              >
                {group.label} ▾
              </button>
              <ul className="dropdown-content z-10 menu p-1 shadow bg-base-200 rounded-box text-sm w-44">
                {group.actions.map((a) => (
                  <li key={a}>
                    <button
                      className={filterAction === a ? "active" : ""}
                      onClick={() => setFilterAction(a)}
                    >
                      {ACTION_LABEL[a]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : fetchError ? (
          <div className="alert alert-error">{fetchError}</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-20 text-base-content/30">No entries yet</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-neutral">
              <table className="table table-sm w-full">
                <thead className="bg-base-200 text-base-content/50 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="w-28">When</th>
                    <th className="w-28">Who</th>
                    <th className="w-44">Action</th>
                    <th>Target</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-base-200/50 border-b border-neutral/40 last:border-0">
                      <td
                        className="text-xs text-base-content/50 whitespace-nowrap"
                        title={new Date(entry.created_at).toLocaleString()}
                      >
                        {timeAgo(entry.created_at)}
                      </td>
                      <td className="text-sm font-medium whitespace-nowrap">
                        {entry.admin_username}
                      </td>
                      <td>
                        <span className={`badge badge-xs ${ACTION_COLOR[entry.action] ?? "badge-neutral"}`}>
                          {ACTION_LABEL[entry.action] ?? entry.action}
                        </span>
                      </td>
                      <td className="text-sm text-base-content/80">
                        {entry.target_name ?? (
                          <span className="text-base-content/30">—</span>
                        )}
                      </td>
                      <td>
                        <DetailsCell
                          action={entry.action}
                          details={parseDetails(entry.details)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasMore && (
              <div className="flex justify-center pt-2">
                <button
                  className="btn btn-ghost btn-sm"
                  disabled={loadingMore}
                  onClick={() => load(filterAction, false)}
                >
                  {loadingMore
                    ? <span className="loading loading-spinner loading-xs" />
                    : `Load more (${total - entries.length} remaining)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
