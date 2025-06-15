"use client"
import { useEffect, useState } from "react";
import { DailyQuota } from "./DailyQuota";
import { getMeals } from "../actions";
import { formatDate } from "@/lib/utils";
import TodayList from "./TodayList";
import { Meal } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMealStore } from "@/stores/mealStore";

export default function TodaySegment() {
    const [meals, setMeals] = useState<Meal[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const refreshTrigger = useMealStore(state => state.refreshTrigger); 
    const [currentCalories, setCurrentCalories] = useState(0)

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const data = await getMeals();
                const today = formatDate(new Date());
                const todayMeal = data.find((meal) => meal.date === today);
                const currentTotal = todayMeal?.meals.reduce((acc, curr) => acc + curr.total_calories, 0)
                setCurrentCalories(currentTotal ?? 0)
                setMeals(todayMeal?.meals);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load meals");
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [refreshTrigger]);

    if (!meals || error || loading) return null;

    return (
        <div className=" flex flex-col justify-between gap-2 h-full">
            <div className="flex flex-col gap-2 h-full">
                <div className="flex-shrink-0">
                    <DailyQuota currentCalories={currentCalories}/>
                </div>
                <div className=" p-2 font-semibold">Today&apos;s Meals</div>

                <div className="flex-grow min-h-0 overflow-scroll rounded-md">
                    <TodayList meals={meals} />
                </div>
                <Link className=" w-full" href="/history"><Button className=" w-full">View All</Button></Link>
            </div>
        </div>
    );
}