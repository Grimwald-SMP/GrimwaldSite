// Client-side (browser): always "" so requests go to /api/* on the same origin,
//   which next.config.ts proxies to the VPS. This keeps the cookie same-site
//   and visible to Next.js middleware — works identically in dev and production.
// Server-side (SSR/SSG): must use an absolute URL; defaults to VPS_URL.
// Override both with NEXT_PUBLIC_API_BASE, e.g. http://localhost:8088 for a local API.
const VPS_URL = "https://prices.grimwald.xyz";
const envBase = process.env.NEXT_PUBLIC_API_BASE;
export const API_BASE: string = envBase || (typeof window === "undefined" ? VPS_URL : "");

export interface Category {
    id: number;
    name: string;
    color: string;
}

export interface PriceItem {
    id: number;
    name: string;
    category_id: number | null;
    category_name: string | null;
    category_color: string | null;
    diamond_price: number | null;
    notes: string | null;
    updated_at: string;
}

export interface Submission {
    id: number;
    item_id: number | null;
    item_name: string;
    suggested_price: number | null;
    suggested_category_id: number | null;
    suggested_category_name: string | null;
    suggested_category_color: string | null;
    reasoning: string | null;
    submitter_username: string;
    status: "pending" | "approved" | "rejected";
    admin_notes: string | null;
    created_at: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: "include",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `API error ${res.status}`);
    }
    return res.json() as Promise<T>;
}

// Public
export const getItems = () => apiFetch<PriceItem[]>("/api/items");
export const getCategories = () =>
    apiFetch<Category[]>("/api/items/categories");
export const submitSuggestion = (data: {
    item_id?: number | null;
    item_name: string;
    suggested_price?: number | null;
    suggested_category_id?: number | null;
    reasoning?: string;
    submitter_username: string;
}) =>
    apiFetch<{ id: number }>("/api/submissions", {
        method: "POST",
        body: JSON.stringify(data),
    });

// Admin — items
export const createItem = (data: Partial<PriceItem>) =>
    apiFetch<PriceItem>("/api/items", {
        method: "POST",
        body: JSON.stringify(data),
    });
export const updateItem = (id: number, data: Partial<PriceItem>) =>
    apiFetch<PriceItem>(`/api/items/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
export const deleteItem = (id: number) =>
    apiFetch<{ ok: boolean }>(`/api/items/${id}`, { method: "DELETE" });
export const bulkImport = (
    rows: Pick<PriceItem, "name" | "diamond_price" | "notes" | "category_id">[],
) =>
    apiFetch<{ inserted: number }>("/api/items/bulk", {
        method: "POST",
        body: JSON.stringify(rows),
    });

// Admin — categories
export const createCategory = (data: Omit<Category, "id">) =>
    apiFetch<Category>("/api/items/categories", {
        method: "POST",
        body: JSON.stringify(data),
    });
export const updateCategory = (id: number, data: Omit<Category, "id">) =>
    apiFetch<Category>(`/api/items/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
export const deleteCategory = (id: number) =>
    apiFetch<{ ok: boolean }>(`/api/items/categories/${id}`, {
        method: "DELETE",
    });

// Admin — submissions
export const getSubmissions = (status?: string) =>
    apiFetch<Submission[]>(
        `/api/submissions${status ? `?status=${status}` : ""}`,
    );
export const reviewSubmission = (
    id: number,
    status: "approved" | "rejected",
    admin_notes?: string,
) =>
    apiFetch<Submission>(`/api/submissions/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status, admin_notes }),
    });

// Auth
export const adminLogin = (username: string, password: string) =>
    apiFetch<{ ok: boolean; username: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
export const adminLogout = () =>
    apiFetch<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
export type Role = "owner" | "staff" | "helper";
export const getMe = () => apiFetch<{ username: string; role: Role }>("/api/auth/me");

// Audit log
export type AuditAction =
    | "item.create" | "item.update" | "item.delete" | "item.bulk_import"
    | "category.create" | "category.update" | "category.delete"
    | "submission.approve" | "submission.reject"
    | "admin.create" | "admin.delete" | "admin.role_change" | "admin.password_change";

export interface AuditEntry {
    id: number;
    admin_id: number | null;
    admin_username: string;
    action: AuditAction;
    target_type: string;
    target_id: number | null;
    target_name: string | null;
    details: string | null;
    created_at: string;
}

export const getAuditLog = (params?: { limit?: number; offset?: number; action?: AuditAction }) => {
    const qs = new URLSearchParams();
    if (params?.limit) qs.set("limit", String(params.limit));
    if (params?.offset) qs.set("offset", String(params.offset));
    if (params?.action) qs.set("action", params.action);
    const q = qs.toString();
    return apiFetch<{ entries: AuditEntry[]; total: number; limit: number; offset: number }>(
        `/api/audit${q ? `?${q}` : ""}`,
    );
};

// Admin — admin accounts
export interface AdminAccount {
    id: number;
    username: string;
    role: Role;
    created_at: string;
}
export const getAdmins = () => apiFetch<AdminAccount[]>("/api/admins");
export const createAdmin = (username: string, password: string, role: Role = "staff") =>
    apiFetch<AdminAccount>("/api/admins", {
        method: "POST",
        body: JSON.stringify({ username, password, role }),
    });
export const setAdminRole = (id: number, role: Role) =>
    apiFetch<AdminAccount>(`/api/admins/${id}/role`, {
        method: "PUT",
        body: JSON.stringify({ role }),
    });
export const deleteAdmin = (id: number) =>
    apiFetch<{ ok: boolean }>(`/api/admins/${id}`, { method: "DELETE" });
export interface ChangePasswordPayload {
    password: string;
    currentPassword?: string;
}
export const changeAdminPassword = (
    id: number,
    payload: ChangePasswordPayload,
) =>
    apiFetch<{ ok: boolean }>(`/api/admins/${id}/password`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
