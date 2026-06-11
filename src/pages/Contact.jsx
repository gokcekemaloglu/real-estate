import React from 'react'

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      {/* Background Luxury Line Grid using Tailwind v4 syntax */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-3 block">
            Seçkin Yatırımlar İçin Bizimle İletişime Geçin
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
            Kusursuz Hizmet <br />
            <span className="font-serif italic text-brand-gold dark:text-amber-400">İletişim Hattı</span>
          </h1>
        </div>

        {/* Core Layout: Grid splits into contact info details and raw HTML premium contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (4-Cols): Contact Corporate Information Details */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">Merkez Ofis</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Lüks Konut Grubu Bölümü <br />
                MaviBulvar <br />
                Seyhan, Adana / Türkiye
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">Doğrudan İletişim</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Müşteri İlişkileri: <span className="font-normal text-brand-gold">+90 (322) 555 0100</span> <br />
                Genel Sekreterlik: <span className="font-normal text-brand-gold">+90 (322) 555 0101</span>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">E-Posta Adresleri</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Genel Bilgi: <span className="text-slate-700 dark:text-slate-300 font-normal">info@gorkememlak.com</span> <br />
                Yatırım Ortaklığı: <span className="text-slate-700 dark:text-slate-300 font-normal">investment@gorkememlak.com</span>
              </p>
            </div>

            {/* Simulated Interactive Map Placement Area (Premium UI Aspect) */}
            <div className="relative w-full h-48 bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden group">
              <div className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://unsplash.com')" }}></div>
              <div className="absolute inset-0 bg-brand-dark/20 dark:bg-brand-dark/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-[0.25em] bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-amber-400 px-4 py-2 border border-brand-gold/30 shadow-lg">
                  Haritayı Göster
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (8-Cols): Premium Design Message Form wrapper */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl dark:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-serif font-light text-slate-800 dark:text-white tracking-wide mb-6">
              Talep Formu
            </h3>
            
            {/* Raw HTML form setup for future Formik / state management integration hooks */}
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name Input Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Adınız Soyadınız</label>
                <input 
                  type="text" 
                  placeholder="Ahmet Yılmaz"
                  className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
                />
              </div>

              {/* Telephone Contact Input Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Telefon Numaranız</label>
                <input 
                  type="tel" 
                  placeholder="+90 (555) 000 0000"
                  className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
                />
              </div>

              {/* Email Address Input Field */}
              <div className="flex flex-col sm:col-span-2 gap-1.5">
                <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">E-Posta Adresiniz</label>
                <input 
                  type="email" 
                  placeholder="ahmet.yilmaz@example.com"
                  className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
                />
              </div>

              {/* Message Details Long-text Block Area */}
              <div className="flex flex-col sm:col-span-2 gap-1.5">
                <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Yatırım Planınız veya Mesajınız</label>
                <textarea 
                  rows="5"
                  placeholder="İlgilendiğiniz portföy detayları veya yatırım hedefleriniz..."
                  className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold resize-none"
                ></textarea>
              </div>

              {/* Submission Operations Layout Actions Wrapper */}
              <div className="sm:col-span-2 flex justify-end mt-2">
                <button 
                  type="submit" 
                  className="btn-premium px-10 py-4 font-semibold text-center tracking-widest transition-all duration-300 shadow-md dark:shadow-lg dark:hover:shadow-brand-gold/10 w-full sm:w-auto"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact