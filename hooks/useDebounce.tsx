import { useState, useEffect } from 'react'

function useDebounce<T>(value: T, time: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebouncedValue(value)
        }, time)

        return () => clearTimeout(debounce)
    }, [value, time])

    return debouncedValue;
}

export default useDebounce;