"use client";

import { useState } from "react";
import type { Submission } from "@/app/lib/priceApi";
import { reviewSubmission } from "@/app/lib/priceApi";

interface Props {
  initialSubmissions: Submission[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: "badge-warning",
  approved: "badge-success",
  rejected: "badge-error",
};

export default function SubmissionsReview({ initialSubmissions }: Props) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [processing, setProcessing] = useState<Set<number>>(new Set());
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  const filtered =
    statusFilter === "all"
      ? submissions
      : submissions.filter((s) => s.status === statusFilter);

  async function approve(id: number) {
    setProcessing((p) => new Set(p).add(id));
    try {
      const updated = await reviewSubmission(id, "approved");
      setSubmissions((prev) => prev.map((s) => (s.id === id ? updated : s)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to approve");
    } finally {
      setProcessing((p) => {
        const next = new Set(p);
        next.delete(id);
        return next;
      });
    }
  }

  async function rejectConfirm() {
    if (rejectId == null) return;
    setProcessing((p) => new Set(p).add(rejectId));
    try {
      const updated = await reviewSubmission(rejectId, "rejected", rejectNote || undefined);
      setSubmissions((prev) => prev.map((s) => (s.id === rejectId ? updated : s)));
      setRejectId(null);
      setRejectNote("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to reject");
    } finally {
      setProcessing((p) => {
        const next = new Set(p);
        if (rejectId) next.delete(rejectId);
        return next;
      });
    }
  }

  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap items-center">
        {(["pending", "all", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`btn btn-sm capitalize ${statusFilter === f ? "btn-primary" : "btn-ghost"}`}
          >
            {f}
            {f === "pending" && pendingCount > 0 && (
              <span className="badge badge-warning badge-sm ml-1">{pendingCount}</span>
            )}
          </button>
        ))}
        <span className="text-base-content/40 text-sm ml-auto">{filtered.length} submissions</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-neutral">
        <table className="table table-sm w-full">
          <thead>
            <tr className="bg-base-200 text-base-content/70 text-xs">
              <th>Username</th>
              <th>Item</th>
              <th>Category</th>
              <th className="text-right">Suggested 💎</th>
              <th>Reasoning</th>
              <th>Date</th>
              <th>Status</th>
              <th>Admin Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-base-content/40 py-10">
                  No {statusFilter === "all" ? "" : statusFilter} submissions
                </td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr key={sub.id} className="hover">
                  <td className="font-medium">{sub.submitter_username}</td>
                  <td>{sub.item_name}</td>
                  <td>
                    {sub.suggested_category_name ? (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: (sub.suggested_category_color ?? "#6b7280") + "33",
                          color: sub.suggested_category_color ?? "#6b7280",
                          border: `1px solid ${sub.suggested_category_color ?? "#6b7280"}66`,
                        }}
                      >
                        {sub.suggested_category_name}
                      </span>
                    ) : (
                      <span className="text-base-content/30 text-xs">—</span>
                    )}
                  </td>
                  <td className="text-right font-mono">
                    {sub.suggested_price != null ? sub.suggested_price : "—"}
                  </td>
                  <td className="max-w-xs">
                    <span className="text-sm text-base-content/70 line-clamp-2" title={sub.reasoning ?? ""}>
                      {sub.reasoning ?? "—"}
                    </span>
                  </td>
                  <td className="text-sm text-base-content/50 whitespace-nowrap">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`badge badge-sm ${STATUS_COLORS[sub.status] ?? "badge-ghost"}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="text-sm text-base-content/60 max-w-xs truncate">
                    {sub.admin_notes ?? ""}
                  </td>
                  <td>
                    {sub.status === "pending" && (
                      <div className="flex gap-1">
                        <button
                          className="btn btn-xs btn-success"
                          disabled={processing.has(sub.id)}
                          onClick={() => approve(sub.id)}
                        >
                          {processing.has(sub.id) ? (
                            <span className="loading loading-spinner loading-xs" />
                          ) : (
                            "✓"
                          )}
                        </button>
                        <button
                          className="btn btn-xs btn-error btn-ghost"
                          disabled={processing.has(sub.id)}
                          onClick={() => { setRejectId(sub.id); setRejectNote(""); }}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reject modal */}
      {rejectId !== null && (
        <div className="modal modal-open">
          <div className="modal-box space-y-4">
            <h3 className="font-bold text-lg text-error">Reject Submission</h3>
            <p className="text-base-content/70 text-sm">
              Optionally leave a note for the submitter.
            </p>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              placeholder="Admin note (optional)…"
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setRejectId(null)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={rejectConfirm}>
                Reject
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setRejectId(null)} />
        </div>
      )}
    </div>
  );
}
