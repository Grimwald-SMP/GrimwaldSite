import Link from "next/link";

export default function page() {
    return (
        <div className="flex flex-col items-center justify-center">
            <section className="w-full bg-neutral-200 flex flex-col items-center text-center py-20 px-4">
                <h1 className="text-4xl font-bold mb-4 text-neutral-content">Applying to the Grimwald SMP</h1>
                <p className="max-w-lg">
                    The Grimwald SMP is a close-knit, whitelist-only Minecraft community. To ensure a positive and
                    friendly environment, all players must apply before joining.
                </p>
            </section>

            <section className="w-full bg-base-100 flex flex-col items-center text-center py-16 px-4">
                <div className="flex flex-col lg:flex-row w-full justify-center gap-10">
                    <div>
                        <div className="mb-3">
                            <h2 className="text-2xl font-semibold text-neutral-content">Before You Apply</h2>
                            <p className="text-neutral-content/80 text-sm">Be aware of a few things:</p>
                        </div>

                        <ul className="max-w-md text-left list-disc list-inside text-neutral-content/80 space-y-2">
                            <li>We are Java Edition only</li>
                            <li>Respectful and mature behavior is required</li>
                            <li>No hacked clients or unfair mods</li>
                        </ul>

                        <Link href="/rules" className="btn btn-secondary btn-dash mt-2">Read Rules</Link>
                    </div>

                    <div className="divider lg:divider-horizontal"></div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-content">How to Apply</h2>
                        <ol className="max-w-md text-left list-decimal list-inside text-neutral-content/80 space-y-2">
                            <li>Join the Grimwald Discord using the link below.</li>
                            <li>Fill out the application questions during the onboarding.</li>
                            <li>Wait for a staff member to review your application.</li>
                        </ol>
                        <Link
                            href="https://discord.gg/fzVqVXHq45"
                            className="btn btn-accent mt-6"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Join Discord
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}