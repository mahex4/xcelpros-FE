"use client";
import { CookingPot, Logs, SquareUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "@/hooks/useDebounce";

export default function Sidebar() {
    const [hovered, setHovered] = useState(false);
    const debouncedHover = useDebounce(hovered, 1000)
    const pathname = usePathname();

    if (pathname === "/" || pathname === "/signin" || pathname === "/signup") {
        return null;
    }

    return (
        <div className="md:h-screen fixed md:static bottom-0 p-2 md:pr-0 w-full md:w-auto">
            <motion.nav
                className="bg-slate-900 p-2 rounded-xl md:rounded-md flex md:flex-col gap-3 h-full font-semibold text-white"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                initial={{ width: "64px" }}
                animate={{
                    width: debouncedHover ? "200px" : "64px", 
                    transition: { duration: 0.3, ease: "easeInOut" }
                }}
                style={{ overflow: "hidden" }}
            >
                <Link href="/dashboard" className="flex w-full items-center justify-center md:justify-start gap-2 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm min-w-max">
                    <CookingPot strokeWidth={2.5} />
                    <span className="md:hidden text-xs">Dashboard</span>
                    <AnimatePresence>
                        {debouncedHover && (
                            <motion.span
                                className="hidden md:inline"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                Dashboard
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>

                <Link href="/history" className="flex w-full items-center justify-center md:justify-start gap-2 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm min-w-max">
                    <Logs strokeWidth={2.5} />
                    <span className="md:hidden text-xs">History</span>
                    <AnimatePresence>
                        {debouncedHover && (
                            <motion.span
                                className="hidden md:inline"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                History
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>

                <Link href="/profile" className="flex w-full items-center justify-center md:justify-start gap-2 hover:bg-slate-500 hover:text-slate-900 p-2 rounded-sm min-w-max">
                    <SquareUserRound strokeWidth={2.5} />
                    <span className="md:hidden text-xs">Profile</span>
                    <AnimatePresence>
                        {debouncedHover && (
                            <motion.span
                                className="hidden md:inline"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                Profile
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </motion.nav>
        </div>
    );
}