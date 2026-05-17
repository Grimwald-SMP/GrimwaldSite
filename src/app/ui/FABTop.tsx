"use client"

import {ArrowUpFromDot} from "lucide-react";

export default function FABTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-4 right-24 m-4 z-40">
            <button
                type="button"
                className="btn btn-lg btn-circle btn-secondary shadow-lg"
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <ArrowUpFromDot/>
            </button>
        </div>
    )
}