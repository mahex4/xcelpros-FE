import { Meal } from "@/lib/types";

export default function MealCard({ meal }: { meal: Meal }) {
    return (
        <div className="p-3 border rounded-md bg-white">
            <div className="flex justify-between">
                <h5 className="font-medium whitespace-nowrap max-w-64 text-ellipsis overflow-hidden">{meal.dish_name}</h5>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                    {new Date(meal.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2 text-sm">
                <div>Servings: <span className=" font-semibold">{meal.servings}</span></div>
                <div>Cal/serving: {meal.calories_per_serving}</div>
                <div>Total calories: {meal.total_calories}</div>
                <div>Source: {meal.source}</div>
            </div>
        </div>
    );
}