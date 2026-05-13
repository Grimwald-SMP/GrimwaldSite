"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { PriceItem, Category } from "@/app/lib/priceApi";
import {
  fmtPerItem,
  fmtAutoDb,
  toUnit,
  ceilMinPrice,
  UNIT_LABELS,
  type PriceUnit,
} from "@/app/lib/priceCalc";
import CategoryPill from "./CategoryPill";

interface Props {
  items: PriceItem[];
  categories: Category[];
}

type ViewMode = PriceUnit | "all";

const VIEW_TABS: { key: ViewMode; label: string }[] = [
  { key: "per_item", label: "Per Item" },
  { key: "per_stack", label: "Per Stack (64)" },
  { key: "per_shulker", label: "Per Shulker" },
  { key: "all", label: "All" },
];

type SortDir = "asc" | "desc";

export default function PriceTable({ items, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [view, setView] = useState<ViewMode>("per_item");
  const [showFloor, setShowFloor] = useState(false);
  const [sort, setSort] = useState<{ dir: SortDir }>({ dir: "asc" });
  const [sortByPrice, setSortByPrice] = useState(false);

  const filtered = useMemo(() => {
    let result = items;
    if (activeCategory !== null)
      result = result.filter((i) => i.category_id === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((i) => i.name.toLowerCase().includes(q));
    }
    return [...result].sort((a, b) => {
      if (sortByPrice) {
        const av = a.diamond_price ?? Infinity;
        const bv = b.diamond_price ?? Infinity;
        return sort.dir === "asc" ? av - bv : bv - av;
      }
      const cmp = a.name.localeCompare(b.name);
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [items, search, activeCategory, sort, sortByPrice]);

  function toggleNameSort() {
    if (!sortByPrice) {
      setSort((s) => ({ dir: s.dir === "asc" ? "desc" : "asc" }));
    } else {
      setSortByPrice(false);
      setSort({ dir: "asc" });
    }
  }

  function togglePriceSort() {
    if (sortByPrice) {
      setSort((s) => ({ dir: s.dir === "asc" ? "desc" : "asc" }));
    } else {
      setSortByPrice(true);
      setSort({ dir: "asc" });
    }
  }

  function SortIcon({ active }: { active: boolean }) {
    if (!active) return <span className="opacity-30 ml-1">↕</span>;
    return <span className="ml-1">{sort.dir === "asc" ? "↑" : "↓"}</span>;
  }

  function fmtForView(item: PriceItem, unit: PriceUnit): string {
    if (item.diamond_price == null) return "—";
    if (unit === "per_item") return fmtPerItem(item.diamond_price);
    return fmtAutoDb(toUnit(item.diamond_price, unit));
  }

  function fmtFloorForView(item: PriceItem, unit: PriceUnit): string {
    if (item.diamond_price == null || item.diamond_price <= 0) return "—";
    const floor = ceilMinPrice(item.diamond_price);
    if (unit === "per_item") return fmtPerItem(floor);
    return fmtAutoDb(toUnit(floor, unit));
  }

  const lastUpdated = items.length
    ? new Date(
        Math.max(...items.map((i) => new Date(i.updated_at).getTime()))
      ).toLocaleDateString()
    : null;

  const showAll = view === "all";
  const priceColCount = showAll ? 3 : 1;
  const totalCols = 3 + priceColCount; // name + category + price col(s) + notes

  return (
    <div className="space-y-4">
      {/* Search + suggest */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search items…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered flex-1"
        />
        <Link href="/prices/suggest" className="btn btn-primary whitespace-nowrap">
          Suggest a Price
        </Link>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
            activeCategory === null
              ? "bg-base-content text-base-100 border-base-content"
              : "border-base-content/30 text-base-content/60 hover:opacity-80"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <CategoryPill
            key={cat.id}
            name={cat.name}
            color={cat.color}
            active={activeCategory === cat.id}
            onClick={() =>
              setActiveCategory(activeCategory === cat.id ? null : cat.id)
            }
          />
        ))}
      </div>

      {/* View toggle + floor toggle */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-base-content/50">View:</span>
        <div className="flex rounded-lg border border-neutral overflow-hidden">
          {VIEW_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`px-3 py-1.5 text-sm transition-colors ${
                view === key
                  ? "bg-primary text-primary-content font-medium"
                  : "hover:bg-base-200 text-base-content/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none ml-auto sm:ml-0">
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-warning"
            checked={showFloor}
            onChange={(e) => setShowFloor(e.target.checked)}
          />
          <span className="text-sm text-base-content/70">Show floor price</span>
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-neutral">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base-content/70 text-sm">
              <th
                className="cursor-pointer select-none"
                onClick={toggleNameSort}
              >
                Item <SortIcon active={!sortByPrice} />
              </th>
              <th>Category</th>
              {showAll ? (
                <>
                  <th className="text-right cursor-pointer select-none" onClick={togglePriceSort}>
                    {UNIT_LABELS.per_item} <SortIcon active={sortByPrice} />
                  </th>
                  <th className="text-right">{UNIT_LABELS.per_stack}</th>
                  <th className="text-right">{UNIT_LABELS.per_shulker}</th>
                </>
              ) : (
                <th className="text-right cursor-pointer select-none" onClick={togglePriceSort}>
                  {showFloor ? "Floor" : "Price"} ({UNIT_LABELS[view as PriceUnit]})
                  {" "}<SortIcon active={sortByPrice} />
                </th>
              )}
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={totalCols}
                  className="text-center text-base-content/50 py-10"
                >
                  No items found
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover">
                  <td className="font-medium">{item.name}</td>
                  <td>
                    {item.category_name ? (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: item.category_color + "33",
                          color: item.category_color ?? undefined,
                          border: `1px solid ${item.category_color}66`,
                        }}
                      >
                        {item.category_name}
                      </span>
                    ) : (
                      <span className="text-base-content/30">—</span>
                    )}
                  </td>
                  {showAll ? (
                    <>
                      {(["per_item", "per_stack", "per_shulker"] as PriceUnit[]).map((u) => (
                        <td key={u} className="text-right font-mono">
                          {showFloor ? fmtFloorForView(item, u) : fmtForView(item, u)}
                        </td>
                      ))}
                    </>
                  ) : (
                    <td className="text-right font-mono">
                      {showFloor
                        ? fmtFloorForView(item, view as PriceUnit)
                        : fmtForView(item, view as PriceUnit)}
                    </td>
                  )}
                  <td className="text-sm text-base-content/60 max-w-xs truncate">
                    {item.notes ?? ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-sm text-base-content/50">
        <span>
          {filtered.length} of {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
        {lastUpdated && <span>Last updated: {lastUpdated}</span>}
      </div>
    </div>
  );
}
