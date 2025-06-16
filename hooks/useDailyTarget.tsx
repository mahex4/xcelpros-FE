import { useEffect, useState } from "react";

const STORAGE_KEY = "DAILY_CALORIE_TARGET";

export function useDailyCalorieTarget(defaultValue: number = 2000) {
    const [target, setTarget] = useState<number>(defaultValue);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
            const parsed = parseInt(stored);
            if (!isNaN(parsed)) {
                setTarget(parsed);
            }
        }
    }, []);

    const updateTarget = (newTarget: number) => {
        setTarget(newTarget);
        localStorage.setItem(STORAGE_KEY, newTarget.toString());
    };

    return { target, setTarget: updateTarget };
}
