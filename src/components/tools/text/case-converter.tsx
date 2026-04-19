"use client";

import { useState } from "react";

type CaseType =
  | "uppercase"
  | "lowercase"
  | "titlecase"
  | "sentencecase"
  | "camelcase"
  | "pascalcase"
  | "snakecase"
  | "kebabcase"
  | "constantcase";

function toWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

function convertCase(input: string, caseType: CaseType): string {
  switch (caseType) {
    case "uppercase":
      return input.toUpperCase();

    case "lowercase":
      return input.toLowerCase();

    case "titlecase":
      return input.replace(
        /\b\w/g,
        (char) => char.toUpperCase()
      );

    case "sentencecase": {
      const lower = input.toLowerCase();
      return lower.replace(/(^\s*|[.!?]\s+)(\w)/g, (_match, prefix, char) =>
        prefix + char.toUpperCase()
      );
    }

    case "camelcase": {
      const words = toWords(input);
      return words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join("");
    }

    case "pascalcase": {
      const words = toWords(input);
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
    }

    case "snakecase": {
      const words = toWords(input);
      return words.map((w) => w.toLowerCase()).join("_");
    }

    case "kebabcase": {
      const words = toWords(input);
      return words.map((w) => w.toLowerCase()).join("-");
    }

    case "constantcase": {
      const words = toWords(input);
      return words.map((w) => w.toUpperCase()).join("_");
    }

    default:
      return input;
  }
}

const CASE_OPTIONS: { type: CaseType; label: string }[] = [
  { type: "uppercase", label: "UPPERCASE" },
  { type: "lowercase", label: "lowercase" },
  { type: "titlecase", label: "Title Case" },
  { type: "sentencecase", label: "Sentence case" },
  { type: "camelcase", label: "camelCase" },
  { type: "pascalcase", label: "PascalCase" },
  { type: "snakecase", label: "snake_case" },
  { type: "kebabcase", label: "kebab-case" },
  { type: "constantcase", label: "CONSTANT_CASE" },
];

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);

  const handleConvert = (caseType: CaseType) => {
    setActiveCase(caseType);
    setOutput(convertCase(input, caseType));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (activeCase) {
              setOutput(convertCase(e.target.value, activeCase));
            }
          }}
          placeholder="Enter text to convert..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none resize-y min-h-[150px]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CASE_OPTIONS.map((option) => (
          <button
            key={option.type}
            onClick={() => handleConvert(option.type)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCase === option.type
                ? "bg-orange-500 text-white"
                : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-300">
            Output
          </label>
          <button
            onClick={handleCopy}
            disabled={!output}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="Converted text will appear here..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none resize-y min-h-[150px]"
        />
      </div>
    </div>
  );
}
