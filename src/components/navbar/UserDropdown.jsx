import React from 'react'
import { Link } from 'react-router-dom';

const UserDropdown = ({ currentUser, isAdmin, logout, setIsDropdownOpen, currentUserId }) => {
  return (
    <div className="absolute right-0 top-12 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl animate-fade-in font-display z-50 text-xs text-slate-600 dark:text-slate-300">
      
      {/* 1. Header Specimen: Greetings block displaying active user session names */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800/80">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Oturum Açan</span>
        <span className="font-medium text-slate-800 dark:text-white mt-0.5 block truncate text-sm">{currentUser}</span>
      </div>

      {/* 2. Primary Navigational Links Rows Matrix */}
      <div className="flex flex-col py-1.5 border-b border-slate-100 dark:border-slate-800/80">
        
        {/* Account Profile Management Portal Gateway */}
        <Link 
          to={`/profile/${currentUserId}`} 
          onClick={() => setIsDropdownOpen(false)}
          className="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-950/40 hover:text-brand-gold flex items-center justify-between group transition-colors duration-200"
        >
          <span>Hesabım / Profil Güncelle</span>
          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 text-brand-gold font-sans font-medium text-sm">›</span>
        </Link>

        {/* [ADDED PLACEHOLDER]: Connected dynamic link structure ready for your upcoming backend bookmarks system */}
        <Link 
          to="/favorites" 
          onClick={() => setIsDropdownOpen(false)}
          className="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-950/40 hover:text-brand-gold flex items-center justify-between group transition-colors duration-200"
        >
          <span>Favorilerim</span>
          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 text-brand-gold font-sans font-medium text-sm">›</span>
        </Link>

        {/* Conditional shortcut targeting admin panel if active session validates as administrator */}
        {isAdmin && (
          <Link 
            to="/admin" 
            onClick={() => setIsDropdownOpen(false)}
            className="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-950/40 text-amber-500 font-medium flex items-center justify-between group transition-colors duration-200"
          >
            <span>Admin Yönetim Paneli</span>
            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 text-amber-500 font-sans font-medium text-sm">›</span>
          </Link>
        )}
      </div>

      {/* 3. Action Trigger Controller Block Row */}
      <button
        type="button"
        onClick={() => {
          setIsDropdownOpen(false);
          logout();
        }}
        className="w-full text-left px-4 py-3 hover:bg-red-50/50 dark:hover:bg-red-950/10 text-red-500 font-semibold uppercase tracking-wider text-[10px] flex items-center justify-between transition-colors duration-200 cursor-pointer"
      >
        <span>Oturumu Kapat</span>
        <span>➔</span>
      </button>

    </div>
  )
}

export default UserDropdown