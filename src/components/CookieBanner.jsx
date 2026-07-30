import React, { useState, useEffect } from 'react'

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already configuration saved in their storage vector
    const consent = localStorage.getItem("gorkem_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gorkem_cookie_consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white p-4 border-t border-brand-gold/30 z-50 animate-fade-in flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 text-xs font-light tracking-wide">
      <div className="flex-1 text-slate-300 leading-relaxed">
        Görkem Emlak'ın temel işlevleri (ilan arama, görüntüleme, WhatsApp ile iletişim) herhangi bir çerez kullanmadan çalışır; arayüz tercihinizi (Grid/Row modu) hatırlamak için yalnızca tarayıcınızın yerel deposunu kullanırız. <strong className="text-slate-200 font-normal">Google ile Giriş</strong> özelliğini tercih ederseniz, Google'ın kendi güvenli oturum çerezleri (üçüncü taraf) devreye girer. Sitemizi kullanmaya devam ederek bu bilgilendirmeyi kabul etmiş sayılırsınız.
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <a href="/kvkk" className="text-brand-gold hover:underline uppercase tracking-widest text-[10px] font-medium">
          Çerez Politikası
        </a>
        <button
          type="button"
          title='Kabul Et'
          onClick={handleAccept}
          className="bg-brand-gold hover:bg-amber-700 text-white font-semibold uppercase tracking-widest text-[10px] px-6 py-2.5 transition-colors duration-200 cursor-pointer"
        >
          Anladım, Kabul Et
        </button>
      </div>
    </div>
  )
}

export default CookieBanner
