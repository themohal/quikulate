"use client";
import { useState } from "react";

type Bracket = { min: number; max: number; rate: number; base: number };

const brackets: Record<string, Bracket[]> = {
  pakistan: [
    { min: 0, max: 600000, rate: 0, base: 0 },
    { min: 600000, max: 1200000, rate: 0.05, base: 0 },
    { min: 1200000, max: 2400000, rate: 0.15, base: 30000 },
    { min: 2400000, max: 3600000, rate: 0.20, base: 210000 },
    { min: 3600000, max: 6000000, rate: 0.25, base: 450000 },
    { min: 6000000, max: Infinity, rate: 0.30, base: 1050000 },
  ],
  india: [
    { min: 0, max: 300000, rate: 0, base: 0 },
    { min: 300000, max: 700000, rate: 0.05, base: 0 },
    { min: 700000, max: 1000000, rate: 0.10, base: 20000 },
    { min: 1000000, max: 1200000, rate: 0.15, base: 50000 },
    { min: 1200000, max: 1500000, rate: 0.20, base: 80000 },
    { min: 1500000, max: Infinity, rate: 0.30, base: 140000 },
  ],
  us: [
    { min: 0, max: 11600, rate: 0.10, base: 0 },
    { min: 11600, max: 47150, rate: 0.12, base: 1160 },
    { min: 47150, max: 100525, rate: 0.22, base: 5426 },
    { min: 100525, max: 191950, rate: 0.24, base: 17168.5 },
    { min: 191950, max: 243725, rate: 0.32, base: 39110.5 },
    { min: 243725, max: 609350, rate: 0.35, base: 55678.5 },
    { min: 609350, max: Infinity, rate: 0.37, base: 183647.25 },
  ],
};

const currencies: Record<string, string> = { pakistan: "PKR", india: "INR", us: "USD" };

function calcTax(income: number, country: string) {
  const b = brackets[country];
  let tax = 0;
  let breakdown: { bracket: string; taxable: number; rate: number; tax: number }[] = [];

  for (let i = 0; i < b.length; i++) {
    if (income <= b[i].min) break;
    const taxableInBracket = Math.min(income, b[i].max) - b[i].min;
    const bracketTax = i === 0 && b[i].rate === 0 ? 0 : taxableInBracket * b[i].rate;
    tax += bracketTax;
    breakdown.push({
      bracket: b[i].max === Infinity ? `${b[i].min.toLocaleString()}+` : `${b[i].min.toLocaleString()} - ${b[i].max.toLocaleString()}`,
      taxable: taxableInBracket,
      rate: b[i].rate * 100,
      tax: bracketTax,
    });
  }

  return { tax, effective: income > 0 ? (tax / income) * 100 : 0, net: income - tax, breakdown };
}

export default function TaxCalculator() {
  const [country, setCountry] = useState("pakistan");
  const [income, setIncome] = useState("");

  const val = parseFloat(income) || 0;
  const result = calcTax(val, country);
  const cur = currencies[country];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
          >
            <option value="pakistan">Pakistan (PKR)</option>
            <option value="india">India (INR) - New Regime</option>
            <option value="us">United States (USD) - Single Filer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Annual Income ({cur})</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter annual income"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {val > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Tax", value: result.tax },
              { label: "Effective Rate", value: null, text: `${result.effective.toFixed(2)}%` },
              { label: "After Tax", value: result.net },
              { label: "Monthly Tax", value: result.tax / 12 },
            ].map((item) => (
              <div key={item.label} className="bg-gray-800/50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <p className="text-white font-semibold text-sm">
                  {item.text || `${cur} ${item.value!.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3 text-sm">Tax Bracket Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400">
                    <th className="text-left py-2 pr-4">Bracket</th>
                    <th className="text-right py-2 px-2">Rate</th>
                    <th className="text-right py-2 px-2">Taxable</th>
                    <th className="text-right py-2 pl-2">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((row, i) => (
                    <tr key={i} className="border-b border-gray-700/50">
                      <td className="py-2 pr-4 text-gray-300">{row.bracket}</td>
                      <td className="py-2 px-2 text-right text-gray-300">{row.rate}%</td>
                      <td className="py-2 px-2 text-right text-gray-300">{row.taxable.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      <td className="py-2 pl-2 text-right text-white font-medium">{row.tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
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
