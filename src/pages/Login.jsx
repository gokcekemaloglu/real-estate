import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import AuthFooterLink from '../components/auth/AuthFooterLink'
import useAuthCall from '../hooks/useAuthCall'
import { Formik } from 'formik'
import { SignInSchema } from '../helper/ValidationSchemas'
import GoogleLoginButton from '../components/auth/GoogleLoginButton'
import { useState } from 'react'
import KvkkCheckbox from '../components/auth/KvkkCheckbox'

const Login = () => {
  const {login} = useAuthCall()
  const [kvkkConsent, setKvkkConsent] = useState(false)
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-brand-dark px-6 py-24 font-display relative overflow-hidden transition-colors duration-300">
      {/* Background Subtle Line Effect with Tailwind v4 size definition */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[3rem_3rem]"></div>

      {/* Main Form Card with Dynamic Dark/Light Mode Background */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl dark:shadow-2xl transition-colors duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-light text-slate-800 dark:text-white tracking-wide">
            Görkem <span className="text-brand-gold font-sans font-semibold">Emlak</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest mt-2 font-light">
            Hesabınıza Giriş Yapın
          </p>
        </div>

        {/* Form Container for baseline HTML state */}
        <Formik
          initialValues={{
            userNameOrEmail: "", //to match SignInSchema and FormInput name property precisely
            password: ""
          }}
          validationSchema={SignInSchema}
          onSubmit={(values, actions) => {
            login(values)
            // actions.resetForm()
            // Gracefully terminates the Formik submitting lifecycle state
            actions.setSubmitting(false) 
          }}
          component={(props) => <LoginForm {...props}/>}
        ></Formik>
        {/* KVKK */}
        {/* <div className="flex items-start gap-2.5 my-5 select-none animate-fade-in text-[11px] font-light leading-relaxed text-slate-500 dark:text-slate-400">
          <input
            id="login-kvkk-consent"
            type="checkbox"
            checked={kvkkConsent}
            onChange={(e) => setKvkkConsent(e.target.checked)}
            className="w-3.5 h-3.5 mt-0.5 accent-brand-gold border-slate-300 rounded-xs cursor-pointer shrink-0"
          />
          <label htmlFor="login-kvkk-consent" className="cursor-pointer">
            Görkem Emlak{" "}
            <a href="/kvkk" target="_blank" rel="noopener noreferrer" className="text-brand-gold font-medium hover:underline">
              KVKK Aydınlatma Metni
            </a>
            'ni okudum. Google veya yerel hesabımla giriş yaparak verilerimin işlenmesini kabul ediyorum.
          </label>
        </div> */}

        {/* Bottom Navigation Link */}
        <AuthFooterLink text={"Henüz bir Hesabınız yok mu?"} linkText={"Kayıt Olun!"} to={"/register"}/>
        <div className="mt-4">
          <GoogleLoginButton />
        </div>        
        <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 font-light mt-5 leading-relaxed max-w-xs mx-auto select-none">
          Oturum açarak Görkem Emlak <a href="/kvkk" className="text-brand-gold hover:underline font-medium">KVKK Politikası</a> şartlarını ve veri işleme koşullarını otomatik olarak kabul etmiş sayılırsınız.
        </p>
      </div>

      {/* Decorative Blur Gradients matching the design standards */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-brand-gold/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-slate-800/10 dark:bg-slate-800/20 blur-[100px] rounded-full"></div>
      
    </div>
  )
}

export default Login