"use client";
import { useState } from "react";

type Assignment = { name: string; score: string; total: string; weight: string };

function getLetterGrade(pct: number): string {
  if (pct >= 93) return "A";
  if (pct >= 90) return "A-";
  if (pct >= 87) return "B+";
  if (pct >= 83) return "B";
  if (pct >= 80) return "B-";
  if (pct >= 77) return "C+";
  if (pct >= 73) return "C";
  if (pct >= 70) return "C-";
  if (pct >= 60) return "D";
  return "F";
}

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { name: "Assignment 1", score: "", total: "100", weight: "" },
  ]);

  function update(i: number, field: keyof Assignment, val: string) {
    const next = [...assignments];
    next[i] = { ...next[i], [field]: val };
    setAssignments(next);
  }

  function add() {
    setAssignments([...assignments, { name: `Assignment ${assignments.length + 1}`, score: "", total: "100", weight: "" }]);
  }

  function remove(i: number) {
    if (assignments.length <= 1) return;
    setAssignments(assignments.filter((_, idx) => idx !== i));
  }

  const totalWeight = assignments.reduce((s, a) => s + (parseFloat(a.weight) || 0), 0);
  const useWeights = totalWeight > 0;

  let weightedSum = 0;
  let weightSum = 0;
  let simpleSum = 0;
  let simpleCount = 0;

  assignments.forEach((a) => {
    const score = parseFloat(a.score);
    const total = parseFloat(a.total) || 100;
    const weight = parseFloat(a.weight) || 0;
    if (!isNaN(score)) {
      const pct = (score / total) * 100;
      if (useWeights && weight > 0) {
        weightedSum += pct * weight;
        weightSum += weight;
      }
      simpleSum += pct;
      simpleCount++;
    }
  });

  const avgGrade = useWeights && weightSum > 0 ? weightedSum / weightSum : simpleCount > 0 ? simpleSum / simpleCount : 0;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {assignments.map((a, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-3">
              {i === 0 && <label className="block text-xs text-gray-400 mb-1">Name</label>}
              <input
                value={a.name}
                onChange={(e) => update(i, "name", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              {i === 0 && <label className="block text-xs text-gray-400 mb-1">Score</label>}
              <input
                type="number"
                value={a.score}
                onChange={(e) => update(i, "score", e.target.value)}
                placeholder="85"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              {i === 0 && <label className="block text-xs text-gray-400 mb-1">Out of</label>}
              <input
                type="number"
                value={a.total}
                onChange={(e) => update(i, "total", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="col-span-3">
              {i === 0 && <label className="block text-xs text-gray-400 mb-1">Weight (%)</label>}
              <input
                type="number"
                value={a.weight}
                onChange={(e) => update(i, "weight", e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="col-span-2 flex gap-1">
              <button onClick={add} className="px-2 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm">+</button>
              <button onClick={() => remove(i)} className="px-2 py-2 bg-gray-700 hover:bg-red-600 rounded-lg text-white text-sm">x</button>
            </div>
          </div>
        ))}
      </div>

      {useWeights && Math.abs(totalWeight - 100) > 0.01 && (
        <p className="text-yellow-400 text-sm">
          Weights sum to {totalWeight.toFixed(1)}% (should be 100%)
        </p>
      )}

      {simpleCount > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">
            {useWeights ? "Weighted Average" : "Average Grade"}
          </p>
          <p className="text-3xl font-bold text-orange-400">{avgGrade.toFixed(2)}%</p>
          <p className="text-lg text-white font-medium mt-1">Letter Grade: {getLetterGrade(avgGrade)}</p>
        </div>
      )}
    </div>
  );
}
