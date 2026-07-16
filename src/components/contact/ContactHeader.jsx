import React from "react";

const ContactHeader = () => {
  return (
    <div className="text-center mb-16 md:mb-20">
      <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-3 block">
        Bizimle İstediğiniz An İletişime Geçebilirsiniz
      </span>
      <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
        Sorularınız İçin <br />
        <span className="font-serif italic text-brand-gold dark:text-amber-400">
          İletişim Hattımız
        </span>
      </h1>
    </div>
  );
};

export default ContactHeader;
