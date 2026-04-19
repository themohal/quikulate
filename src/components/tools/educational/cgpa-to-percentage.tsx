"use client";
import { useState } from "react";

const scales = [
  { key: "4.0", label: "4.0 Scale (x25)", multiplier: 25, max: 4.0 },
  { key: "10.0", label: "10.0 Scale (x9.5)", multiplier: 9.5, max: 10.0 },
  { key: "5.0", label: "5.0 Scale (x20)", multiplier: 20, max: 5.0 },
];

export default function CgpaToPercentage() {
  const [mode, setMode] = useState<"cgpa" | "pct">("cgpa");
  const [value, setValue] = useState("");
  const [scale, setScale] = useState("4.0");

  const s = scales.find((x) => x.key === scale)!;
  const num = parseFloat(value) || 0;
  const result = mode === "cgpa" ? num * s.multiplier : num / s.multiplier;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["cgpa", "pct"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setValue(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300 border border-gray-700"
            }`}
          >
            {m === "cgpa" ? "CGPA to %" : "% to CGPA"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            {mode === "cgpa" ? "CGPA" : "Percentage (%)"}
          </label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={mode === "cgpa" ? `0 - ${s.max}` : "0 - 100"}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Grading Scale</label>
          <select
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
          >
            {scales.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {num > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">
            {mode === "cgpa" ? "Percentage" : "CGPA"}
          </p>
          <p className="text-3xl font-bold text-orange-400">
            {result.toFixed(2)}{mode === "cgpa" ? "%" : ""}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Formula: {mode === "cgpa"
              ? `${num} x ${s.multiplier} = ${result.toFixed(2)}%`
              : `${num} / ${s.multiplier} = ${result.toFixed(2)}`}
          </p>
        </div>
      )}

      <div className="bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-white font-medium mb-3 text-sm">Reference Table ({s.key} Scale)</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <span className="text-gray-400 font-medium">CGPA</span>
          <span className="text-gray-400 font-medium">Percentage</span>
          <span className="text-gray-400 font-medium">Grade</span>
          {[
            [s.max, "A+"], [s.max * 0.925, "A"], [s.max * 0.85, "A-"],
            [s.max * 0.8, "B+"], [s.max * 0.75, "B"], [s.max * 0.675, "B-"],
            [s.max * 0.6, "C+"], [s.max * 0.5, "C"], [s.max * 0.25, "D"],
          ].map(([cgpa, grade]) => (
            <>
              <span key={`c-${grade}`} className="text-gray-300">{(cgpa as number).toFixed(2)}</span>
              <span key={`p-${grade}`} className="text-gray-300">{((cgpa as number) * s.multiplier).toFixed(1)}%</span>
              <span key={`g-${grade}`} className="text-gray-300">{grade as string}</span>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
