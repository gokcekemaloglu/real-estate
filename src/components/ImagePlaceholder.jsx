import React from 'react'

const ImagePlaceholder = ({ type = "property", showText = false }) => {
  const isUser = type === "user"
  const isSale = type === "category_sale";
  const isRent = type === "category_rent";
  const isTransfer = type === "category_transfer";
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center gap-2.5 transition-colors duration-300 relative select-none">
      {/* Subtle luxury structural background blueprint grid lines layer */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[2rem_2rem]"></div>
      {isUser && (
        <svg className="absolute w-[110%] h-[110%] -bottom-4 text-brand-gold dark:text-brand-gold fill-cyan-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
          <circle cx="50" cy="35" r="16" />
          <path d="M15,85 C15,62 30,58 50,58 C70,58 85,62 85,85" />
          <line x1="5" y1="85" x2="95" y2="85" strokeWidth="0.3" />
        </svg>
      )}
      {isSale && (
        <svg className="absolute w-[120%] h-[120%] -bottom-10 -left-10 text-amber-400/75 dark:text-amber-300 transition-all fill-emerald-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
          <polygon points="10,90 90,90 90,50 50,20 10,50" />
          <polygon points="25,50 50,30 75,50" />
          <rect x="42" y="65" width="16" height="25" />
          <rect x="25" y="58" width="12" height="15" />
          <rect x="63" y="58" width="12" height="15" />
          <line x1="0" y1="90" x2="100" y2="90" strokeWidth="0.5" />
        </svg>
        )}
        {isRent && (
          <svg className="absolute w-[130%] h-[130%] -bottom-12 -right-12 text-amber-400/75 dark:text-amber-300 fill-emerald-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
            <rect x="10" y="30" width="18" height="60" />
            <rect x="34" y="15" width="22" height="75" />
            <rect x="62" y="45" width="16" height="45" />
            <rect x="84" y="25" width="14" height="65" />
            <line x1="40" y1="25" x2="50" y2="25" /><line x1="40" y1="35" x2="50" y2="35" /><line x1="40" y1="45" x2="50" y2="45" />
            <line x1="14" y1="40" x2="24" y2="40" /><line x1="14" y1="50" x2="24" y2="50" />
            <line x1="66" y1="55" x2="74" y2="55" /><line x1="66" y1="65" x2="74" y2="65" />
          </svg>
        )}
        {isTransfer && (
        <svg className="absolute w-[120%] h-[120%] -bottom-6 text-amber-300/75 dark:text-amber-400/70 fill-emerald-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
          <rect x="15" y="40" width="70" height="50" />
          <rect x="25" y="55" width="20" height="35" /> 
          <rect x="53" y="55" width="22" height="25" />
          <polygon points="10,40 90,40 85,25 15,25" fill="brand-gold" />
          <line x1="25" y1="25" x2="21" y2="40" /><line x1="40" y1="25" x2="38" y2="40" /><line x1="55" y1="25" x2="55" y2="40" /><line x1="70" y1="25" x2="72" y2="40" />
        </svg>
      )}
        {!isUser && !isSale && !isRent && !isTransfer && (
        <svg className="absolute w-[110%] h-[110%] -bottom-8 -left-6 text-amber-300/75 dark:text-amber-400/70 animate-pulse duration-4000 fill-emerald-800" viewBox="0 0 100 100"  stroke="currentColor" strokeWidth="0.15">
          <polygon points="15,45 50,15 85,45" />
          <rect x="22" y="45" width="56" height="40" />
          <rect x="42" y="60" width="16" height="25" />
          {/* Subtle micro camera overlay lines mapping straight into center baseline */}
          <circle cx="50" cy="35" r="4" strokeWidth="0.2" />
          <line x1="0" y1="85" x2="100" y2="85" strokeWidth="0.4" />
        </svg>
      )}
      {showText && (
        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-medium">
          Henüz bir görsel eklenmedi
        </span>
      )}
    </div>
  )
}

export default ImagePlaceholder
