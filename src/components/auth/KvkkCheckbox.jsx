import React from "react";
import { Link } from "react-router-dom";

const KvkkCheckbox = ({ checked, onChange }) => {
  return (
    <div className="flex items-start gap-2.5 my-5 select-none animate-fade-in text-[11px] font-light leading-relaxed text-slate-500 dark:text-slate-400">
      <input
        id="login-kvkk-consent"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-3.5 h-3.5 mt-0.5 accent-brand-gold border-slate-300 rounded-xs cursor-pointer shrink-0"
      />
      <label htmlFor="login-kvkk-consent" className="cursor-pointer">
        Görkem Emlak{" "}
        <Link
          to="/kvkk"
          className="text-brand-gold font-medium hover:underline"
        >
          KVKK Aydınlatma Metni
        </Link>
        'ni okudum. Google veya yerel hesabımla giriş yaparak verilerimin
        işlenmesini kabul ediyorum.
      </label>
    </div>
  );
};

export default KvkkCheckbox;
