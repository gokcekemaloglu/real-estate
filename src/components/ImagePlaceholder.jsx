import React from 'react'

const ImagePlaceholder = ({ type = "property", showText = false }) => {
  const isUser = type === "user"
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center gap-2.5 transition-colors duration-300 relative select-none">
      {/* Subtle luxury structural background blueprint grid lines layer */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[2rem_2rem]"></div>
      
      {/* HIBRID JSX SVG CORES: Switches vector outlines based on types matrices smoothly */}
      {isUser ? (
        // Premium Minimalist User Identity Avatar Silhouette Wireframe Icon
        <svg
          xmlns="http://w3.org"
          width="36"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-gold/60 dark:text-amber-500/40"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      ) : (
        // Tabler-style elegant wireframe house and camera vector hybrid overlay icon layout
        <svg 
          xmlns="http://w3.org" 
          width="40" 
          height="44" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.25" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-brand-gold/60 dark:text-amber-500/40 animate-pulse duration-[4000ms]"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
          <circle cx="12" cy="13" r="2" strokeWidth="1" opacity="0.4" />
        </svg>
      )}
      
      {/* Conditional rendering: Only displays text parameters if explicitly commanded by parent detail wrappers! */}
      {showText && (
        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-medium">
          Henüz bir görsel eklenmedi
        </span>
      )}
    </div>
  )
}

export default ImagePlaceholder