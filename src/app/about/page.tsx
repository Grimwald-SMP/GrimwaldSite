"use client"

export default function page() {
    const staff = [
        {
            name: 'Jaden',
            ign: 'ThisIsRoc',
            role: 'Owner',
            roleColor: "#8f41bf",
            title: 'Server Administrator',
            description: "Manages the server as well as creating Discord bots, plugins, and this website.",
            image: 'https://s.namemc.com/3d/skin/body.png?id=c6e6f83edc631d7e&model=classic&theta=30&phi=21&time=90&width=150&height=250',
            socials: [
                {icon: 'protonmail', href: 'mailto:jadenlabs@proton.me'},
                {icon: 'github', href: 'https://github.com/JadenLabs'},
                {icon: 'discord', value: 'roc.py', copyable: true},
            ]
        },
        {
            name: 'Bri',
            ign: 'Briyella',
            role: 'Owner',
            roleColor: "#8f41bf",
            title: 'Community Manager',
            description: 'Manages the community by creating events, running polls, and recruiting new members.',
            image: 'https://s.namemc.com/3d/skin/body.png?id=ae8543a65415ac30&model=slim&theta=30&phi=21&time=90&width=150&height=250'
        },
        {
            name: 'Benny',
            ign: 'Bennyboy12306',
            role: 'Founder',
            roleColor: "#bf41b9",
            title: 'Grimwald',
            description: 'Founder of the Grimwald SMP and owner for 5 years. Passed ownership to Jaden and Bri early 2025. Also assists in various technical aspects of the server.',
            image: 'https://s.namemc.com/3d/skin/body.png?id=db91cd39e27a966f&model=classic&theta=30&phi=21&time=90&width=150&height=250'
        },
        {
            name: 'Ewens',
            ign: 'MrslimesmasherYT',
            role: 'Moderator',
            roleColor: "#d68528",
            title: 'Discord',
            description: 'Makes sure things run smoothly on the Discord server and helps with moderation.',
            image: 'https://s.namemc.com/3d/skin/body.png?id=2b4e8160ee593570&model=classic&theta=30&phi=21&time=90&width=150&height=250'
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center">
            <section id="about"
                     className="w-full flex flex-col bg-neutral-200 items-center justify-center text-center gap-4 py-15">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-content">About the Grimwald SMP</h1>
                <p className="max-w-lg px-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
                    laboriosam
                    laudantium odio
                    quaerat rerum sit tempora. Asperiores aspernatur assumenda cum deserunt dicta fugit id molestias
                    nesciunt nulla perspiciatis quibusdam, reprehenderit.</p>
                <p className="max-w-lg">... Lots of server history ...</p>
                <div className="flex gap-4 mt-2">
                    <a href="/timeline" className="btn btn-dash btn-secondary">Timeline</a>
                    <a href="/apply" className="btn btn-primary">Apply Now</a>
                </div>
            </section>

            <section id="staff"
                     className="w-full flex flex-col bg-base-100 items-center justify-center text-center gap-4 py-15">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-content">Friendly Staff</h1>
                <p className="max-w-lg px-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
                    ducimus ex
                    illum neque nulla
                    obcaecati quae ratione rerum temporibus veritatis? Error exercitationem impedit perspiciatis
                    provident quasi quibusdam sit ut vel?</p>

                <div className="flex flex-col md:flex-row gap-4 pt-10 items-start">
                    {staff.map((staffMember, index) => (
                        <div key={index}
                             className="card card-border border-neutral-200 border-3 bg-base-200 w-70 md:w-80 shadow-sm">
                            <figure className="pt-3"><img src={staffMember.image} alt={staffMember.name}/></figure>
                            <div className="card-body text-left items-start">
                                <h2 className="card-title">{staffMember.name} <span
                                    className="text-neutral-content">({staffMember.ign})</span></h2>
                                <p className="text-neutral-content"><span
                                    style={{color: staffMember.roleColor}}>{staffMember.role}</span> - {staffMember.title}
                                </p>
                                <p>{staffMember.description}</p>
                                {staffMember.socials && (
                                    <div className="card-actions justify-start gap-2 mt-2">
                                        {staffMember.socials.map((social, idx) => (
                                            social.href ? (
                                                <a key={idx} href={social.href}
                                                   className="btn btn-sm btn-square btn-outline">
                                                    <img src={`https://cdn.simpleicons.org/${social.icon}/white`}
                                                         alt={social.icon} className="w-4 h-4"/>
                                                </a>
                                            ) : social.copyable ? (
                                                <button key={idx} className="btn btn-sm btn-square btn-dash"
                                                        onClick={() => navigator.clipboard.writeText(social.value)}>
                                                    <img src={`https://cdn.simpleicons.org/${social.icon}/white`}
                                                         alt={social.icon} className="w-4 h-4"/>
                                                </button>
                                            ) : null
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}