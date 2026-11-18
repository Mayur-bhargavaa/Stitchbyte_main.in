"use client";

import { useState } from "react";

// The full text is always in the server HTML; the toggle only changes line clamping.
export default function ExpandableText({ text }: { text: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="mb-8">
            <p className={`text-lg text-gray-600 leading-relaxed ${isExpanded ? "" : "line-clamp-3"}`}>
                {text}
            </p>
            {text.length > 150 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-950 font-semibold hover:underline mt-2 text-sm focus:outline-none cursor-pointer flex items-center gap-1"
                >
                    {isExpanded ? "Read Less" : "... Read More"}
                </button>
            )}
        </div>
    );
}
