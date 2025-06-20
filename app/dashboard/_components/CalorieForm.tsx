"use client";
import { Button } from "@/components/ui/button";
import { getCalories, saveMeal } from "../actions";
import { CaloriesFormState, SaveMealState } from "@/lib/types";
import { useActionState, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderIcon } from "lucide-react";

const initialState: CaloriesFormState = {
    error: null,
    data: null,
};

export default function CalorieForm() {
    const [state, formAction, isPending] = useActionState(getCalories, initialState);
    const [saveState, setSaveState] = useState<SaveMealState>({
        error: null,
        success: false,
    });
    const [isSaving, startSaving] = useTransition();
    const router = useRouter();

    const handleSaveMeal = () => {
        if (!state.data) return;

        setSaveState({ error: null, success: false });

        startSaving(async () => {
            try {
                const result = await saveMeal(state.data!);
                setSaveState(result);

                if (result.success) {
                    toast.success("Meal added successfully");
                    router.refresh();
                    await fetch('/api/revalidate?tag=meals');
                }
            } catch (error) {
                setSaveState({
                    error: error instanceof Error ? error.message : 'Failed to save meal',
                    success: false
                });
                toast.error("Failed to save meal");
            }
        });
    };

    return (
        <form
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
                formAction={formAction}
                aria-label="Calculate calories"
                className="w-full"
            >
                Calculate Calories
            </Button>

            {isPending && (
                <Skeleton aria-describedby="Loading the meal" aria-live="polite" className="flex flex-col gap-2 w-full bg-transparent">
                    <Skeleton
                        className="mt-4 p-4 bg-card rounded-md w-full border"
                        role="status"
                    >
                        <h3 className="font-bold invisible">Dish</h3>
                        <p className="invisible">Servings: Num</p>
                        <p className="invisible">Calories per serving: Num</p>
                        <p className="invisible">Total calories: Total</p>
                        <p className="text-sm text-slate-500 invisible">Source: Source</p>
                    </Skeleton>

                    <Skeleton className="flex items-center space-x-4">
                        <Button
                            onClick={handleSaveMeal}
                            disabled={isSaving}
                            className="w-full bg-slate-900 dark:bg-card"
                            aria-label="Add to today's meals"
                        >
                            <LoaderIcon className=" animate-spin"/> Loading meal details
                        </Button>

                        {saveState.error && (
                            <p className="text-red-500" role="alert">
                                {saveState.error}
                            </p>
                        )}
                    </Skeleton>
                </Skeleton>
            )}

            {state?.data && !isPending && (
                <div className="flex flex-col gap-2 w-full">
                    <div
                        className="mt-4 p-4 bg-card rounded-md w-full border"
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
                    </div>
                </div>
            )}
        </form>
    );
}