'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { CalorieSummary } from '@/lib/types';

const chartColors = {
    consumed: 'var(--chart-1)',
    remaining: 'var(--chart-2)',
    exceeded: 'var(--chart-3)',
};

export default function CalorieBar({ calorieSummary }: { calorieSummary: CalorieSummary }) {
    const { consumed, left, exceeded, target } = calorieSummary;

    const total = consumed + left + exceeded;

    const consumedPercent = (consumed / total) * 100;
    const remainingPercent = (left / total) * 100;
    const exceededPercent = (exceeded / total) * 100;

    const getRadiusStyle = () => {
        if (left === 0 && exceeded === 0) return { borderRadius: '9999px' };

        return {
            borderTopLeftRadius: left > 0 ? '9999px' : '0',
            borderBottomLeftRadius: left > 0 ? '9999px' : '0',
            borderTopRightRadius: exceeded > 0 ? '9999px' : '0',
            borderBottomRightRadius: exceeded > 0 ? '9999px' : '0',
        };
    };

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Daily Calorie Usage</CardTitle>
                <CardDescription>
                    {consumed >= target ? 'Goal exceeded!' : 'Progress toward daily goal'}
                </CardDescription>
            </CardHeader>

            <CardContent className="w-full py-4">
                <div className="w-full h-6 flex overflow-hidden" style={getRadiusStyle()}>
                    {left > 0 && (
                        <div
                            style={{
                                width: `${remainingPercent}%`,
                                backgroundColor: chartColors.remaining,
                            }}
                        />
                    )}
                    {consumed > 0 && (
                        <div
                            style={{
                                width: `${consumedPercent}%`,
                                backgroundColor: chartColors.consumed,
                            }}
                        />
                    )}
                    {exceeded > 0 && (
                        <div
                            style={{
                                width: `${exceededPercent}%`,
                                backgroundColor: chartColors.exceeded,
                            }}
                        />
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex justify-between gap-2 pt-4">
                <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Consumed</span>
                    <span className="text-md font-bold" style={{ color: chartColors.consumed }}>
                        {consumed.toLocaleString()} kcal
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <span className="text-md font-bold" style={{ color: chartColors.remaining }}>
                        {left.toLocaleString()} kcal
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Exceeded</span>
                    <span className="text-md font-bold" style={{ color: chartColors.exceeded }}>
                        {exceeded.toLocaleString()} kcal
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
}
