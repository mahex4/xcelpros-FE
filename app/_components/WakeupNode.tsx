"use client"

import { useEffect } from "react";

export default function WakeupNode() {
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/health`)
            .then(() => console.log('Backend wakeup call sent.'))
            .catch(err => console.error('Wakeup call failed', err))
    }, [])
    
    return (
        <div className=" hidden">
            Waking up the backend server
        </div>
    );
}