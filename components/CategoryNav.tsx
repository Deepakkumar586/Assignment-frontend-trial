"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/types/menu";

interface CategoryNavProps {
  categories: MenuCategory[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const [edges, setEdges] = useState({ start: false, end: false });
  const scrollerRef = useRef<HTMLDivElement>(null);

  const updateEdges = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const max = scroller.scrollWidth - scroller.clientWidth;
    setEdges({ start: scroller.scrollLeft > 4, end: scroller.scrollLeft < max - 4 });
  }, []);

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-120px 0px -65% 0px",
        threshold: [0.1, 0.3, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (!scroller || !active) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = active.offsetLeft - (scroller.clientWidth - active.clientWidth) / 2;

    scroller.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [activeId]);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  return (
    <nav
      aria-label="Menu categories"
      className="no-print sticky top-0 z-40 border-y border-[#E8DED2] bg-[#FBF7F1]/95 backdrop-blur"
    >
      <div className="relative mx-auto max-w-6xl">
        <div
          ref={scrollerRef}
          onScroll={updateEdges}
          className="category-scroll relative flex snap-x gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8"
        >
          {categories.map((category) => {
            const active = activeId === category.id;

            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                data-id={category.id}
                aria-current={active ? "location" : undefined}
                onClick={() => setActiveId(category.id)}
                className={`inline-flex min-h-11 shrink-0 snap-start items-center rounded-full px-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309] ${
                  active
                    ? "bg-[#B45309] text-white shadow-sm"
                    : "text-[#5F544B] hover:bg-[#F0E7DC] hover:text-[#2B221C]"
                }`}
              >
                {category.name}
              </a>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#FBF7F1] to-transparent transition-opacity duration-200 lg:hidden ${
            edges.start ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#FBF7F1] to-transparent transition-opacity duration-200 lg:hidden ${
            edges.end ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </nav>
  );
}