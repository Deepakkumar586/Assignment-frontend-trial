import type { Restaurant } from "@/types/menu";

interface FooterProps {
  restaurant: Restaurant;
}

const linkClass =
  "inline-flex min-h-11 w-fit items-center text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4B27B]";

export function Footer({ restaurant }: FooterProps) {
  return (
    <footer className="no-print border-t border-[#E8DED2] bg-[#2A211B] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl font-bold">{restaurant.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">{restaurant.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E4B27B]">Find us</p>
          <address className="mt-3 not-italic text-sm leading-6">
            <a
              className={linkClass}
              href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurant.address}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </address>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E4B27B]">Say hello</p>
          <div className="mt-3 flex flex-col text-sm">
            <a className={linkClass} href={`tel:${restaurant.phone.replace(/\s/g, "")}`}>
              {restaurant.phone}
            </a>
            <a
              className={linkClass}
              href={`https://instagram.com/${restaurant.instagram.replace(/^@/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurant.instagram}
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">
        {restaurant.name} · Lisbon · Menu
      </div>
    </footer>
  );
}