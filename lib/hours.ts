import type { RestaurantHours } from "@/types/menu";
import { weekdayKeys } from "@/lib/lisbon-time";

const RANGE = /(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/;

export interface TimeRange {
  open: number;
  close: number;
  openLabel: string;
  closeLabel: string;
}

export type OpenStatus =
  | { kind: "open"; closesAt: string }
  | { kind: "closed"; scope: "today" | "now"; nextOpening: string };

export const isClosedValue = (value: string) => value.trim().toLowerCase() === "closed";

export function dayLabel(day: keyof RestaurantHours): string {
  return `${day[0].toUpperCase()}${day.slice(1)}`;
}

export function parseRange(value: string): TimeRange | null {
  const match = value.match(RANGE);
  if (!match) return null;

  return {
    open: Number(match[1]) * 60 + Number(match[2]),
    close: Number(match[3]) * 60 + Number(match[4]),
    openLabel: `${match[1]}:${match[2]}`,
    closeLabel: `${match[3]}:${match[4]}`
  };
}

function findNextOpening(
  hours: RestaurantHours,
  day: keyof RestaurantHours,
  minutes: number
): string {
  const today = parseRange(hours[day]);
  if (today && minutes < today.open) return `today at ${today.openLabel}`;

  const index = weekdayKeys.indexOf(day);

  for (let offset = 1; offset <= 7; offset += 1) {
    const next = weekdayKeys[(index + offset) % weekdayKeys.length];
    const range = parseRange(hours[next]);
    if (!range) continue;

    const when =
      offset === 1 ? "tomorrow" : offset === 7 ? `next ${dayLabel(next)}` : dayLabel(next);
    return `${when} at ${range.openLabel}`;
  }

  return "soon";
}

export function getOpenStatus(
  hours: RestaurantHours,
  day: keyof RestaurantHours,
  minutes: number
): OpenStatus {
  const range = parseRange(hours[day]);

  if (!range) {
    return { kind: "closed", scope: "today", nextOpening: findNextOpening(hours, day, minutes) };
  }

  if (minutes >= range.open && minutes < range.close) {
    return { kind: "open", closesAt: range.closeLabel };
  }

  return { kind: "closed", scope: "now", nextOpening: findNextOpening(hours, day, minutes) };
}