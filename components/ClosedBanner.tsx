interface ClosedBannerProps {
  nextOpening: string;
  hoursHref?: string;
}

export function ClosedBanner({ nextOpening, hoursHref = "#hours-title" }: ClosedBannerProps) {
  return (
    <div role="status" className="border-b border-[#E3D6CA] bg-[#F2EBE4]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 sm:items-center">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#6B5D52] ring-1 ring-[#E3D6CA] sm:mt-0"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="10" r="7.5" />
              <path d="M10 5.5V10l3 2" />
            </svg>
          </span>

          <p className="text-sm leading-snug text-[#2B221C]">
            <span className="font-bold">We&apos;re closed today.</span>{" "}
            <span className="block text-[#5F544B] sm:inline">
              We&apos;ll be ready for you{" "}
              <span className="font-semibold text-[#2B221C]">{nextOpening}</span>.
            </span>
          </p>
        </div>

        <a
          href={hoursHref}
          className="ml-11 inline-flex w-fit items-center gap-1 rounded-md text-sm font-semibold text-[#8A3F06] underline decoration-[#B45309]/40 underline-offset-4 transition-colors hover:text-[#B45309] hover:decoration-[#B45309] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309] sm:ml-0 sm:shrink-0"
        >
          See opening hours
        </a>
      </div>
    </div>
  );
}