"use server";

import { CaloriesFormState, CaloriesResponse } from "@/lib/types";
import { cookies } from "next/headers";

export async function getCalories(
    prevState: CaloriesFormState,
    formData: FormData
): Promise<CaloriesFormState> {
    const cookie = await cookies();
    const token = cookie.get('token')?.value;

    console.log('token fetch', token);
    const rawFormData = {
        dish_name: formData.get("dish_name") as string,
        servings: Number(formData.get("servings")) || 1,
    };

    // Input validation
    if (!rawFormData.dish_name?.trim()) {
        return {
            error: "Dish name is required",
            data: null,
        };
    }

    if (rawFormData.servings <= 0) {
        return {
            error: "Servings must be greater than 0",
            data: null,
        };
    }

    console.log('calling', rawFormData);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-calories`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify(rawFormData),
        });

        console.log('resp gotten');

        if (!response.ok) throw new Error("Failed to fetch calorie data");

        const data = (await response.json()) as CaloriesResponse;

        console.log('resp data', data);

        return {
            error: null,
            data,
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : "An unknown error occurred",
            data: null,
        };
    }
}