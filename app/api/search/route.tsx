import { searchFood, sanitizeDishName } from '@/lib/utils';
import Fuse from 'fuse.js';
import { NextRequest } from 'next/server';

export type FoodItem = {
    description: string;
    servingSize?: number;
    foodNutrients: {
        nutrientNumber: string;
        value: number;
    }[];
};

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query");
    if (!query) {
        return new Response(JSON.stringify({ error: "Missing query" }), { status: 400 });
    }

    const dish_name = sanitizeDishName(query);
    if (!dish_name) {
        return new Response(JSON.stringify({ error: "Invalid dish name" }), { status: 400 });
    }

    try {
        const foods = await searchFood(dish_name);
        if (!foods.length) {
            return new Response(JSON.stringify([]), { status: 200 });
        }

        const fuse = new Fuse(foods, {
            keys: ["description"],
            threshold: 0.4,
        });

        const results = fuse.search(dish_name).slice(0, 5).map(r => r.item);

        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error("Error in GET /api/search:", err);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
