"use client";
import { Button } from "@/components/ui/button";
import { getCalories, saveMeal } from "../actions";
import { CaloriesFormState, SaveMealState } from "@/lib/types";
import { useMealStore } from "@/stores/mealStore";
import { useActionState, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: CaloriesFormState = {
    error: null,
    data: null,
};

export default function CalorieForm() {
    const [state, formAction] = useActionState(getCalories, initialState);
    const [saveState, setSaveState] = useState<SaveMealState>({
        error: null,
        success: false,
    });
    const [isSaving, startSaving] = useTransition();
    const triggerRefresh = useMealStore(state => state.triggerRefresh); 

    const handleSaveMeal = () => {
        if (!state.data) return;

        setSaveState({ error: null, success: false });

        startSaving(async () => {
            const result = await saveMeal(state.data!);
            setSaveState(result);

            if (result.success) {
                triggerRefresh();
            }
        });
    };
    

    return (
        <form
            action={formAction}
            className="space-y-4 min-w-1/3 w-full md:w-auto"
            aria-labelledby="calorie-form-title"
        >
            <h2 id="calorie-form-title" className="text-xl font-bold text-center">
                Calculate Dish Calories
            </h2>

            <div>
                <Label htmlFor="dish_name" className="block mb-1 font-medium">
                    Dish Name
                </Label>
                <Input
                    type="text"
                    id="dish_name"
                    name="dish_name"
                    placeholder="Enter your Dish"
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
                <Label htmlFor="servings" className="block mb-1 font-medium">
                    Servings
                </Label>
                <Input
                    type="number"
                    id="servings"
                    name="servings"
                    min="1"
                    defaultValue="1"
                    aria-required="true"
                    className="w-full p-2 border rounded"
                />
            </div>

            <Button
                type="submit"
                aria-label="Calculate calories"
                className="w-full"
            >
                Calculate Calories
            </Button>

            {state?.data && (
                <div className="flex flex-col gap-2 w-full">
                    <div
                        className="mt-4 p-4 bg-slate-100 rounded-md w-full"
                        role="status"
                        aria-live="polite"
                    >
                        <h3 className="font-bold">{state.data.dish_name}</h3>
                        <p>Servings: {state.data.servings}</p>
                        <p>Calories per serving: {state.data.calories_per_serving}</p>
                        <p>Total calories: {state.data.total_calories}</p>
                        <p className="text-sm text-slate-500">Source: {state.data.source}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={handleSaveMeal}
                            disabled={isSaving}
                            className="w-full"
                            aria-label="Add to today's meals"
                        >
                            {isSaving ? "Saving..." : "Add to Today's Meals"}
                        </Button>

                        {saveState.error && (
                            <p className="text-red-500" role="alert">
                                {saveState.error}
                            </p>
                        )}
                        {saveState.success && (
                            <p className="text-green-500" role="status">
                                Meal added successfully!
                            </p>
                        )}
                    </div>
                </div>
            )}
            
        </form>
    );
}