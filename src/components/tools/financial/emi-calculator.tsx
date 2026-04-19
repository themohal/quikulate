"use client";

import { useState } from "react";

const inputClass =
  "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none";
const buttonClass =
  "px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors";
const resultCard = "bg-gray-800/50 rounded-lg p-4";

interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [annualRate, setAnnualRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [tenureUnit, setTenureUnit] = useState<"months" | "years">("months");

  const P = parseFloat(loanAmount) || 0;
  const annualPercent = parseFloat(annualRate) || 0;
  const rawTenure = parseFloat(tenure) || 0;
  const n = tenureUnit === "years" ? rawTenure * 12 : rawTenure;
  const r = annualPercent / 12 / 100;

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;
  const amortization: AmortizationRow[] = [];

  if (P > 0 && r > 0 && n > 0) {
    const factor = Math.pow(1 + r, n);
    emi = (P * r * factor) / (factor - 1);
    totalPayment = emi * n;
    totalInterest = totalPayment - P;

    let balance = P;
    for (let i = 1; i <= n; i++) {
      const interestPart = balance * r;
      const principalPart = emi - interestPart;
      balance -= principalPart;
      amortization.push({
        month: i,
        principal: principalPart,
        interest: interestPart,
        balance: Math.max(balance, 0),
      });
    }
  } else if (P > 0 && r === 0 && n > 0) {
    emi = P / n;
    totalPayment = P;
    totalInterest = 0;
    let balance = P;
    for (let i = 1; i <= n; i++) {
      balance -= emi;
      amortization.push({
        month: i,
        principal: emi,
        interest: 0,
        balance: Math.max(balance, 0),
      });
    }
  }

  const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-white">EMI Calculator</h2>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Loan Amount
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 500000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 8.5"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Loan Tenure
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              className={inputClass}
              placeholder="e.g. 60"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
            <div className="flex rounded-lg overflow-hidden border border-gray-700 shrink-0">
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  tenureUnit === "months"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setTenureUnit("months")}
              >
                Months
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  tenureUnit === "years"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setTenureUnit("years")}
              >
                Years
              </button>
            </div>
          </div>
        </div>
      </div>

      {emi > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={resultCard}>
              <p className="text-gray-400 text-sm">Monthly EMI</p>
              <p className="text-white text-xl font-bold">{fmt(emi)}</p>
            </div>
            <div className={resultCard}>
              <p className="text-gray-400 text-sm">Total Interest</p>
              <p className="text-orange-400 text-xl font-bold">{fmt(totalInterest)}</p>
            </div>
            <div className={resultCard}>
              <p className="text-gray-400 text-sm">Total Payment</p>
              <p className="text-white text-xl font-bold">{fmt(totalPayment)}</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-3">Amortization Schedule</h3>
            <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-700">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-800 text-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-left">Month</th>
                    <th className="px-4 py-2 text-right">Principal</th>
                    <th className="px-4 py-2 text-right">Interest</th>
                    <th className="px-4 py-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {amortization.map((row) => (
                    <tr
                      key={row.month}
                      className="border-t border-gray-700/50 hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-2">{row.month}</td>
                      <td className="px-4 py-2 text-right">{fmt(row.principal)}</td>
                      <td className="px-4 py-2 text-right">{fmt(row.interest)}</td>
                      <td className="px-4 py-2 text-right">{fmt(row.balance)}</td>
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
