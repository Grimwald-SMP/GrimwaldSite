export default function page() {
    return (
        <div>
            <section className="w-full flex flex-col items-center justify-center py-12 px-4">
                <h1 className="text-4xl font-bold mb-4 text-neutral-content">Grimwald World Map</h1>
                <p className="max-w-lg text-center text-neutral-content/80">
                    Explore the world of Grimwald with our interactive map. Click on the markers to view more
                    information about each region.
                </p>
                <a href="https://map.grimwald.xyz/" target="_blank" rel="noopener noreferrer"
                   className="btn btn-primary mt-6">Open in a new tab</a>
            </section>

            <section className="w-full flex justify-center py-16 px-4 bg-base-200">
                <div
                    className="w-full max-w-7xl aspect-[9/16] sm:aspect-video rounded-2xl border-2 border-neutral overflow-hidden shadow-xl">
                    <iframe
                        src="https://map.grimwald.xyz"
                        title="Grimwald World Map"
                        className="w-full h-full border-0"
                        allowFullScreen
                    />
                </div>
            </section>
        </div>
    )
}