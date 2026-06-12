import React from "react";

const ContactInfo = () => {
  return (
    <div className="lg:col-span-4 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">
          Merkez Ofis
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Lüks Konut Grubu Bölümü <br />
          MaviBulvar <br />
          Seyhan, Adana / Türkiye
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">
          Doğrudan İletişim
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Müşteri İlişkileri:{" "}
          <span className="font-normal text-brand-gold">
            +90 (322) 555 0100
          </span>{" "}
          <br />
          Genel Sekreterlik:{" "}
          <span className="font-normal text-brand-gold">
            +90 (322) 555 0101
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">
          E-Posta Adresleri
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Genel Bilgi:{" "}
          <span className="text-slate-700 dark:text-slate-300 font-normal">
            info@gorkememlak.com
          </span>{" "}
          <br />
          Yatırım Ortaklığı:{" "}
          <span className="text-slate-700 dark:text-slate-300 font-normal">
            investment@gorkememlak.com
          </span>
        </p>
      </div>

      {/* Simulated Interactive Map Placement Area (Premium UI Aspect) */}
      <div className="relative w-full h-48 bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: "url('https://unsplash.com')" }}
        ></div>
        <div className="absolute inset-0 bg-brand-dark/20 dark:bg-brand-dark/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] uppercase tracking-[0.25em] bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-amber-400 px-4 py-2 border border-brand-gold/30 shadow-lg">
            Haritayı Göster
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
