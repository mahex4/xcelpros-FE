import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logout } from "../(auth)/signin/actions";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import FloatingHeader from "@/components/FloatingHeader";

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your data here",
  };

export default async function page() {
    const user = await getCurrentUser();

    if (!user) redirect('/signin');
    return (
        <main className="w-full flex flex-col gap-4 p-2 md:pl-0">
            <FloatingHeader />
            <section className="bg-card w-full p-4 rounded-md">
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
                            readOnly
                            aria-required="true"
                            aria-describedby="dish-name-error"
                            className="w-full border rounded mb-2 md:max-w-1/6"
                            defaultValue={2000}
                        />
                    </div>

                   <div className="w-fit">
                        <Button
                            type="submit"
                            aria-label="Calculate calories"
                            className="w-full text-md"
                            disabled
                        >
                            Set Target
                        </Button>

                   </div>
                </form>
            </section>
            <section className="bg-card w-full p-4 rounded-md">
                <h1 className=" font-bold text-xl">Logout of your account</h1>
                <form
                    action={logout}
                    className="mt-4 w-fit"
                    aria-labelledby="calorie-form-title"
                >
                    <Button
                        type="submit"
                        aria-label="Calculate calories"
                        className="w-full text-md"
                    >
                        Logout
                    </Button>
                </form>
            </section>
        </main>
    );
}