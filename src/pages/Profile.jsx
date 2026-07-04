import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import useUserCall from "../hooks/useUserCall";
import { ProfileUpdateSchema } from "../helper/ValidationSchemas";
import ProfileChangePasswordForm from "../components/profile/ProfileChangePasswordForm";
import ProfileUpdateForm from "../components/profile/ProfileUpdateForm";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfileDeleteForm from "../components/profile/ProfileDeleteForm";

const Profile = () => {
  const { getSingleUserData, updateMe } = useUserCall()
  const { currentUserId, currentUser, isAdmin } = useSelector((state) => state.auth)
  const { user, loading } = useSelector((state) => state.users)

  // 1. Fetch user records from database as soon as viewport mounts safely
  useEffect(() => {
    if (currentUserId) {
      getSingleUserData(currentUserId)
    }
  }, [currentUserId])

  const formik = useFormik({
    enableReinitialize: true, // IMPORTANT: Auto-populates fields as soon as users state slice fills up asynchronously
    initialValues: {
      userName: user?.userName || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    },
    validationSchema: ProfileUpdateSchema,
    onSubmit: async (values) => {
      // Logic boundary: Secure userName parameter is stripped from plain text data mutations payload
      const { userName, ...updatePayload } = values
      
      // Routes request smoothly straight to updateMe pipeline
      await updateMe(currentUserId, updatePayload)
    }
  })

  if (loading && !user?.userName) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-brand-dark">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden text-xs font-light text-slate-700 dark:text-slate-300">
      {/* Background Luxury Line Grid */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col gap-6">
        {/* Header Toolbar Title Section */}
        <div className="flex flex-col gap-1 border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium block">
            Kişisel Yönetim Portalı
          </span>
          <h1 className="text-xl font-serif text-slate-800 dark:text-white font-light tracking-wide">
            Hesap Bilgilerim / <span className="italic text-brand-gold dark:text-amber-400">Profil Ayarları</span>
          </h1>
        </div>
        {/* Main Formik Submission Pipeline Wrapper */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          {/* Block A: Dynamic Avatar Profile Picture Element Showcase */}
          <ProfileAvatar currentUser={currentUser} user={user} />
          {/* Block B: Identity Personal Information Fields Grid */}
          <ProfileUpdateForm formik={formik} />
          {/* Core Submit Operations Action Row */}
          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="submit" 
              disabled={formik?.isSubmitting}
              className="btn-premium px-10 py-3.5 text-xs font-semibold uppercase tracking-widest cursor-pointer shadow-md"
            >
              {formik?.isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </form>
        <ProfileChangePasswordForm currentUserId={currentUserId} />
        {!isAdmin && <ProfileDeleteForm currentUserId={currentUserId}/>}
      </div>
    </div>
  );
};

export default Profile;
