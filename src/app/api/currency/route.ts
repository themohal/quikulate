import { NextResponse } from "next/server";

// Fallback rates (USD base) — updated periodically
const FALLBACK_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, PKR: 278.5, INR: 83.5, AED: 3.67,
  SAR: 3.75, CAD: 1.36, AUD: 1.53, JPY: 149.5, CNY: 7.24, BDT: 110.0,
  MYR: 4.47, SGD: 1.34, CHF: 0.88, SEK: 10.45, NOK: 10.55, DKK: 6.87,
  NZD: 1.63, ZAR: 18.5, TRY: 32.5, BRL: 4.97, MXN: 17.15, KRW: 1320,
  THB: 35.5, IDR: 15650, PHP: 56.2, VND: 24500, EGP: 30.9, NGN: 1550,
  KWD: 0.31, BHD: 0.376, OMR: 0.385, QAR: 3.64,
};

export async function GET() {
  try {
    // Try fetching live rates
    const res = await fetch(
      "https://open.er-api.com/v6/latest/USD",
      { next: { revalidate: 86400 } } // cache for 24h
    );

    if (res.ok) {
      const data = await res.json();
      if (data.rates) {
        return NextResponse.json({
          rates: data.rates,
          base: "USD",
          updated: data.time_last_update_utc || new Date().toISOString(),
          source: "live",
        });
      }
    }
  } catch {
    // Fall through to fallback
  }

  return NextResponse.json({
    rates: FALLBACK_RATES,
    base: "USD",
    updated: "Fallback rates",
    source: "fallback",
  });
}
