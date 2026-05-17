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
        <div>
            <div className="fixed bottom-4 right-20 m-4 z-50">
                <div 
                    tabIndex={0} 
                    role="button" 
                    className="btn btn-lg btn-circle btn-secondary"
                    onClick={scrollToTop}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            scrollToTop();
                        }
                    }}
                >
                    <a><ArrowUpFromDot /></a>
                </div>
            </div>
        </div>
    )
}