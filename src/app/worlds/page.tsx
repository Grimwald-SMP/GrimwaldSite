import {
    getAvailableWorlds,
    World,
    getWorldThumbnailURL,
    getWorldDownloadURL,
} from "@/app/lib/worlds";
import WorldCard from "@/app/ui/WorldCard";

export const revalidate = 3600;

export default async function Page() {
    const worlds: World[] = await getAvailableWorlds();

    return (
        <section className="w-full flex flex-col items-center px-4 py-16 md:py-20">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-primary">
                    Grimwald Worlds
                </h1>
                <p className="text-base-content/70 max-w-md leading-relaxed">
                    Download past season world files to explore, archive, or
                    revisit your favourite builds.
                </p>
                <div className="divider w-24 mx-auto mt-1" />
            </div>

            {/* World count badge */}
            {worlds.length > 0 && (
                <p className="text-sm font-mono text-base-content/40 mb-6 tracking-widest uppercase">
                    {worlds.length} world{worlds.length !== 1 ? "s" : ""}{" "}
                    available
                </p>
            )}

            {/* Grid */}
            {worlds.length > 0 ? (
                <div className="w-full max-w-4xl grid grid-cols-1 gap-8 md:grid-cols-2">
                    {worlds.map(async (world) => {
                        const img = await getWorldThumbnailURL(world.id);
                        // Adjust this to however your download URL is generated
                        const downloadUrl = await getWorldDownloadURL(world.id);
                        return (
                            <WorldCard
                                key={world.id}
                                world={world}
                                imageUrl={img || ""}
                                downloadUrl={downloadUrl}
                            />
                        );
                    })}
                </div>
            ) : (
                /* Empty state */
                <div className="flex flex-col items-center gap-4 py-20 text-base-content/40">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-12 opacity-30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <p className="text-sm font-mono">
                        No worlds available yet.
                    </p>
                </div>
            )}
        </section>
    );
}
