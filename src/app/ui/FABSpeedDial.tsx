import React from 'react';
import {BookMarked, FileUser, Plus, X, Map, House} from "lucide-react";
import Link from "next/link";

const fabLinks = [
    {href: '/', label: 'Home', icon: <House/>, color: 'btn-neutral'},
    {href: '/map', label: 'Map', icon: <Map/>, color: 'btn-secondary'},
    {href: '/apply', label: 'Apply', icon: <FileUser/>, color: 'btn-primary'},
    {href: '/rules', label: 'Rules', icon: <BookMarked/>, color: 'btn-success'},
] as const;

export default function FABSpeedDial() {
    return (
        <div className="fab m-4">
            <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary" aria-label="Open quick navigation">
                <Plus/>
            </div>

            <div className="fab-close">
                <span className="text-sm font-medium">Close</span>
                <button className="btn btn-circle btn-dash btn-lg" aria-label="Close menu"><X/></button>
            </div>

            {fabLinks.map(({href, label, icon, color}) => (
                <Link key={href} href={href} aria-label={`Go to ${label}`}>
                    <span className="bg-base-200/80 rounded-lg px-2 py-1 text-sm font-medium">{label}</span>
                    <span className={`btn btn-lg btn-circle ${color}`}>{icon}</span>
                </Link>
            ))}
        </div>
    )
}
