"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon } from "lucide-react";

interface BlogClientActionsProps {
    title: string;
    iconOnly?: boolean;
}

export default function BlogClientActions({ title, iconOnly = false }: BlogClientActionsProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch {
                // user dismissed share sheet
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (iconOnly) {
        return (
            <button
                onClick={handleShare}
                className="flex items-center gap-2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 justify-center transition-colors"
                aria-label="Share"
            >
                {copied ? <LinkIcon className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4 text-gray-600" />}
            </button>
        );
    }

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
        >
            {copied ? <LinkIcon className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4 text-gray-600" />}
            <span className="text-sm font-medium text-gray-700">{copied ? "Copied!" : "Share"}</span>
        </button>
    );
}
