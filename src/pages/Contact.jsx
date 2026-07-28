import React from 'react'
import ContactHeader from '../components/contact/ContactHeader'
import ContactInfo from '../components/contact/ContactInfo'
import ContactMap from '../components/contact/ContactMap'
import useDocumentMeta from '../hooks/useDocumentMeta'

const Contact = () => {
  useDocumentMeta(
    "İletişim | Görkem Emlak",
    "Görkem Emlak ile iletişime geçin — Adana'daki ofisimizin adresi, telefon numaralarımız ve WhatsApp üzerinden bize ulaşın."
  )
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <ContactHeader/>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ContactInfo/>
          <ContactMap/>
        </div>
      </div>
    </div>
  )
}

export default Contact
