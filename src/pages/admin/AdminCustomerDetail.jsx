import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCustomerCall from "../../hooks/useCustomerCall";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminCustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleCustomerData } = useCustomerCall();
  const { customer, loading } = useSelector((state) => state.customers);

  useEffect(() => {
    if (id) {
      getSingleCustomerData(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-7xl text-sm font-light text-slate-700 dark:text-slate-300">
      {/* Header Action Toolbar Section */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-lg font-serif text-slate-800 dark:text-white font-light tracking-wide">
            Müşteri Portföy Profili
          </h1>
          <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">
            Seçilen mülk sahibi profilinin sadece okunabilir görünümü
          </p>
        </div>
        {/* Edit Profile/Go Back to List Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/customers/edit/${id}`)}
            className="text-xs uppercase tracking-widest text-brand-gold hover:underline cursor-pointer"
          >
            Profili Düzenle
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/customers")}
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Listeye Geri Dön
          </button>
        </div>
      </div>

      {/* Main Grid Content Block split into data profiles and logs timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Columns: Core Profile and Identity Credentials Card */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 shadow-sm">
          {/* Top segment: Identity Profile Avatar and Global Status Indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/60">
            <div className="flex flex-col gap-1.5 text-center sm:text-left">
              <span className="text-[12px] uppercase tracking-wider text-brand-gold font-semibold">
                {customer?.citizenshipId
                  ? `TC: ${customer.citizenshipId}`
                  : "TC Kimlik Belirtilmedi"}
              </span>
              <h2 className="text-xl font-serif text-slate-800 dark:text-white font-light">
                {customer?.firstName} {customer?.lastName}
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                <span
                  className={`inline-block w-2 h-2 rounded-none ${customer?.isActive ? "bg-green-500" : "bg-slate-400"}`}
                ></span>
                <span className="text-[10px] uppercase tracking-widest font-medium text-slate-400">
                  {customer?.isActive
                    ? "Aktif Portföy Kaydı"
                    : "Pasif Profil Hesabı"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom segment: Detailed Fields Registry mapped out cleanly with luxury styles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Phone */}
            <div className="flex flex-col gap-1">
              <span className="text-[12px] uppercase tracking-widest text-slate-400 font-medium">
                Telefon Numarası
              </span>
              <span className="text-sm sm:text-base font-mono font-normal text-slate-800 dark:text-slate-200">
                {customer?.phone || "-"}
              </span>
            </div>
            {/* E-mail */}
            <div className="flex flex-col gap-1">
              <span className="text-[12px] uppercase tracking-widest text-slate-400 font-medium">
                E-Posta Adresi
              </span>
              <span className="text-sm sm:text-base font-normal text-slate-800 dark:text-slate-200 truncate">
                {customer?.email || "Belirtilmedi"}
              </span>
            </div>
            {/* Address */}
            <div className="flex flex-col gap-1 sm:col-span-2 pt-2 border-t border-slate-50 dark:border-slate-800/40">
              <span className="text-[12px] uppercase tracking-widest text-slate-400 font-medium">
                Kayıtlı İkametgah / Tebligat Adresi
              </span>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light whitespace-pre-line">
                {customer?.address ||
                  "Bu portföy profiliyle ilişkili henüz bir adres kaydı bulunmuyor."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Historical Interaction logs timeline view */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm max-h-125">
          <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
            Geçmiş Görüşme Notları
          </h3>

          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 custom-scrollbar">
            {customer?.note && customer.note.length > 0 ? (
              [...customer.note].reverse().map((note, index) => (
                <div
                  key={note._id || index}
                  className="relative pl-4 border-l border-brand-gold/40 flex flex-col gap-1"
                >
                  <div className="absolute left-[-3.5px] top-1 w-1.5 h-1.5 bg-brand-gold"></div>
                  <span className="text-[12px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleString("tr-TR")
                      : "Archived"}
                  </span>
                  <p className="text-[15px] font-light text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/10 p-2.5 border border-slate-100 dark:border-slate-800/60 leading-relaxed wrap-break-words">
                    {note.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-500 italic text-center p-4">
                Arşivlenmiş geçmiş iş faaliyeti veya görüşme notu bulunmuyor.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerDetail;
