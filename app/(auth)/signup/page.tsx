'use client'
import { useActionState } from 'react'
import { signup } from './actions'
import { Input } from '@/components/ui/input'
import { SignUpFormState } from '@/lib/definitions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import BackButton from '@/components/BackButton'


const initialState: SignUpFormState = {
    errors: {},
    values: {
        firstName: "",
        lastName: "",
        email: ""
    },
    success: undefined,
}

export default function SignupForm() {
    const [state, action, pending] = useActionState(signup, initialState)

    return (
        <section className=" w-full h-screen relative flex flex-col gap-2 justify-center items-center px-2">
            <div className="fixed p-5 top-0 left-0 flex gap-2 justify-center items-center">
                <BackButton />
                <span className=' font-medium text-xl'>Home</span>
            </div>
            <main className='w-full md:w-1/3 flex flex-col gap-2 justify-center items-center border bg-card rounded-md p-5'>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className=' text-2xl font-semibold'>Sign Up</h1>
                    <p className='text-center text-sm'>Sign Up to start tracking calories <br />staying on top of your meal plan</p>
                </div>
                <form action={action} noValidate className='flex flex-col w-full rounded-md p-5'>
                    <div className='flex flex-col justify-center items-center'>
                        <label htmlFor="firstName" className='sr-only'>First Name</label>
                        <Input id="firstName" name="firstName" placeholder="First Name" defaultValue={state.values?.firstName?.toString() ?? ''} />
                        <div className="self-start min-h-6 flex justify-center items-center">
                            {state?.errors?.firstName && <p className='text-xs text-red-500'>{state.errors.firstName}</p>}
                        </div>
                    </div>


                    <div className='flex flex-col justify-center items-center'>
                        <label htmlFor="lastName" className='sr-only'>Name</label>
                        <Input id="lastName" name="lastName" placeholder="Last Name" defaultValue={state?.values?.lastName?.toString() ?? ''} />
                        <div className="self-start min-h-6 flex justify-center items-center">
                            {state?.errors?.lastName && <p className='text-xs text-red-500'>{state.errors.lastName}</p>}
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center'>
                        <label htmlFor="email" className='sr-only'>Email</label>
                        <Input id="email" name="email" placeholder="Email" defaultValue={state?.values?.email?.toString()} />
                        <div className="self-start min-h-6 flex justify-center items-center">
                            {state?.errors?.email && <p className='text-xs text-red-500'>{state.errors.email}</p>}
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center'>
                        <label htmlFor="password" className='sr-only'>Password</label>
                        <Input id="password" name="password" type="password" placeholder='Enter Password' />
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

                    <Button variant="default" disabled={pending} type="submit">
                        Sign Up
                    </Button>
                </form>
                <div className="flex gap-2 mt-4">
                    Already have an account? <Link href={'/signin'} className=' underline'>Sign In</Link>
                </div>
            </main>
        </section>
    )
}