import React from 'react'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
    const {isDarkMode, toggleTheme} = useTheme()
  return (
    <button
      title='Light/Dark'
      onClick={toggleTheme}
      className="p-2 rounded-full border border-slate-700 hover:border-brand-gold dark:hover:border-amber-400 transition-all duration-300 cursor-pointer text-slate-300 dark:text-amber-400 flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? (
        // Elegant Sun Icon
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        // Elegant Moon Icon
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle