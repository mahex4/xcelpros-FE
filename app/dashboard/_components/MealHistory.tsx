"use client";
import { useState, useEffect } from "react";
import { GroupedMeals } from "@/lib/types";
import { getMeals } from "../actions";
import { useMealStore } from "@/stores/mealStore";

export default function MealHistory() {
    const [groupedMeals, setGroupedMeals] = useState<GroupedMeals | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const refreshTrigger = useMealStore(state => state.refreshTrigger); 

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const data = await getMeals();
                setGroupedMeals(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load meals");
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [refreshTrigger]);

    if (loading) {
        return <div>Loading meals...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!groupedMeals) {
        return <div>No meals recorded yet</div>;
    }

    console.log('object', groupedMeals);

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Your Meal History</h3>
            <div className="space-y-4 flex gap-4">
                {groupedMeals.map(group => (
                    <div key={group.date} className="mb-6">
                        <div className="flex items-center mb-3">
                            <h4 className="font-semibold text-gray-700">
                                {new Date(group.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </h4>
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {group.meals.length} meal{group.meals.length > 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {group.meals.map((meal, idx) => (
                                <div key={idx} className="p-3 border rounded-lg bg-white shadow-sm">
                                    <div className="flex justify-between">
                                        <h5 className="font-medium">{meal.dish_name}</h5>
                                        <span className="text-sm text-gray-500">
                                            {new Date(meal.date).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 mt-2 text-sm">
                                        <div>Servings: {meal.servings}</div>
                                        <div>Cal/serving: {meal.calories_per_serving}</div>
                                        <div>Total calories: {meal.total_calories}</div>
                                        <div>Source: {meal.source}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}