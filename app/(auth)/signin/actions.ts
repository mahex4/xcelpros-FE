"use server"
import { type SignInFormState, SignInFormSchema } from "@/lib/definitions"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(state: SignInFormState, formData: FormData) {
    const cookie = await cookies();
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const validatedFields = SignInFormSchema.safeParse({
        email,
        password
    })


    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            values: {
                email,
                password
            }
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedFields.data),
    });


    if (!res.ok) {
        return { error: 'Invalid credentials' };
    }

    const data = await res.json();

    cookie.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60
    });

    redirect("/dashboard");

    return {
        success: true,
        values: { email, password },
    } as const;
}

export async function logout() {
    const cookie = await cookies();

    cookie.delete('token');

    try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to invalidate token on backend:', error);
    }

    redirect("/");
}
