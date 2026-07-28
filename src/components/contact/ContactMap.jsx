import React from 'react'

const ContactMap = () => {
  const officeAddress = "YeşilYurt Mh. MaviBulvar Girişi Sezer 4 Apartmanı Altı No:13, Seyhan, Adana";
  const officeLat = 37.029162790801244;
  const officeLng = 35.30987418536411;
  const officeLabel = encodeURIComponent("Görkem Emlak");
  const encodedAddress = encodeURIComponent(officeAddress);
 
  const mapEmbedUrl = `https://www.google.com/maps?q=${officeLat},${officeLng}(${officeLabel})&z=17&output=embed`;
 
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${officeLat},${officeLng}`;
  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-serif text-slate-800 dark:text-white tracking-wide">
          Konumumuz
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Ofisimizi ziyaret etmek isterseniz, aşağıdaki haritadan yol tarifi alabilirsiniz.
        </p>
      </div>
 
      {/* Map */}
      <div className="relative w-full h-80 lg:h-105 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <iframe
          title="Görkem Emlak Ofis Konumu"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-30 contrast-[1.05] dark:invert-92 dark:hue-rotate-180"
        />
      </div>
 
      {/* Direction Button */}
      <a
        href={directionsUrl}
        title='Yol Tarifi Al'
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 self-start text-sm uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300 border-b border-brand-gold/50 hover:border-brand-gold pb-1 transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
        Yol Tarifi Al
        <span className="group-hover:translate-x-1 transition-transform">
          →
        </span>
      </a>
    </div>
  )
}

export default ContactMap