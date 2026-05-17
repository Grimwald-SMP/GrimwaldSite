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
        <div className="inline-flex items-center gap-1 bg-base-300 border border-neutral rounded-lg pl-3 pr-1 py-1.5 font-mono text-sm shadow-sm">
            <code className="text-base-content">{serverIP}</code>
            <button
                onClick={handleCopy}
                className="btn btn-xs btn-ghost"
                aria-label={copied ? "Server IP copied" : "Copy server IP"}
            >
                {copied ? <Check size={16} className="text-success" /> : <Clipboard size={16} />}
            </button>
        </div>
    );
}
