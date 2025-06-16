import { ReactNode } from "react";

interface HomePageCardType {
    heading: string;
    description: string
    icon: ReactNode
}

export default function HomePageCard({ heading, description, icon }: HomePageCardType) {
    return (
        <div className="flex bg-white p-2 rounded-md border border-gray-100 gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center aspect-square m-4">
                    {icon}
                </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{heading}</h3>
                <p className="text-gray-600 text-sm">
                    {description}
                </p>
            </div>
        </div>
    );

}