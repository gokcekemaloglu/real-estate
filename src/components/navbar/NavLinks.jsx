import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getNavigationRoutes } from "../../helper/navigationRoutes";

const NavLinks = ({ isAdmin, token }) => {
  const activeRoutes = getNavigationRoutes(isAdmin, token);
  return (
    <div className="hidden lg:flex flex-1 justify-center items-center gap-x-5 lg:gap-x-8 text-xs lg:text-[13px] font-bold tracking-widest text-slate-600 dark:text-slate-300 transition-colors duration-300 uppercase px-6">
      {activeRoutes?.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `after-line py-1 transition-colors duration-300 cursor-pointer whitespace-nowrap ${
              isActive ? "text-brand-gold font-semibold" : "hover:text-brand-gold/50 after:w-0"
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
