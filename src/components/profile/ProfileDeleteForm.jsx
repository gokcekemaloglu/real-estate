import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUserCall from "../../hooks/useUserCall";
import { logoutSuccess } from "../../features/authSlice";
import { SweetAlertIcons, SweetNotify } from "../../helper/SweetNotify";

const ProfileDeleteForm = ({ currentUserId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toggleUserStatus } = useUserCall();

  const handleDeactivate = async () => {
    await toggleUserStatus(currentUserId);
    dispatch(logoutSuccess());
    navigate("/");
  };
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-red-500/10 dark:border-red-500/5 p-6 sm:p-8 shadow-md transition-colors duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in mt-6">
      {/* Left Column Description Context */}
      <div className="flex flex-col gap-1 max-w-xl">
        <h3 className="text-xs uppercase tracking-widest text-red-500 font-semibold">
          Tehlike Bölgesi / Hesabı Dondur
        </h3>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-light leading-relaxed mt-1">
          Hesabınızı dondurduğunuzda sisteme erişim yetkiniz askıya alınır, profiliniz pasif konuma geçer ve oturumunuz anında sonlandırılır. Dilediğiniz an yöneticilerimizle iletişime geçerek hesabınızı yeniden aktif hale getirebilirsiniz.
        </p>
      </div>

      {/* Right Column Action Trigger Button */}
      <div className="shrink-0 w-full sm:w-auto">
        <button
          type="button"
          title="Hesabımı Dondur"
          onClick={handleDeactivate}
          className="w-full sm:w-auto px-6 py-3 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white font-semibold uppercase tracking-widest text-[10px] transition-all duration-200 cursor-pointer text-center bg-red-50/30 dark:bg-red-950/5"
        >
          Hesabımı Dondur
        </button>
      </div>
    </div>
  );
};

export default ProfileDeleteForm;
