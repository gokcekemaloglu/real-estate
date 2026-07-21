import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'
import AuthFooterLink from '../components/auth/AuthFooterLink'
import { Formik } from 'formik'
import useAuthCall from '../hooks/useAuthCall'
import { SignupSchema } from '../helper/ValidationSchemas'
import GoogleLoginButton from '../components/auth/GoogleLoginButton'
import { useState } from 'react'
import KvkkCheckbox from '../components/auth/KvkkCheckbox'

const Register = () => {
  const {register} = useAuthCall()
  const [kvkkConsent, setKvkkConsent] = useState(false)
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
            // actions.resetForm()
            // Gracefully terminates the Formik submitting lifecycle state
            actions.setSubmitting(false) 
          }}
          component={(props) => <RegisterForm {...props} isKvkkAccepted={kvkkConsent}  />}
        ></Formik>
        {/* KVKK */}
        <KvkkCheckbox checked={kvkkConsent} onChange={setKvkkConsent}/>
        
        {/* Bottom Link */}
        <AuthFooterLink text={"Zaten bir hesabınız var mı?"} linkText={"Giriş Yapın!"} to={"/login"}/>
        <div className={`transition-all duration-300 mt-2 ${kvkkConsent ? "opacity-100 pointer-events-auto" : "opacity-40 pointer-events-none select-none"}`}>
          <GoogleLoginButton/>
        </div>
      </div>

      {/* Decorative Blur Gradients */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-brand-gold/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-slate-800/10 dark:bg-slate-800/20 blur-[100px] rounded-full"></div>
      
    </div>
  )
}

export default Register