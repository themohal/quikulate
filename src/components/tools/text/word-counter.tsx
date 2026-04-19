"use client";

import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = (() => {
    const trimmed = text.trim();
    const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences =
      trimmed === "" ? 0 : (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0);
    const paragraphs =
      trimmed === ""
        ? 0
        : trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 130);

    return {
      Words: words,
      "Characters (with spaces)": charsWithSpaces,
      "Characters (no spaces)": charsNoSpaces,
      Sentences: sentences,
      Paragraphs: paragraphs,
      "Reading Time": `${readingTime} min`,
      "Speaking Time": `${speakingTime} min`,
    };
  })();

  const handleClear = () => setText("");

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter or paste your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none resize-y min-h-[150px]"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
        >
          Copy
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(stats).map(([label, value]) => (
          <div
            key={label}
            className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
