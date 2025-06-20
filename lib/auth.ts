import { jwtDecode } from 'jwt-decode';
import { cookies, headers } from 'next/headers';

export async function getUserFromToken() {
    const cookie = await cookies()
    const token = cookie.get('token')?.value;

    if (!token) return null;

    try {
        const decoded = jwtDecode(token) as { exp?: number };
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            return null;
        }
        return decoded;
    } catch {
        return null;
    }
  }

type MeResponse = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export async function getCurrentUser(): Promise<MeResponse | null> {
    const cookie = await headers()

    const res = await fetch('https://coruscant-5266.onrender.com/auth/me', {
        headers: {
            Cookie: cookie.get('cookie') ?? '',
        },
        credentials: 'include'
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
}