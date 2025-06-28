import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { MinimalSearchItem, toCapitalizedWords } from "@/lib/utils"
import { LoaderCircle, TriangleAlert } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { CaloriesFormState } from "@/lib/types";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner";

export default function SearchInput({ state }: { state: CaloriesFormState }) {
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 500)
    const [loadingList, setLoadingList] = useState(false)
    const [itemsList, setItemsList] = useState<MinimalSearchItem[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [error, setError] = useState("")

    const skipNextFetch = useRef(false)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        if (skipNextFetch.current) {
            skipNextFetch.current = false
            return
        }

        if (!debouncedSearch.trim()) {
            setItemsList([])
            setIsDropdownOpen(false)
            return
        }

        const controller = new AbortController()
        const signal = controller.signal

        const fetchData = async () => {
            setLoadingList(true)
            setError("")
            try {
                const res = await fetch(
                    `/api/search?query=${encodeURIComponent(debouncedSearch)}`,
                    { signal }
                )
                if (!res.ok) {
                    setError("Server error (we're on it). Please try again later.")
                    toast.error("Server error (we're on it). Please try again later.")
                    setItemsList([])
                    setIsDropdownOpen(false)
                }

                const data = await res.json()

                if (Array.isArray(data) && data.length === 0) {
                    setError("No items found")
                    toast.error("No items found")
                    setItemsList([])
                    setIsDropdownOpen(false)
                } else {
                    setItemsList(data as MinimalSearchItem[])
                    setIsDropdownOpen(data.length > 0)
                }
            } catch (err: unknown) {
                if (err instanceof DOMException && err.name === "AbortError") {
                    return
                }
                const realError = err instanceof Error ? err : new Error(String(err))
                console.error("Error fetching food items:", realError)
                setError(realError.message)
                setItemsList([])
                setIsDropdownOpen(false)
            } finally {
                setLoadingList(false)
            }
        }

        fetchData()
        return () => controller.abort()
    }, [debouncedSearch])

    const handleItemSelect = useCallback((description: string) => {
        skipNextFetch.current = true
        setSearch(toCapitalizedWords(description))
        setItemsList([])
        setIsDropdownOpen(false)
    }, [])

    return (
        <div ref={containerRef} className="relative w-full">
            <div className="w-full relative">
                <Input
                    type="text"
                    id="dish_name"
                    name="dish_name"
                    placeholder="Enter your Dish"
                    autoComplete="off"
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value)
                        setIsDropdownOpen(true)
                    }}
                    onFocus={() => itemsList.length > 0 && setIsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    required
                    aria-required="true"
                    aria-invalid={state?.error ? "true" : "false"}
                    aria-describedby="dish-name-error"
                    className="w-full p-2 border rounded"
                />
                <div className="">
                    {loadingList ?
                        <LoaderCircle className="absolute top-1/4 right-[10px] animate-spin opacity-40" />
                        : error ?
                            <Tooltip>
                                <TooltipTrigger className="absolute text-amber-500 top-1/4 right-[10px] opacity-40">
                                    <TriangleAlert className="" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    {error}
                                </TooltipContent>
                            </Tooltip> : null
                    }
                </div>
            </div>

            {isDropdownOpen && itemsList.length > 0 && (
                <div className="absolute z-10 w-full bg-white dark:bg-card border rounded shadow mt-1">
                    {itemsList.map((item, index) => (
                        <div
                            key={`item-${index}-${item.id}`}
                            onClick={() => handleItemSelect(item.description)}
                            className="cursor-pointer hover:bg-slate-100 px-4 py-2 capitalize whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                            {item.description.toLowerCase()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}