import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { logout } from '../(auth)/signin/actions';
import { Input } from '@/components/ui/input';
import CalorieForm from './_components/CalorieForm';

export default async function DashboardPage() {
    const user = await getCurrentUser();

    console.log('userrr', user);

    if (!user) redirect('/signin');

    return (
        <div>
            <h1>Welcome {user.firstName}</h1>
            <CalorieForm />
            <form action={logout}>
                <Input  />
                <Button type="submit">Sign Out</Button>
            </form>
        </div>
    );
}
