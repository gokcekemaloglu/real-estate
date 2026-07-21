import React, { useState } from "react";

const ImageUploadInput = ({ handleFileChange, loading = false }) => {
  const [selectedFileName, setSelectedFileName] = useState("");

  const onFileSelectorChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local runtime constraints validation matching multer 5MB criteria boundaries
    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB sınırını aşamaz!");
      return;
    }
    setSelectedFileName(file.name);
    await handleFileChange(e); 
    
    // Optional: Wipes out local text state once backend resolved successfully
    // setSelectedFileName(""); 
  };

  return (
    <div className="flex flex-col gap-3 animate-fade-in w-full">
      <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        🖼️ Portföy Fotoğraf Yönetimi
      </h3>

      {/* Reconfigured container stretched fully into a sleek single wide input grid layout row */}
      <div className="w-full relative">
        <input
          type="file"
          id="property-image-file"
          accept=".jpg,.jpeg,.png"
          onChange={onFileSelectorChange}
          disabled={loading}
          className="hidden"
        />
        <label
          htmlFor="property-image-file"
          className={`input-premium p-3 block text-center sm:text-left transition-all duration-300 w-full ${
            loading 
              ? "bg-slate-100 dark:bg-slate-950/40 text-slate-400 border-brand-gold/40 cursor-not-allowed select-none animate-pulse" 
              : "bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-brand-gold"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-3.5 h-3.5 border border-slate-300 border-t-brand-gold rounded-full animate-spin"></div>
              <span className="text-[11px] font-medium tracking-wide text-brand-gold uppercase font-sans">Lüks Görsel Sunucuya Aktarılıyor...</span>
            </div>
          ) : selectedFileName ? (
            `✓ Aktarılan Dosya: ${selectedFileName}`
          ) : (
            "Fotoğraf Seçin (.JPG, .JPEG, .PNG)"
          )}
        </label>
      </div>
      
      <p className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
        🕒 * Multer Güvenlik Filtresi: Azami dosya boyutu 5MB sınırındadır. Görsel seçildiği an otomatik yüklenir.
      </p>
    </div>
  );
};

export default ImageUploadInput;
