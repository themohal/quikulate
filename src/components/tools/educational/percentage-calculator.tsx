"use client";
import { useState } from "react";

type Mode = "of" | "is" | "change";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("of");
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const xVal = parseFloat(x) || 0;
  const yVal = parseFloat(y) || 0;

  let result = 0;
  let formula = "";

  if (mode === "of" && xVal && yVal) {
    result = (xVal / 100) * yVal;
    formula = `${xVal}% of ${yVal} = ${result.toFixed(4)}`;
  } else if (mode === "is" && xVal && yVal) {
    result = (xVal / yVal) * 100;
    formula = `${xVal} / ${yVal} x 100 = ${result.toFixed(4)}%`;
  } else if (mode === "change" && yVal) {
    result = xVal !== 0 ? ((yVal - xVal) / Math.abs(xVal)) * 100 : 0;
    formula = `((${yVal} - ${xVal}) / |${xVal}|) x 100 = ${result.toFixed(4)}%`;
  }

  const tabs: { key: Mode; label: string }[] = [
    { key: "of", label: "X% of Y" },
    { key: "is", label: "X is ?% of Y" },
    { key: "change", label: "% Change" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setMode(t.key); setX(""); setY(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === t.key ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300 border border-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            {mode === "of" ? "Percentage (%)" : mode === "is" ? "Value (X)" : "From Value"}
          </label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            {mode === "of" ? "Number (Y)" : mode === "is" ? "Total (Y)" : "To Value"}
          </label>
          <input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {(xVal || yVal) && (
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Result</p>
          <p className="text-3xl font-bold text-orange-400">
            {mode === "of" ? result.toFixed(4) : `${result.toFixed(4)}%`}
          </p>
          {formula && <p className="text-xs text-gray-500 mt-2">{formula}</p>}
          {mode === "change" && (
            <p className={`text-sm mt-1 ${result > 0 ? "text-green-400" : result < 0 ? "text-red-400" : "text-gray-400"}`}>
              {result > 0 ? "Increase" : result < 0 ? "Decrease" : "No change"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
