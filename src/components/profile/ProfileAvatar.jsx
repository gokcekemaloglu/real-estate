import React from "react";
import { useRef } from "react";
import { SweetAlertIcons, SweetNotify } from "../../helper/SweetNotify";

const ProfileAvatar = ({ currentUserInfo, user }) => {
  const fileInputRef = useRef(null);

  // Secure dynamic image selector mapping layout properties cleanly
  const avatarUrl = user?.avatarUrl
    ? `${import.meta.env.VITE_BASE_URL}${currentUserInfo.avatarUrl}`
    : `https://ui-avatars.com{currentUser || "Gorkem"}&background=b45309&color=fff&size=128&font-size=0.33`;

  const handleAvatarChange = async (e) => {
    const targetFile = e.target.files?.[0];
    if (!targetFile) return;

    // Standard business rules checking binary file limits explicitly
    if (targetFile.size > 2 * 1024 * 1024) {
      return SweetNotify(
        "Profil resmi boyutu 2MB'tan büyük olamaz!",
        SweetAlertIcons.ERROR,
      );
    }

    const fileFormData = new FormData();
    fileFormData.append("avatar", targetFile);

    console.log("Avatar FormData prepared to route towards backend pipeline...");
    
  };
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md flex flex-col sm:flex-row items-center gap-6 mb-8 transition-colors duration-300 animate-fade-in">
      {/* Interactive Avatar Container Sphere */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-gold bg-slate-100 dark:bg-slate-950 group cursor-pointer shadow-lg shrink-0"
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] text-white uppercase tracking-wider font-medium font-sans">
            Değiştir
          </span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="flex flex-col text-center sm:text-left gap-1">
        <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">
          Görkem Emlak Üyesi
        </span>
        <h2 className="text-lg font-serif font-normal text-slate-800 dark:text-white tracking-wide">
          {user?.firstName || "—"} {user?.lastName || "—"}
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-light tracking-wide">
          {user?.email || "—"}
        </p>
      </div>
    </div>
  );
};

export default ProfileAvatar;
