import { DailyQuota } from "./DailyQuota";
import { getMeals } from "../actions";
import { formatDate } from "@/lib/utils";
import TodayList from "./TodayList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalorieSummary } from "@/lib/types";


export default async function TodaySegment() {
    try {
        const data = await getMeals();
        const today = formatDate(new Date());
        const todayMeal = data.find((meal) => meal.date === today);

        const defaultCalorieSummary: CalorieSummary = {
            consumed: 0,
            left: 2000,
            exceeded: 0,
            target: 2000
        };

        return (
            <div className="flex flex-col justify-between gap-2 h-full">
                <div className="flex flex-col gap-2 h-full">
                    <div className="flex-shrink-0">
                        <DailyQuota
                            calorieSummary={todayMeal?.calorieSummary || defaultCalorieSummary}
                        />
                    </div>
                    <div className="p-2 font-semibold">Today&apos;s Meals</div>

                    {todayMeal?.meals?.length ? (
                        <div className="flex-grow min-h-0 overflow-scroll rounded-md">
                            <TodayList meals={todayMeal.meals} />
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center text-gray-500">
                            No meals recorded today
                        </div>
                    )}

                    <Link className="w-full" href="/history">
                        <Button className="w-full">View All</Button>
                    </Link>
                </div>
            </div>
        );
    } catch (err) {
        const error = err instanceof Error ? err.message : "Failed to load meals";

        return (
            <div className="flex flex-col justify-between gap-2 h-full">
                <div className="flex flex-col gap-2 h-full">
                    <div className="text-red-500 p-4 bg-red-50 rounded-md">
                        Error: {error}
                    </div>
                    <Link className="w-full" href="/history">
                        <Button className="w-full">View All</Button>
                    </Link>
                </div>
            </div>
        );
    }
}