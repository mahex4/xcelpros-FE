"use client";
import { getCalories } from "../actions";
import { CaloriesFormState } from "@/lib/types";
import { useActionState } from "react";

const initialState: CaloriesFormState = {
    error: null,
    data: null,
};

export default function CalorieForm() {
    const [state, formAction] = useActionState(getCalories, initialState);

    return (
        <form
            action={formAction}
            className="space-y-4"
            aria-labelledby="calorie-form-title"
        >
            <h2 id="calorie-form-title" className="text-xl font-bold">
                Calculate Dish Calories
            </h2>

            <div>
                <label htmlFor="dish_name" className="block mb-1 font-medium">
                    Dish Name
                </label>
                <input
                    type="text"
                    id="dish_name"
                    name="dish_name"
                    required
                    aria-required="true"
                    aria-invalid={state?.error ? "true" : "false"}
                    aria-describedby="dish-name-error"
                    className="w-full p-2 border rounded"
                />
                {state?.error && (
                    <p id="dish-name-error" className="text-red-500 mt-1" role="alert">
                        {state.error}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="servings" className="block mb-1 font-medium">
                    Servings
                </label>
                <input
                    type="number"
                    id="servings"
                    name="servings"
                    min="1"
                    defaultValue="1"
                    aria-required="true"
                    className="w-full p-2 border rounded"
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Calculate calories"
            >
                Calculate Calories
            </button>

            {state?.data && (
                <div
                    className="mt-4 p-4 bg-gray-100 rounded"
                    role="status"
                    aria-live="polite"
                >
                    <h3 className="font-bold">{state.data.dish_name}</h3>
                    <p>Servings: {state.data.servings}</p>
                    <p>Calories per serving: {state.data.calories_per_serving}</p>
                    <p>Total calories: {state.data.total_calories}</p>
                    <p className="text-sm text-gray-500">Source: {state.data.source}</p>
                </div>
            )}
        </form>
    );
}