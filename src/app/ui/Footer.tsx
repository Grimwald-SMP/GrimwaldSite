import React from 'react';
import Image from "next/image";
import ServerIPBlock from "@/app/ui/ServerIPBlock";
import Link from "next/link";

export default function Footer() {
    const navLinks = {
        general: [
            {text: 'Home', href: '/'},
            {text: 'About', href: '/about'},
            {text: 'Rules', href: '/rules'},
            {text: 'Apply', href: '/apply'},
            {text: 'Map', href: '/map'},
            {text: 'Worlds', href: '/worlds'},
        ],
        community: [
            {text: 'News', href: '/news'},
            {text: 'Contact', href: '/contact'},
            {text: 'Donate', href: '/donate'},
            {text: 'Gallery', href: '/gallery'},
            {text: 'Timeline', href: '/timeline'},
        ],
    }

    return (
        <div className="bg-base-300 px-6 md:px-12 lg:px-20 py-10">
            <footer className="footer sm:footer-horizontal gap-10 md:gap-16 max-w-7xl mx-auto">
                <aside>
                    <Image src="/Grimwald.png" alt="Grimwald Logo" height={100} width={100}/>
                    <p className="font-semibold text-neutral-content">Grimwald SMP</p>
                    <ServerIPBlock />
                </aside>
                {Object.entries(navLinks).map(([section, links]) => (
                    <nav key={section}>
                        <h6 className="footer-title">{section.charAt(0).toUpperCase() + section.slice(1)}</h6>
                        {links.map(link => (
                            <Link key={link.href} href={link.href} className="link link-hover">
                                {link.text}
                            </Link>
                        ))}
                    </nav>
                ))}
            </footer>
            <aside className="flex justify-center footer pt-8 text-base-content/60 text-sm">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>
        </div>
    )
}