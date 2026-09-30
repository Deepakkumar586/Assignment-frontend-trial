"use client";

import { useEffect, useMemo, useState } from "react";
import { getLisbonTime, weekdayKeys } from "@/lib/lisbon-time";
import type { DemoState, MenuData, RestaurantHours } from "@/types/menu";
import { CategoryNav } from "./CategoryNav";
import { ClosedBanner } from "./ClosedBanner";
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

function getLiveDayAndTime(): { day: keyof RestaurantHours; minutes: number } {
  return getLisbonTime(new Date());
}

function isOpenNow(hours: string, minutes: number): boolean {
  if (hours.toLowerCase() === "closed") return false;
  const matches = hours.match(/(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/);
  if (!matches) return false;

  const open = Number(matches[1]) * 60 + Number(matches[2]);
  const close = Number(matches[3]) * 60 + Number(matches[4]);

  return minutes >= open && minutes < close;
}

function getNextOpening(hours: RestaurantHours, day: keyof RestaurantHours, minutes: number): string {
  const dayIndex = weekdayKeys.indexOf(day);
  const currentHours = hours[day].match(/(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/);

  if (currentHours && minutes < Number(currentHours[1]) * 60 + Number(currentHours[2])) {
    return `${day[0].toUpperCase()}${day.slice(1)} at ${currentHours[1]}:${currentHours[2]}`;
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = weekdayKeys[(dayIndex + offset) % weekdayKeys.length];
    const nextHours = hours[nextDay].match(/(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/);
    if (nextHours) {
      const label = `${nextDay[0].toUpperCase()}${nextDay.slice(1)}`;
      return `${label} at ${nextHours[1]}:${nextHours[2]}`;
    }
  }

  return "soon";
}

export function MenuPage({ data, state, initialDay, initialMinutes }: MenuPageProps) {
  const [liveTime, setLiveTime] = useState(() => ({ day: initialDay, minutes: initialMinutes }));

  useEffect(() => {
    const timer = window.setInterval(() => setLiveTime(getLiveDayAndTime()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const day: keyof RestaurantHours = state === "closed"
    ? "monday"
    : state
      ? "tuesday"
      : liveTime.day;
  const timeMinutes = state ? 11 * 60 + 30 : liveTime.minutes;
  const isOpen = isOpenNow(data.restaurant.hours[day], timeMinutes);

  const soldOut = state === "special-sold-out";
  const specialItem = useMemo(
    () => data.categories.flatMap((category) => category.items).find((item) => item.id === data.today_special.item_id),
    [data]
  );

  const nextOpening = getNextOpening(data.restaurant.hours, day, timeMinutes);

  return (
    <div className="min-h-screen">
      {state === "closed" && <ClosedBanner nextOpening={nextOpening} />}

      <header className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-2 bg-[#B45309]"
        />

        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <StatusBadge
                  open={isOpen}
                  label={isOpen ? "Open now" : "Closed now"}
                />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8A7A6D]">
                  Lisbon · Est. 2021
                </span>
              </div>

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#B45309]">
                All-day café & brunch
              </p>
              <h1 className="font-display max-w-3xl text-5xl font-bold leading-[0.94] tracking-[-0.035em] sm:text-7xl">
                {data.restaurant.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#74685E] sm:text-xl">
                {data.restaurant.tagline}
              </p>
              <a
                href="#brunch"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B45309] px-6 text-sm font-bold text-white transition hover:bg-[#913F07]"
              >
                Explore the menu <span aria-hidden="true" className="ml-2">↓</span>
              </a>
            </div>

            <div className="rounded-3xl border border-[#E8DED2] bg-[#FFFDFC] p-6 paper-shadow">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A7A6D]">
                  At a glance
                </span>
                <span className="font-display text-sm font-bold text-[#B45309]">Lisboa</span>
              </div>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[#8A7A6D]">Today</dt>
                  <dd className="mt-1 font-bold capitalize">{day}</dd>
                </div>
                <div>
                  <dt className="text-[#8A7A6D]">Hours</dt>
                  <dd className="mt-1 font-bold">{data.restaurant.hours[day]}</dd>
                </div>
                <div>
                  <dt className="text-[#8A7A6D]">Address</dt>
                  <dd className="mt-1 font-bold leading-5">{data.restaurant.address.split(",")[0]}</dd>
                </div>
                <div>
                  <dt className="text-[#8A7A6D]">Coffee</dt>
                  <dd className="mt-1 font-bold">Single-origin</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <SpecialCallout
            soldOut={soldOut}
            title={specialItem?.name ?? "Chef's pick"}
            blurb={data.today_special.blurb}
          />

          {specialItem && soldOut && (
            <p className="sr-only" role="status">
              {specialItem.name} is currently sold out.
            </p>
          )}
        </div>

        <CategoryNav categories={data.categories} />

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-14 sm:gap-20">
            {data.categories.map((category) => (
              <MenuSection
                key={category.id}
                category={category}
                soldOutItemId={soldOut ? data.today_special.item_id : undefined}
              />
            ))}
          </div>

          <div className="mt-16 grid gap-6 border-t border-[#E8DED2] pt-8 sm:mt-20 sm:pt-10 md:grid-cols-[1.2fr_0.8fr]">
            <Hours
              hours={data.restaurant.hours}
              highlightedDay={day}
            />

            <aside className="rounded-3xl bg-[#F1E9DF] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B45309]">Good to know</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Take your time.</h2>
              <p className="mt-3 text-sm leading-6 text-[#74685E]">
                We keep the menu focused, the coffee strong, and the room unhurried. Come hungry.
              </p>
              <a
                href="#brunch"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#B45309] px-5 text-sm font-bold text-white transition hover:bg-[#913F07]"
              >
                Back to brunch
              </a>
            </aside>
          </div>
        </div>
      </main>

      <Footer restaurant={data.restaurant} />
    </div>
  );
}
