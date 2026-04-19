"use client";
import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");

  const birthDate = dob ? new Date(dob) : null;
  const now = new Date();

  let years = 0, months = 0, days = 0, totalDays = 0;
  let nextBirthday = "";
  let dayOfWeek = "";

  if (birthDate && birthDate < now) {
    years = now.getFullYear() - birthDate.getFullYear();
    months = now.getMonth() - birthDate.getMonth();
    days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    totalDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

    const next = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (next <= now) next.setFullYear(next.getFullYear() + 1);
    const daysUntil = Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    nextBirthday = `${daysUntil} day${daysUntil !== 1 ? "s" : ""} until next birthday`;

    dayOfWeek = birthDate.toLocaleDateString("en-US", { weekday: "long" });
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          max={now.toISOString().split("T")[0]}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
        />
      </div>

      {birthDate && birthDate < now && (
        <>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">Your Age</p>
            <p className="text-3xl font-bold text-orange-400">
              {years} years, {months} months, {days} days
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Total Days", value: totalDays.toLocaleString() },
              { label: "Total Months", value: (years * 12 + months).toLocaleString() },
              { label: "Total Weeks", value: Math.floor(totalDays / 7).toLocaleString() },
              { label: "Total Hours", value: (totalDays * 24).toLocaleString() },
              { label: "Born On", value: dayOfWeek },
              { label: "Next Birthday", value: nextBirthday },
            ].map((item) => (
              <div key={item.label} className="bg-gray-800/50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <p className="text-white font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
