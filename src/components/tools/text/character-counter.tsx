"use client";

import { useState } from "react";

interface PlatformLimit {
  name: string;
  limit: number;
}

const PLATFORM_LIMITS: PlatformLimit[] = [
  { name: "Twitter/X", limit: 280 },
  { name: "Instagram Bio", limit: 150 },
  { name: "Meta Description", limit: 160 },
  { name: "LinkedIn Post", limit: 3000 },
  { name: "YouTube Title", limit: 100 },
];

function getBarColor(current: number, limit: number): string {
  const ratio = current / limit;
  if (ratio >= 1) return "bg-red-500";
  if (ratio >= 0.8) return "bg-yellow-500";
  return "bg-green-500";
}

export default function CharacterCounter() {
  const [text, setText] = useState("");

  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lines = text === "" ? 0 : text.split(/\n/).length;

  const statItems = [
    { label: "Characters", value: chars },
    { label: "Characters (no spaces)", value: charsNoSpaces },
    { label: "Words", value: words },
    { label: "Lines", value: lines },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter or paste your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none resize-y min-h-[150px]"
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-500">
          {chars} characters
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">{item.value}</div>
            <div className="text-sm text-gray-400 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-white font-semibold mb-4">Platform Limits</h3>
        <div className="space-y-4">
          {PLATFORM_LIMITS.map((platform) => {
            const percentage = Math.min((chars / platform.limit) * 100, 100);
            const exceeded = chars > platform.limit;
            const barColor = getBarColor(chars, platform.limit);

            return (
              <div key={platform.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{platform.name}</span>
                  <span
                    className={exceeded ? "text-red-400 font-medium" : "text-gray-400"}
                  >
                    {chars} / {platform.limit}
                    {exceeded && ` (+${chars - platform.limit})`}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
