'use client'

import { wakeupBackend } from '@/lib/wakeup'
import { useEffect } from 'react'

export default function WakeupNode() {

    useEffect(() => {
        wakeupBackend()
            .then(() => console.log('✅ Backend wakeup via Server Action'))
            .catch(err => console.error('❌ Wakeup failed', err))
    }, [])

    return <div className="hidden">Waking backend from server</div>
}
