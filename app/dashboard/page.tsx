import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
// import { Button } from '@/components/ui/button';
// import { logout } from '../(auth)/signin/actions';
import CalorieForm from './_components/CalorieForm';

export default async function DashboardPage() {
    const user = await getCurrentUser();

    console.log('userrr', user);

    if (!user) redirect('/signin');

    return (
        <div className='flex gap-4 w-full h-screen p-2'>
            <div className=" bg-slate-300 w-full h-full flex flex-col justify-center items-center p-4 rounded-md">
                <h1>Welcome {user.firstName}</h1>
                <CalorieForm />
            </div>
            {/* <form action={logout}>
                <Button type="submit">Sign Out</Button>
            </form> */}
        </div>
    );
}
