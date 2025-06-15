import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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