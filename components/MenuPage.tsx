"use client";

import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";
import { dayLabel, getOpenStatus } from "@/lib/hours";
import { getLisbonTime, type Clock } from "@/lib/lisbon-time";
import type { DemoState, DietFilter, MenuData, RestaurantHours } from "@/types/menu";
import { CategoryNav } from "./CategoryNav";
import { ClosedBanner } from "./ClosedBanner";
import { DietaryFilter } from "./DietaryFilter";
import { Footer } from "./Footer";
import { Hours } from "./Hours";
import { MenuSection } from "./MenuSection";
import { SpecialCallout } from "./SpecialCallout";
import { StatusBadge } from "./StatusBadge";

interface MenuPageProps {
  data: MenuData;
  state?: DemoState;
  initialDay: keyof RestaurantHours;
  initialMinutes: number;
}

/** Demo states pin the clock so every state is reproducible via ?state=… */
function resolveClock(state: DemoState | undefined, live: Clock): Clock {
  if (state === "closed") return { day: "monday", minutes: 11 * 60 + 30 };
  if (state) return { day: "tuesday", minutes: 11 * 60 + 30 };
  return live;
}

export function MenuPage({ data, state, initialDay, initialMinutes }: MenuPageProps) {
  const [liveTime, setLiveTime] = useState<Clock>(() => ({
    day: initialDay,
    minutes: initialMinutes
  }));
  const [filter, setFilter] = useState<DietFilter>("all");

  useEffect(() => {
    const timer = window.setInterval(() => setLiveTime(getLisbonTime(new Date())), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const { day, minutes } = resolveClock(state, liveTime);
  const { restaurant } = data;
  const status = getOpenStatus(restaurant.hours, day, minutes);
  const closedAllDay = status.kind === "closed" && status.scope === "today";

  const soldOut = state === "special-sold-out";
  const specialItemId = data.today_special.item_id;

  const specialItem = useMemo(
    () =>
      data.categories
        .flatMap((category) => category.items)
        .find((item) => item.id === specialItemId),
    [data, specialItemId]
  );

  const visibleCategories = useMemo(() => {
    if (filter === "all") return data.categories;

    return data.categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.tags.includes(filter))
      }))
      .filter((category) => category.items.length > 0);
  }, [data.categories, filter]);

  const visibleCount = visibleCategories.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#2B221C] focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to menu
      </a>

      {status.kind === "closed" && (
        <ClosedBanner scope={status.scope} nextOpening={status.nextOpening} />
      )}

      <header className="relative overflow-hidden">
        <div aria-hidden="true" className="no-print absolute inset-x-0 top-0 h-2 bg-[#B45309]" />

        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 print:pb-4 print:pt-4">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <div
                className="fade-up mb-6 flex flex-wrap items-center gap-3"
                style={{ "--delay": "0ms" } as React.CSSProperties}
              >
                <StatusBadge
                  open={status.kind === "open"}
                  label={status.kind === "open" ? `Open now · until ${status.closesAt}` : "Closed now"}
                />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A6B5F]">
                  Lisbon · Est. 2021
                </span>
              </div>

              <p
                className="fade-up mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#B45309]"
                style={{ "--delay": "80ms" } as React.CSSProperties}
              >
                All-day café &amp; brunch
              </p>
              <h1
                className="fade-up font-display max-w-3xl text-5xl font-bold leading-[0.94] tracking-[-0.035em] sm:text-7xl"
                style={{ "--delay": "140ms" } as React.CSSProperties}
              >
                {restaurant.name}
              </h1>
              <p
                className="fade-up mt-6 max-w-xl text-lg leading-8 text-[#6B5F55] sm:text-xl"
                style={{ "--delay": "220ms" } as React.CSSProperties}
              >
                {restaurant.tagline}
              </p>
              <a
                href="#brunch"
                className="fade-up no-print mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B45309] px-6 text-sm font-bold text-white transition hover:bg-[#913F07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
                style={{ "--delay": "300ms" } as React.CSSProperties}
              >
                Explore the menu <span aria-hidden="true" className="ml-2">↓</span>
              </a>
            </div>

            <div
              className="fade-up no-print paper-shadow rounded-3xl border border-[#E8DED2] bg-[#FFFDFC] p-6"
              style={{ "--delay": "380ms" } as React.CSSProperties}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A6B5F]">
                  At a glance
                </span>
                <span className="font-display text-sm font-bold text-[#B45309]">Lisboa</span>
              </div>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[#7A6B5F]">Today</dt>
                  <dd className="mt-1 font-bold">{dayLabel(day)}</dd>
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

      <main id="main" tabIndex={-1} className="outline-none">
        {/* A chef's pick for a day we're closed would be misleading, so it's hidden. */}
        {!closedAllDay && (
          <div className="no-print mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
            <SpecialCallout
              soldOut={soldOut}
              title={specialItem?.name ?? "Chef's pick"}
              price={specialItem?.price}
              blurb={data.today_special.blurb}
            />
          </div>
        )}

        <DietaryFilter value={filter} onChange={setFilter} resultCount={visibleCount} />

        <CategoryNav categories={visibleCategories} />

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 print:py-4">
          <div className="print-columns grid gap-14 sm:gap-20">
            {visibleCategories.map((category) => (
              <MenuSection
                key={category.id}
                category={category}
                specialItemId={closedAllDay ? undefined : specialItemId}
                soldOutItemId={soldOut && !closedAllDay ? specialItemId : undefined}
              />
            ))}
          </div>

          <div className="no-print mt-16 grid gap-6 border-t border-[#E8DED2] pt-8 sm:mt-20 sm:pt-10 md:grid-cols-[1.2fr_0.8fr]">
            <Hours hours={restaurant.hours} highlightedDay={day} />

            <aside className="rounded-3xl bg-[#F1E9DF] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A3F06]">
                Good to know
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold">Take your time.</h2>
              <p className="mt-3 text-sm leading-6 text-[#6B5F55]">
                We keep the menu focused, the coffee strong, and the room unhurried. Come hungry.
              </p>
              <a
                href="#brunch"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#B45309] px-5 text-sm font-bold text-white transition hover:bg-[#913F07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
              >
                Back to brunch
              </a>
            </aside>
          </div>
        </div>
      </main>

      <Footer restaurant={restaurant} />
    </div>
  );
}