"use client";

interface Props {
  name: string;
  color: string;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryPill({ name, color, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={active ? { backgroundColor: color, color: "#0a0a0a" } : { borderColor: color, color }}
      className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
        active ? "shadow-md" : "bg-transparent hover:opacity-80"
      }`}
    >
      {name}
    </button>
  );
}
