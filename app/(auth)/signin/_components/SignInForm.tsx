'use client';
import { useActionState } from 'react';
import { signin } from '@/app/(auth)/signin/actions';
import { Input } from '@/components/ui/input';
import { SignInFormState } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const initialState: SignInFormState = {
    errors: {},
    values: {
        email: ""
    },
    success: undefined,
};

interface SignInFormProps {
    demoEmail?: string;
    demoPassword?: string;
}

export default function SignInForm({
    demoEmail,
    demoPassword
}: SignInFormProps) {
    const [state, action, pending] = useActionState(signin, initialState);

    console.log('demo', demoEmail, demoPassword);

    return (
        <section className="w-full h-screen flex flex-col gap-2 justify-center items-center px-2">
            <main className='w-full md:w-1/3 flex flex-col gap-2 justify-center items-center border bg-card rounded-md p-5'>
                <div className="w-full flex flex-col gap-2 justify-center items-center">
                    <h1 className='text-2xl font-semibold'>Sign In</h1>
                    <p className='text-center text-sm'>
                        Sign in to access your dashboard and <br />continue tracking your progress
                    </p>
                </div>
                <form action={action} noValidate className='flex flex-col w-full'>
                    <div className='flex flex-col justify-center items-start'>
                        <Label htmlFor="email" className='text-left mb-2'>Email</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            defaultValue={demoEmail ?? state?.values?.email?.toString()}
                            readOnly={demoEmail !== undefined}
                        />
                        <div className="self-start min-h-6 flex justify-center items-center">
                            {state?.errors?.email && (
                                <p className='text-xs text-red-500'>{state.errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <Label htmlFor="password" className='text-left mb-2'>Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder='Enter Password'
                            defaultValue={demoPassword ?? ""}
                            readOnly={demoPassword !== undefined}
                        />
                        <div className="my-4 w-full">
                            {state?.errors?.password && (
                                <div className='self-start p-4 min-h-6 rounded-md border w-full flex flex-col justify-start items-start'>
                                    <p className='text-xs text-red-500 mb-1'>Password must:</p>
                                    <ul className='pl-4'>
                                        {state.errors.password.map((error) => (
                                            <li className='text-xs text-red-500' key={error}>◦ {error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <Button  disabled={pending} type="submit">
                        {demoEmail === undefined ? "Sign In" : "Sign into demo account"}
                    </Button>
                </form>

                <div className="flex gap-2 mt-4 w-full justify-center">
                    New here? <Link href={'/signup'} className='underline'>Create an account</Link>
                </div>
            </main>
        </section>
    );
}