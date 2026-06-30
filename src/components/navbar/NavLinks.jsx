import React from 'react'
import { Link } from 'react-router-dom'

const NavLinks = ({isAdmin}) => {
  // console.log("isAdmin", isAdmin);
  
  return (
    <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors duration-300">
        <Link to="/" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">Ana Sayfa</Link>
        <Link to="/properties" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">İlanlar</Link>
        <Link to="/about" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">Hakkımızda</Link>
        <Link to="/contact" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">İletişim</Link>
        {isAdmin && <Link to="/admin" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">Admin Panel</Link>}
        
    </div>
  )
}

export default NavLinks