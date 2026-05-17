import React from 'react';
import {BookMarked, FileUser, Plus, X, Map, House} from "lucide-react";
import Link from "next/link";

export default function FABSpeedDial() {
    return (
        <div className="fab m-4">
            <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary"><Plus/></div>

            <div className="fab-close">
                Close <span className="btn btn-circle btn-dash btn-lg btn-base-100"><X /></span>
            </div>

            <Link href="/"><span className="bg-base-200/80 rounded-lg p-1">Home</span> <button className="btn btn-lg btn-circle btn-neutral"><House /></button></Link>
            <Link href="/map"><span className="bg-base-200/80 rounded-lg p-1">Map</span> <button className="btn btn-lg btn-circle btn-secondary"><Map /></button></Link>
            <Link href="/apply"><span className="bg-base-200/80 rounded-lg p-1">Apply</span> <button className="btn btn-lg btn-circle btn-primary"><FileUser /></button></Link>
            <Link href="/rules"><span className="bg-base-200/80 rounded-lg p-1">Rules</span> <button className="btn btn-lg btn-circle btn-success"><BookMarked /></button></Link>
        </div>
    )
}