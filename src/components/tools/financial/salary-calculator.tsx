"use client";
import { useState } from "react";

const periods = [
  { key: "annual", label: "Annual", factor: 1 },
  { key: "monthly", label: "Monthly", factor: 12 },
  { key: "biweekly", label: "Bi-Weekly", factor: 26 },
  { key: "weekly", label: "Weekly", factor: 52 },
  { key: "daily", label: "Daily", factor: 260 },
  { key: "hourly", label: "Hourly", factor: 2080 },
];

export default function SalaryCalculator() {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("annual");

  const val = parseFloat(amount) || 0;
  const selectedFactor = periods.find((p) => p.key === period)?.factor || 1;
  const annual = val * selectedFactor;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
          >
            {periods.map((p) => (
              <option key={p.key} value={p.key}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      {val > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Salary Breakdown</h3>
          <div className="space-y-2">
            {periods.map((p) => (
              <div key={p.key} className="flex justify-between items-center py-1.5 border-b border-gray-700/50 last:border-0">
                <span className="text-gray-400 text-sm">{p.label}</span>
                <span className={`font-mono text-sm ${p.key === period ? "text-orange-400 font-bold" : "text-white"}`}>
                  {(annual / p.factor).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Based on 52 weeks, 26 bi-weekly periods, 260 working days, and 2,080 working hours per year.
          </p>
        </div>
      )}
    </div>
  );
}
