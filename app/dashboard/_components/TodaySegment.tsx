"use client"
import { useEffect, useState } from "react";
import { DailyQuota } from "./DailyQuota";
import { getMeals } from "../actions";
import { formatDate } from "@/lib/utils";
import TodayList from "./TodayList";
import { Meal } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function TodaySegment() {
    const [meals, setMeals] = useState<Meal[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const data = await getMeals();
                const today = formatDate(new Date());
                const todayMeal = data.find((meal) => meal.date === today);
                console.log('todays', todayMeal?.meals);
                setMeals(todayMeal?.meals);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load meals");
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    if (!meals || error || loading) return null;

    return (
        <div className=" flex flex-col justify-between">
            <div className="flex flex-col gap-2">
                <DailyQuota />
                <TodayList meals={meals} />
            </div>
            <Button className="">View All</Button>
        </div>
    );
}