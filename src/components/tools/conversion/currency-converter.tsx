"use client";
import { useState, useEffect } from "react";

const popularCurrencies = ["USD","EUR","GBP","PKR","INR","AED","SAR","CAD","AUD","JPY","CNY","BDT","MYR","SGD","CHF"];

const FALLBACK: Record<string, number> = {
  USD:1,EUR:0.92,GBP:0.79,PKR:278.5,INR:83.5,AED:3.67,SAR:3.75,CAD:1.36,AUD:1.53,
  JPY:149.5,CNY:7.24,BDT:110,MYR:4.47,SGD:1.34,CHF:0.88,SEK:10.45,NOK:10.55,
  NZD:1.63,ZAR:18.5,TRY:32.5,BRL:4.97,MXN:17.15,KRW:1320,THB:35.5,IDR:15650,
  PHP:56.2,EGP:30.9,NGN:1550,KWD:0.31,BHD:0.376,OMR:0.385,QAR:3.64,
};

export default function CurrencyConverter() {
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [amount, setAmount] = useState("1");
  const [updated, setUpdated] = useState("Fallback rates");

  useEffect(() => {
    fetch("/api/currency")
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) { setRates(data.rates); setUpdated(data.updated); }
      })
      .catch(() => {});
  }, []);

  const val = parseFloat(amount) || 0;
  const fromRate = rates[from] || 1;
  const toRate = rates[to] || 1;
  const result = (val / fromRate) * toRate;
  const rate = toRate / fromRate;

  const currencies = Object.keys(rates).sort();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none">
            {popularCurrencies.filter((c) => rates[c]).map((c) => <option key={c} value={c}>{c}</option>)}
            <option disabled>---</option>
            {currencies.filter((c) => !popularCurrencies.includes(c)).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none">
            {popularCurrencies.filter((c) => rates[c]).map((c) => <option key={c} value={c}>{c}</option>)}
            <option disabled>---</option>
            {currencies.filter((c) => !popularCurrencies.includes(c)).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <button onClick={() => { const t = from; setFrom(to); setTo(t); }} className="text-sm text-orange-400 hover:text-orange-300">Swap currencies</button>

      {val > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">{val.toLocaleString()} {from} =</p>
          <p className="text-3xl font-bold text-orange-400 mt-1">{result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {to}</p>
          <p className="text-xs text-gray-500 mt-2">1 {from} = {rate.toFixed(4)} {to}</p>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">Rates updated: {updated}</p>
    </div>
  );
}
