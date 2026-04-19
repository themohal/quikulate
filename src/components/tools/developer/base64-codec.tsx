"use client";
import { useState } from "react";

export default function Base64Codec() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function process() {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
    } catch {
      setError(mode === "encode" ? "Failed to encode" : "Invalid Base64 input");
      setOutput("");
    }
  }

  const inputBytes = new TextEncoder().encode(input).length;
  const outputBytes = new TextEncoder().encode(output).length;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(""); setOutput(""); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300 border border-gray-700"
            }`}
          >
            {m === "encode" ? "Encode" : "Decode"}
          </button>
        ))}
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <label className="text-sm text-gray-300">{mode === "encode" ? "Text Input" : "Base64 Input"}</label>
          <span className="text-xs text-gray-500">{inputBytes} bytes</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-orange-500 focus:outline-none resize-y min-h-[120px]"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={process} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium text-sm transition-colors">
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
        <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors">Clear</button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {output && (
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm text-gray-300">{mode === "encode" ? "Base64 Output" : "Text Output"}</label>
            <div className="flex gap-3 text-xs">
              <span className="text-gray-500">{outputBytes} bytes</span>
              <button onClick={() => navigator.clipboard.writeText(output)} className="text-orange-400 hover:text-orange-300">Copy</button>
            </div>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-green-400 font-mono text-sm min-h-[120px] resize-y focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
