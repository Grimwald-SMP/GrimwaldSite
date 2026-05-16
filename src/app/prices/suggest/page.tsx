"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getItems, getCategories, submitSuggestion } from "@/app/lib/priceApi";
import type { PriceItem, Category } from "@/app/lib/priceApi";
import {
    fromUnit,
    fmtPerItem,
    UNIT_LABELS,
    stackLabel,
    shulkerLabel,
    type PriceUnit,
} from "@/app/lib/priceCalc";

type State = "idle" | "loading" | "success" | "error";

export default function SuggestPage() {
    const [items, setItems] = useState<PriceItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [state, setState] = useState<State>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const [username, setUsername] = useState("");
    const [itemSearch, setItemSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState<PriceItem | null>(null);
    const [isNewItem, setIsNewItem] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [suggestedPrice, setSuggestedPrice] = useState("");
    const [suggestedPriceUnit, setSuggestedPriceUnit] = useState<PriceUnit>("per_item");
    const [suggestedCategoryId, setSuggestedCategoryId] = useState<number | null>(null);
    const [reasoning, setReasoning] = useState("");

    useEffect(() => {
        Promise.all([getItems(), getCategories()])
            .then(([i, c]) => { setItems(i); setCategories(c); })
            .catch(() => {});
    }, []);

    // When an existing item is selected, pre-fill its current category
    function selectItem(item: PriceItem) {
        setSelectedItem(item);
        setItemSearch(item.name);
        setSuggestedCategoryId(item.category_id);
        setSuggestedPrice("");
        setSuggestedPriceUnit("per_item");
    }

    const filteredItems = itemSearch.trim()
        ? items.filter((i) =>
              i.name.toLowerCase().includes(itemSearch.toLowerCase()),
          )
        : items;

    const stackSize = selectedItem?.stack_size ?? 64;
    const unitOptions: [PriceUnit, string][] = [
        ["per_item", UNIT_LABELS.per_item],
        ["per_stack", stackLabel(stackSize)],
        ["per_shulker", shulkerLabel(stackSize)],
    ];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setState("loading");
        setErrorMsg("");

        const itemName = isNewItem
            ? newItemName.trim()
            : (selectedItem?.name ?? itemSearch.trim());

        if (!itemName) {
            setErrorMsg("Please select or enter an item name.");
            setState("error");
            return;
        }

        // Convert suggested price to per-item
        const submittedPerItem = suggestedPrice
            ? fromUnit(Number(suggestedPrice), suggestedPriceUnit, stackSize)
            : null;

        // Duplicate guard: reject if the suggested value matches the current price
        if (
            !isNewItem &&
            selectedItem?.diamond_price != null &&
            submittedPerItem != null &&
            Math.abs(submittedPerItem - selectedItem.diamond_price) < 1e-9
        ) {
            setErrorMsg("Suggested price matches the current price. Please suggest a different value.");
            setState("error");
            return;
        }

        try {
            await submitSuggestion({
                item_id: isNewItem ? null : (selectedItem?.id ?? null),
                item_name: itemName,
                suggested_price: submittedPerItem,
                suggested_category_id: suggestedCategoryId,
                reasoning: reasoning.trim() || undefined,
                submitter_username: username.trim(),
            });
            setState("success");
        } catch (err) {
            setErrorMsg(
                err instanceof Error ? err.message : "Submission failed",
            );
            setState("error");
        }
    }

    // Find the currently selected category object for the color swatch
    const selectedCategory = categories.find((c) => c.id === suggestedCategoryId);

    if (state === "success") {
        return (
            <main className="min-h-screen bg-base-300 px-4 py-10 flex items-center justify-center">
                <div className="card bg-base-200 max-w-md w-full p-8 text-center space-y-4">
                    <div className="text-5xl">✅</div>
                    <h2 className="text-2xl font-bold text-primary">
                        Suggestion Submitted!
                    </h2>
                    <p className="text-base-content/70">
                        Your price suggestion has been sent to the admins for
                        review.
                    </p>
                    <div className="flex gap-3 justify-center mt-4">
                        <Link href="/prices" className="btn btn-primary">
                            Back to Price Index
                        </Link>
                        <button
                            className="btn btn-ghost"
                            onClick={() => setState("idle")}
                        >
                            Submit Another
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-base-300 px-4 py-10">
            <div className="max-w-xl mx-auto space-y-6">
                <div>
                    <Link
                        href="/prices"
                        className="text-primary hover:underline text-sm"
                    >
                        ← Back to Price Index
                    </Link>
                    <h1 className="text-3xl font-bold text-primary mt-2">
                        Suggest a Price
                    </h1>
                    <p className="text-base-content/60 mt-1">
                        Suggest a new price or correction. Admins will review it
                        before it goes live.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="card bg-base-200 p-6 space-y-5"
                >
                    {/* Username */}
                    <label className="form-control">
                        <div className="label-text mb-1 font-medium">
                            Minecraft Username{" "}
                            <span className="text-error">*</span>
                        </div>
                        <input
                            className="input input-bordered"
                            placeholder="YourUsername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            maxLength={50}
                        />
                    </label>

                    {/* Item selection */}
                    <div className="space-y-2">
                        <span className="label-text font-medium">
                            Item <span className="text-error">*</span>
                        </span>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsNewItem(false);
                                    setSelectedItem(null);
                                    setSuggestedCategoryId(null);
                                }}
                                className={`btn btn-sm flex-1 ${!isNewItem ? "btn-primary" : "btn-ghost"}`}
                            >
                                Existing Item
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsNewItem(true);
                                    setSelectedItem(null);
                                    setSuggestedCategoryId(null);
                                }}
                                className={`btn btn-sm flex-1 ${isNewItem ? "btn-primary" : "btn-ghost"}`}
                            >
                                New Item
                            </button>
                        </div>

                        {isNewItem ? (
                            <input
                                className="input input-bordered w-full"
                                placeholder="Item name (e.g. Dragon Egg)"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                required
                                maxLength={100}
                            />
                        ) : (
                            <div className="space-y-2">
                                <input
                                    className="input input-bordered w-full"
                                    placeholder="Search items…"
                                    value={itemSearch}
                                    onChange={(e) => {
                                        setItemSearch(e.target.value);
                                        setSelectedItem(null);
                                        setSuggestedCategoryId(null);
                                    }}
                                />
                                {itemSearch.trim() && (
                                    <ul className="bg-base-300 border border-neutral rounded-lg max-h-48 overflow-y-auto">
                                        {filteredItems
                                            .slice(0, 20)
                                            .map((item) => (
                                                <li key={item.id}>
                                                    <button
                                                        type="button"
                                                        onClick={() => selectItem(item)}
                                                        className={`w-full text-left px-4 py-2 hover:bg-base-200 text-sm ${
                                                            selectedItem?.id === item.id
                                                                ? "text-primary font-medium"
                                                                : ""
                                                        }`}
                                                    >
                                                        {item.name}
                                                    </button>
                                                </li>
                                            ))}
                                        {filteredItems.length === 0 && (
                                            <li className="px-4 py-3 text-base-content/50 text-sm">
                                                No items found -{" "}
                                                <button
                                                    type="button"
                                                    className="text-primary underline"
                                                    onClick={() => {
                                                        setIsNewItem(true);
                                                        setNewItemName(itemSearch);
                                                    }}
                                                >
                                                    request as new item
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                )}
                                {/* Current price display */}
                                {selectedItem != null && (
                                    <div className="text-sm text-base-content/60 px-1">
                                        Current price:{" "}
                                        <span className="font-mono text-base-content">
                                            {selectedItem.diamond_price != null
                                                ? fmtPerItem(selectedItem.diamond_price)
                                                : "not set"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Category */}
                    <div className="form-control space-y-1">
                        <span className="label-text font-medium">
                            {isNewItem ? "Category" : "Suggest Category"}
                            {!isNewItem && (
                                <span className="text-base-content/40 font-normal ml-1 text-xs">
                                    (optional change)
                                </span>
                            )}
                        </span>
                        <div className="flex items-center gap-2">
                            {selectedCategory && (
                                <span
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: selectedCategory.color }}
                                />
                            )}
                            <select
                                className="select select-bordered w-full"
                                value={suggestedCategoryId ?? ""}
                                onChange={(e) =>
                                    setSuggestedCategoryId(
                                        e.target.value ? Number(e.target.value) : null,
                                    )
                                }
                            >
                                <option value="">
                                    {isNewItem ? "- No category -" : "- No change -"}
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Suggested price with unit selector */}
                    <label className="form-control">
                        <span className="label-text mb-1 font-medium">
                            Suggested Price
                        </span>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    className="input input-bordered w-full pr-10"
                                    type="number"
                                    min="0"
                                    step="any"
                                    placeholder="e.g. 2"
                                    value={suggestedPrice}
                                    onChange={(e) =>
                                        setSuggestedPrice(e.target.value)
                                    }
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
                                    💎
                                </span>
                            </div>
                            <select
                                className="select select-bordered"
                                value={suggestedPriceUnit}
                                onChange={(e) =>
                                    setSuggestedPriceUnit(e.target.value as PriceUnit)
                                }
                            >
                                {unitOptions.map(([k, v]) => (
                                    <option key={k} value={k}>{v}</option>
                                ))}
                            </select>
                        </div>
                    </label>

                    {/* Reasoning */}
                    <label className="form-control">
                        <div className="label-text mb-1 font-medium">
                            Reasoning / Evidence
                        </div>
                        <textarea
                            className="textarea textarea-bordered"
                            rows={3}
                            placeholder="Why should this price be set? E.g. market observation, comparison with other servers…"
                            value={reasoning}
                            onChange={(e) => setReasoning(e.target.value)}
                            maxLength={1000}
                        />
                        <span className="text-xs text-base-content/40 ml-2 mt-1 text-right">
                            {reasoning.length}/1000
                        </span>
                    </label>

                    {state === "error" && (
                        <div className="alert alert-error text-sm">
                            {errorMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={state === "loading"}
                    >
                        {state === "loading" ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            "Submit Suggestion"
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
