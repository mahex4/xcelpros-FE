export type CaloriesResponse = {
    dish_name: string;
    servings: number;
    calories_per_serving: number;
    total_calories: number;
    source: string;
};

export type CaloriesFormState = {
    error: string | null;
    data: CaloriesResponse | null;
  };

export type SaveMealState = {
    error: string | null;
    success: boolean;
};

export type GroupedMeals = {
    date: string;
    meals: Meal[];
    calorieSummary: CalorieSummary
}[];

export type Meal = {
    dish_name: string;
    servings: number;
    calories_per_serving: number;
    total_calories: number;
    source?: string;
    date: Date;
}

export interface CalorieSummary {
    consumed: number;
    left: number;
    exceeded: number;
    target: number;
}