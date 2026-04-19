/**
 * Daily automation script for Quikulate
 * Fetches latest currency rates and stores in Supabase
 *
 * Run: npx tsx scripts/daily-update.ts
 * Schedule: Vercel Cron, GitHub Actions, or cron job
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function updateCurrencyRates() {
  console.log("[Currency] Fetching latest rates...");

  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) {
    console.error("[Currency] API error:", res.status);
    return;
  }

  const data = await res.json();
  if (!data.rates) {
    console.error("[Currency] No rates in response");
    return;
  }

  console.log(`[Currency] Got ${Object.keys(data.rates).length} currencies`);

  if (SUPABASE_URL && SUPABASE_KEY) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { error } = await supabase.from("currency_rates").insert({
      base_currency: "USD",
      rates: data.rates,
    });

    if (error) {
      console.error("[Currency] Supabase insert error:", error.message);
    } else {
      console.log("[Currency] Rates saved to Supabase");
    }
  } else {
    console.log("[Currency] No Supabase configured, skipping save");
    console.log("[Currency] Sample rates:", {
      PKR: data.rates.PKR,
      INR: data.rates.INR,
      EUR: data.rates.EUR,
      GBP: data.rates.GBP,
    });
  }
}

async function main() {
  console.log(`\n=== Quikulate Daily Update — ${new Date().toISOString()} ===\n`);

  await updateCurrencyRates();

  console.log("\n=== Done ===\n");
}

main().catch(console.error);
