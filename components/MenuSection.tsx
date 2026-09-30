import type { MenuCategory } from "@/types/menu";
import { MenuItem } from "./MenuItem";

interface MenuSectionProps {
  category: MenuCategory;
  soldOutItemId?: string;
}

export function MenuSection({ category, soldOutItemId }: MenuSectionProps) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-24">
      <div className="mb-7 flex items-end justify-between gap-4 border-b border-[#E8DED2] pb-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#B45309]">
            {String(category.items.length).padStart(2, "0")} choices
          </p>
          <h2 id={`${category.id}-title`} className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {category.name}
          </h2>
          {category.description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#74685E]">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <ul className="grid list-none gap-3 p-0">
        {category.items.map((item) => (
          <li key={item.id}>
            <MenuItem item={item} soldOut={item.id === soldOutItemId} />
          </li>
        ))}
      </ul>
    </section>
  );
}
