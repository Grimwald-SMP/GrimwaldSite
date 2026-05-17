import PriceTable from "@/app/ui/PriceTable";
import {
    getItems,
    getCategories,
    type PriceItem,
    type Category,
} from "@/app/lib/priceApi";

export const revalidate = 60;

export const metadata = {
    title: "Price Index - Grimwald SMP",
    description: "Community price index for the Grimwald SMP economy.",
};

export default async function PricesPage() {
    let items: PriceItem[] = [];
    let categories: Category[] = [];

    try {
        [items, categories] = await Promise.all([getItems(), getCategories()]);
    } catch {
        // API unreachable - show empty state with message
    }

    return (
        <main className="min-h-screen bg-base-300 px-4 py-12 md:py-16">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-primary">
                        Price Index
                    </h1>
                    <p className="text-base-content/70 max-w-2xl">
                        Community-maintained reference prices for the Grimwald
                        SMP economy.
                    </p>
                    <p className="text-base-content/60 max-w-2xl text-sm">
                        Currently the server is implementing a price floor, where items can&apos;t be sold 80% below the listed price - this is to prevent prices from going too low.
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="card bg-base-200 p-8 text-center text-base-content/50">
                        <p className="text-lg">
                            Price index is currently unavailable.
                        </p>
                        <p className="text-sm mt-2">
                            Check back soon or ask an admin.
                        </p>
                    </div>
                ) : (
                    <PriceTable items={items} categories={categories} />
                )}
            </div>
        </main>
    );
}
