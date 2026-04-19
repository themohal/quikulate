"use client";
import { useState } from "react";

const words = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum","habitant","morbi","tristique","senectus","netus","malesuada","fames","turpis","egestas","maecenas","pharetra","convallis","posuere","viverra","nibh","cras","pulvinar","mattis","nunc","blandit","volutpat","lacinia","arcu","dictum","varius","duis","ultricies","lacus"];

function getRandom(arr: string[]) { return arr[Math.floor(Math.random() * arr.length)]; }

function genSentence(startWithLorem: boolean) {
  const len = 8 + Math.floor(Math.random() * 12);
  const w = [];
  for (let i = 0; i < len; i++) w.push(getRandom(words));
  if (startWithLorem) { w[0] = "lorem"; w[1] = "ipsum"; w[2] = "dolor"; w[3] = "sit"; w[4] = "amet"; }
  w[0] = w[0].charAt(0).toUpperCase() + w[0].slice(1);
  return w.join(" ") + ".";
}

function genParagraph(startWithLorem: boolean) {
  const len = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: len }, (_, i) => genSentence(i === 0 && startWithLorem)).join(" ");
}

export default function LoremIpsumGenerator() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState("3");
  const [startLorem, setStartLorem] = useState(true);
  const [output, setOutput] = useState("");

  function generate() {
    const n = Math.max(1, parseInt(count) || 1);
    if (type === "paragraphs") {
      setOutput(Array.from({ length: n }, (_, i) => genParagraph(i === 0 && startLorem)).join("\n\n"));
    } else if (type === "sentences") {
      setOutput(Array.from({ length: n }, (_, i) => genSentence(i === 0 && startLorem)).join(" "));
    } else {
      const w = [];
      for (let i = 0; i < n; i++) w.push(getRandom(words));
      if (startLorem && w.length >= 2) { w[0] = "Lorem"; w[1] = "ipsum"; }
      setOutput(w.join(" "));
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Count</label>
          <input type="number" min="1" value={count} onChange={(e) => setCount(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none" />
        </div>
        <div className="flex items-end gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-300 pb-3">
            <input type="checkbox" checked={startLorem} onChange={(e) => setStartLorem(e.target.checked)} className="rounded" />
            Start with &quot;Lorem ipsum...&quot;
          </label>
        </div>
      </div>

      <button onClick={generate} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
        Generate
      </button>

      {output && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">{output.split(/\s+/).length} words</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-sm text-orange-400 hover:text-orange-300">Copy</button>
          </div>
          <textarea readOnly value={output} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm min-h-[200px] resize-y focus:outline-none" />
        </div>
      )}
    </div>
  );
}
