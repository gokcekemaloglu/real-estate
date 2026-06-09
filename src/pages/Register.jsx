import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6 py-24 font-display relative overflow-hidden">
      {/* Background Subtle Line Effect */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size:[3rem_3rem]"></div>

      {/* Main Glassmorphism Form Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-light text-white tracking-wide">
            Görkem <span className="text-brand-gold font-sans font-semibold">Emlak</span>
          </h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-2 font-light">
            Yeni Hesap Oluşturun
          </p>
        </div>

        {/* Static HTML Form Isomorphic Structure */}
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Kullanıcı Adı</label>
            <input 
              type="text" 
              placeholder="gorkememlak"
              className="input-premium bg-slate-950/60 border-slate-800 text-white w-full font-light placeholder:text-slate-600 focus:border-brand-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">E-Posta Adresi</label>
            <input 
              type="email" 
              placeholder="isim@gorkememlak.com"
              className="input-premium bg-slate-950/60 border-slate-800 text-white w-full font-light placeholder:text-slate-600 focus:border-brand-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Şifre</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="input-premium bg-slate-950/60 border-slate-800 text-white w-full font-light placeholder:text-slate-600 focus:border-brand-gold"
            />
          </div>

          <button 
            type="submit" 
            className="btn-premium w-full py-3.5 mt-2 font-semibold text-center tracking-widest transition-all duration-300 shadow-lg hover:shadow-brand-gold/10"
          >
            Kayıt Ol
          </button>
        </form>

        {/* Bottom Navigation Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-500 font-light">
            Zaten bir hesabınız var mı?{' '}
            <Link to="/login" className="text-brand-gold hover:text-amber-500 font-medium transition-colors duration-200">
              Giriş Yapın
            </Link>
          </p>
        </div>
      </div>

      {/* Luxury Decorative Blur Gradients */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-brand-gold/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-slate-800/20 blur-[100px] rounded-full"></div>
    </div>
  )
}

export default Register