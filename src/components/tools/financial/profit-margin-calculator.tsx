"use client";

import { useState } from "react";

const inputClass =
  "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none";
const buttonClass =
  "px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors";
const resultCard = "bg-gray-800/50 rounded-lg p-4";

type Mode = "cost-revenue" | "cost-margin";

export default function ProfitMarginCalculator() {
  const [mode, setMode] = useState<Mode>("cost-revenue");
  const [cost, setCost] = useState<string>("");
  const [revenue, setRevenue] = useState<string>("");
  const [marginInput, setMarginInput] = useState<string>("");

  const costVal = parseFloat(cost) || 0;
  const revenueVal = parseFloat(revenue) || 0;
  const marginInputVal = parseFloat(marginInput) || 0;

  let grossProfit = 0;
  let grossMargin = 0;
  let markup = 0;
  let calculatedRevenue = 0;
  let hasResult = false;

  if (mode === "cost-revenue") {
    if (costVal > 0 && revenueVal > 0) {
      grossProfit = revenueVal - costVal;
      grossMargin = (grossProfit / revenueVal) * 100;
      markup = (grossProfit / costVal) * 100;
      calculatedRevenue = revenueVal;
      hasResult = true;
    }
  } else {
    if (costVal > 0 && marginInputVal > 0 && marginInputVal < 100) {
      calculatedRevenue = costVal / (1 - marginInputVal / 100);
      grossProfit = calculatedRevenue - costVal;
      grossMargin = marginInputVal;
      markup = (grossProfit / costVal) * 100;
      hasResult = true;
    }
  }

  const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-white">Profit Margin Calculator</h2>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <div className="flex gap-3">
          <button
            className={
              mode === "cost-revenue"
                ? buttonClass
                : "px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors border border-gray-700"
            }
            onClick={() => setMode("cost-revenue")}
          >
            Cost &amp; Revenue
          </button>
          <button
            className={
              mode === "cost-margin"
                ? buttonClass
                : "px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors border border-gray-700"
            }
            onClick={() => setMode("cost-margin")}
          >
            Cost &amp; Margin
          </button>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Cost Price
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 800"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>

        {mode === "cost-revenue" ? (
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Revenue (Selling Price)
            </label>
            <input
              type="number"
              className={inputClass}
              placeholder="e.g. 1200"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Desired Gross Margin (%)
            </label>
            <input
              type="number"
              className={inputClass}
              placeholder="e.g. 30"
              value={marginInput}
              onChange={(e) => setMarginInput(e.target.value)}
            />
          </div>
        )}
      </div>

      {hasResult && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mode === "cost-margin" && (
            <div className={resultCard}>
              <p className="text-gray-400 text-sm">Required Selling Price</p>
              <p className="text-white text-xl font-bold">{fmt(calculatedRevenue)}</p>
            </div>
          )}
          <div className={resultCard}>
            <p className="text-gray-400 text-sm">Gross Profit</p>
            <p className="text-white text-xl font-bold">{fmt(grossProfit)}</p>
          </div>
          <div className={resultCard}>
            <p className="text-gray-400 text-sm">Gross Margin</p>
            <p className="text-orange-400 text-xl font-bold">{fmt(grossMargin)}%</p>
          </div>
          <div className={resultCard}>
            <p className="text-gray-400 text-sm">Markup</p>
            <p className="text-orange-400 text-xl font-bold">{fmt(markup)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
