"use client";
import { useState } from "react";

const bases = [
  { key: 2, label: "Binary (2)" }, { key: 8, label: "Octal (8)" },
  { key: 10, label: "Decimal (10)" }, { key: 16, label: "Hexadecimal (16)" },
];

export default function NumberBaseConverter() {
  const [input, setInput] = useState("");
  const [base, setBase] = useState(10);

  let decimal = 0;
  let valid = true;
  try {
    if (input.trim()) {
      decimal = parseInt(input, base);
      if (isNaN(decimal)) valid = false;
    }
  } catch { valid = false; }

  const results = valid && input.trim() ? [
    { label: "Binary (2)", value: decimal.toString(2) },
    { label: "Octal (8)", value: decimal.toString(8) },
    { label: "Decimal (10)", value: decimal.toString(10) },
    { label: "Hexadecimal (16)", value: decimal.toString(16).toUpperCase() },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Number</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={base === 16 ? "e.g. FF" : base === 2 ? "e.g. 1010" : "e.g. 42"}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Input Base</label>
          <div className="flex gap-2">
            {bases.map((b) => (
              <button key={b.key} onClick={() => { setBase(b.key); setInput(""); }}
                className={`flex-1 px-2 py-3 rounded-lg text-sm font-medium transition-colors ${
                  base === b.key ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300 border border-gray-700"
                }`}>
                {b.key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!valid && input.trim() && <p className="text-red-400 text-sm">Invalid number for base {base}</p>}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.label} className="bg-gray-800/50 rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">{r.label}</p>
                <p className="text-white font-mono text-sm">{r.value}</p>
              </div>
              <button onClick={() => navigator.clipboard.writeText(r.value)} className="text-xs text-orange-400 hover:text-orange-300">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
