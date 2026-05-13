export const STACK = 64;
export const SHULKER = 27 * STACK; // 1728 items
export const DIAMONDS_PER_BLOCK = 9;

export type PriceUnit = "per_item" | "per_stack" | "per_shulker";

export const UNIT_LABELS: Record<PriceUnit, string> = {
  per_item: "/ item",
  per_stack: "/ stack (64)",
  per_shulker: "/ shulker (1728)",
};

/** Convert a stored per-item price to a given display unit. */
export function toUnit(perItem: number, unit: PriceUnit): number {
  if (unit === "per_stack") return perItem * STACK;
  if (unit === "per_shulker") return perItem * SHULKER;
  return perItem;
}

/** Convert a price entered in some unit back to per-item for storage. */
export function fromUnit(value: number, unit: PriceUnit): number {
  if (unit === "per_stack") return value / STACK;
  if (unit === "per_shulker") return value / SHULKER;
  return value;
}

/** Format a diamond amount cleanly, always in diamonds. */
export function fmtDiamonds(diamonds: number): string {
  if (diamonds <= 0) return "0 💎";
  const n = trimNum(diamonds);
  return `${n} 💎`;
}

/**
 * Threshold above which prices are shown in diamond blocks (DB) instead of diamonds.
 * 64 = one stack of diamonds, a natural in-game bulk unit.
 */
export const DB_THRESHOLD = 64;

/**
 * Auto-format: switches to diamond blocks when the value hits the threshold.
 *   < 64 💎  → "X 💎"
 *   ≥ 64 💎  → "X DB"
 */
export function fmtAutoDb(diamonds: number): string {
  if (diamonds <= 0) return "—";
  if (diamonds >= DB_THRESHOLD) {
    return `${trimNum(diamonds / DIAMONDS_PER_BLOCK)} DB`;
  }
  return `${trimNum(diamonds)} 💎`;
}

/**
 * Smart display for per-item price: if < 1 diamond, show as "X per 💎" to
 * avoid confusing decimals like "0.0625 💎".
 */
export function fmtPerItem(perItem: number): string {
  if (perItem <= 0) return "—";
  if (perItem < 1) {
    const perDiamond = trimNum(1 / perItem);
    return `${perDiamond}x / 💎`;
  }
  return `${trimNum(perItem)} 💎`;
}

/**
 * Calculate the lowest permitted price (80% of listed) and round it UP to the
 * nearest "sensible" denomination so it's easy to quote in-game:
 *
 *  - Floor >= 1 💎    → round up to nearest whole diamond  (e.g. 28 → 23)
 *  - Floor 0.25–1 💎  → round up to nearest ¼ diamond
 *  - Floor < 0.25 💎  → express as items-per-diamond; round the count DOWN to
 *                       the nearest power of 2 (fewer items = higher floor)
 *
 * Returns the floor as a per-item price in diamonds.
 */
export function ceilMinPrice(perItem: number): number {
  const raw = perItem * 0.8;
  if (raw <= 0) return 0;

  if (raw >= 1) return Math.ceil(raw);
  if (raw >= 0.25) return Math.ceil(raw * 4) / 4;

  // Sub-quarter: work in items-per-diamond, round DOWN to nearest power of 2
  // (lower items-per-diamond = higher price per item = stricter floor)
  const ipd = 1 / raw;
  let n = 1;
  while (n * 2 <= ipd) n *= 2;
  return 1 / n;
}

function trimNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  // Up to 4 sig figs, strip trailing zeros
  return parseFloat(n.toPrecision(4)).toString();
}
