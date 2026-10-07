"use client";

import { useEffect, useState } from "react";
import { ListFilter, ChevronRight, ChevronDown } from "lucide-react";
import { HeadingItem } from "@/lib/markdown";

interface BlogTableOfContentsProps {
  headings: HeadingItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export default function BlogTableOfContents({
  headings,
  collapsible = false,
  defaultOpen = false,
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(!collapsible || defaultOpen);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-90px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      {collapsible ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between text-left transition-colors ${
            isOpen ? "pb-4 mb-4 border-b border-gray-100" : ""
          }`}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ListFilter className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-gray-900 uppercase">
                Table of Contents
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {headings.length}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ListFilter className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold tracking-tight text-gray-900 uppercase">
            Table of Contents
          </h4>
        </div>
      )}

      {isOpen && (
        <nav aria-label="Table of contents" className="max-h-[60vh] overflow-y-auto pr-1 space-y-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const isNested = heading.level > 2;

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`group flex items-start gap-2 py-1.5 px-2.5 rounded-xl text-xs sm:text-sm transition-all ${
                  isNested ? "ml-4" : ""
                } ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-normal"
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 transition-transform ${
                    isActive
                      ? "text-indigo-600 translate-x-0.5"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                <span className="line-clamp-2 leading-snug">{heading.text}</span>
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}
