import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
// import { Button } from '@/components/ui/button';
// import { logout } from '../(auth)/signin/actions';
import CalorieForm from './_components/CalorieForm';
import TodaySegment from './_components/TodaySegment';

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) redirect('/signin');

    return (
        <div className='flex gap-4 w-full h-screen p-2'>
            <div className=" bg-white w-full h-full flex flex-col justify-center items-center p-4 rounded-md border">
                <h1>Welcome {user.firstName}</h1>
                <CalorieForm />
            </div>
            <TodaySegment />
        </div>
    );
}
