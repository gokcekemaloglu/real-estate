import React from "react";

const AboutShowcase = () => {
  return (
    <div className="relative group">
      {/* Elegant outer border framing effect */}
      <div className="absolute -inset-4 border border-brand-gold/20 dark:border-brand-gold/10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>

      {/* Main Premium Architecture Image Placeholder */}
      <div className="relative h-100 md:h-125 w-full bg-slate-200 dark:bg-slate-900 overflow-hidden shadow-2xl">
        <img
          src="https://unsplash.com"
          alt="Luxury Real Estate Estate Architecture Office"
          className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/40 to-transparent"></div>
      </div>

      {/* Decorative Tiny Floating Banner */}
      <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 shadow-xl hidden sm:block">
        <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold block font-semibold">
          Merkez Ofis
        </span>
        <span className="text-xs font-light text-slate-600 dark:text-slate-400">
          Lüks Konut Grubu Bölümü
        </span>
      </div>
    </div>
  );
};

export default AboutShowcase;
