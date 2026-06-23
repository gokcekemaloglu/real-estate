import React from "react";
import usePropertyCall from "../../../../hooks/usePropertyCall";
import { useState } from "react";
import useFetchData from "../../../../hooks/useFetchData";
import { useSelector } from "react-redux";
import {
  
  setData,
} from "../../../../features/propertySlice";
import { useEffect } from "react";

const FormBlockImage = ({ propertyId, isEditMode }) => {
  const {
    postPropertyImageData,
    changePropertyCoverStatus,
    deletePropertyImage,
  } = usePropertyCall();
  const { fetchData } = useFetchData();
  const { propertyImages } = useSelector((state) => state.property);
  const [selectedFile, setSelectedFile] = useState(null);

  const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const loadImagesDataset = () => {
    if (propertyId) {
      fetchData({
        endpoint: "property-images",
        stateKey: "propertyImages", // Targets state.propertyImages securely
        sliceActions: { 
          fetchStart: () => ({ type: "property/noOpStart" }), // Plain object template breaks loop safely without crashing Redux
          fetchFail: () => ({ type: "property/noOpFail" }),   // Plain object template
          setData  
        },
        query: `filter[propertyId]=${propertyId}`, // Extended query parser unlocks nested filter objects
        isWithToken: true,
      });
    }
  };

  useEffect(() => {
    if (isEditMode && propertyId) {
      loadImagesDataset();
    }
  }, [propertyId, isEditMode]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async (e) => {
    if (!selectedFile || !propertyId) return;
    await postPropertyImageData(propertyId, selectedFile);
    setSelectedFile(null);
    loadImagesDataset();
  };

  const handleSetCover = async (imageId) => {
    await changePropertyCoverStatus(imageId);
    loadImagesDataset(); // Automatically refresh cover status frame highlights
  };

  const handleDeleteImage = async (imageId) => {
    await deletePropertyImage(imageId);
    loadImagesDataset(); // Automatically refresh remaining layout blocks
  };

  if (!isEditMode || !propertyId) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-2 shadow-sm text-slate-400 dark:text-slate-500 leading-relaxed text-xs">
        <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
          🖼️ Portföy Fotoğraf Galerisi
        </h3>
        Fotoğraf ekleme ve kapak resmi seçme paneli,{" "}
        <strong>ilan portföye ilk kez kaydedildikten sonra</strong> bu alanda
        aktif olacaktır.
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm animate-fade-in text-xs font-light text-slate-700 dark:text-slate-300">
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
          * Multer Güvenlik Filtresi: Azami dosya boyutu 5MB sınırındadır.
          Sadece görsel formatları desteklenir.
        </p>
      </div>
      {/* Luxury Thumbnail Preview Gallery Grid Matrix */}
      {propertyImages?.length > 0 && (
        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
            Yüklenen Fotoğraflar Galerisi
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {propertyImages.map((image) => (
              <div
                key={image._id}
                className={`relative group bg-slate-50 dark:bg-slate-950 border overflow-hidden transition-all duration-300 aspect-square ${
                  image.isCover
                    ? "border-brand-gold shadow-md ring-1 ring-brand-gold"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                {/* Real binary asset file visualization */}
                <img
                  src={`${IMAGE_BASE_URL}${image.imageUrl}`}
                  alt="Property Preview"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />

                {/* Overlaid luxury reactive utility actions ribbon framework */}
                <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2 p-2 transition-all duration-200">
                  {!image.isCover && (
                    <button
                      type="button"
                      onClick={() => handleSetCover(image._id)}
                      className="text-[8px] tracking-widest font-medium uppercase bg-brand-gold text-white px-2 py-1 w-full text-center hover:bg-amber-700 cursor-pointer"
                    >
                      Kapak Yap
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image._id)}
                    className="text-[8px] tracking-widest font-medium uppercase border border-red-500/40 text-red-500 px-2 py-1 w-full text-center hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    Sil
                  </button>
                </div>

                {/* Cover indicator tag visibility controls */}
                {image.isCover && (
                  <span className="absolute top-1 left-1 text-[7px] bg-brand-gold text-white font-bold px-1.5 py-0.5 uppercase tracking-widest">
                    Kapak
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBlockImage;
