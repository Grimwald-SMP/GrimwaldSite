"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubmissionsReview from "@/app/ui/SubmissionsReview";
import { getSubmissions, adminLogout, type Submission } from "@/app/lib/priceApi";
import Link from "next/link";

export default function AdminSubmissionsPage() {
    const router = useRouter();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");

    useEffect(() => {
        getSubmissions()
            .then(setSubmissions)
            .catch((err: Error) => {
                if (
                    err.message === "Unauthorized" ||
                    err.message.includes("401")
                ) {
                    router.push("/admin");
                } else {
                    setFetchError(err.message);
                }
            })
            .finally(() => setLoading(false));
    }, [router]);

    const pendingCount = submissions.filter(
        (s) => s.status === "pending",
    ).length;

    return (
        <main className="min-h-screen bg-base-300 px-4 py-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">
                            Submissions
                        </h1>
                        <p className="text-base-content/50 text-sm mt-1">
                            {loading
                                ? "Loading…"
                                : pendingCount > 0
                                  ? `${pendingCount} pending review`
                                  : "No pending submissions"}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/admin/prices"
                            className="btn btn-primary btn-sm"
                        >
                            ← Price Editor
                        </Link>
                        <Link href="/admin/audit" className="btn btn-ghost btn-sm">
                            Audit Log
                        </Link>
                        <Link href="/prices" className="btn btn-ghost btn-sm">
                            View Public Page →
                        </Link>
                        <button
                            className="btn btn-ghost btn-sm text-error"
                            onClick={() => adminLogout().then(() => router.push("/admin"))}
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <span className="loading loading-spinner loading-lg text-primary" />
                    </div>
                ) : fetchError ? (
                    <div className="alert alert-error">{fetchError}</div>
                ) : (
                    <SubmissionsReview initialSubmissions={submissions} />
                )}
            </div>
        </main>
    );
}
