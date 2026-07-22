import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { resolveMediaUrl } from "../helper/propertyOptions";

const AdminPropertyDetailMediaLightbox = ({isOpen, onClose, images, currentIndex, setCurrentIndex}) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;
 
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") e.preventDefault();
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) handleNext();
      if (e.key === "ArrowLeft" && images.length > 1) handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length]);
  
  const handleOverlayClick = (e) => {
    // Ensures that clicking sub-elements (like central image or buttons) won't accidentally trigger close bounds
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
    
  if (!isOpen || !images || images?.length === 0) return null;

  const lightboxContent = (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-9999 flex flex-col justify-between bg-brand-dark/95 backdrop-blur-md p-4 animate-fade-in select-none"
    >
      {/* Top Controller Ribbon Block */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto pb-2 border-b border-slate-800">
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
          Görsel Analizi ({currentIndex + 1} / {images?.length})
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-xs tracking-widest text-slate-400 hover:text-white uppercase transition-colors duration-200 cursor-pointer"
        >
          Kapat ✕
        </button>
      </div>
 
      {/* Main Unified Magnification Interactive Slider Framework */}
      <div className="flex-1 flex items-center justify-between w-full max-w-7xl mx-auto gap-4 my-4 relative">
        {/* Left Arrow Trigger Button Control */}
        {images?.length > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-gold transition-all duration-200 flex items-center justify-center text-lg cursor-pointer shrink-0"
          >
            ‹
          </button>
        ) : (
          <div className="w-10 shrink-0" />
        )}
        {/* Central Display Segment */}
        <div className="flex-1 h-full max-h-[70vh] flex items-center justify-center overflow-hidden">
          <img
            src={resolveMediaUrl(images[currentIndex]?.imageUrl)}
            alt="Magnified Specimen View"
            className="max-w-full max-h-full object-contain shadow-2xl transition-all duration-300"
          />
        </div>
        {/* Right Arrow Trigger Button Control */}
        {images?.length > 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-gold transition-all duration-200 flex items-center justify-center text-lg cursor-pointer shrink-0"
          >
            ›
          </button>
        ) : (
          <div className="w-10 shrink-0" />
        )}
      </div>
      {/* Bottom Horizontal Carousel Thumbnail Ribbon Grid Matrix */}
      {images?.length > 1 && (
        <div className="w-full max-w-4xl mx-auto flex items-center gap-3 overflow-x-auto pb-4 pt-2 border-t border-slate-800 custom-scrollbar justify-center">
          {images?.map((image, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={image._id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-14 h-14 border overflow-hidden cursor-pointer transition-all duration-200 shrink-0 ${
                  isActive
                    ? "border-brand-gold ring-1 ring-brand-gold scale-95"
                    : "border-slate-800 opacity-40 hover:opacity-100"
                }`}
              >
                <img
                  src={resolveMediaUrl(image?.imageUrl)}
                  alt="Modal Ribbon Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      )}      
    </div>
  );
 
  return createPortal(lightboxContent, document.body);
};
 
export default AdminPropertyDetailMediaLightbox;
