export type Tool = {
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  description: string;
  keywords: string[];
  icon: string;
  shortDesc: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export const categories: Category[] = [
  {
    slug: "financial",
    name: "Financial Calculators",
    description:
      "Free online financial calculators for EMI, compound interest, profit margin, salary, tax, and tip calculations.",
    icon: "DollarSign",
  },
  {
    slug: "educational",
    name: "Educational Tools",
    description:
      "Free tools for students — CGPA to percentage converter, grade calculator, GPA calculator, age calculator, and more.",
    icon: "GraduationCap",
  },
  {
    slug: "text",
    name: "Text Tools",
    description:
      "Free online text utilities — word counter, character counter, case converter, lorem ipsum generator, and slug generator.",
    icon: "Type",
  },
  {
    slug: "developer",
    name: "Developer Tools",
    description:
      "Free developer utilities — JSON formatter, regex tester, color picker, Base64 encoder, JWT decoder, and timestamp converter.",
    icon: "Code",
  },
  {
    slug: "conversion",
    name: "Conversion Tools",
    description:
      "Free online converters for units, currency, timezones, and number bases.",
    icon: "ArrowLeftRight",
  },
  {
    slug: "image",
    name: "Image Tools",
    description:
      "Free client-side image tools — compress and resize images directly in your browser. No upload to server.",
    icon: "Image",
  },
];

export const tools: Tool[] = [
  // ── Financial ──
  {
    name: "EMI Calculator",
    slug: "emi-calculator",
    category: "financial",
    categoryName: "Financial Calculators",
    description:
      "Calculate your monthly EMI for home loans, car loans, and personal loans. See total interest and amortization schedule.",
    keywords: ["emi calculator", "loan emi", "home loan calculator", "car loan emi", "monthly installment"],
    icon: "Banknote",
    shortDesc: "Calculate monthly loan EMI, total interest, and amortization schedule",
  },
  {
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    category: "financial",
    categoryName: "Financial Calculators",
    description:
      "Calculate compound interest on your savings and investments. See how your money grows over time with different compounding frequencies.",
    keywords: ["compound interest", "investment calculator", "savings calculator", "interest rate"],
    icon: "TrendingUp",
    shortDesc: "See how your money grows with compound interest over time",
  },
  {
    name: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    category: "financial",
    categoryName: "Financial Calculators",
    description:
      "Calculate gross profit margin, markup percentage, and net profit from cost and revenue. Essential for business pricing.",
    keywords: ["profit margin", "markup calculator", "gross margin", "business calculator"],
    icon: "PieChart",
    shortDesc: "Calculate gross margin, markup percentage, and profit",
  },
  {
    name: "Salary Calculator",
    slug: "salary-calculator",
    category: "financial",
    categoryName: "Financial Calculators",
    description:
      "Convert your salary between annual, monthly, bi-weekly, weekly, daily, and hourly rates instantly.",
    keywords: ["salary calculator", "hourly to annual", "wage converter", "pay calculator"],
    icon: "Wallet",
    shortDesc: "Convert salary between annual, monthly, weekly, and hourly",
  },
  {
    name: "Tax Calculator",
    slug: "tax-calculator",
    category: "financial",
    categoryName: "Financial Calculators",
    description:
      "Calculate income tax for Pakistan, India, and US tax brackets. See your effective tax rate and net income after tax.",
    keywords: ["tax calculator", "income tax", "tax brackets", "pakistan tax", "india tax"],
    icon: "Receipt",
    shortDesc: "Calculate income tax and net income for multiple countries",
  },
  {
    name: "Tip Calculator",
    slug: "tip-calculator",
    category: "financial",
    categoryName: "Financial Calculators",
    description:
      "Calculate the tip amount and split the bill between multiple people. Supports custom tip percentages.",
    keywords: ["tip calculator", "split bill", "restaurant tip", "bill splitter"],
    icon: "HandCoins",
    shortDesc: "Calculate tip amount and split the bill between people",
  },

  // ── Educational ──
  {
    name: "CGPA to Percentage Converter",
    slug: "cgpa-to-percentage",
    category: "educational",
    categoryName: "Educational Tools",
    description:
      "Convert CGPA to percentage and vice versa. Supports multiple university grading scales including 4.0 and 10.0 systems.",
    keywords: ["cgpa to percentage", "cgpa converter", "gpa to percentage", "university grading"],
    icon: "GraduationCap",
    shortDesc: "Convert CGPA to percentage for various university scales",
  },
  {
    name: "Grade Calculator",
    slug: "grade-calculator",
    category: "educational",
    categoryName: "Educational Tools",
    description:
      "Calculate your weighted grade from assignments, quizzes, exams, and projects. See your final course grade and letter grade.",
    keywords: ["grade calculator", "weighted grade", "final grade", "course grade calculator"],
    icon: "ClipboardCheck",
    shortDesc: "Calculate weighted course grade from assignments and exams",
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    category: "educational",
    categoryName: "Educational Tools",
    description:
      "Calculate your exact age in years, months, days, hours, and minutes. See days until your next birthday.",
    keywords: ["age calculator", "birthday calculator", "exact age", "days until birthday"],
    icon: "Cake",
    shortDesc: "Calculate exact age in years, months, and days",
  },
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "educational",
    categoryName: "Educational Tools",
    description:
      "Calculate percentages easily — what is X% of Y, X is what percent of Y, and percentage increase or decrease.",
    keywords: ["percentage calculator", "percent of", "percentage change", "percentage increase"],
    icon: "Percent",
    shortDesc: "Calculate percentages, percentage of, and percentage change",
  },
  {
    name: "GPA Calculator",
    slug: "gpa-calculator",
    category: "educational",
    categoryName: "Educational Tools",
    description:
      "Calculate your GPA on a 4.0 scale. Add courses with grades and credit hours to get your cumulative GPA.",
    keywords: ["gpa calculator", "cumulative gpa", "college gpa", "4.0 scale"],
    icon: "Award",
    shortDesc: "Calculate cumulative GPA on a 4.0 scale from courses",
  },

  // ── Text ──
  {
    name: "Word Counter",
    slug: "word-counter",
    category: "text",
    categoryName: "Text Tools",
    description:
      "Count words, characters, sentences, and paragraphs in your text. See estimated reading and speaking time.",
    keywords: ["word counter", "character count", "word count online", "reading time"],
    icon: "FileText",
    shortDesc: "Count words, characters, sentences, and reading time",
  },
  {
    name: "Character Counter",
    slug: "character-counter",
    category: "text",
    categoryName: "Text Tools",
    description:
      "Count characters with and without spaces. Track limits for Twitter, Instagram, Meta descriptions, and more.",
    keywords: ["character counter", "char count", "twitter character limit", "text length"],
    icon: "Hash",
    shortDesc: "Count characters with platform limit tracking",
  },
  {
    name: "Case Converter",
    slug: "case-converter",
    category: "text",
    categoryName: "Text Tools",
    description:
      "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.",
    keywords: ["case converter", "uppercase", "lowercase", "title case", "camelCase"],
    icon: "CaseSensitive",
    shortDesc: "Convert text between different cases instantly",
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    category: "text",
    categoryName: "Text Tools",
    description:
      "Generate placeholder lorem ipsum text by paragraphs, sentences, or words. Copy with one click for your designs.",
    keywords: ["lorem ipsum", "placeholder text", "dummy text generator", "filler text"],
    icon: "AlignLeft",
    shortDesc: "Generate placeholder text for designs and mockups",
  },
  {
    name: "Text to Slug Converter",
    slug: "text-to-slug",
    category: "text",
    categoryName: "Text Tools",
    description:
      "Convert any text to a URL-friendly slug. Removes special characters, converts spaces to hyphens, and lowercases.",
    keywords: ["text to slug", "url slug generator", "slug converter", "seo url"],
    icon: "Link",
    shortDesc: "Convert text to URL-friendly slugs for SEO",
  },

  // ── Developer ──
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    category: "developer",
    categoryName: "Developer Tools",
    description:
      "Format, validate, and minify JSON data. Syntax highlighting with error detection and tree view.",
    keywords: ["json formatter", "json beautifier", "json validator", "json minifier"],
    icon: "Braces",
    shortDesc: "Format, validate, and minify JSON with syntax highlighting",
  },
  {
    name: "Regex Tester",
    slug: "regex-tester",
    category: "developer",
    categoryName: "Developer Tools",
    description:
      "Test regular expressions in real-time. See matches highlighted, capture groups, and flags. Supports JavaScript regex.",
    keywords: ["regex tester", "regular expression tester", "regex101", "regex matcher"],
    icon: "Regex",
    shortDesc: "Test regular expressions with real-time match highlighting",
  },
  {
    name: "Color Picker",
    slug: "color-picker",
    category: "developer",
    categoryName: "Developer Tools",
    description:
      "Pick colors and convert between HEX, RGB, HSL, and CMYK formats. Generate color palettes and shades.",
    keywords: ["color picker", "hex to rgb", "rgb to hex", "color converter", "color palette"],
    icon: "Palette",
    shortDesc: "Pick colors and convert between HEX, RGB, HSL, CMYK",
  },
  {
    name: "Base64 Encoder / Decoder",
    slug: "base64-encoder-decoder",
    category: "developer",
    categoryName: "Developer Tools",
    description:
      "Encode and decode text and files to and from Base64 format. Supports UTF-8 text and binary files.",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter", "encode base64"],
    icon: "Binary",
    shortDesc: "Encode and decode text and files to/from Base64",
  },
  {
    name: "JWT Decoder",
    slug: "jwt-decoder",
    category: "developer",
    categoryName: "Developer Tools",
    description:
      "Decode JSON Web Tokens (JWT) to see header, payload, and expiration info. No data sent to server.",
    keywords: ["jwt decoder", "jwt parser", "json web token", "jwt debugger"],
    icon: "KeyRound",
    shortDesc: "Decode JWT tokens to see header, payload, and expiry",
  },
  {
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    category: "developer",
    categoryName: "Developer Tools",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa. See current timestamp and relative time.",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "date to timestamp"],
    icon: "Clock",
    shortDesc: "Convert between Unix timestamps and human dates",
  },

  // ── Conversion ──
  {
    name: "Unit Converter",
    slug: "unit-converter",
    category: "conversion",
    categoryName: "Conversion Tools",
    description:
      "Convert between units of length, weight, temperature, volume, area, speed, and data storage.",
    keywords: ["unit converter", "length converter", "weight converter", "temperature converter"],
    icon: "ArrowLeftRight",
    shortDesc: "Convert length, weight, temperature, volume, and more",
  },
  {
    name: "Currency Converter",
    slug: "currency-converter",
    category: "conversion",
    categoryName: "Conversion Tools",
    description:
      "Convert between 150+ currencies with live exchange rates updated daily. Supports PKR, INR, USD, EUR, and more.",
    keywords: ["currency converter", "exchange rate", "usd to pkr", "dollar to rupee"],
    icon: "Coins",
    shortDesc: "Convert currencies with daily updated exchange rates",
  },
  {
    name: "Timezone Converter",
    slug: "timezone-converter",
    category: "conversion",
    categoryName: "Conversion Tools",
    description:
      "Convert times between timezones worldwide. See current time in multiple cities and plan meetings across zones.",
    keywords: ["timezone converter", "time zone", "world clock", "time difference"],
    icon: "Globe",
    shortDesc: "Convert times between timezones and see world clocks",
  },
  {
    name: "Number Base Converter",
    slug: "number-base-converter",
    category: "conversion",
    categoryName: "Conversion Tools",
    description:
      "Convert numbers between decimal, binary, octal, hexadecimal, and custom bases instantly.",
    keywords: ["binary converter", "hex converter", "decimal to binary", "number base converter"],
    icon: "Hash",
    shortDesc: "Convert between decimal, binary, octal, and hexadecimal",
  },

  // ── Image ──
  {
    name: "Image Compressor",
    slug: "image-compressor",
    category: "image",
    categoryName: "Image Tools",
    description:
      "Compress images in your browser without uploading to any server. Reduce file size while maintaining quality.",
    keywords: ["image compressor", "compress image", "reduce image size", "image optimizer"],
    icon: "FileDown",
    shortDesc: "Compress images in-browser without uploading to server",
  },
  {
    name: "Image Resizer",
    slug: "image-resizer",
    category: "image",
    categoryName: "Image Tools",
    description:
      "Resize images to exact dimensions in your browser. Maintain aspect ratio or set custom width and height.",
    keywords: ["image resizer", "resize image", "image dimensions", "scale image"],
    icon: "Maximize",
    shortDesc: "Resize images to exact dimensions in your browser",
  },
];

export function getToolBySlug(category: string, slug: string): Tool | undefined {
  return tools.find((t) => t.category === category && t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, limit);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortDesc.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q))
  );
}
