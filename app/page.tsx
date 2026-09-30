import { MenuPage } from "@/components/MenuPage";
import { menuData } from "@/data/menu";
import { getLisbonTime } from "@/lib/lisbon-time";
import type { DemoState } from "@/types/menu";

interface PageProps {
  searchParams: Promise<{ state?: string }>;
}

function getDemoState(value: string | undefined): DemoState | undefined {
  if (value === "closed" || value === "special-sold-out" || value === "open") return value;
  return undefined;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const state = getDemoState(params.state);
  const localTime = getLisbonTime(new Date());

  return (
    <MenuPage
      data={menuData}
      state={state}
      initialDay={localTime.day}
      initialMinutes={localTime.minutes}
    />
  );
}
