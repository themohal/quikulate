"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot?: string;
  format?: string;
  className?: string;
}

export default function AdUnit({ slot, format = "auto", className = "" }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  useEffect(() => {
    if (pubId && adRef.current) {
      try {
        ((window as unknown as Record<string, unknown[]>).adsbygoogle =
          (window as unknown as Record<string, unknown[]>).adsbygoogle || []).push({});
      } catch {
        // AdSense not loaded or blocked
      }
    }
  }, [pubId]);

  if (!pubId) {
    return (
      <div
        className={`w-full border border-dashed border-gray-700 rounded-lg flex items-center justify-center py-8 text-gray-500 text-sm ${className}`}
      >
        Advertisement
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={pubId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
