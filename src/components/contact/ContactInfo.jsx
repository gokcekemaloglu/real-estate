import React from "react";

const ContactInfo = () => {
  const whatsappNumber = "905067931320";
  const presetMessage = encodeURIComponent("Merhaba Cemal Bey, Görkem Emlak web siteniz üzerinden ilanlarınız hakkında bilgi almak için ulaşıyorum.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${presetMessage}`;
  return (
    <div className="lg:col-span-5 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">
          Ofis Adresi
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          YeşilYurt Mh. MaviBulvar Girişi <br />
          Sezer 4 Apartmanı Altı No: 13 <br />
          Seyhan, Adana / Türkiye
        </p>
      </div>
 
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">
          Telefon
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Cep Telefonu:{" "}
          <span className="font-normal text-brand-gold">
            +90 (506) 793 1320
          </span>{" "}
          <br />
          Ofis Telefonu:{" "}
          <span className="font-normal text-brand-gold">
            +90 (322) 226 4704
          </span>
        </p>
      </div>
 
      {/* <div className="flex flex-col gap-2">
        <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">
          E-Posta Adresi
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Genel Bilgi:{" "}
          <span className="text-slate-700 dark:text-slate-300 font-normal">
            info@gorkememlak.com
          </span>
        </p>
      </div> */}
 
      {/* WhatsApp CTA */}
      <a
        href={whatsappUrl}
        title="WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-4 border border-brand-gold/30 bg-white dark:bg-slate-900 px-6 py-5 shadow-md hover:shadow-xl hover:border-brand-gold transition-all duration-300"
      >
        {/* WhatsApp Icon */}
        <span className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366]">
          <svg
            viewBox="0 0 32 32"
            width="22"
            height="22"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.646.86 5.09 2.316 7.07L4.9 27.1l5.19-1.36A11.93 11.93 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.6c-1.94 0-3.75-.56-5.28-1.53l-.38-.23-3.08.81.82-3-.25-.39A9.55 9.55 0 0 1 6.4 15c0-5.3 4.31-9.6 9.6-9.6 5.3 0 9.6 4.3 9.6 9.6 0 5.3-4.3 9.6-9.6 9.6zm5.27-7.19c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.21-.45-2.3-1.43-.85-.76-1.42-1.7-1.59-1.98-.17-.29-.02-.44.13-.58.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.46-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.82 1.17 3.01.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.82.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.37-.07-.12-.26-.19-.55-.33z" />
          </svg>
        </span>
 
        <span className="flex flex-col">
          <span className="text-sm uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Hemen Ulaşın
          </span>
          <span className="text-lg font-serif text-slate-800 dark:text-white group-hover:text-brand-gold transition-colors">
            WhatsApp'tan Yazın
          </span>
        </span>
 
        <span className="ml-auto text-brand-gold text-xl group-hover:translate-x-1 transition-transform">
          →
        </span>
      </a>
    </div>
  );
};

export default ContactInfo;
