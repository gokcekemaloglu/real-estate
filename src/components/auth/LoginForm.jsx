import React from "react";

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          E-Posta Adresi
        </label>
        <input
          type="email"
          placeholder="isim@gorkememlak.com"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          Şifre
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
        />
      </div>

      <button
        type="submit"
        className="btn-premium w-full py-3.5 mt-2 font-semibold text-center tracking-widest transition-all duration-300 shadow-md dark:shadow-lg dark:hover:shadow-brand-gold/10"
      >
        Giriş Yap
      </button>
    </form>
  );
};

export default LoginForm;
