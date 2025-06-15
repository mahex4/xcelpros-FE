"use client"
import useDebounce from "@/hooks/useDebounce";
import { CookingPot, Logs, SquareUserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [hovered, setHovered] = useState(false)
    const debouncedHover = useDebounce(hovered, 500)

    return (
        <div className="h-screen p-2">
            <nav className=" bg-slate-900 p-2 rounded-md flex flex-col gap-3 h-full font-semibold text-white" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <Link href="/dashboard" className="flex gap-2 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm"><CookingPot strokeWidth={2.5} /> {debouncedHover && "Dashboard"}</Link >
                <Link href="/history" className="flex gap-2 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm"><Logs strokeWidth={2.5} />{debouncedHover && "History"} </Link >
                <Link href="/profile" className="flex gap-2 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm"><SquareUserRound strokeWidth={2.5} />{debouncedHover && "Profile"} </Link >
            </nav>
        </div>
    );
}