import React from 'react';
import Image from "next/image";
import ServerIPBlock from "@/app/ui/ServerIPBlock";
import {TextAlignEnd} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const navLinks = [
        {text: 'Home', href: '/'},
        {text: 'About', href: '/about'},
        {text: 'Rules', href: '/rules'},
        {text: 'Timeline', href: '/timeline'},
    ]

    const navButtons = [
        {text: 'World Map', href: '/map', className: 'btn btn-soft btn-secondary'},
        {text: 'Apply Now', href: '/apply', className: 'btn btn-primary'},
    ]

    const allLinks = navLinks.concat(navButtons);


    return (
        <div className="navbar bg-base-200 relative p-4">
            <div className="navbar-start">
                <ul className="menu menu-lg lg:menu-horizontal space-x-2 hidden lg:flex">
                    {navLinks.map((button, index) => (
                        <li key={index}><Link href={button.href}
                                              className="btn btn-ghost btn-neutral">{button.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="navbar-center">
                <Link href="/">
                    {/* Mobile logo */}
                    <Image
                        src="/GrimwaldSMPFull.png"
                        alt="Grimwald SMP Logo"
                        width={210}
                        height={60}
                        className="block lg:hidden mx-auto"
                        priority
                    />

                    {/* Desktop logo */}
                    <Image
                        src="/GrimwaldSMPFull.png"
                        alt="Grimwald SMP Logo"
                        width={280}
                        height={80}
                        className="hidden lg:block mx-auto"
                        priority
                    />
                </Link>
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <TextAlignEnd/>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-md dropdown-content text-left mt-3 p-2 shadow bg-base-200/98 w-45 rounded-lg border-2 border-neutral"
                    >
                        {allLinks.map((button, index) => (
                            <li key={index}>
                                <Link href={button.href} className={`btn btn-ghost btn-neutral`}>{button.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <ul className="menu menu-lg lg:menu-horizontal space-x-2 hidden lg:flex">
                    <ServerIPBlock/>
                    {navButtons.map((button, index) => (
                        <li key={index}><Link href={button.href} className={button.className}>{button.text}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}