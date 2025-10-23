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
                className="w-full flex flex-col mx-fill items-center justify-center text-center gap-4 py-12 md:py-20 bg-neutral-200"
            >
                <h1 className="text-3xl md:text-5xl font-bold text-neutral-content">Quality Members, <br/>Quality Server
                </h1>
                <p className="text-md md:text-lg px-4 max-w-sm md:max-w-xl">Grimwald SMP, a Whitelist-only server that
                    focuses on quality members over the quantity of members. Apply now to experience our welcoming
                    community of passionate players!</p>
                <div className="flex gap-4 mt-2">
                    <a href="/about" className="btn btn-dash btn-secondary">Learn More</a>
                    <a href="/apply" className="btn btn-primary">Apply Now</a>
                </div>
            </section>

            {/* Features */}
            <section id="features"
                     className="flex flex-col items-center justify-center text-center gap-4 py-10 md:py-14">
                <h1 className="text-3xl md:text-4xl text-neutral-content font-semibold">What makes us different?</h1>
                <div className="max-w-6xl px-4 grid grid-cols-1 gap-8 md:grid-cols-2 py-8 md:py-10">
                    {features.map((feature) => (
                        <div key={feature.title}
                             className="card card-border border-neutral-200 border-3 bg-base-200 w-80 md:w-90 shadow-sm">
                            <figure>
                                <Image 
                                    src={feature.image} 
                                    alt={feature.title}
                                    width={360}
                                    height={240}
                                    loading="lazy"
                                    className="object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{feature.title}</h2>
                                <p className="text-left">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Counters */}
            <section
                className="w-full flex flex-col bg-base-200 items-center justify-center text-center gap-4 py-10 md:py-14">
                <h1 className="text-3xl md:text-4xl text-neutral-content font-semibold">Current Season</h1>
                <div className="px-4">
                    <p className="max-w-sm pb-4">Grimwald SMP has been around since 2020, starting off as a group of friends with more people joining throughout the years.</p>
                    <p className="max-w-sm">We are currently on <span
                        className="font-semibold text-neutral-50">Season 21</span> with this being our longest season
                        yet.
                        We are experimenting with the idea of longer seasons to give members the opportunity to work on
                        larger projects.</p>
                </div>

                <div className="pt-5 flex flex-col items-center justify-center space-y-4">
                    <h3 className="text-2xl text-neutral-50 font-semibold">Season Age</h3>
                    <CountUp startEpoch={1738944720}/>
                    <h3 className="text-2xl text-neutral-50 font-semibold">Server Age</h3>
                    <CountUp startEpoch={1600095600}/>
                </div>
            </section>
        </div>
    );
}
