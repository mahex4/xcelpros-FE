import { GroupedMeals } from "@/lib/types";
import MealCard from "@/components/MealCard";
import { getMeals } from "../dashboard/actions";
import FloatingHeader from "@/components/FloatingHeader";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import CalorieBar from "./_components/CalorieBar";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "History",
    description: "View your meals",
  };

export default async function MealHistory() {
    let groupedMeals: GroupedMeals | null = null;
    let error: string | null = null;
        const user = await getCurrentUser();
    
    if (!user) redirect('/signin');

    try {
        groupedMeals = await getMeals();
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load meals";
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!groupedMeals || groupedMeals.length === 0) {
        return (
        <div className="p-2 w-screen h-screen flex flex-col gap-2 md:w-[95vw] pb-24 md:pb-4">
            <div className="pr-2">
                <FloatingHeader />
            </div>
            <h3 className="text-lg font-bold my-2">Your Meal History</h3> 
            <div className=" w-full h-full flex flex-col gap-4 justify-center items-center font-semibold text-2xl text-black/40 dark:text-white/40">
                    <div className="">No meals recorded yet</div>
                    <Link className="w-full md:w-auto" href="/dashboard"><Button variant="default" className="w-full md:w-auto text-xl">Add Meal</Button></Link>
            </div>

        </div>)
    }

    return (
        <div className="p-2 w-screen h-screen flex flex-col gap-2 md:w-[95vw] pb-24 md:pb-4">
            <div className="pr-2">
                <FloatingHeader />
            </div>
            <h3 className="text-lg font-bold my-2">Your Meal History</h3>
            <div className="flex flex-col md:flex-row gap-4 w-full overflow-x-auto h-full"> 
                {groupedMeals.map(group => (
                    <div key={group.date} className="flex flex-col min-w-[20vw] md:max-w-[20vw] gap-4 h-full">
                        <div className="flex items-center justify-between sticky top-0 z-10 bg-card p-4 border rounded-md">
                            <h4 className="font-semibold ">
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
                        <CalorieBar calorieSummary={group.calorieSummary} />
                        <div className="md:space-y-3 overflow-scroll flex flex-col gap-2 md:gap-0 md:overflow-y-auto md:h-[calc(100vh-200px)]">
                            {group.meals.map((meal, idx) => (
                                <MealCard meal={meal} key={`meal-card-${meal.dish_name}-${idx}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}