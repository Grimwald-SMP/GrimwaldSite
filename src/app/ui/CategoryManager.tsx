"use client";

import { useState } from "react";
import type { Category } from "@/app/lib/priceApi";
import { createCategory, updateCategory, deleteCategory } from "@/app/lib/priceApi";

interface Props {
  categories: Category[];
  onChange: (updated: Category[]) => void;
}

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#14b8a6", "#3b82f6", "#8b5cf6", "#ec4899",
  "#6b7280", "#a16207",
];

interface EditState {
  name: string;
  color: string;
}

export default function CategoryManager({ categories, onChange }: Props) {
  const [editing, setEditing] = useState<Record<number, EditState>>({});
  const [saving, setSaving] = useState<Set<number>>(new Set());
  const [deleting, setDeleting] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Partial<Record<number | "new", string>>>({});

  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(PRESET_COLORS[0]);
  const [addingNew, setAddingNew] = useState(false);

  function startEdit(cat: Category) {
    setEditing((prev) => ({ ...prev, [cat.id]: { name: cat.name, color: cat.color } }));
  }

  function cancelEdit(id: number) {
    setEditing((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    setErrors((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }

  async function saveEdit(cat: Category) {
    const state = editing[cat.id];
    if (!state?.name.trim()) return;
    setSaving((s) => new Set(s).add(cat.id));
    setErrors((prev) => { const { [cat.id]: _, ...rest } = prev; return rest; });
    try {
      const updated = await updateCategory(cat.id, { name: state.name.trim(), color: state.color });
      onChange(categories.map((c) => (c.id === cat.id ? updated : c)));
      cancelEdit(cat.id);
    } catch (err) {
      setErrors((prev) => ({ ...prev, [cat.id]: err instanceof Error ? err.message : "Save failed" }));
    } finally {
      setSaving((s) => { const next = new Set(s); next.delete(cat.id); return next; });
    }
  }

  async function handleDelete(cat: Category) {
    if (!confirm(`Delete category "${cat.name}"? Items in this category will become uncategorized.`)) return;
    setDeleting((s) => new Set(s).add(cat.id));
    try {
      await deleteCategory(cat.id);
      onChange(categories.filter((c) => c.id !== cat.id));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [cat.id]: err instanceof Error ? err.message : "Delete failed" }));
    } finally {
      setDeleting((s) => { const next = new Set(s); next.delete(cat.id); return next; });
    }
  }

  async function handleAdd() {
    if (!newName.trim()) return;
    setAddingNew(true);
    setErrors((prev) => { const { new: _, ...rest } = prev; return rest; });
    try {
      const created = await createCategory({ name: newName.trim(), color: newColor });
      onChange([...categories, created]);
      setNewName("");
      setNewColor(PRESET_COLORS[0]);
    } catch (err) {
      setErrors((prev) => ({ ...prev, new: err instanceof Error ? err.message : "Create failed" }));
    } finally {
      setAddingNew(false);
    }
  }

  return (
    <div className="card bg-base-200 p-5 space-y-4">
      <h2 className="text-lg font-semibold text-base-content">Categories</h2>

      {/* Existing categories */}
      <div className="space-y-2">
        {categories.length === 0 && (
          <p className="text-base-content/40 text-sm">No categories yet.</p>
        )}
        {categories.map((cat) => {
          const edit = editing[cat.id];
          const isSaving = saving.has(cat.id);
          const isDeleting = deleting.has(cat.id);
          const err = errors[cat.id];

          return (
            <div key={cat.id} className="flex items-center gap-2 flex-wrap">
              {edit ? (
                <>
                  <input
                    type="text"
                    className="input input-xs input-bordered w-36"
                    value={edit.name}
                    maxLength={50}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, [cat.id]: { ...prev[cat.id], name: e.target.value } }))
                    }
                    onKeyDown={(e) => { if (e.key === "Enter") saveEdit(cat); if (e.key === "Escape") cancelEdit(cat.id); }}
                    autoFocus
                  />
                  <ColorPicker
                    value={edit.color}
                    onChange={(c) => setEditing((prev) => ({ ...prev, [cat.id]: { ...prev[cat.id], color: c } }))}
                  />
                  <button
                    className="btn btn-xs btn-primary"
                    disabled={isSaving || !edit.name.trim()}
                    onClick={() => saveEdit(cat)}
                  >
                    {isSaving ? <span className="loading loading-spinner loading-xs" /> : "Save"}
                  </button>
                  <button className="btn btn-xs btn-ghost" onClick={() => cancelEdit(cat.id)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{ backgroundColor: cat.color + "33", color: cat.color, borderColor: cat.color + "66" }}
                  >
                    {cat.name}
                  </span>
                  <button className="btn btn-xs btn-ghost" onClick={() => startEdit(cat)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error btn-ghost"
                    disabled={isDeleting}
                    onClick={() => handleDelete(cat)}
                  >
                    {isDeleting ? <span className="loading loading-spinner loading-xs" /> : "Delete"}
                  </button>
                </>
              )}
              {err && <span className="text-error text-xs">{err}</span>}
            </div>
          );
        })}
      </div>

      {/* Add new category */}
      <div className="border-t border-neutral pt-4 space-y-2">
        <p className="text-xs text-base-content/50 font-medium uppercase tracking-wide">New Category</p>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            className="input input-xs input-bordered w-36"
            placeholder="Category name"
            value={newName}
            maxLength={50}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          />
          <ColorPicker value={newColor} onChange={setNewColor} />
          <button
            className="btn btn-xs btn-primary"
            disabled={addingNew || !newName.trim()}
            onClick={handleAdd}
          >
            {addingNew ? <span className="loading loading-spinner loading-xs" /> : "+ Add"}
          </button>
        </div>
        {errors["new"] && <span className="text-error text-xs">{errors["new"]}</span>}
      </div>
    </div>
  );
}

function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {PRESET_COLORS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
          style={{
            backgroundColor: c,
            borderColor: value === c ? "#fff" : "transparent",
            outline: value === c ? `2px solid ${c}` : "none",
          }}
          title={c}
        />
      ))}
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
        title="Custom color"
      />
    </div>
  );
}
