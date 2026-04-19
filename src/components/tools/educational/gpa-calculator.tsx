"use client";
import { useState } from "react";

type Course = { name: string; grade: string; credits: string };

const gradePoints: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0,
};

const gradeOptions = Object.keys(gradePoints);

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { name: "Course 1", grade: "A", credits: "3" },
    { name: "Course 2", grade: "B+", credits: "3" },
  ]);

  function update(i: number, field: keyof Course, val: string) {
    const next = [...courses];
    next[i] = { ...next[i], [field]: val };
    setCourses(next);
  }

  function add() {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: "A", credits: "3" }]);
  }

  function remove(i: number) {
    if (courses.length <= 1) return;
    setCourses(courses.filter((_, idx) => idx !== i));
  }

  let totalQP = 0;
  let totalCredits = 0;
  courses.forEach((c) => {
    const cr = parseFloat(c.credits) || 0;
    const gp = gradePoints[c.grade] ?? 0;
    totalQP += gp * cr;
    totalCredits += cr;
  });

  const gpa = totalCredits > 0 ? totalQP / totalCredits : 0;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {courses.map((c, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-4">
              {i === 0 && <label className="block text-xs text-gray-400 mb-1">Course</label>}
              <input
                value={c.name}
                onChange={(e) => update(i, "name", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="col-span-3">
              {i === 0 && <label className="block text-xs text-gray-400 mb-1">Grade</label>}
              <select
                value={c.grade}
                onChange={(e) => update(i, "grade", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none"
              >
                {gradeOptions.map((g) => (
                  <option key={g} value={g}>{g} ({gradePoints[g].toFixed(1)})</option>
                ))}
              </select>
            </div>
            <div className="col-span-3">
              {i === 0 && <label className="block text-xs text-gray-400 mb-1">Credits</label>}
              <input
                type="number"
                min="0"
                value={c.credits}
                onChange={(e) => update(i, "credits", e.target.value)}
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

      <button
        onClick={() => setCourses([{ name: "Course 1", grade: "A", credits: "3" }])}
        className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
      >
        Reset All
      </button>

      {totalCredits > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-sm mb-1">Cumulative GPA</p>
            <p className="text-3xl font-bold text-orange-400">{gpa.toFixed(2)}</p>
            <p className="text-sm text-gray-400 mt-1">on a 4.0 scale</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-xs text-gray-400">Total Credits</p>
              <p className="text-white font-semibold">{totalCredits}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Quality Points</p>
              <p className="text-white font-semibold">{totalQP.toFixed(1)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
