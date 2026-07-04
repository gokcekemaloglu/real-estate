import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getNavigationRoutes } from "../../helper/navigationRoutes";

const NavLinks = ({ isAdmin, token }) => {
  // console.log("isAdmin", isAdmin);
  const activeRoutes = getNavigationRoutes(isAdmin, token);

  return (
    <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors duration-300">
      {activeRoutes?.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `after-line py-1 transition-colors duration-300 cursor-pointer ${
              isActive
                ? "text-brand-gold font-semibold"
                : "hover:text-brand-gold after:w-0"
            }`
          }
        >
          {route.label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;

{/* <Link to="/" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">Ana Sayfa</Link>
  <Link to="/properties" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">İlanlar</Link>
  <Link to="/about" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">Hakkımızda</Link>
  <Link to="/contact" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">İletişim</Link>
  {isAdmin && <Link to="/admin" className="after-line py-1 hover:text-brand-gold transition-colors duration-300">Admin Panel</Link>} */}