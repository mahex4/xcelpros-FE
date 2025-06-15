"use client"
import { usePathname } from "next/navigation";
import BackButton from "./BackButton";

export default function FloatingHeader() {
    const pathname = usePathname()

    return (
        <div className="flex gap-2 h-fit items-stretch"> {/* Added items-stretch */}
            <BackButton />
            <div className="capitalize font-semibold w-full flex items-center bg-white pl-4 border rounded-md">
                {pathname.slice(1)}
            </div>
        </div>
    );
}