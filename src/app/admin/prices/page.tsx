"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminPriceEditor from "@/app/ui/AdminPriceEditor";
import CategoryManager from "@/app/ui/CategoryManager";
import AdminsManager from "@/app/ui/AdminsManager";
import { getItems, getCategories, getMe, adminLogout, type PriceItem, type Category, type Role } from "@/app/lib/priceApi";
import Link from "next/link";

function CollapsibleSection({
  title,
  badge,
  open,
  onToggle,
  children,
}: {
  title: string;
  badge?: string | number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-neutral rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-3 bg-base-200 hover:bg-base-200/80 transition-colors text-left"
        onClick={onToggle}
      >
        <span className="font-medium text-base-content">
          {title}
          {badge !== undefined && (
            <span className="ml-2 text-base-content/40 text-sm font-normal">({badge})</span>
          )}
        </span>
        <span className="text-base-content/50 text-sm">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

export default function AdminPricesPage() {
  const router = useRouter();
  const [items, setItems] = useState<PriceItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [adminsOpen, setAdminsOpen] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentRole, setCurrentRole] = useState<Role>("staff");

  useEffect(() => {
    Promise.all([getItems(), getCategories(), getMe()])
      .then(([i, c, me]) => {
        if (me.role === "helper") {
          router.replace("/admin/submissions");
          return;
        }
        setItems(i);
        setCategories(c);
        setCurrentUsername(me.username);
        setCurrentRole(me.role);
      })
      .catch((err: Error) => {
        if (err.message === "Unauthorized" || err.message.includes("401")) {
          router.push("/admin");
        } else {
          setFetchError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <main className="min-h-screen bg-base-300 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Price Editor</h1>
            <p className="text-base-content/50 text-sm mt-1">
              Edit any cell and click Save. New rows are highlighted in orange.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/submissions" className="btn btn-secondary btn-sm">
              Review Submissions
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
          <>
            <CollapsibleSection
              title="Categories"
              badge={categories.length}
              open={catOpen}
              onToggle={() => setCatOpen((o) => !o)}
            >
              <CategoryManager categories={categories} onChange={setCategories} />
            </CollapsibleSection>

            {currentRole === "owner" && (
              <CollapsibleSection
                title="Admins"
                open={adminsOpen}
                onToggle={() => setAdminsOpen((o) => !o)}
              >
                <AdminsManager currentUsername={currentUsername} currentRole={currentRole} />
              </CollapsibleSection>
            )}

            <AdminPriceEditor initialItems={items} categories={categories} />
          </>
        )}
      </div>
    </main>
  );
}
