import MealCard from "@/components/MealCard";
import { Meal } from "@/lib/types";

export default function TodayList({ meals }: { meals: Meal[] }) {
    return (
       <div className="">
            <div className=" p-2 font-semibold">Today&apos;s Meals</div>
            <div className=" flex flex-col gap-1">
                {meals.map((meal, idx) => (
                    <MealCard meal={meal} key={`meal-card-${idx}-${meal.dish_name}`} />
                ))}
            </div>
       </div>
    );
}