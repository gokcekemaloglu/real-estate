import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/85 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 font-display transition-colors duration-300">
      <div className="w-full mx-auto px-12 md:px-24 h-20 flex items-center justify-between">
        
        {/* Brand Luxury Logo */}
        <Link to="/" className="text-lg uppercase tracking-[0.25em] text-slate-900 dark:text-white font-serif font-light transition-colors duration-300">
          Görkem <span className="text-brand-gold font-sans font-semibold">Emlak</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors duration-300">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-300">Ana Sayfa</Link>
          <Link to="/properties" className="hover:text-brand-gold transition-colors duration-300">İlanlar</Link>
          <Link to="/about" className="hover:text-brand-gold transition-colors duration-300">Hakkımızda</Link>
          <Link to="/contact" className="hover:text-brand-gold transition-colors duration-300">İletişim</Link>
        </div>

        {/* Right Side Actions Container (Always visible on mobile & desktop) */}
        <div className="flex items-center gap-2 md:gap-4 order-2 md:order-0">
          {/* Dark/Light Mode Toggle Switch */}
          <ThemeToggle />
          
          {/* Desktop Only Login Action */}
          <div className="hidden md:flex">
            <Link to="/login" className="btn-premium px-6 py-2.5 font-medium">
              Giriş Yap
            </Link>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-800 dark:text-white focus:outline-none cursor-pointer p-2 ml-1 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-brand-dark border-b border-slate-200 dark:border-slate-800 px-6 py-6 flex flex-col gap-6 text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300 animate-fade-in transition-colors duration-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-brand-gold">Ana Sayfa</Link>
          <Link to="/properties" onClick={() => setIsOpen(false)} className="hover:text-brand-gold">İlanlar</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-brand-gold">Hakkımızda</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-brand-gold">İletişim</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="btn-premium text-center py-3 mt-2">
            Giriş Yap
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar