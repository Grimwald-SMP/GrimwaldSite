export default function page() {
    return (
        <section className="w-full flex flex-col items-center max-w-3xl mx-auto px-6 py-16 text-base">
            <h1 className="text-3xl md:text-5xl font-bold text-center text-primary mb-3">
                Server Rules
            </h1>
            <p className="max-w-md text-center text-base-content/70 mb-12">
                These rules help maintain a safe and enjoyable environment for
                all players. By joining this server, you agree to abide by these
                guidelines.
            </p>

            <div className="space-y-4">
                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        1. Age Requirement
                    </h2>
                    <p>
                        You must be at least <strong>16 years or older</strong>{" "}
                        to join this server.
                    </p>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        2. Respect & Community Conduct
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Treat all members with respect.</li>
                        <li>
                            Resolve conflicts peacefully. If you can&apos;t, contact
                            a staff member before things escalate.
                        </li>
                        <li>
                            Don&apos;t take staff matters into your own hands - if
                            you have an issue with what someone has done,
                            contact a staff member.
                        </li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        3. Griefing & Theft
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            No griefing or destruction of other players&apos; builds.
                        </li>
                        <li>
                            No stealing or taking items that don&apos;t belong to
                            you.
                        </li>
                    </ul>
                    <p className="pt-2">
                        Don&apos;t even try, you will be caught. 🗿
                    </p>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        4. Building & Placement
                    </h2>
                    <p>
                        Because we don&apos;t use a traditional land claims system:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pt-2">
                        <li>
                            Please be mindful of the placement of your builds.
                        </li>
                        <li>
                            Make sure you&apos;re not invasive with where you choose
                            to build.
                        </li>
                        <li>
                            If you want to build in a plot of land in the
                            future, make sure you noticeably mark it for such
                            use.
                        </li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        5. Fair Play & Cheating
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            No hacks, cheats, or exploits (x-ray, fly,
                            auto-mine, etc.).
                        </li>
                        <li>
                            Client-side mods that don&apos;t provide an advantage are
                            allowed (e.g., minimaps, tooltip or visual mods).
                            Ask staff if unsure.
                        </li>
                        <li>
                            Full-bright, freecam, and litematica are also fine
                            for building-purposes.
                        </li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        6. Player vs Player
                    </h2>
                    <p>
                        PvP is <strong>only allowed by mutual consent</strong>.
                        Do not attack other players without explicit agreement.
                    </p>
                    <p>
                        The same goes for any faction-type battles. Involvement
                        in them MUST be opt-in.
                    </p>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        7. Performance
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            No lag machines or excessive redstone contraptions
                            without staff approval.{" "}
                            <span className="text-neutral-content">
                                Don&apos;t worry, most farms are fine, but if you
                                think one might cause issues, chat with a staff
                                member.
                            </span>
                        </li>
                        <li>
                            Farms and redstone builds should have an off switch
                            when possible to reduce lag. <br />
                            <span className="text-neutral-content ml-3">
                                (especially super smelters that run on carpets
                                🙏)
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        8. Duping & Automation
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Non-abusive vanilla-duping is allowed, such as TNT
                            and gravity blocks.
                        </li>
                        <li>AFK farms and alt accounts for AFK are allowed.</li>
                        <li>Bedrock breaking is allowed.</li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        9. Invitations & Whitelist
                    </h2>
                    <p>
                        This is a whitelist-only server. However, you may invite
                        friends{" "}
                        <span className="text-neutral-content">
                            (if you ask a staff member beforehand they can
                            bypass the application requirement too)
                        </span>
                    </p>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        10. Price-floor
                    </h2>
                    <p>(NEW RULE)</p>
                    <p className="pt-2">
                        You may not sell items for <strong>80% less</strong>{" "}
                        than what is listed on the{" "}
                        <a href="https://togethercraft.online/price-index/">
                            TogetherCraft Price Index
                        </a>
                        . If you think any prices are unfair we are wiling to
                        make modifications. This is just to ensure a fair
                        economy and to reduce price-cutting.{" "}
                        <span className="text-neutral-content">
                            (we aren&apos;t trying to be controlling overlords)
                        </span>
                    </p>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        11. Farm inactivity
                    </h2>
                    <p>(NEW RULE)</p>
                    <p className="pt-2">
                        If the owner of a farm is inactive for more than 3
                        months, members can use the farm as long as they
                        compensate the owner an appropriate amount - typically
                        the shop-price of the item(s). This ONLY applies to
                        farms with items being sold on the market.
                    </p>
                    <ul className="list-disc list-inside space-y-1 pt-2">
                        <li>
                            If you need to go on leave and are worried about
                            this rule coming into effect, please contact a staff
                            member.
                        </li>
                        <li>
                            Also, please ask staff before you use a farm that
                            you believe is inactive.
                        </li>
                    </ul>
                </div>

                <div className="card bg-base-200 shadow-sm p-6 border-neutral border-2">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        Final Points
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            We&apos;re here to have fun - don&apos;t argue over small
                            things.{" "}
                            <span className="text-neutral-content">
                                (like camels)
                            </span>
                        </li>
                        <li>
                            Be patient, helpful, and contribute to a positive
                            environment.
                        </li>
                        <li>
                            Don&apos;t take major matters into your own hands -
                            please let a staff member handle it.
                        </li>
                    </ul>
                </div>
            </div>

            <p className="text-center text-base-content/80 mt-12">
                <code>Last updated: February 2026</code>
            </p>
        </section>
    );
}
