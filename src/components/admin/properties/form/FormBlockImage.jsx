import React from "react";
import usePropertyCall from "../../../../hooks/usePropertyCall";
import { useState } from "react";
import useFetchData from "../../../../hooks/useFetchData";
import { useSelector } from "react-redux";
import { setData } from "../../../../features/propertySlice";
import { useEffect } from "react";
import AdminPropertyDetailMediaLightbox from "../detail/AdminPropertyDetailMediaLightbox";
import ImageUploadInput from "./propertyImage/ImageUploadInput";
import ImageGalleryGrid from "./propertyImage/ImageGalleryGrid";
import { useDispatch } from "react-redux";

const FormBlockImage = ({ propertyId, isEditMode }) => {
  const dispatch = useDispatch();
  const {postPropertyImageData, changePropertyCoverStatus, deletePropertyImage} = usePropertyCall();
  const { fetchData } = useFetchData();
  const { currentPropertyImages } = useSelector((state) => state.property);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const loadImagesDataset = () => {
    if (!propertyId) return;
    if (propertyId) {
      fetchData({
        endpoint: "property-images",
        stateKey: "currentPropertyImages",
        sliceActions: {
          fetchStart: () => ({ type: "property/noOpStart" }), // Plain object template breaks loop safely without crashing Redux
          fetchFail: () => ({ type: "property/noOpFail" }), // Plain object template
          setData,
        },
        query: `filter[propertyId]=${propertyId}`,
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
    loadImagesDataset();
  };

  const handleDeleteImage = async (imageId) => {
    await deletePropertyImage(imageId);
    loadImagesDataset(); // Automatically refresh remaining layout blocks
  };

  const triggerLightboxView = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
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

  const isolatedFormImages = currentPropertyImages?.filter(image => image.propertyId === propertyId) || [];
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm animate-fade-in text-sm font-light text-slate-700 dark:text-slate-300">
      <ImageUploadInput
        handleFileChange={handleFileChange}
        selectedFile={selectedFile}
        handleUploadClick={handleUploadClick}
      />

      {isolatedFormImages?.length > 0 && (
        <ImageGalleryGrid
          propertyImages={isolatedFormImages.filter(image => image.propertyId === propertyId)}
          triggerLightboxView={triggerLightboxView}
          handleSetCover={handleSetCover}
          handleDeleteImage={handleDeleteImage}
        />
      )}
      {/* Reusable modal window layer */}
      <AdminPropertyDetailMediaLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={isolatedFormImages || []}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
};

export default FormBlockImage;
