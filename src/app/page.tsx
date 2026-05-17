import CountUp from "@/app/ui/CountUp";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Grimwald SMP - Quality Minecraft Server",
    description: "Grimwald SMP, a Whitelist-only server that focuses on quality members over the quantity of members.",
};

const features = [
    {
        title: "No Conflict",
        description: "Because of our selective application process, you don't have to worry about your builds being griefed or having your items stolen.",
        image: "/builds/s21/DragonShrine.png"
    },
    {
        title: "Trusting community.",
        description: "Because of our trusting community, we don't use land claim, you can build anywhere you want. Don't worry though, your builds are still safe from griefing because all block actions are logged.",
        image: "/builds/s19/Factory.png"
    },
    {
        title: "Democratic",
        description: "All major decisions for the server are voted on by the community members so that everyone has a good experience on the server.",
        image: "/builds/s21/CilseyCity2.png"
    },
    {
        title: "Vanilla+",
        description: "We have a nice balance of server plugins that will improve your experience but not take away from the enjoyment that comes from pure vanilla gameplay.",
        image: "/builds/s21/RuralBuild.png"
    },
    {
        title: "Equal for everyone",
        description: "We are against pay-to-win server mechanics, everyone has the same opportunity to do great things on this server.",
        image: "/builds/s21/IslandBuild.png"
    },
    {
        title: "Dictator-free",
        description: "Ownership is split on this server and admin actions are moderated, so you won't run into toxic admin-abuse.",
        image: "/builds/s21/ElmoBuild.png"
    },
    {
        title: "Season-based",
        description: "We run the worlds in seasons and the community votes on when we move onto a new season, so you won't feel left behind.",
        image: "/builds/s21/CTF2.png"
    },
    {
        title: "Diverse",
        description: "We welcome all types of players, from beginners to experienced players. We have members from all over the world and with different playstyles.",
        image: "/builds/s19/Castle.png"
    },
] as const;

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* Hero */}
            <section
                className="w-full flex flex-col items-center justify-center text-center gap-4 py-16 md:py-24 px-4 bg-neutral-200"
            >
                <h1 className="text-3xl md:text-5xl font-bold text-neutral-content leading-tight">
                    Quality Members, <br/>Quality Server
                </h1>
                <p className="text-base md:text-lg max-w-xl text-neutral-content/80">
                    Grimwald SMP, a Whitelist-only server that focuses on quality members over the quantity of members.
                    Apply now to experience our welcoming community of passionate players!
                </p>
                <div className="flex gap-3 mt-4">
                    <a href="/about" className="btn btn-dash btn-secondary">Learn More</a>
                    <a href="/apply" className="btn btn-primary">Apply Now</a>
                </div>
            </section>

            {/* Features */}
            <section id="features"
                     className="w-full flex flex-col items-center justify-center text-center gap-4 py-16 md:py-20 px-4">
                <h2 className="text-2xl md:text-3xl text-neutral-content font-semibold">What makes us different?</h2>
                <div className="w-full max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-8 md:pt-10">
                    {features.map((feature) => (
                        <div key={feature.title}
                             className="card card-border border-neutral border-2 bg-base-200 shadow-sm">
                            <figure>
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    width={360}
                                    height={240}
                                    loading="lazy"
                                    className="object-cover w-full aspect-video"
                                />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title text-lg">{feature.title}</h3>
                                <p className="text-left text-sm text-base-content/80">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Counters */}
            <section
                className="w-full flex flex-col bg-base-200 items-center justify-center text-center gap-4 py-16 md:py-20 px-4">
                <h2 className="text-2xl md:text-3xl text-neutral-content font-semibold">Current Season</h2>
                <div className="max-w-xl space-y-3 text-base-content/80">
                    <p>Grimwald SMP has been around since 2020, starting off as a group of friends with more people joining throughout the years.</p>
                    <p>We are currently on <span className="font-semibold text-primary">Season 22</span>! We are expecting this season to go for about a year - like the previous season 21.</p>
                </div>

                <div className="pt-6 flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-lg md:text-xl text-neutral-50 font-semibold uppercase tracking-wide">Season Age</h3>
                        <CountUp startEpoch={1772380800}/>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-lg md:text-xl text-neutral-50 font-semibold uppercase tracking-wide">Server Age</h3>
                        <CountUp startEpoch={1600095600}/>
                    </div>
                </div>
            </section>
        </div>
    );
}
