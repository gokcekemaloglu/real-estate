import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAuthCall from '../hooks/useAuthCall'
import ThemeToggle from './ThemeToggle'
import NavLinks from './navbar/NavLinks'
import MobileMenu from './navbar/MobileMenu'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {logout} = useAuthCall()

    const {token, currentUser, isAdmin, currentUserInfo} = useSelector(state => state.auth)
    // console.log(token);
    console.log(currentUser);
    console.log(currentUserInfo);
    console.log(isAdmin);
    
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/85 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 font-display transition-colors duration-300">
      <div className="w-full mx-auto px-12 md:px-24 h-20 flex items-center justify-between">
        
        {/* Brand Luxury Logo */}
        <Link to="/" className="text-lg uppercase tracking-[0.25em] text-slate-900 dark:text-white font-serif font-light transition-colors duration-300">
          Görkem <span className="text-brand-gold font-sans font-semibold">Emlak</span>
        </Link>

        {/* Desktop Navigation Links - Integrated with 'after-line' utility */}
        <NavLinks isAdmin={isAdmin} />

        {/* Right Side Actions Container (Always visible on mobile & desktop) */}
        <div className="flex items-center gap-2 md:gap-4 order-2 md:order-0">
          {/* Dark/Light Mode Toggle Switch */}
          <ThemeToggle />
          
          {/* Conditional rendering depending on authentication state  */}
          {token ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-light tracking-wide text-slate-500 dark:text-slate-400">
                Giriş: <span className="font-medium text-brand-gold">{currentUser}</span>
              </span>
              <button onClick={logout} className="btn-premium px-6 py-2.5 font-medium">
                Çıkış Yap
              </button>
            </div>
          ) : (
            <div className="hidden md:flex">
              <Link to="/login" className="btn-premium px-6 py-2.5 font-medium">
                Giriş Yap
              </Link>
          </div>
          )}
          
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
      {isOpen && 
        <MobileMenu setIsOpen={setIsOpen} logout={logout} currentUser={currentUser} token={token} isAdmin={isAdmin} />
      }
      
    </nav>
  )
}

export default Navbar