import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import usePropertyCall from "../../../../hooks/usePropertyCall";
import useFetchData from "../../../../hooks/useFetchData";
import { setData } from "../../../../features/propertySlice";
import AdminPropertyDetailMediaLightbox from "../../../AdminPropertyDetailMediaLightbox";
import ImageUploadInput from "./propertyImage/ImageUploadInput";
import ImageGalleryGrid from "./propertyImage/ImageGalleryGrid";

const FormBlockImage = ({ propertyId, isEditMode }) => {
  const dispatch = useDispatch();
  const { postPropertyImageData, changePropertyCoverStatus, deletePropertyImage } = usePropertyCall();
  const { fetchData } = useFetchData();
  
  // Destructure global property metadata slice properties including slice loading indicator flags safely
  const { currentPropertyImages, loading: globalLoading } = useSelector((state) => state.property);
  
  // Local loading toggle to protect current block state asynchronously during file uploads pipeline
  const [isUploading, setIsUploading] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const loadImagesDataset = () => {
    if (!propertyId) return;
    fetchData({
      endpoint: "property-images",
      stateKey: "currentPropertyImages",
      sliceActions: {
        fetchStart: () => ({ type: "property/noOpStart" }),
        fetchFail: () => ({ type: "property/noOpFail" }),
        setData,
      },
      query: `filter[propertyId]=${propertyId}`,
    });
  };

  useEffect(() => {
    if (isEditMode && propertyId) {
      loadImagesDataset();
    }
  }, [propertyId, isEditMode]);

  // FIXED BEST PRACTICE: Automated Local Binary Stream Receiver Interceptor
  // This replaces the old multi-stage select-then-click manual triggers ameleliği.
  // The exact millisecond the input changes, it directly fires postPropertyImageData straight to server.
  const handleAutoUploadChange = async (e) => {
    const filePointer = e.target.files?.[0];
    if (!filePointer || !propertyId) return;

    try {
      setIsUploading(true); // Lock the input bar instantly, triggers 'Lüks Görsel Sunucuya Aktarılıyor...'
      
      // Dispatch raw binary files data straight over usePropertyCall multipart handler bundles
      await postPropertyImageData(propertyId, filePointer);
      
    } catch (error) {
      console.error("Auto image deployment execution failure error:", error);
    } finally {
      setIsUploading(false); // Release the input focus locks
      loadImagesDataset();   // Refresh the grid gallery dynamically from the database
    }
  };

  const handleSetCover = async (imageId) => {
    await changePropertyCoverStatus(imageId);
    loadImagesDataset();
  };

  const handleDeleteImage = async (imageId) => {
    await deletePropertyImage(imageId);
    loadImagesDataset();
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
      
      {/* Integrated the new automated template passing localized loading parameters straight into hooks */}
      <ImageUploadInput
        handleFileChange={handleAutoUploadChange} // Bound straight to our automated network execution handler
        loading={isUploading || globalLoading}    // Safely blocks interface mutations during network upload flights
      />

      {isolatedFormImages?.length > 0 && (
        <ImageGalleryGrid
          propertyImages={isolatedFormImages}
          triggerLightboxView={triggerLightboxView}
          handleSetCover={handleSetCover}
          handleDeleteImage={handleDeleteImage}
        />
      )}

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


// import React from "react";
// import usePropertyCall from "../../../../hooks/usePropertyCall";
// import { useState } from "react";
// import useFetchData from "../../../../hooks/useFetchData";
// import { useSelector } from "react-redux";
// import { setData } from "../../../../features/propertySlice";
// import { useEffect } from "react";
// import AdminPropertyDetailMediaLightbox from "../../../AdminPropertyDetailMediaLightbox";
// import ImageUploadInput from "./propertyImage/ImageUploadInput";
// import ImageGalleryGrid from "./propertyImage/ImageGalleryGrid";
// import { useDispatch } from "react-redux";

// const FormBlockImage = ({ propertyId, isEditMode }) => {
//   const dispatch = useDispatch();
//   const {postPropertyImageData, changePropertyCoverStatus, deletePropertyImage} = usePropertyCall();
//   const { fetchData } = useFetchData();
//   const { currentPropertyImages } = useSelector((state) => state.property);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);
//   const [lightboxIndex, setLightboxIndex] = useState(0);

//   const loadImagesDataset = () => {
//     if (!propertyId) return;
//     if (propertyId) {
//       fetchData({
//         endpoint: "property-images",
//         stateKey: "currentPropertyImages",
//         sliceActions: {
//           fetchStart: () => ({ type: "property/noOpStart" }), // Plain object template breaks loop safely without crashing Redux
//           fetchFail: () => ({ type: "property/noOpFail" }), // Plain object template
//           setData,
//         },
//         query: `filter[propertyId]=${propertyId}`,
//         // isWithToken: true,
//       });
//     }
//   };

//   useEffect(() => {
//     if (isEditMode && propertyId) {
//       loadImagesDataset();
//     }
//   }, [propertyId, isEditMode]);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const handleUploadClick = async (e) => {
//     if (!selectedFile || !propertyId) return;
//     await postPropertyImageData(propertyId, selectedFile);
//     setSelectedFile(null);
//     loadImagesDataset();
//   };

//   const handleSetCover = async (imageId) => {
//     await changePropertyCoverStatus(imageId);
//     loadImagesDataset();
//   };

//   const handleDeleteImage = async (imageId) => {
//     await deletePropertyImage(imageId);
//     loadImagesDataset(); // Automatically refresh remaining layout blocks
//   };

//   const triggerLightboxView = (index) => {
//     setLightboxIndex(index);
//     setIsLightboxOpen(true);
//   };

//   if (!isEditMode || !propertyId) {
//     return (
//       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-2 shadow-sm text-slate-400 dark:text-slate-500 leading-relaxed text-xs">
//         <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
//           🖼️ Portföy Fotoğraf Galerisi
//         </h3>
//         Fotoğraf ekleme ve kapak resmi seçme paneli,{" "}
//         <strong>ilan portföye ilk kez kaydedildikten sonra</strong> bu alanda
//         aktif olacaktır.
//       </div>
//     );
//   }

//   const isolatedFormImages = currentPropertyImages?.filter(image => image.propertyId === propertyId) || [];
//   return (
//     <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm animate-fade-in text-sm font-light text-slate-700 dark:text-slate-300">
//       <ImageUploadInput
//         handleFileChange={handleFileChange}
//         selectedFile={selectedFile}
//         handleUploadClick={handleUploadClick}
//       />

//       {isolatedFormImages?.length > 0 && (
//         <ImageGalleryGrid
//           propertyImages={isolatedFormImages.filter(image => image.propertyId === propertyId)}
//           triggerLightboxView={triggerLightboxView}
//           handleSetCover={handleSetCover}
//           handleDeleteImage={handleDeleteImage}
//         />
//       )}
//       {/* Reusable modal window layer */}
//       <AdminPropertyDetailMediaLightbox
//         isOpen={isLightboxOpen}
//         onClose={() => setIsLightboxOpen(false)}
//         images={isolatedFormImages || []}
//         currentIndex={lightboxIndex}
//         setCurrentIndex={setLightboxIndex}
//       />
//     </div>
//   );
// };

// export default FormBlockImage;
