export default function page() {
    return (
        <section className="w-full flex flex-col items-center max-w-3xl mx-auto px-6 py-16 text-base">
            <h1 className="text-4xl font-bold text-center text-secondary mb-2">Server Rules</h1>
            <p className="max-w-md text-center text-base-content/80 mb-12">
                These rules help maintain a safe and enjoyable environment for all players. By joining this server, you
                agree to abide by these guidelines.
            </p>

            <div className="space-y-4">
                <div className="card bg-base-200 shadow-md p-6 border-neutral-200 border-2">
                    <h2 className="text-lg font-semibold mb-2 text-primary/90">1. Age Requirement</h2>
                    <p>You must be <strong>16 years or older</strong> to join this server.</p>
                </div>

                <div className="card bg-base-200 shadow-md p-6 border-neutral-200 border-2">
                    <h2 className="text-lg font-semibold mb-2 text-primary/90">2. Respect & Community Conduct</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Treat all members with respect. Harassment, hate speech, or abusive language will not be
                            tolerated.
                        </li>
                        <li>Resolve conflicts peacefully. If you can’t, contact a staff member before things escalate.
                        </li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-md p-6 border-neutral-200 border-2">
                    <h2 className="text-lg font-semibold mb-2 text-primary/90">3. Griefing & Theft</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>No griefing or destruction of other players’ builds.</li>
                        <li>No stealing or taking items that don’t belong to you.</li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-md p-6 border-neutral-200 border-2">
                    <h2 className="text-lg font-semibold mb-2 text-primary/90">4. Fair Play & Cheating</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>No hacks, cheats, or exploits (x-ray, fly, auto-mine, etc.).</li>
                        <li>Client-side mods that don’t provide an advantage are allowed (e.g., minimaps, tooltip or
                            visual mods). Ask staff if unsure.
                        </li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-md p-6 border-neutral-200 border-2">
                    <h2 className="text-lg font-semibold mb-2 text-primary/90">5. Player vs Player (PvP)</h2>
                    <p>PvP is <strong>only allowed by mutual consent</strong>. Do not attack other players without
                        explicit agreement.</p>
                </div>

                <div className="card bg-base-200 shadow-md p-6 border-neutral-200 border-2">
                    <h2 className="text-lg font-semibold mb-2 text-primary/90">6. Performance & World Integrity</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>No lag machines or excessive redstone contraptions without staff approval.</li>
                        <li>Farms and redstone builds should have an off switch when possible to reduce lag. <br/><span
                            className="text-neutral-content ml-3">(especially
                            super smelters that run off carpets 🙏)</span></li>
                        <li>No land claims — ask before building near others.</li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-md p-6 border-neutral-200 border-2">
                    <h2 className="text-lg font-semibold mb-2 text-primary/90">7. Duping & Automation</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Allowed vanilla duping: rails, falling blocks, carpet, string, and TNT (not the dragon
                            egg).
                        </li>
                        <li>AFK farms and alt accounts for AFK are allowed.</li>
                        <li>Bedrock breaking is permitted.</li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-md p-6 border-neutral-200 border-2">
                    <h2 className="text-lg font-semibold mb-2 text-primary/90">8. Invitations & Whitelist</h2>
                    <p>
                        This is a whitelist-only server. However, you may invite friends - if you ask a staff member they can
                        bypass the application requirement too.
                    </p>
                </div>

                <div className="card bg-base-200 shadow-md p-6 border-neutral-200 border-2">
                    <h2 className="text-lg font-semibold mb-2 text-primary/90">9. General Mindset</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>We’re here to have fun — don’t argue over small things. <span
                            className="text-neutral-content">(like camels)</span></li>
                        <li>Be patient, helpful, and contribute to a positive environment.</li>
                    </ul>
                </div>
            </div>

            <p className="text-center text-base-content/80 mt-12">
                <code>Last updated: October 2025</code>
            </p>
        </section>
    );
}
