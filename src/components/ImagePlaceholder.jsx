import React from 'react'

const ImagePlaceholder = ({ type = "property", showText = false, isAdmin = false }) => {
  const isUser = type === "user"
  const isSale = type === "category_sale";
  const isRent = type === "category_rent";
  const isTransfer = type === "category_transfer";
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center gap-3 transition-colors duration-300 relative select-none overflow-hidden">
 
      {/* Blueprint grid dokusu (orijinal) */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[2rem_2rem]"></div>
 
      {/* Yumuşak radial glow — badge'in arkasında derinlik hissi yaratır */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(180,83,9,0.10)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(251,191,36,0.08)_0%,transparent_70%)]"></div>
      </div>
 
      {/* Fotoğraf vizörü köşe işaretleri — imza detay */}
      {[
        "top-3 left-3 border-t border-l",
        "top-3 right-3 border-t border-r",
        "bottom-3 left-3 border-b border-l",
        "bottom-3 right-3 border-b border-r",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute w-3 h-3 ${pos} border-brand-gold/30 dark:border-amber-400/25 pointer-events-none`}
        />
      ))}
 
      {/* Dairesel çerçeve (badge) */}
      <div className="relative z-10 w-[42%] aspect-square rounded-full border border-brand-gold/25 dark:border-amber-400/20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center shadow-sm">
        <svg
          className="w-[58%] h-[58%] text-brand-gold/70 dark:text-amber-400/70"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isUser && (
            <>
              <circle cx="24" cy="17" r="8" />
              <path d="M9 39c0-8.837 6.716-14 15-14s15 5.163 15 14" />
            </>
          )}
 
          {isSale && (
            <>
              {/* Ev + anahtar: satılık temsili */}
              <path d="M8 24 24 11l16 13" />
              <path d="M12 22v15h9V27h6v10h9V22" />
              <circle cx="33" cy="14" r="3.4" />
              <path d="M35.4 16.4 41 22M38 19l-2 2" />
            </>
          )}
 
          {isRent && (
            <>
              {/* Apartman bloğu: kiralık temsili */}
              <rect x="10" y="14" width="12" height="24" />
              <rect x="26" y="8" width="12" height="30" />
              <path d="M13 19h6M13 24h6M13 29h6" />
              <path d="M29 13h6M29 18h6M29 23h6M29 28h6" />
            </>
          )}
 
          {isTransfer && (
            <>
              {/* Dükkan + devir oku: devren temsili */}
              <path d="M8 20 10 9h28l2 11" />
              <path d="M8 20v18h32V20" />
              <path d="M20 38V27h8v11" />
              <path d="M16 20v6M24 20v3M32 20v6" />
              <path d="M17 6l3 3-3 3" />
            </>
          )}
 
          {!isUser && !isSale && !isRent && !isTransfer && (
            <>
              {/* Fotoğraf makinesi: genel "görsel yok" temsili */}
              <path d="M6 16h6l3-4h10l3 4h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2Z" />
              <circle cx="24" cy="26" r="7" />
              <circle cx="24" cy="26" r="2.6" />
              <path d="M33 20h2" />
            </>
          )}
        </svg>
      </div>
 
      {showText && (
        <span className="relative z-10 text-[9px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-medium">
          Henüz bir görsel eklenmedi
        </span>
      )}
    </div>
  )
}

export default ImagePlaceholder
