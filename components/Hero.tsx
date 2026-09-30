import type { Restaurant, RestaurantHours } from "@/types/menu";
import { StatusBadge } from "./StatusBadge";

interface HeroProps {
  restaurant: Restaurant;
  day: keyof RestaurantHours;
  isOpen: boolean;
  ctaHref: string;
}

export function Hero({ restaurant, day, isOpen, ctaHref }: HeroProps) {
  return (
    <header className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-[#B45309]" />

      <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <StatusBadge open={isOpen} />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A6B5F]">
                Lisbon · Est. 2021
              </span>
            </div>

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#B45309]">
              All-day café &amp; brunch
            </p>
            <h1 className="font-display max-w-3xl text-5xl font-bold leading-[0.94] tracking-[-0.035em] sm:text-7xl">
              {restaurant.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#74685E] sm:text-xl">
              {restaurant.tagline}
            </p>
            <a
              href={ctaHref}
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B45309] px-6 text-sm font-bold text-white transition hover:bg-[#913F07]"
            >
              Explore the menu <span aria-hidden="true" className="ml-2">↓</span>
            </a>
          </div>

          <div className="paper-shadow rounded-3xl border border-[#E8DED2] bg-[#FFFDFC] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A6B5F]">
                At a glance
              </span>
              <span className="font-display text-sm font-bold text-[#B45309]">Lisboa</span>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[#7A6B5F]">Today</dt>
                <dd className="mt-1 font-bold capitalize">{day}</dd>
              </div>
              <div>
                <dt className="text-[#7A6B5F]">Hours</dt>
                <dd className="mt-1 font-bold">{restaurant.hours[day]}</dd>
              </div>
              <div>
                <dt className="text-[#7A6B5F]">Address</dt>
                <dd className="mt-1 font-bold leading-5">{restaurant.address.split(",")[0]}</dd>
              </div>
              <div>
                <dt className="text-[#7A6B5F]">Coffee</dt>
                <dd className="mt-1 font-bold">Single-origin</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </header>
  );
}