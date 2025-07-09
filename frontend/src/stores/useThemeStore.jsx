import { create } from "zustand"

export const useThemeStore = create((set, get) => ({
    theme : sessionStorage.getItem("theme") || "light",
    setTheme : () => {
        const current  = get().theme
        set({theme : current === 'light' ? 'dark' : 'light' })
        sessionStorage.setItem("theme", get().theme)
    }
}))