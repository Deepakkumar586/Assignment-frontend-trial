import type { DietFilter } from "@/types/menu";

interface DietaryFilterProps {
  value: DietFilter;
  onChange: (value: DietFilter) => void;
  resultCount: number;
}

const options: Array<{ value: DietFilter; label: string }> = [
  { value: "all", label: "All dishes" },
  { value: "V", label: "Vegetarian" },
  { value: "GF", label: "Gluten-free" }
];

export function DietaryFilter({ value, onChange, resultCount }: DietaryFilterProps) {
  return (
    <section
      aria-labelledby="diet-filter-title"
      className="no-print mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="diet-filter-title"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A6B5F]"
          >
            Filter by diet
          </h2>
          <p className="mt-1 text-xs text-[#6B5F55]">
            <strong className="font-bold">V</strong> vegetarian ·{" "}
            <strong className="font-bold">GF</strong> gluten-free ·{" "}
            <strong className="font-bold">SPICY</strong> has a kick
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const pressed = value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={pressed}
                onClick={() => onChange(option.value)}
                className={`min-h-11 rounded-full border px-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309] ${
                  pressed
                    ? "border-[#2B221C] bg-[#2B221C] text-white"
                    : "border-[#E3D8CC] bg-[#FFFDFC] text-[#4E443D] hover:bg-[#F0E7DC]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" className="sr-only">
        Showing {resultCount} {resultCount === 1 ? "dish" : "dishes"}
      </p>
    </section>
  );
}