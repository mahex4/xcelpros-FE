import { create } from 'zustand';

interface MealStore {
    refreshTrigger: number;
    triggerRefresh: () => void;
}

export const useMealStore = create<MealStore>((set) => ({
    refreshTrigger: 0,
    triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));