import type { MenuCategory } from "@/types/menu";
import { MenuItem } from "./MenuItem";

interface MenuSectionProps {
  category: MenuCategory;
  soldOutItemId?: string;
  specialItemId?: string;
}

export function MenuSection({ category, soldOutItemId, specialItemId }: MenuSectionProps) {
  const count = category.items.length;

  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-24">
      <div className="mb-7 flex items-end justify-between gap-4 border-b border-[#E8DED2] pb-4 print:mb-2 print:pb-1">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#8A3F06]">
            {String(count).padStart(2, "0")} {count === 1 ? "choice" : "choices"}
          </p>
          <h2
            id={`${category.id}-title`}
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {category.name}
          </h2>
          {category.description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B5F55]">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <ul className="grid list-none gap-3 p-0">
        {category.items.map((item) => (
          <li key={item.id}>
            <MenuItem
              item={item}
              soldOut={item.id === soldOutItemId}
              isSpecial={item.id === specialItemId}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}