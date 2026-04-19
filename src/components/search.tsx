"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { searchTools } from "@/lib/tools-registry";
import type { Tool } from "@/lib/tools-registry";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (value.trim().length > 0) {
        const found = searchTools(value.trim());
        setResults(found);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
          &#128269;
        </span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search tools..."
          className="w-full bg-gray-900 border border-gray-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
          {results.map((tool) => (
            <Link
              key={`${tool.category}-${tool.slug}`}
              href={`/tools/${tool.category}/${tool.slug}`}
              onClick={() => {
                setIsOpen(false);
                setQuery("");
                setResults([]);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0"
            >
              <span className="text-lg shrink-0">{tool.icon}</span>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {tool.name}
                </p>
                <p className="text-gray-500 text-xs truncate">
                  {tool.categoryName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-4 z-50">
          <p className="text-gray-500 text-sm text-center">
            No tools found for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
