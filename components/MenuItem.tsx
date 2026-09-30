import type { MenuItem as MenuItemType } from "@/types/menu";

interface MenuItemProps {
  item: MenuItemType;
  soldOut?: boolean;
}

const tagLabels: Record<MenuItemType["tags"][number], string> = {
  V: "Vegetarian",
  GF: "Gluten-free",
  spicy: "Spicy"
};

export function MenuItem({ item, soldOut = false }: MenuItemProps) {
  const unavailable = soldOut;
  const price = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR"
  }).format(item.price);

  return (
    <article
      className={`menu-card rounded-2xl p-5 sm:p-6 ${
        unavailable ? "opacity-55 grayscale-[0.2]" : ""
      }`}
      aria-disabled={unavailable || undefined}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold text-[#2A211B]">
              {item.name}
            </h3>

            {unavailable && (
              <span className="rounded-full bg-[#EEE6DE] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#6D625A]">
                Sold out
              </span>
            )}
          </div>

          {item.description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#74685E]">
              {item.description}
            </p>
          )}

          {item.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Dietary information">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  aria-label={`${tag}: ${tagLabels[tag]}`}
                  title={tagLabels[tag]}
                  className="rounded-md border border-[#E3D8CC] bg-[#FAF6F0] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#6B5A4D]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p
          className={`shrink-0 font-display text-base font-bold ${
            unavailable ? "text-[#8E8177]" : "text-[#B45309]"
          }`}
          aria-label={price}
        >
          {price}
        </p>
      </div>
    </article>
  );
}
