import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";
import ThemeToggle from "./ThemeToggle";
import NavLinks from "./navbar/NavLinks";
import MobileMenu from "./navbar/MobileMenu";
import UserDropdown from "./navbar/UserDropdown";
import { useRef } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuthCall();

  const { token, currentUser, isAdmin, currentUserInfo, currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/85 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 font-display transition-colors duration-300">
      <div className="w-full mx-auto px-12 md:px-24 h-20 flex items-center justify-between">
        {/* Brand Luxury Logo */}
        <Link
          to="/"
          className="text-lg md:text-xl lg:text-3xl uppercase tracking-[0.25em] text-slate-900 dark:text-white font-serif font-light transition-colors duration-300"
        >
          Görkem{" "}
          <span className="text-brand-gold font-sans font-semibold">Emlak</span>
        </Link>

        {/* Desktop Navigation Links - Integrated with 'after-line' utility */}
        <NavLinks isAdmin={isAdmin} />

        {/* Right Side Actions Container (Always visible on mobile & desktop) */}
        <div className="flex items-center gap-2 md:gap-4 order-2 md:order-0">
          {/* Dark/Light Mode Toggle Switch */}
          <ThemeToggle />

          {/* Conditional rendering depending on authentication state  */}
          {token ? (
            <div className="hidden sm:flex items-center relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-xs font-light tracking-wide text-slate-500 dark:text-slate-400 hover:text-brand-gold cursor-pointer py-2 flex items-center gap-1 transition-colors duration-200 font-sans"
              >
                Giriş: <span className="font-medium text-brand-gold border-b border-dashed border-brand-gold/40 hover:border-brand-gold pb-0.5">{currentUser}</span>
                <span className={`text-[10px] text-brand-gold transition-transform duration-300 font-sans ${isDropdownOpen ? "rotate-180" : ""}`}>▼</span>
              </button>

              {/* Mounted conditional node element portal layout maps beautifully straight beneath names hook anchors */}
              {isDropdownOpen && (
                <UserDropdown
                  currentUser={currentUser} 
                  currentUserId={currentUserId} 
                  isAdmin={isAdmin} 
                  logout={logout} 
                  setIsDropdownOpen={setIsDropdownOpen} 
                />
              )}
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
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <MobileMenu
          setIsOpen={setIsOpen}
          logout={logout}
          currentUser={currentUser}
          token={token}
          isAdmin={isAdmin}
          currentUserId={currentUserId}
        />
      )}
    </nav>
  );
};

export default Navbar;
