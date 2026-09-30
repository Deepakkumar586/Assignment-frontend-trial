import { formatPrice } from "@/lib/format";
import type { MenuItem as MenuItemType } from "@/types/menu";

interface MenuItemProps {
  item: MenuItemType;
  soldOut?: boolean;
  isSpecial?: boolean;
}

const tagLabels: Record<MenuItemType["tags"][number], string> = {
  V: "Vegetarian",
  GF: "Gluten-free",
  spicy: "Spicy"
};

export function MenuItem({ item, soldOut = false, isSpecial = false }: MenuItemProps) {
  return (
    <article
      className={`menu-card rounded-2xl p-5 sm:p-6 ${soldOut ? "bg-[#F7F2EC]" : ""}`}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-display text-lg font-bold ${
                soldOut ? "text-[#6D625A]" : "text-[#2A211B]"
              }`}
            >
              {item.name}
            </h3>

            {soldOut && (
              <span className="rounded-full bg-[#EEE6DE] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#6D625A]">
                Sold out
              </span>
            )}

            {isSpecial && !soldOut && (
              <span className="rounded-full bg-[#FBF1E6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#8A3F06]">
                Today&apos;s special
              </span>
            )}
          </div>

          {item.description && (
            <p
              className={`mt-2 max-w-2xl text-sm leading-6 ${
                soldOut ? "text-[#6D625A]" : "text-[#6B5F55]"
              }`}
            >
              {item.description}
            </p>
          )}

          {item.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Dietary information">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  title={tagLabels[tag]}
                  className="rounded-md border border-[#E3D8CC] bg-[#FAF6F0] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#6B5A4D]"
                >
                  <span aria-hidden="true">{tag}</span>
                  <span className="sr-only">{tagLabels[tag]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p
          className={`shrink-0 font-display text-base font-bold ${
            soldOut ? "text-[#6D625A]" : "text-[#9A4706]"
          }`}
        >
          {formatPrice(item.price)}
          {soldOut && <span className="sr-only"> (sold out)</span>}
        </p>
      </div>
    </article>
  );
}