"use client";

import { useState } from "react";

const inputClass =
  "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none";
const resultCard = "bg-gray-800/50 rounded-lg p-4";

type Frequency = "annually" | "semi-annually" | "quarterly" | "monthly" | "daily";

const frequencyMap: Record<Frequency, number> = {
  annually: 1,
  "semi-annually": 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

interface YearRow {
  year: number;
  value: number;
  interest: number;
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("annually");

  const P = parseFloat(principal) || 0;
  const rPercent = parseFloat(rate) || 0;
  const t = parseFloat(time) || 0;
  const n = frequencyMap[frequency];
  const r = rPercent / 100;

  let futureValue = 0;
  let totalInterest = 0;
  const yearBreakdown: YearRow[] = [];

  if (P > 0 && t > 0) {
    futureValue = P * Math.pow(1 + r / n, n * t);
    totalInterest = futureValue - P;

    for (let y = 1; y <= t; y++) {
      const val = P * Math.pow(1 + r / n, n * y);
      yearBreakdown.push({
        year: y,
        value: val,
        interest: val - P,
      });
    }
  }

  const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-white">Compound Interest Calculator</h2>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Principal Amount
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 100000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 7"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Time Period (years)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 5"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Compounding Frequency
          </label>
          <select
            className={inputClass}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
          >
            <option value="annually">Annually</option>
            <option value="semi-annually">Semi-Annually</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      </div>

      {futureValue > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={resultCard}>
              <p className="text-gray-400 text-sm">Future Value</p>
              <p className="text-white text-xl font-bold">{fmt(futureValue)}</p>
            </div>
            <div className={resultCard}>
              <p className="text-gray-400 text-sm">Total Interest Earned</p>
              <p className="text-orange-400 text-xl font-bold">{fmt(totalInterest)}</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-3">Year-by-Year Breakdown</h3>
            <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-700">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-800 text-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-left">Year</th>
                    <th className="px-4 py-2 text-right">Future Value</th>
                    <th className="px-4 py-2 text-right">Interest Earned</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {yearBreakdown.map((row) => (
                    <tr
                      key={row.year}
                      className="border-t border-gray-700/50 hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-2">{row.year}</td>
                      <td className="px-4 py-2 text-right">{fmt(row.value)}</td>
                      <td className="px-4 py-2 text-right">{fmt(row.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
