import React from "react";
import { useContext } from "react";
import { useState, createContext } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark" ? true : false
    })

    useEffect(() => {
        const root = window.document.documentElement
        if (isDarkMode) {
            root.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            root.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [isDarkMode])

    const toggleTheme = () => setIsDarkMode(prev => !prev)

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}