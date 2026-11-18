"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * "Book a Strategy Call" button. Uses the booking link saved in the admin Integrations page;
 * until one is saved (or while it loads) it goes to the contact page.
 */
export default function StrategyCallLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/tracking-config")
      .then((r) => r.json())
      .then((c) => {
        if (alive && typeof c?.strategyCallUrl === "string" && /^https:\/\//.test(c.strategyCallUrl)) setUrl(c.strategyCallUrl);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href="/contact" className={className}>
      {children}
    </Link>
  );
}
