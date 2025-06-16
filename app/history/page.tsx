import { GroupedMeals } from "@/lib/types";
import MealCard from "@/components/MealCard";
import { getMeals } from "../dashboard/actions";
import FloatingHeader from "@/components/FloatingHeader";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import CalorieBar from "./_components/CalorieBar";

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

    if (!groupedMeals) {
        return <div>No meals recorded yet</div>;
    }

    return (
        <div className="p-2 w-screen h-screen flex flex-col gap-2 md:w-[95vw] pb-32 md:pb-0">
            <div className="pr-2">
                <FloatingHeader />
            </div>
            <h3 className="text-lg font-bold my-2">Your Meal History</h3>
            <div className="flex flex-col md:flex-row gap-4 w-full overflow-x-auto pb-4 h-full"> 
                {groupedMeals.map(group => (
                    <div key={group.date} className="flex flex-col min-w-[20vw] md:max-w-[20vw] gap-4 h-full">
                        <div className="flex items-center sticky top-0 z-10 bg-white p-4 border rounded-md">
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
                        <CalorieBar calorieSummary={group.calorieSummary} />
                        <div className="md:space-y-3 overflow-scroll md:overflow-y-auto md:h-[calc(100vh-200px)]">
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