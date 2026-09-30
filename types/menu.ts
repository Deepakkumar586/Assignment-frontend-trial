export type MenuTag = "V" | "GF" | "spicy";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags: MenuTag[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface RestaurantHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Restaurant {
  name: string;
  tagline: string;
  address: string;
  hours: RestaurantHours;
  brand_color: string;
  phone: string;
  instagram: string;
}

export interface MenuData {
  restaurant: Restaurant;
  today_special: {
    item_id: string;
    blurb: string;
  };
  categories: MenuCategory[];
}

export type DemoState = "open" | "closed" | "special-sold-out";

export type DietFilter = "all" | Extract<MenuTag, "V" | "GF">;