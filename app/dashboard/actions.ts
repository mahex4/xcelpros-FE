"use server";

import { CaloriesFormState, CaloriesResponse, GroupedMeals, SaveMealState } from "@/lib/types";
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/calories/get-calories`, {
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

export async function saveMeal(
    mealData: CaloriesResponse
): Promise<SaveMealState> {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
        return { error: "Authentication required", success: false };
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/meals/save-meal`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(mealData),
            }
        );

        if (!response.ok) {
            // Try to get error details from response
            const errorData = await response.json().catch(() => ({}));
            return {
                error: errorData.error || "Failed to save meal",
                success: false,
            };
        }

        return { error: null, success: true };
    } catch (error) {
        console.error("Save meal error:", error);
        return {
            error: error instanceof Error ? error.message : "An unknown error occurred",
            success: false,
        };
    }
}

export async function getMeals(): Promise<GroupedMeals> {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
        throw new Error("Authentication required");
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/meals/meals`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch meals");
        }

        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Get meals error:", error);
        throw error instanceof Error
            ? error
            : new Error("An unknown error occurred");
    }
}
