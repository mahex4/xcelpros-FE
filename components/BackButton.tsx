"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
    className?: string;
    iconSize?: number;
    onClick?: () => void;
}

export default function BackButton({
    className = "",
    iconSize = 24,
    onClick,
}: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.back();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`p-2 rounded-sm border bg-card cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${className}`}
            aria-label="Go back"
        >
            <ArrowLeft size={iconSize} />
        </button>
    );
}