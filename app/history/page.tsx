import { GroupedMeals } from "@/lib/types";
import MealCard from "@/components/MealCard";
import { getMeals } from "../dashboard/actions";

export default async function MealHistory() {
    let groupedMeals: GroupedMeals | null = null;
    let error: string | null = null;

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
        <div className="m-2 h-screen overflow-hidden w-[95vw] mb-32 md:mb-auto">
            <h3 className="text-lg font-bold mb-4">Your Meal History</h3>
            <div className="space-y-4 flex flex-col md:flex-row gap-4 w-full overflow-scroll h-full mb-12">
                {groupedMeals.map(group => (
                    <div key={group.date} className="mb-6 min-w-[20vw]">
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
                                <MealCard meal={meal} key={`meal-card-${meal.dish_name}-${idx}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}