interface SpecialCalloutProps {
  soldOut: boolean;
  title: string;
  blurb: string;
}

export function SpecialCallout({ soldOut, title, blurb }: SpecialCalloutProps) {
  return (
    <aside
      aria-label="Today's special"
      className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 ${
        soldOut
          ? "border-[#E3D6CA] bg-[#F3EEE9] text-[#2B221C]"
          : "border-[#D69A5A] bg-[#B45309] text-white shadow-[0_18px_50px_rgba(180,83,9,0.18)]"
      }`}
    >
      {!soldOut && (
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 h-48 w-48 rounded-full border-[28px] border-white/10"
        />
      )}

      <div className="relative flex items-start gap-4 sm:gap-5">
        <span
          aria-hidden="true"
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
            soldOut ? "bg-white text-[#8A7A6D] ring-1 ring-[#E3D6CA]" : "bg-white/15 text-white ring-1 ring-white/25"
          }`}
        >
          {soldOut ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M6 18L18 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" />
            </svg>
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className={`text-sm font-semibold ${soldOut ? "text-[#6B5D52]" : "text-white/90"}`}>
              Today&apos;s special
            </p>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                soldOut
                  ? "border border-[#D9CCBF] bg-white text-[#6B5D52]"
                  : "bg-white text-[#9A4706]"
              }`}
            >
              {soldOut ? "Sold out" : "Chef's pick"}
            </span>
          </div>

          <h2
            className={`mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl ${
              soldOut ? "text-[#6B5D52] line-through decoration-[#A39383] decoration-2" : ""
            }`}
          >
            {title}
          </h2>

          <p className={`mt-2 max-w-2xl text-[15px] leading-7 ${soldOut ? "text-[#5F544B]" : "text-white/90"}`}>
            {soldOut
              ? "Our chef's pick has sold out for today. We’ll have a fresh batch another morning."
              : blurb}
          </p>
        </div>
      </div>
    </aside>
  );
}