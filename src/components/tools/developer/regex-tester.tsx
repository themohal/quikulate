"use client";
import { useState, useMemo } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testStr, setTestStr] = useState("");

  const flagStr = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join("");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: "" };
    try {
      const regex = new RegExp(pattern, flagStr);
      const m: { index: number; text: string; groups: string[] }[] = [];
      let match;
      if (flags.g) {
        while ((match = regex.exec(testStr)) !== null) {
          m.push({ index: match.index, text: match[0], groups: match.slice(1) });
          if (!match[0]) break;
        }
      } else {
        match = regex.exec(testStr);
        if (match) m.push({ index: match.index, text: match[0], groups: match.slice(1) });
      }
      return { matches: m, error: "" };
    } catch (e: unknown) {
      return { matches: [], error: (e as Error).message };
    }
  }, [pattern, flagStr, testStr, flags.g]);

  const highlighted = useMemo(() => {
    if (!pattern || !testStr || matches.length === 0) return null;
    const parts: { text: string; match: boolean }[] = [];
    let last = 0;
    matches.forEach((m) => {
      if (m.index > last) parts.push({ text: testStr.slice(last, m.index), match: false });
      parts.push({ text: m.text, match: true });
      last = m.index + m.text.length;
    });
    if (last < testStr.length) parts.push({ text: testStr.slice(last), match: false });
    return parts;
  }, [pattern, testStr, matches]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Regex Pattern</label>
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="[a-z]+"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div className="flex gap-4 flex-wrap">
        {(["g", "i", "m", "s"] as const).map((f) => (
          <label key={f} className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={flags[f]} onChange={(e) => setFlags({ ...flags, [f]: e.target.checked })} />
            {f} ({f === "g" ? "global" : f === "i" ? "case-insensitive" : f === "m" ? "multiline" : "dotAll"})
          </label>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div>
        <label className="block text-sm text-gray-300 mb-1">Test String</label>
        <textarea
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
          placeholder="Enter text to test against..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-orange-500 focus:outline-none resize-y min-h-[100px]"
        />
      </div>

      {highlighted && (
        <div>
          <label className="block text-sm text-gray-300 mb-1">Matches ({matches.length})</label>
          <div className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm whitespace-pre-wrap break-all">
            {highlighted.map((p, i) =>
              p.match ? (
                <span key={i} className="bg-orange-500/30 text-orange-300 rounded px-0.5">{p.text}</span>
              ) : (
                <span key={i} className="text-gray-300">{p.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-white text-sm font-medium mb-2">Match Details</h3>
          <div className="space-y-1 text-xs">
            {matches.slice(0, 20).map((m, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-gray-500 w-8">#{i + 1}</span>
                <span className="text-gray-400">index: {m.index}</span>
                <span className="text-orange-400 font-mono">&quot;{m.text}&quot;</span>
                {m.groups.length > 0 && <span className="text-gray-500">groups: {m.groups.map((g) => `"${g}"`).join(", ")}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
