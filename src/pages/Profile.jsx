import React from "react";
import { useSelector } from "react-redux";
import ProfileUpdateForm from "../components/profile/ProfileUpdateForm";
import ProfileChangePasswordForm from "../components/profile/ProfileChangePasswordForm";

const Profile = () => {
  const { currentUser, currentUserInfo } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      {/* Background Luxury Line Grid */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Luxury Header */}
        <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium mb-1 block">
            Kişisel Yönetim Portalı
          </span>
          <h1 className="text-3xl font-serif font-light text-slate-900 dark:text-white tracking-wide">
            Hesap Bilgilerim /{" "}
            <span className="italic text-brand-gold dark:text-amber-400">
              Profil Ayarları
            </span>
          </h1>
        </div>

        {/* Core Layout split cleanly into personal info update and explicit password security shielding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (7-Cols): Primary Personal Information Details update module */}
          <div className="lg:col-span-7">
            <ProfileUpdateForm />
          </div>

          {/* Right Column (5-Cols): Isolated Password Credentials Encryption panel */}
          <div className="lg:col-span-5">
            <ProfileChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
