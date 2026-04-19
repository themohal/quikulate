"use client";
import { useState, useEffect } from "react";

const commonZones = [
  "UTC","America/New_York","America/Chicago","America/Denver","America/Los_Angeles",
  "Europe/London","Europe/Paris","Europe/Berlin","Asia/Karachi","Asia/Kolkata",
  "Asia/Tokyo","Asia/Shanghai","Asia/Dubai","Australia/Sydney","Pacific/Auckland",
];

function getTimezones(): string[] {
  try {
    return Intl.supportedValuesOf("timeZone");
  } catch {
    return commonZones;
  }
}

export default function TimezoneConverter() {
  const [zones] = useState(getTimezones);
  const [fromZone, setFromZone] = useState("Asia/Karachi");
  const [toZone, setToZone] = useState("America/New_York");
  const [dateTime, setDateTime] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  function formatInZone(date: Date, zone: string) {
    try {
      return date.toLocaleString("en-US", { timeZone: zone, hour12: true, weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    } catch {
      return "Invalid timezone";
    }
  }

  function getOffsetDiff() {
    try {
      const d = new Date();
      const f1 = new Intl.DateTimeFormat("en", { timeZone: fromZone, timeZoneName: "shortOffset" });
      const f2 = new Intl.DateTimeFormat("en", { timeZone: toZone, timeZoneName: "shortOffset" });
      const o1 = f1.formatToParts(d).find((p) => p.type === "timeZoneName")?.value || "";
      const o2 = f2.formatToParts(d).find((p) => p.type === "timeZoneName")?.value || "";
      return `${o1} / ${o2}`;
    } catch { return ""; }
  }

  let convertedTime = "";
  if (dateTime) {
    try {
      const inputDate = new Date(dateTime);
      convertedTime = formatInZone(inputDate, toZone);
    } catch { convertedTime = "Invalid date"; }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">{fromZone}</p>
          <p className="text-white font-mono text-sm">{formatInZone(now, fromZone)}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">{toZone}</p>
          <p className="text-white font-mono text-sm">{formatInZone(now, toZone)}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">{getOffsetDiff()}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">From Timezone</label>
          <select value={fromZone} onChange={(e) => setFromZone(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none">
            {zones.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">To Timezone</label>
          <select value={toZone} onChange={(e) => setToZone(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none">
            {zones.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Convert Specific Time (optional)</label>
        <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none" />
      </div>

      {convertedTime && (
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Converted to {toZone}</p>
          <p className="text-xl font-bold text-orange-400">{convertedTime}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {commonZones.slice(0, 8).map((z) => (
          <button key={z} onClick={() => setFromZone(z)}
            className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400 hover:text-orange-400 hover:border-orange-500/50 transition-colors">
            {z.split("/").pop()?.replace("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
