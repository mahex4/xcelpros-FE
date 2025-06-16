import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import CalorieForm from './_components/CalorieForm';
import TodaySegment from './_components/TodaySegment';
import FloatingHeader from '@/components/FloatingHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
title: "Dashboard",
description: "Manage Your Nutrition Smarter",
};

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) redirect('/signin');

    return (
        <div className='flex flex-col-reverse md:flex-row gap-2 w-full md:h-screen p-2 pl-0'>
            <div className="flex flex-col gap-2 w-full">
                <div className=" hidden md:block">
                    <FloatingHeader />
                </div>
                <div className=" bg-white w-full h-full flex flex-col justify-center items-center p-4 rounded-md border mb-24 md:mb-auto">
                    <h1>Welcome {user.firstName}</h1>
                    <CalorieForm />
                </div>
            </div>
            <div className="h-full">
                <div className="dlex md:hidden py-2">
                    <FloatingHeader />
                </div>
                <TodaySegment />
            </div>
        </div>
    );
}
