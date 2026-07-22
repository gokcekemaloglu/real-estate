import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center text-center gap-5 max-w-md mx-auto py-24 text-xs font-light text-slate-700 dark:text-slate-300 animate-fade-in">
 
      <span className="text-6xl font-serif font-light text-brand-gold/30 dark:text-amber-400/25">
        404
      </span>
 
      <div className="w-12 h-px bg-brand-gold/40"></div>
 
      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-medium">
          Panel İçinde Bulunamadı
        </span>
        <h1 className="text-lg font-serif text-slate-800 dark:text-white font-light tracking-wide">
          Bu Yönetim Sayfası Mevcut Değil
        </h1>
        <p className="text-[12px] text-slate-400 dark:text-slate-500 leading-relaxed">
          Aradığınız admin ekranı bulunamadı ya da adres hatalı yazılmış olabilir.
        </p>
      </div>
 
      <div className="flex items-center gap-4 mt-1">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="text-xs uppercase tracking-widest text-brand-gold hover:underline cursor-pointer"
        >
          Panele Dön
        </button>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <button
          type="button"
          onClick={() => navigate("/admin/properties")}
          className="text-xs uppercase tracking-widest text-slate-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          İlan Listesine Git
        </button>
      </div>
    </div>
  )
}

export default AdminNotFound