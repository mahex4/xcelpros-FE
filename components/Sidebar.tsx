"use client";
import { CookingPot, Logs, SquareUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "@/hooks/useDebounce";

export default function Sidebar() {
    const [hovered, setHovered] = useState(false);
    const debouncedHover = useDebounce(hovered, 1000);
    const pathname = usePathname();

    if (pathname === "/" || pathname === "/signin" || pathname === "/signup") {
        return null;
    }

    const navItems = [
        { icon: CookingPot, label: "Dashboard", href: "/dashboard" },
        { icon: Logs, label: "History", href: "/history" },
        { icon: SquareUserRound, label: "Profile", href: "/profile" }
    ];

    return (
        <div className="md:h-screen fixed md:static bottom-0 w-full md:w-auto md:bg-transparent p-2">
            <nav className="md:hidden flex justify-around w-full bg-slate-900 p-2 rounded-xl">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex flex-col items-center text-white gap-1 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm"
                    >
                        <item.icon strokeWidth={2.5} />
                        <span className="text-xs text-white">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <motion.nav
                className="hidden md:flex flex-col gap-3 h-full font-semibold text-white bg-slate-900 p-2 rounded-md"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                initial={{ width: "64px" }}
                animate={{
                    width: debouncedHover ? "200px" : "64px",
                    transition: { duration: 0.3, ease: "easeInOut" }
                }}
                style={{ overflow: "hidden" }}
            >
                {navItems.map((item, index) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex w-full items-center justify-start hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm min-w-max"
                    >
                        <item.icon strokeWidth={2.5} />
                        <AnimatePresence>
                            {debouncedHover && (
                                <motion.span
                                    className="hidden pl-2 md:inline"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                ))}
            </motion.nav>
        </div>
    );
}