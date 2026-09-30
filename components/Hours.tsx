import type { RestaurantHours } from "@/types/menu";

interface HoursProps {
  hours: RestaurantHours;
  highlightedDay: keyof RestaurantHours;
}

const days: Array<[keyof RestaurantHours, string]> = [
  ["monday", "Monday"],
  ["tuesday", "Tuesday"],
  ["wednesday", "Wednesday"],
  ["thursday", "Thursday"],
  ["friday", "Friday"],
  ["saturday", "Saturday"],
  ["sunday", "Sunday"]
];

const isClosedValue = (value: string) => value.trim().toLowerCase() === "closed";

export function Hours({ hours, highlightedDay }: HoursProps) {
  const todayLabel = days.find(([key]) => key === highlightedDay)?.[1];
  const todayHours = hours[highlightedDay];
  const todayClosed = isClosedValue(todayHours);

  return (
    <section
      aria-labelledby="hours-title"
      className="overflow-hidden rounded-3xl border border-[#E8DED2] bg-[#FFFDFC]"
    >
      <div className="flex flex-col gap-4 border-b border-[#EEE5DC] p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <h2 id="hours-title" className="font-display text-3xl font-bold text-[#2B221C]">
          Opening hours
        </h2>

        <div
          className={`inline-flex items-center gap-2.5 self-start rounded-full px-4 py-2 text-sm font-semibold sm:self-auto ${
            todayClosed ? "bg-[#F3EEE9] text-[#6B5D52]" : "bg-[#FBF1E6] text-[#8A3F06]"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${todayClosed ? "bg-[#A39383]" : "bg-[#B45309]"}`}
          />
          {todayClosed ? `Closed ${todayLabel}` : `Today ${todayHours}`}
        </div>
      </div>

      <dl className="p-3 sm:p-5">
        {days.map(([key, label]) => {
          const value = hours[key];
          const isToday = key === highlightedDay;
          const isClosed = isClosedValue(value);

          const rowTone = isToday
            ? isClosed
              ? "bg-[#F3EEE9]"
              : "bg-[#FBF1E6]"
            : isClosed
              ? "bg-[#FAF7F4]"
              : "";

          return (
            <div
              key={key}
              aria-current={isToday ? "date" : undefined}
              className={`relative flex items-center justify-between gap-6 rounded-xl px-3 py-3 sm:px-4 ${rowTone}`}
            >
              {isToday && (
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-2 left-0 w-1 rounded-full ${
                    isClosed ? "bg-[#A39383]" : "bg-[#B45309]"
                  }`}
                />
              )}

              <dt
                className={`text-[15px] ${
                  isClosed
                    ? "text-[#9A8B7E]"
                    : isToday
                      ? "font-bold text-[#2B221C]"
                      : "text-[#4E443D]"
                }`}
              >
                {label}
                {isToday && <span className="sr-only"> (today)</span>}
              </dt>

              <dd className="text-[15px] tabular-nums">
                {isClosed ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E3D9CF] bg-white px-3 py-1 text-[13px] font-semibold text-[#7A6B5F]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    >
                      <circle cx="8" cy="8" r="6" />
                      <path d="M4 12L12 4" />
                    </svg>
                    Closed
                  </span>
                ) : (
                  <span
                    className={
                      isToday ? "font-bold text-[#2B221C]" : "font-medium text-[#4E443D]"
                    }
                  >
                    {value}
                  </span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}