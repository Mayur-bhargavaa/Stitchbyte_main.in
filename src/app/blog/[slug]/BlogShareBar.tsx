"use client";

import { useState } from "react";
import { Link as LinkIcon, Check, MessageSquare, Twitter, Linkedin, Share2 } from "lucide-react";

interface BlogShareBarProps {
  title: string;
  slug: string;
}

export default function BlogShareBar({ title, slug }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://stitchbyte.in/blog/${slug}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const shareNative = async () => {
    const url = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      copyToClipboard();
    }
  };

  const encodedUrl = encodeURIComponent(getShareUrl());
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all shadow-xs"
        title="Copy Link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span className="text-green-600 font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5 text-gray-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 transition-all shadow-xs"
        title="Share on WhatsApp"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
        <span>WhatsApp</span>
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all shadow-xs"
        title="Share on X (Twitter)"
      >
        <Twitter className="w-3.5 h-3.5 text-gray-700" />
        <span>X / Twitter</span>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-800 transition-all shadow-xs"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5 text-blue-600" />
        <span>LinkedIn</span>
      </a>

      <button
        onClick={shareNative}
        className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors sm:hidden"
        title="Share"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}
