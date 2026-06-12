import React from "react";

const ContactForm = () => {
  return (
    <div className="lg:col-span-8 bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl dark:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-serif font-light text-slate-800 dark:text-white tracking-wide mb-6">
        Talep Formu
      </h3>

      {/* Raw HTML form setup for future Formik / state management integration hooks */}
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            Adınız Soyadınız
          </label>
          <input
            type="text"
            placeholder="Ahmet Yılmaz"
            className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
          />
        </div>

        {/* Telephone Contact Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            Telefon Numaranız
          </label>
          <input
            type="tel"
            placeholder="+90 (555) 000 0000"
            className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
          />
        </div>

        {/* Email Address Input Field */}
        <div className="flex flex-col sm:col-span-2 gap-1.5">
          <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            E-Posta Adresiniz
          </label>
          <input
            type="email"
            placeholder="ahmet.yilmaz@example.com"
            className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
          />
        </div>

        {/* Message Details Long-text Block Area */}
        <div className="flex flex-col sm:col-span-2 gap-1.5">
          <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            Yatırım Planınız veya Mesajınız
          </label>
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
  );
};

export default ContactForm;
