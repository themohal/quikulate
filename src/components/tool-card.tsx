import Link from "next/link";

interface ToolCardProps {
  name: string;
  slug: string;
  category: string;
  shortDesc: string;
  icon: string;
}

export default function ToolCard({ name, slug, category, shortDesc, icon }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${category}/${slug}`}
      className="block bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors group"
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold text-base mb-1 group-hover:text-orange-400 transition-colors">
        {name}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {shortDesc}
      </p>
    </Link>
  );
}
