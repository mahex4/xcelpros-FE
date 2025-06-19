import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function HomeButton() {
    const user = await getCurrentUser();

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

    return (
            <div className=" text-center md:text-left">
                <div className="flex flex-col md:flex-row gap-4 justify-start">
                    <Link className="w-full md:w-auto" href="/signup"><Button className="w-full md:w-auto text-xl">Get Started - Sign Up Now</Button></Link>
                    <Link className="w-full md:w-auto" href="/signin?email=demo@gmail.com&password=Pa$$w0rd"><Button variant="secondary" className="w-full md:w-auto text-xl">View Demo</Button></Link>
                </div>
                Already a member? <Link href="/signin"><Button variant="link">Sign In</Button></Link>
            </div>
    );
}