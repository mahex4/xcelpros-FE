"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radial chart with stacked sections"

const chartConfig = {
    current: {
        label: "Consumed",
        color: "var(--chart-1)",
    },
    rest: {
        label: "Remaining",
        color: "var(--chart-2)",
    },
    exceed: {
        label: "Exceeded",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig


export function DailyQuota({ currentCalories }: { currentCalories: number }) {
    const dailyGoal = 2000;
    const consumed = Math.min(currentCalories, dailyGoal);
    const rest = Math.max(0, dailyGoal - currentCalories);
    const exceed = Math.max(0, currentCalories - dailyGoal);

    const chartData = [{
        current: consumed,
        rest: rest,
        exceed: exceed
    }];



    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Daily Calorie Progress</CardTitle>
                <CardDescription>
                    {currentCalories >= dailyGoal ? "Goal exceeded!" : "Progress toward daily goal"}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center pb-0 -mb-24">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {currentCalories.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    {currentCalories >= dailyGoal ? "kcal (exceeded)" : "kcal consumed"}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="current"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-current)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="rest"
                            fill="var(--color-rest)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="exceed"
                            fill="var(--color-exceed)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
