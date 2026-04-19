"use client";
import { useState, useEffect } from "react";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const tsNum = parseInt(timestamp) || 0;
  const tsDate = tsNum > 0 ? new Date(tsNum * 1000) : null;

  const dateTs = dateInput ? Math.floor(new Date(dateInput).getTime() / 1000) : 0;

  const relative = tsDate ? (() => {
    const diff = Math.floor((Date.now() - tsDate.getTime()) / 1000);
    if (diff < 0) return `in ${Math.abs(diff)}s`;
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  })() : "";

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
        <p className="text-xs text-gray-400 mb-1">Current Unix Timestamp</p>
        <p className="text-2xl font-bold text-orange-400 font-mono">{now}</p>
        <button onClick={() => navigator.clipboard.writeText(String(now))} className="text-xs text-gray-400 hover:text-orange-300 mt-1">Copy</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-white font-medium">Timestamp to Date</h3>
          <input
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="e.g. 1714000000"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-orange-500 focus:outline-none"
          />
          {tsDate && !isNaN(tsDate.getTime()) && (
            <div className="bg-gray-800/50 rounded-lg p-3 space-y-2 text-sm">
              {[
                { label: "ISO 8601", value: tsDate.toISOString() },
                { label: "Local", value: tsDate.toLocaleString() },
                { label: "UTC", value: tsDate.toUTCString() },
                { label: "Relative", value: relative },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-gray-400 text-xs">{item.label}</span>
                  <span className="text-white font-mono text-xs">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-medium">Date to Timestamp</h3>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none"
          />
          {dateTs > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Seconds</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-mono text-xs">{dateTs}</span>
                  <button onClick={() => navigator.clipboard.writeText(String(dateTs))} className="text-xs text-orange-400">Copy</button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Milliseconds</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-mono text-xs">{dateTs * 1000}</span>
                  <button onClick={() => navigator.clipboard.writeText(String(dateTs * 1000))} className="text-xs text-orange-400">Copy</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
