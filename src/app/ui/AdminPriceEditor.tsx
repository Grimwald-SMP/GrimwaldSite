"use client";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table";
import { useState, useCallback, useMemo } from "react";
import type { PriceItem, Category } from "@/app/lib/priceApi";
import { createItem, updateItem, deleteItem, bulkImport } from "@/app/lib/priceApi";
import {
  fromUnit,
  toUnit,
  fmtAutoDb,
  fmtPerItem,
  UNIT_LABELS,
  stackLabel,
  shulkerLabel,
  type PriceUnit,
} from "@/app/lib/priceCalc";

interface Props {
  initialItems: PriceItem[];
  categories: Category[];
}

type EditableItem = PriceItem & { _isNew?: boolean; _dirty?: boolean; stack_size: number };

const col = createColumnHelper<EditableItem>();

/**
 * Price input cell: lets admin enter in any unit (per item / per stack / per shulker).
 * The canonical stored value is always diamonds-per-item.
 */
function PriceCell({
  perItem,
  stackSize,
  onChange,
  onStackSizeChange,
}: {
  perItem: number | null;
  stackSize: number;
  onChange: (perItem: number | null) => void;
  onStackSizeChange: (s: number) => void;
}) {
  const [unit, setUnit] = useState<PriceUnit>("per_item");
  const [raw, setRaw] = useState(() =>
    perItem != null ? String(toUnit(perItem, "per_item")) : ""
  );

  function handleUnitChange(newUnit: PriceUnit) {
    setUnit(newUnit);
    if (perItem != null) setRaw(String(toUnit(perItem, newUnit, stackSize)));
  }

  function handleChange(val: string) {
    setRaw(val);
    if (val === "" || val === "0") {
      onChange(null);
      return;
    }
    const n = parseFloat(val);
    if (!isNaN(n) && n > 0) onChange(fromUnit(n, unit, stackSize));
  }

  const unitOptions: [PriceUnit, string][] = [
    ["per_item", UNIT_LABELS.per_item],
    ["per_stack", stackLabel(stackSize)],
    ["per_shulker", shulkerLabel(stackSize)],
  ];

  const preview = perItem != null && perItem > 0 ? (
    <div className="flex gap-2 text-xs text-base-content/40 mt-0.5 flex-wrap">
      {(["per_item", "per_stack", "per_shulker"] as PriceUnit[])
        .filter((u) => u !== unit)
        .map((u) => (
          <span key={u}>
            {u === "per_item" ? fmtPerItem(perItem) : fmtAutoDb(toUnit(perItem, u, stackSize))}
            <span className="ml-0.5 opacity-70">
              {u === "per_shulker" ? shulkerLabel(stackSize) : u === "per_stack" ? stackLabel(stackSize) : UNIT_LABELS[u]}
            </span>
          </span>
        ))}
    </div>
  ) : null;

  return (
    <div>
      <div className="flex items-center gap-1 flex-wrap">
        <input
          type="number"
          min="0"
          step="any"
          className="input input-xs input-bordered w-24 font-mono"
          value={raw}
          placeholder="-"
          onChange={(e) => handleChange(e.target.value)}
        />
        <select
          className="select select-xs select-bordered"
          value={unit}
          onChange={(e) => handleUnitChange(e.target.value as PriceUnit)}
        >
          {unitOptions.map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-1 mt-0.5">
        <span className="text-xs text-base-content/40">Stack:</span>
        <input
          type="number"
          min="1"
          max="64"
          step="1"
          className="input input-xs input-bordered w-14 font-mono"
          value={stackSize}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (!isNaN(n) && n >= 1 && n <= 64) onStackSizeChange(n);
          }}
        />
      </div>
      {preview}
    </div>
  );
}

function TextCell({
  value,
  onChange,
  placeholder,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      className="input input-xs input-bordered w-44"
      value={value ?? ""}
      placeholder={placeholder ?? "-"}
      maxLength={200}
      onChange={(e) => onChange(e.target.value || null)}
    />
  );
}

export default function AdminPriceEditor({ initialItems, categories }: Props) {
  const [items, setItems] = useState<EditableItem[]>(initialItems);
  const [globalFilter, setGlobalFilter] = useState("");
  const [saving, setSaving] = useState<Set<number | string>>(new Set());
  const [errors, setErrors] = useState<Record<number | string, string>>({});
  const [importing, setImporting] = useState(false);

  const updateField = useCallback(<K extends keyof EditableItem>(
    id: number,
    key: K,
    value: EditableItem[K]
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [key]: value, _dirty: true } : item
      )
    );
  }, []);

  const saveRow = useCallback(async (item: EditableItem) => {
    const key = item._isNew ? `new-${item.id}` : item.id;
    setSaving((s) => new Set(s).add(key));
    setErrors((e) => { const { [key]: _, ...rest } = e; return rest; });
    try {
      const payload = {
        name: item.name,
        category_id: item.category_id,
        diamond_price: item.diamond_price,
        notes: item.notes,
        stack_size: item.stack_size,
      };
      if (item._isNew) {
        const saved = await createItem(payload);
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...saved, _dirty: false } : i))
        );
      } else {
        const saved = await updateItem(item.id, payload);
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...saved, _dirty: false } : i))
        );
      }
    } catch (err) {
      setErrors((e) => ({
        ...e,
        [key]: err instanceof Error ? err.message : "Save failed",
      }));
    } finally {
      setSaving((s) => { const next = new Set(s); next.delete(key); return next; });
    }
  }, []);

  const deleteRow = useCallback(async (item: EditableItem) => {
    if (item._isNew) {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      return;
    }
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await deleteItem(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }, []);

  function addRow() {
    const tempId = -(Date.now());
    setItems((prev) => [
      ...prev,
      {
        id: tempId,
        name: "",
        category_id: null,
        category_name: null,
        category_color: null,
        diamond_price: null,
        notes: null,
        stack_size: 64,
        updated_at: new Date().toISOString(),
        _isNew: true,
        _dirty: true,
      },
    ]);
  }

  function exportCsv() {
    const headers = ["name", "category", "diamond_price", "notes"];
    const rows = items.map((i) => [
      i.name,
      i.category_name ?? "",
      i.diamond_price ?? "",
      i.notes ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grimwald-prices-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCsvImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5_000_000) {
      alert("File too large. Maximum size is 5 MB.");
      e.target.value = "";
      return;
    }
    setImporting(true);
    try {
      const text = await file.text();
      const lines = text.trim().split(/\r?\n/);
      const headers = lines[0].split(",").map((h) => h.replace(/^"|"$/g, "").trim());
      const rows = lines.slice(1)
        .map((line) => {
          const vals = line.split(",").map((v) => v.replace(/^"|"$/g, "").trim());
          const obj: Record<string, string> = {};
          headers.forEach((h, i) => (obj[h] = vals[i] ?? ""));
          return {
            name: obj.name,
            category_id: categories.find((c) => c.name === obj.category)?.id ?? null,
            diamond_price: obj.diamond_price ? Number(obj.diamond_price) : null,
            notes: obj.notes || null,
          };
        })
        .filter((r) => r.name && r.name.length > 0);
      if (rows.length === 0) {
        alert("No valid rows found in CSV.");
        return;
      }
      const result = await bulkImport(rows);
      alert(`Imported ${result.inserted} items. Refreshing…`);
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Import failed");
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<EditableItem, any>[] = useMemo(() => [
    col.accessor("name", {
      header: "Item Name",
      cell: ({ row }) => (
        <input
          type="text"
          className="input input-xs input-bordered w-48"
          value={row.original.name}
          placeholder="Item name"
          maxLength={100}
          onChange={(e) => updateField(row.original.id, "name", e.target.value)}
        />
      ),
    }),
    col.accessor("category_id", {
      header: "Category",
      cell: ({ row }) => (
        <select
          className="select select-xs select-bordered"
          value={row.original.category_id ?? ""}
          onChange={(e) =>
            updateField(
              row.original.id,
              "category_id",
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">- None -</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      ),
    }),
    col.accessor("diamond_price", {
      header: "Price 💎",
      cell: ({ row }) => (
        <PriceCell
          perItem={row.original.diamond_price}
          stackSize={row.original.stack_size ?? 64}
          onChange={(v) => updateField(row.original.id, "diamond_price", v)}
          onStackSizeChange={(s) => updateField(row.original.id, "stack_size", s)}
        />
      ),
    }),
    col.accessor("notes", {
      header: "Notes",
      cell: ({ row }) => (
        <TextCell
          value={row.original.notes}
          placeholder="Optional notes…"
          onChange={(v) => updateField(row.original.id, "notes", v)}
        />
      ),
    }),
    col.display({
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const item = row.original;
        const key = item._isNew ? `new-${item.id}` : item.id;
        const isSaving = saving.has(key);
        const err = errors[key];
        return (
          <div className="flex items-center gap-2">
            {item._dirty && (
              <button
                className="btn btn-xs btn-primary"
                onClick={() => saveRow(item)}
                disabled={isSaving || !item.name.trim()}
              >
                {isSaving ? <span className="loading loading-spinner loading-xs" /> : "Save"}
              </button>
            )}
            <button
              className="btn btn-xs btn-error btn-ghost"
              onClick={() => deleteRow(item)}
              title="Delete row"
            >
              ✕
            </button>
            {err && <span className="text-error text-xs">{err}</span>}
          </div>
        );
      },
    }),
  ], [categories, saving, errors, saveRow, deleteRow, updateField]);

  const table = useReactTable({
    data: items,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => String(row.id),
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search items…"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="input input-bordered input-sm flex-1 min-w-48"
        />
        <button onClick={addRow} className="btn btn-sm btn-primary">
          + Add Row
        </button>
        <button onClick={exportCsv} className="btn btn-sm btn-ghost">
          Export CSV
        </button>
        <label className="btn btn-sm btn-ghost cursor-pointer">
          {importing ? <span className="loading loading-spinner loading-xs" /> : "Import CSV"}
          <input type="file" accept=".csv" className="hidden" onChange={handleCsvImport} />
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-neutral">
        <table className="table table-sm w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-base-200 text-base-content/70 text-xs">
                {hg.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-base-content/40 py-8">
                  No items. Click &quot;+ Add Row&quot; to start.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`hover ${row.original._dirty ? "bg-primary/5" : ""} ${
                    row.original._isNew ? "border-l-2 border-primary" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-1 align-top">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-base-content/40">
        {items.length} items · Prices are stored as diamonds per item and calculated for other views.
      </p>
    </div>
  );
}
