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


const API_KEY = process.env.USDA_API_KEY!;
const PAGE_SIZE = process.env.USDA_PAGE_SIZE ?? 100;
const USDA_SEARCH_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

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
  return raw
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function pickBestMatches(foods: FoodItem[], query: string): FoodItem[] {
  const q = query.trim().toLowerCase();
  const tokens = q.split(/\s+/);

  const allWordMatches = foods.filter(food =>
    tokens.every(tok => food.description.toLowerCase().includes(tok))
  );

  const results: FoodItem[] = [];
  const usedIds = new Set<number>();

  const addUniqueItems = (items: FoodItem[]) => {
    for (const item of items) {
      if (usedIds.has(item.fdcId)) continue;
      if (results.length >= 5) return;
      usedIds.add(item.fdcId);
      results.push(item);
    }
  };

  addUniqueItems(allWordMatches);
  if (results.length >= 5) return results;

  const prefixMatches = foods.filter(food =>
    food.description.toLowerCase().startsWith(q)
  );
  addUniqueItems(prefixMatches);
  if (results.length >= 5) return results;

  const fuse = new Fuse(foods, {
    keys: [{
      name: 'description',
      weight: 0.9,
      getFn: (item) => item.description.toLowerCase()
    }],
    includeScore: true,
    minMatchCharLength: 2,
    threshold: 0.4, // Balanced threshold
    ignoreLocation: true,
  });

  const fuseResults = fuse.search(q)
    .filter(r => r.score! < 0.6)
    .map(r => r.item)
    .filter(item => !usedIds.has(item.fdcId));

  addUniqueItems(fuseResults);

  return results;
}


export interface MinimalSearchItem {
  id: number;
  description: string;
}

export async function searchFood(query: string): Promise<MinimalSearchItem[]> {
  const dish_name = sanitizeDishName(query);
  if (!dish_name) return [];

  try {
    const url = `${USDA_SEARCH_URL}?api_key=${API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: dish_name,
        pageSize: Number(PAGE_SIZE),
        dataType: ["Foundation", "Branded"],
        requireAllWords: true,
      }),
    });

    if (!res.ok) {
      throw new Error(`USDA API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const foods = data.foods || [];

    return pickBestMatches(foods, query)
      .slice(0, 5)
      .map(item => ({
        id: item.fdcId,
        description: item.description,
      }));
  } catch (error) {
    console.error("Food search failed:", error);
    return [];
  }
}