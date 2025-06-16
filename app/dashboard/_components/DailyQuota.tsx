"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { CalorieSummary } from "@/lib/types"

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


export function DailyQuota({ calorieSummary }: {
    calorieSummary: CalorieSummary
}) {
    const dailyGoal = calorieSummary.target;
    const consumed = calorieSummary.consumed;
    const rest = calorieSummary.left;
    const exceed = calorieSummary.exceeded;

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
                    {consumed >= dailyGoal ? "Goal exceeded!" : "Progress toward daily goal"}
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
                                                    {consumed.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    {consumed >= dailyGoal ? "kcal (exceeded)" : "kcal consumed"}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
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
                        <RadialBar
                            dataKey="current"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-current)"
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <CardFooter className="flex justify-between gap-4 pt-6 -mt-12">
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-muted-foreground">Consumed</span>
                        <span className="text-md whitespace-nowrap font-bold" style={{ color: 'var(--chart-1)' }}>
                            {consumed.toLocaleString()} kcal
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-muted-foreground">Remaining</span>
                        <span className="text-md whitespace-nowrap font-bold" style={{ color: 'var(--chart-2)' }}>
                            {rest.toLocaleString()} kcal
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-muted-foreground">Exceeded</span>
                        <span className="text-md whitespace-nowrap font-bold" style={{ color: 'var(--chart-3)' }}>
                            {exceed.toLocaleString()} kcal
                        </span>
                    </div>
                </CardFooter>
            </CardFooter>
        </Card>
    )
}
