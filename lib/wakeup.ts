'use server'

export async function wakeupBackend() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/health`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return { status: res.status };
}
