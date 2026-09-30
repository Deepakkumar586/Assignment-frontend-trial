import type { RestaurantHours } from "@/types/menu";

export type Weekday = keyof RestaurantHours;

export interface Clock {
  day: Weekday;
  minutes: number;
}

export const weekdayKeys: ReadonlyArray<Weekday> = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Lisbon",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});

export function getLisbonTime(date: Date): Clock {
  const parts = formatter.formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekday = read("weekday").toLowerCase();
  const day = weekdayKeys.find((key) => key === weekday) ?? "monday";

  return { day, minutes: Number(read("hour")) * 60 + Number(read("minute")) };
}