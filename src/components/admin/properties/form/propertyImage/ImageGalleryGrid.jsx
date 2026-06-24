import React from 'react'

const ImageGalleryGrid = ({propertyImages, triggerLightboxView, handleSetCover, handleDeleteImage}) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;
  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
            Yüklenen Fotoğraflar Galerisi
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {propertyImages.map((image, idx) => (
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
                  {/* Premium Inspect / Expand View Action Button */}
                  <button
                    type="button"
                    onClick={() => triggerLightboxView(idx)}
                    className="text-[8px] tracking-widest font-medium uppercase bg-slate-800 text-amber-400 border border-slate-700 px-2 py-1 w-full text-center hover:bg-slate-700 cursor-pointer"
                  >
                    Büyüt
                  </button>
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
  )
}

export default ImageGalleryGrid