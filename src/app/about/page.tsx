"use client"

import Image from "next/image";

export default function page() {
    const staff = [
        {
            name: 'Roc',
            ign: 'ThisIsRoc',
            role: 'Owner',
            roleColor: "#8f41bf",
            title: 'Server Administrator',
            description: "Manages the technical aspects of the server such as creating Discord bots, plugins, and the website.",
            image: '/staff/roc.png',
        },
        {
            name: 'Bri',
            ign: 'Briyella',
            role: 'Owner',
            roleColor: "#8f41bf",
            title: 'Community Manager',
            description: 'Manages the community by creating events, running polls, and recruiting new members.',
            image: '/staff/bri.png'
        },
        {
            name: 'Benny',
            ign: 'Bennyboy12306',
            role: 'Founder',
            roleColor: "#bf41b9",
            title: 'Grimwald',
            description: 'Founder of the Grimwald SMP and owner for 5 years. Passed ownership to Roc and Bri early 2025. Also assists in various technical aspects of the server.',
            image: '/staff/benny.png'
        },
        {
            name: 'Ewens',
            ign: 'MrslimesmasherYT',
            role: 'Staff',
            roleColor: "#d68528",
            title: 'MC & Discord',
            description: 'Helps with moderation on both the Discord and Minecraft servers. Handling whitelisting and making sure things run smoothly.',
            image: '/staff/ewens.png'
        },
        {
            name: 'Viper',
            ign: 'VirginMegastore',
            role: 'Staff',
            roleColor: "#d68528",
            title: 'MC & Discord',
            description: 'Helps with moderation on both the Discord and Minecraft servers. Handling whitelisting and making sure things run smoothly.',
            image: '/staff/viper.png'
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center">
            <section id="about"
                     className="w-full flex flex-col bg-neutral-200 items-center justify-center text-center gap-4 py-15">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-content">About the Grimwald SMP</h1>
                <p className="max-w-xl px-4">Grimwald SMP is a close-knit Minecraft community dedicated to providing a
                    chill and laid-back atmosphere for players of all backgrounds.</p>
                <p className="max-w-lg px-4">We primarily focus on Vanilla gameplay with small quality of life
                    enhancements voted on by the community (we also run modded seasons every four seasons to change
                    things up a bit)</p>
                <p className="max-w-xl px-4">We uphold a strict no pay-to-win policy, and operate as a democracy
                    allowing players to vote on all major decisions, ensuring a fair experience for all and fostering an
                    environment where everyone has the chance to have their opinions heard.</p>
                <div className="flex gap-4 mt-2">
                    <a href="/timeline" className="btn btn-dash btn-secondary">Timeline</a>
                    <a href="/apply" className="btn btn-primary">Apply Now</a>
                </div>
            </section>

            <section id="staff"
                     className="w-full flex flex-col bg-base-100 items-center justify-center text-center gap-4 py-15">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-content">Friendly Staff</h1>
                <p className="max-w-lg px-4">
                    Staff members of the Grimwald SMP are helpful members of the community who are willing to help out
                    and provide support however they can.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-10 px-4 max-w-7xl">
                    {staff.map((staffMember, index) => (
                        <div key={index}
                             className="card card-border border-neutral-200 border-3 bg-base-200 w-full shadow-sm">
                            <figure className="pt-5"><Image src={staffMember.image} alt={staffMember.name} width={150}
                                                            height={250}/></figure>
                            <div className="card-body text-left items-start">
                                <h2 className="card-title flex-wrap">{staffMember.name} <span
                                    className="text-neutral-content text-sm font-normal">({staffMember.ign})</span></h2>
                                <p className="text-neutral-content"><span
                                    style={{color: staffMember.roleColor}}>{staffMember.role}</span> - {staffMember.title}
                                </p>
                                <p className="text-sm">{staffMember.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}