import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getNavigationRoutes } from "../../helper/navigationRoutes";

const NavLinks = ({ isAdmin, token }) => {
  // console.log("isAdmin", isAdmin);
  const activeRoutes = getNavigationRoutes(isAdmin, token);

  return (
    <div className="hidden md:flex items-center gap-8 text-xs md:text-sm lg:text-md font-bold tracking-widest text-slate-600 dark:text-slate-300 transition-colors duration-300">
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
