import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState, createContext } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark"
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
        <ThemeContext value={{isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider framework")
    }
    return context
}