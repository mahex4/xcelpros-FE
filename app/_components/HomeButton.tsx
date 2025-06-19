import { Button } from "@/components/ui/button";
import { getUserFromToken } from "@/lib/auth";
import Link from "next/link";
import { BasicHomeButton } from "./BasicHomeButton";

export default async function HomeButton() {
    let user = null;

    try {
        user = await getUserFromToken();
    } catch (error) {
        console.error("Error fetching current user:", error);
        return <BasicHomeButton />;
    }

    if (user) return (
        <div>
            <div className=" text-left">
                <Link className="w-full md:w-auto" href="/dashboard"><Button className="w-full md:w-auto text-xl">Go To Dashboard</Button></Link>
            </div>
            <div className=" h-12 flex justify-start items-center">
                You are already signed in
            </div>
        </div>
    )

    return <BasicHomeButton/>;
}