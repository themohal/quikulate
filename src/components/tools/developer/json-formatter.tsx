"use client";
import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function validate() {
    try {
      JSON.parse(input);
      setError("");
      setOutput("Valid JSON!");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Input JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-orange-500 focus:outline-none resize-y min-h-[150px]"
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={format} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium text-sm transition-colors">Format</button>
        <button onClick={minify} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium text-sm transition-colors">Minify</button>
        <button onClick={validate} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium text-sm transition-colors">Validate</button>
        <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm">
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {output && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-300">Output</label>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-sm text-orange-400 hover:text-orange-300">Copy</button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-green-400 font-mono text-sm min-h-[150px] resize-y focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
