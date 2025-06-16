"use client";
import HomePageCard from "@/components/HomePageCard";
import { motion, Variants } from "framer-motion";
import { Activity, ChartBar, TrendingUp } from "lucide-react";

const cardVariants: Variants = {
    offscreen: {
        x: -100,
        opacity: 0,
        transition: {
            duration: 0
        }
    },
    onscreen: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1,
            delay: 0.1
        }
    }
};

const features = [
    {
        heading: "Easy Tracking",
        description: "Effortlessly log meals in seconds with our user centric UI Experience.",
        icon: <Activity />
    },
    {
        heading: "Stay Alert",
        description: "Easy tracking allows you to stay on top of your calorie restrictions.",
        icon: <TrendingUp />
    },
    {
        heading: "Beautiful Insights",
        description: "Stunning visualizations that show your progress and nutrition balance.",
        icon: <ChartBar />
    }
];

export default function InfoBarLeft() {
    return (
        <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
                <motion.div
                    key={feature.heading}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={cardVariants}
                    custom={index}
                >
                    <HomePageCard
                        heading={feature.heading}
                        description={feature.description}
                        icon={feature.icon}
                    />
                </motion.div>
            ))}
        </div>
    );
}