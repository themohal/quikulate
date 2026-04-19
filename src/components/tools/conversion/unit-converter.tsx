"use client";
import { useState } from "react";

type UnitGroup = { name: string; units: { key: string; label: string; factor: number }[] };

const groups: UnitGroup[] = [
  { name: "Length", units: [
    { key: "mm", label: "Millimeters", factor: 0.001 }, { key: "cm", label: "Centimeters", factor: 0.01 },
    { key: "m", label: "Meters", factor: 1 }, { key: "km", label: "Kilometers", factor: 1000 },
    { key: "in", label: "Inches", factor: 0.0254 }, { key: "ft", label: "Feet", factor: 0.3048 },
    { key: "yd", label: "Yards", factor: 0.9144 }, { key: "mi", label: "Miles", factor: 1609.344 },
  ]},
  { name: "Weight", units: [
    { key: "mg", label: "Milligrams", factor: 0.000001 }, { key: "g", label: "Grams", factor: 0.001 },
    { key: "kg", label: "Kilograms", factor: 1 }, { key: "lb", label: "Pounds", factor: 0.453592 },
    { key: "oz", label: "Ounces", factor: 0.0283495 }, { key: "ton", label: "Metric Tons", factor: 1000 },
  ]},
  { name: "Temperature", units: [
    { key: "c", label: "Celsius", factor: 0 }, { key: "f", label: "Fahrenheit", factor: 0 }, { key: "k", label: "Kelvin", factor: 0 },
  ]},
  { name: "Volume", units: [
    { key: "ml", label: "Milliliters", factor: 0.001 }, { key: "l", label: "Liters", factor: 1 },
    { key: "gal", label: "US Gallons", factor: 3.78541 }, { key: "cup", label: "Cups", factor: 0.236588 },
    { key: "tbsp", label: "Tablespoons", factor: 0.0147868 }, { key: "tsp", label: "Teaspoons", factor: 0.00492892 },
    { key: "floz", label: "Fluid Ounces", factor: 0.0295735 },
  ]},
  { name: "Area", units: [
    { key: "sqm", label: "Sq Meters", factor: 1 }, { key: "sqkm", label: "Sq Kilometers", factor: 1e6 },
    { key: "sqft", label: "Sq Feet", factor: 0.092903 }, { key: "sqin", label: "Sq Inches", factor: 0.00064516 },
    { key: "acre", label: "Acres", factor: 4046.86 }, { key: "ha", label: "Hectares", factor: 10000 },
  ]},
  { name: "Speed", units: [
    { key: "ms", label: "m/s", factor: 1 }, { key: "kmh", label: "km/h", factor: 0.277778 },
    { key: "mph", label: "mph", factor: 0.44704 }, { key: "kn", label: "Knots", factor: 0.514444 },
  ]},
  { name: "Data", units: [
    { key: "b", label: "Bytes", factor: 1 }, { key: "kb", label: "KB", factor: 1024 },
    { key: "mb", label: "MB", factor: 1048576 }, { key: "gb", label: "GB", factor: 1073741824 },
    { key: "tb", label: "TB", factor: 1099511627776 },
  ]},
];

function convertTemp(val: number, from: string, to: string): number {
  let c = from === "c" ? val : from === "f" ? (val - 32) * 5/9 : val - 273.15;
  return to === "c" ? c : to === "f" ? c * 9/5 + 32 : c + 273.15;
}

export default function UnitConverter() {
  const [groupIdx, setGroupIdx] = useState(0);
  const [from, setFrom] = useState(groups[0].units[0].key);
  const [to, setTo] = useState(groups[0].units[2].key);
  const [value, setValue] = useState("");

  const group = groups[groupIdx];
  const val = parseFloat(value) || 0;

  let result = 0;
  if (group.name === "Temperature") {
    result = convertTemp(val, from, to);
  } else {
    const fromFactor = group.units.find((u) => u.key === from)?.factor || 1;
    const toFactor = group.units.find((u) => u.key === to)?.factor || 1;
    result = (val * fromFactor) / toFactor;
  }

  function changeGroup(idx: number) {
    setGroupIdx(idx);
    setFrom(groups[idx].units[0].key);
    setTo(groups[idx].units[Math.min(2, groups[idx].units.length - 1)].key);
    setValue("");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {groups.map((g, i) => (
          <button key={g.name} onClick={() => changeGroup(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${groupIdx === i ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300 border border-gray-700"}`}>
            {g.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Value</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none">
            {group.units.map((u) => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none">
            {group.units.map((u) => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>
      </div>

      <button onClick={() => { const t = from; setFrom(to); setTo(t); }} className="text-sm text-orange-400 hover:text-orange-300">Swap units</button>

      {val !== 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">{val} {group.units.find((u) => u.key === from)?.label} =</p>
          <p className="text-3xl font-bold text-orange-400 mt-1">{result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {group.units.find((u) => u.key === to)?.label}</p>
        </div>
      )}
    </div>
  );
}
