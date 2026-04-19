"use client";
import { useState } from "react";

export default function TextToSlug() {
  const [text, setText] = useState("");
  const [separator, setSeparator] = useState("-");

  const slug = text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, separator)
    .replace(new RegExp(`[${separator}]+`, "g"), separator)
    .replace(new RegExp(`^${separator === "-" ? "\\-" : separator}|${separator === "-" ? "\\-" : separator}$`, "g"), "");

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Input Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to slug..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Separator</label>
        <div className="flex gap-2">
          {[{ key: "-", label: "Hyphen (-)" }, { key: "_", label: "Underscore (_)" }].map((s) => (
            <button
              key={s.key}
              onClick={() => setSeparator(s.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                separator === s.key ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300 border border-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm text-gray-300">Generated Slug</label>
          <div className="flex gap-3 text-sm">
            <span className="text-gray-500">{slug.length} chars</span>
            {slug && (
              <button onClick={() => navigator.clipboard.writeText(slug)} className="text-orange-400 hover:text-orange-300">
                Copy
              </button>
            )}
          </div>
        </div>
        <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-green-400 font-mono text-sm min-h-[48px]">
          {slug || <span className="text-gray-600">slug-will-appear-here</span>}
        </div>
      </div>
    </div>
  );
}
