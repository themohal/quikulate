"use client";
import { useState } from "react";

const quickTips = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState("15");
  const [people, setPeople] = useState("1");

  const billVal = parseFloat(bill) || 0;
  const tipVal = parseFloat(tipPct) || 0;
  const peopleVal = Math.max(1, parseInt(people) || 1);

  const tipAmount = billVal * (tipVal / 100);
  const total = billVal + tipAmount;
  const perPerson = total / peopleVal;
  const tipPerPerson = tipAmount / peopleVal;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Bill Amount</label>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          placeholder="0.00"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">Tip Percentage</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {quickTips.map((t) => (
            <button
              key={t}
              onClick={() => setTipPct(String(t))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tipPct === String(t)
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-orange-500/50"
              }`}
            >
              {t}%
            </button>
          ))}
        </div>
        <input
          type="number"
          value={tipPct}
          onChange={(e) => setTipPct(e.target.value)}
          placeholder="Custom %"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Number of People</label>
        <input
          type="number"
          min="1"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
        />
      </div>

      {billVal > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Tip Amount</span>
            <span className="text-white font-semibold">{tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total</span>
            <span className="text-white font-semibold">{total.toFixed(2)}</span>
          </div>
          {peopleVal > 1 && (
            <>
              <div className="border-t border-gray-700 pt-3 flex justify-between">
                <span className="text-gray-400">Tip Per Person</span>
                <span className="text-white font-semibold">{tipPerPerson.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Per Person</span>
                <span className="text-orange-400 font-bold text-lg">{perPerson.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
