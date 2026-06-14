import React from 'react'
import { Link } from 'react-router-dom';

const MobileMenu = ({setIsOpen, logout, currentUser, token}) => {
  return (
     <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-brand-dark border-b border-slate-200 dark:border-slate-800 px-6 py-6 flex flex-col gap-6 text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300 animate-fade-in transition-colors duration-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-brand-gold">Ana Sayfa</Link>
          <Link to="/properties" onClick={() => setIsOpen(false)} className="hover:text-brand-gold">İlanlar</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-brand-gold">Hakkımızda</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-brand-gold">İletişim</Link>
          {token ? (
            <button 
              onClick={() => { setIsOpen(false); logout(); }} 
              className="btn-premium text-center py-3 mt-2"
            >
              Çıkış Yap ({currentUser})
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="btn-premium text-center py-3 mt-2">
              Giriş Yap
            </Link>
          )}
        </div>
  )
}

export default MobileMenu