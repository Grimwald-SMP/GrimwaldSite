import React from 'react';
import Image from "next/image";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-full bg-neutral-200 py-20">
            <div className="hidden md:block"><Image src="/404.png" width={500} height={217} alt="404" priority></Image></div>
            <div className="block md:hidden"><Image src="/404.png" width={250} height={108} alt="404" priority></Image></div>

            <div className="text-center">
                <h1 className="pt-15 text-2xl md:text-3xl font-bold text-neutral-content">Sorry, this page is unavailable.</h1>
                <p className="pt-5 max-w-sm md:max-w-md">The page you are looking for might have been removed, had its name changed,
                    or is
                    temporarily unavailable.</p>
                <a href="/" className="btn btn-primary btn-lg mt-5">Go home</a>
            </div>
        </div>
    )
}