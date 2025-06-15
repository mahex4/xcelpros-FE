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