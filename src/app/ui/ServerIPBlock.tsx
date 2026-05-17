"use client"

import React, { useState } from "react";
import { Clipboard, Check } from "lucide-react";

export default function ServerIPBlock() {
    const [copied, setCopied] = useState(false);
    const serverIP = "mc.grimwald.xyz";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(serverIP);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="flex items-center gap-1 bg-neutral-200 rounded-lg pl-2 py-2 font-mono text-sm shadow-sm">
            <code>{serverIP}</code>
            <button
                onClick={handleCopy}
                className="btn btn-xs btn-ghost"
                aria-label="Copy server IP"
            >
                {copied ? <Check size={16} /> : <Clipboard size={16} />}
            </button>
        </div>
    );
}
