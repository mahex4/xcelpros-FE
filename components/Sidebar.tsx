"use client"
import useDebounce from "@/hooks/useDebounce";
import { CookingPot, Logs, SquareUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
    const [hovered, setHovered] = useState(false)
    const debouncedHover = useDebounce(hovered, 1000)
    const pathname = usePathname();

    if (pathname === "/" || pathname === "/signin" || pathname === "/signup") {
        return null;
    }


    return (
        <div className="md:h-screen fixed md:static bottom-0 p-2 md:pr-0 w-full md:w-auto">
            <nav className=" bg-slate-900 p-2 rounded-xl md:rounded-md flex md:flex-col gap-3 h-full w-full font-semibold text-white" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <Link href="/dashboard" className="flex w-full flex-col md:flex-row items-center justify-center md:justify-start gap-2 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm"><CookingPot strokeWidth={2.5} /> <span className="md:hidden text-xs">Dashboard</span> {debouncedHover && <span className="hidden md:flex">Dashboard</span>}</Link >
                <Link href="/history" className="flex w-full flex-col md:flex-row items-center justify-center md:justify-start gap-2 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm"><Logs strokeWidth={2.5} /> <span className="md:hidden text-xs">History</span> {debouncedHover && <span className="hidden md:flex">History</span>} </Link >
                <Link href="/profile" className="flex w-full flex-col md:flex-row items-center justify-center md:justify-start gap-2 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm"><SquareUserRound strokeWidth={2.5} /> <span className="md:hidden text-xs">Profile</span> {debouncedHover && <span className="hidden md:flex">Profile</span>} </Link >
            </nav>
        </div>
    );
}