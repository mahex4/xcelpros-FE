// components/Providers.tsx
'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}
