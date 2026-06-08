import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-slate-800 font-display">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Luxury Logo */}
        <Link to="/" className="text-lg uppercase tracking-[0.25em] text-white font-serif font-light">
          Görkem <span className="text-brand-gold font-sans font-semibold">Emlak</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-300">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-300">Ana Sayfa</Link>
          <Link to="/properties" className="hover:text-brand-gold transition-colors duration-300">İlanlar</Link>
          <Link to="/about" className="hover:text-brand-gold transition-colors duration-300">Hakkımızda</Link>
          <Link to="/contact" className="hover:text-brand-gold transition-colors duration-300">İletişim</Link>
        </div>

        {/* Desktop Action Button */}
        <div className="hidden md:block">
          <Link to="/login" className="btn-premium px-6 py-2.5 font-medium">
            Giriş Yap
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none cursor-pointer"
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

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-brand-dark border-b border-slate-800 px-6 py-6 flex flex-col gap-6 text-xs uppercase tracking-widest text-slate-300 animate-fade-in">
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