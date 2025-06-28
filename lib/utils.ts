import { clsx, type ClassValue } from "clsx"
import Fuse from "fuse.js";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toCapitalizedWords(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


export async function getPexelsImage(query: string) {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXEL_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch photo");
    }

    const data = await response.json();
    return data.photos?.[0] || null;
  } catch (error) {
    console.error("Error fetching Pexels image:", error);
    return null;
  }
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


const API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";
const API_KEY = process.env.USDA_API_KEY!;
const PAGE_SIZE = process.env.USDA_PAGE_SIZE ?? 20;

type FoodItem = {
  fdcId: number
  description: string;
  servingSize?: number;
  foodNutrients: {
    nutrientNumber: string;
    value: number;
  }[];
};

export function sanitizeDishName(raw: string): string {
  return raw.replace(/[^\w\s]/g, "").replace(/\s+/g, " ");
}

export function pickBestMatches(foods: FoodItem[], query: string): FoodItem[] {
  const q = query.trim().toLowerCase();

  const prefixMatches = foods.filter(food =>
    food.description.toLowerCase().startsWith(q)
  );

  if (prefixMatches.length >= 5) {
    return prefixMatches.slice(0, 5);
  }

  const fuse = new Fuse(foods, {
    keys: ["description"],
    threshold: 0.4,
    ignoreLocation: true,
  });

  const fuzzyResults = fuse.search(q)
    .map(result => result.item)
    .filter(item =>
      !prefixMatches.find(pm => pm.fdcId === item.fdcId)
    );

  return [...prefixMatches, ...fuzzyResults].slice(0, 5);
}



export interface MinimalSearchItem {
  id: number;
  description: string;
}

export async function searchFood(query: string): Promise<MinimalSearchItem[]> {
  const url = new URL(API_URL);
  const dish_name = sanitizeDishName(query);
  url.searchParams.append('api_key', API_KEY!);
  url.searchParams.append('query', dish_name);
  url.searchParams.append('pageSize', String(PAGE_SIZE));

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(`Failed to fetch food data: ${res.statusText}`);
    return [];
  }

  const data = await res.json();
  const bestMatches = pickBestMatches(data.foods, query) ?? []

  console.log('best', bestMatches);

  const descriptions: MinimalSearchItem[] = bestMatches.map(item => ({
    id: item.fdcId,
    description: item.description
  }));


  if (descriptions.length === 0) {
    throw new Error(`No matching food items found for "${query}". Please try a different name.`);
  }

  return descriptions;
}
