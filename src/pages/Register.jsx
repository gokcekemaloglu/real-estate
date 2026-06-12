import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm, { SignupSchema } from '../components/auth/RegisterForm'
import AuthFooterLink from '../components/auth/AuthFooterLink'
import { Formik } from 'formik'
import useAuthCall from '../hooks/useAuthCall'

const Register = () => {
  const {register} = useAuthCall()
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-brand-dark px-6 py-24 font-display relative overflow-hidden transition-colors duration-300">
      {/* Background Subtle Line Effect */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[3rem_3rem]"></div>

      {/* Main Form Card with Dynamic Dark/Light Mode Background */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl dark:shadow-2xl transition-colors duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-light text-slate-800 dark:text-white tracking-wide">
            Görkem <span className="text-brand-gold font-sans font-semibold">Emlak</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest mt-2 font-light">
            Yeni Hesap Oluşturun
          </p>
        </div>

        {/* Form Container */}
        <Formik
          initialValues={{
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            register(values)
          }}
          component={(props) => <RegisterForm {...props}/>}
        ></Formik>
        
        {/* <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Kullanıcı Adı</label>
            <input 
              type="text" 
              placeholder="gorkememlak"
              className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">E-Posta Adresi</label>
            <input 
              type="email" 
              placeholder="isim@gorkememlak.com"
              className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Şifre</label>
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
            Kayıt Ol
          </button>
        </form> */}

        {/* Bottom Link */}

        <AuthFooterLink text={"Zaten bir hesabınız var mı"} linkText={"Giriş Yapın"} to={"/login"}/>

      </div>

      {/* Decorative Blur Gradients */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-brand-gold/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-slate-800/10 dark:bg-slate-800/20 blur-[100px] rounded-full"></div>
    </div>
  )
}

export default Register