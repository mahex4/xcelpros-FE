import { DailyQuota } from "./DailyQuota";
import { getMeals } from "../actions";
import { formatDate } from "@/lib/utils";
import TodayList from "./TodayList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TodaySegment() {
    let meals;
    let currentCalories = 0;
    let error: string | null = null;

    try {
        const data = await getMeals();
        const today = formatDate(new Date());
        const todayMeal = data.find((meal) => meal.date === today);
        currentCalories = todayMeal?.meals.reduce((acc, curr) => acc + curr.total_calories, 0) ?? 0;
        meals = todayMeal?.meals;
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load meals";
    }

    if (!meals || error) return null;

    return (
        <div className="flex flex-col justify-between gap-2 h-full">
            <div className="flex flex-col gap-2 h-full">
                <div className="flex-shrink-0">
                    <DailyQuota currentCalories={currentCalories} />
                </div>
                <div className="p-2 font-semibold">Today&apos;s Meals</div>

                <div className="flex-grow min-h-0 overflow-scroll rounded-md">
                    <TodayList meals={meals} />
                </div>
                <Link className="w-full" href="/history">
                    <Button className="w-full">View All</Button>
                </Link>
            </div>
        </div>
    );
}