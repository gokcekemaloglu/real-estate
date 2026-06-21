import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useUserCall from '../../hooks/useUserCall'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const AdminUserDetail = () => {
  const {id} =useParams()
  const navigate = useNavigate()
  const {getSingleUserData} = useUserCall()
  const {user, loading} = useSelector(state => state.users)
  const defaultAvatar = "https://unsplash.com";

  useEffect(() => {
    getSingleUserData(id)
  }, [id])
  // console.log("user-->", user);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-5xl text-xs font-light text-slate-700 dark:text-slate-300">
      {/* Header Action Toolbar Section */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-lg font-serif text-slate-800 dark:text-white font-light tracking-wide">
            Kayıtlı Kullanıcı Profili
          </h1>
          <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">
            Seçilen kayıtlı kullanıcının profilinin sadece okunabilir görünümü
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer "
          >
            ← Listeye Geri Dön
          </button>
        </div>
      </div>

      {/* Main Grid Content Block split into data profiles and logs timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Columns: Core Profile and Identity Credentials Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 shadow-sm">
          {/* Top segment: Identity Profile Avatar and Global Status Indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/60">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 shrink-0">
              <img
                src={defaultAvatar}
                alt="Profile Avatar"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-center sm:text-left">
              <span className="text-[9px] uppercase tracking-wider text-brand-gold font-semibold">
                {user?.userName}
              </span>
              <h2 className="text-xl font-serif text-slate-800 dark:text-white font-light">
                {user?.firstName} {user?.lastName}
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                <span
                  className={`inline-block w-2 h-2 rounded-none ${user?.isActive ? "bg-green-500" : "bg-slate-400"}`}
                ></span>
                <span className="text-[10px] uppercase tracking-widest font-medium text-slate-400">
                  {user?.isActive
                    ? "Aktif Kullanıcı Hesabı"
                    : "Pasif Kullanıcı Hesabı"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom segment: Detailed Fields Registry mapped out cleanly with luxury styles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium">
                Telefon Numarası
              </span>
              <span className="text-sm font-mono text-slate-800 dark:text-slate-200">
                {user?.phone || "-"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium">
                E-Posta Adresi
              </span>
              <span className="text-sm text-slate-800 dark:text-slate-200 truncate">
                {user?.email || "Belirtilmedi"}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2 pt-2 border-t border-slate-50 dark:border-slate-800/40">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium">
                Adres
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light whitespace-pre-line">
                {user?.address ||
                  "Bu portföy profiliyle ilişkili henüz bir adres kaydı bulunmuyor."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminUserDetail