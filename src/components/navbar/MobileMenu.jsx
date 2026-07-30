import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getNavigationRoutes } from "../../helper/navigationRoutes";

const MobileMenu = ({ setIsOpen, logout, currentUser, token, isAdmin, currentUserId }) => {
  const activeRoutes = getNavigationRoutes(isAdmin, token, currentUserId);
  return (
    <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-brand-dark border-b border-slate-200 dark:border-slate-800 px-6 py-6 flex flex-col gap-6 text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300 animate-fade-in transition-colors duration-300">
      {activeRoutes?.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `hover:text-brand-gold transition-colors flex items-center justify-between ${
              isActive ? "text-brand-gold font-semibold" : ""
            }`
          }
        >
          <span>{route.label}</span>
          {/* Subtle luxury dot parlatıcı tracking indicator active routes paths */}
          {window.location.pathname === route.path && (
            <span className="text-brand-gold font-sans">●</span>
          )}
        </NavLink>
      ))}

      {token ? (
        <button
          type="button"
          title="Çıkış Yap"
          onClick={() => {
            setIsOpen(false);
            logout();
          }}
          className="btn-premium text-center py-3 mt-2"
        >
          Çıkış Yap ({currentUser})
        </button>
      ) : (
        <Link
          to="/login"
          onClick={() => setIsOpen(false)}
          className="btn-premium text-center py-3 mt-2"
        >
          Giriş Yap
        </Link>
      )}
    </div>
  );
};

export default MobileMenu;
