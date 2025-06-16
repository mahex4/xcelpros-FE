import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logout } from "../(auth)/signin/actions";

export default function page() {
    return (
        <main className="w-full flex flex-col gap-4 p-2">
            <section className="bg-white w-full p-4 rounded-md">
                <h1 className=" font-bold text-xl">Daily Goal</h1>
                <form
                    // action={}
                    className="mt-4 "
                    aria-labelledby="calorie-form-title"
                >
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="daily_goal">Set your daily goal here</Label>
                        <Input
                            type="text"
                            id="daily_goal"
                            name="daily_goal"
                            placeholder="Enter your Dish"
                            required
                            aria-required="true"
                            aria-describedby="dish-name-error"
                            className="w-full border rounded mb-2"
                            defaultValue={2000}
                        />
                    </div>

                   <div className="w-fit">
                        <Button
                            type="submit"
                            aria-label="Calculate calories"
                            className="w-full"
                            disabled
                        >
                            Calculate Calories
                        </Button>

                   </div>
                </form>
            </section>
            <section className="bg-white w-full p-4 rounded-md">
                <h1 className=" font-bold text-xl">Logout of your account</h1>
                <form
                    action={logout}
                    className="mt-4 w-fit"
                    aria-labelledby="calorie-form-title"
                >
                    <Button
                        type="submit"
                        aria-label="Calculate calories"
                        className="w-full"
                    >
                        Logout
                    </Button>
                </form>
            </section>
        </main>
    );
}