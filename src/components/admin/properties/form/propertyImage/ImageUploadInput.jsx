import React from "react";

const ImageUploadInput = ({handleFileChange, selectedFile, handleUploadClick}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        🖼️ Portföy Fotoğraf Yönetimi
      </h3>

      {/* Binary asset upload delivery framework container */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 relative">
          {/* Custom masked premium file selector box component */}
          <input
            type="file"
            id="property-image-file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="property-image-file"
            className="input-premium bg-slate-50/50 dark:bg-slate-950/20 p-3 block text-center sm:text-left cursor-pointer hover:border-brand-gold transition-colors duration-200 truncate"
          >
            {selectedFile
              ? `✓ Seçilen Dosya: ${selectedFile.name}`
              : "Dosya Seçin (.JPG, .JPEG, .PNG)"}
          </label>
        </div>

        {/* Luxury confirmation trigger layout controller */}
        <button
          type="button"
          disabled={!selectedFile}
          onClick={handleUploadClick}
          className={`btn-premium px-8 py-3 font-semibold tracking-widest text-center text-[10px] uppercase shadow-md transition-all duration-300 ${
            !selectedFile
              ? "opacity-40 cursor-not-allowed bg-slate-200 text-slate-400 border-none"
              : "bg-brand-gold text-white"
          }`}
        >
          Yükle
        </button>
      </div>
      <p className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
        * Multer Güvenlik Filtresi: Azami dosya boyutu 5MB sınırındadır. Sadece
        görsel formatları desteklenir.
      </p>
    </div>
  );
};

export default ImageUploadInput;
