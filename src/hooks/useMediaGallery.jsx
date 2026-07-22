import { useEffect, useState } from "react";
import { resolveMediaUrl } from "../helper/propertyOptions";
 
export const FALLBACK_KEY = "RENDER_PREMIUM_BLUEPRINT_PLACEHOLDER";
 
export default function useMediaGallery(images) {
  const [activeImage, setActiveImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
 
  useEffect(() => {
    if (images && images.length > 0) {
      const coverImage = images.find((image) => image?.isCover);
      const chosenImage = coverImage || images[0];
      setActiveImage(resolveMediaUrl(chosenImage?.imageUrl));
    } else {
      setActiveImage(FALLBACK_KEY);
    }
  }, [images]);

  const triggerLightboxView = (targetUrlOrIndex) => {
    if (!images || images.length === 0) return;
 
    if (typeof targetUrlOrIndex === "number") {
      setLightboxIndex(targetUrlOrIndex);
    } else {
      const targetIdx = images.findIndex(
        (image) => resolveMediaUrl(image?.imageUrl) === targetUrlOrIndex,
      );
      setLightboxIndex(targetIdx !== -1 ? targetIdx : 0);
    }
    setIsLightboxOpen(true);
  };
 
  return {
    activeImage,
    isLightboxOpen,
    setIsLightboxOpen,
    lightboxIndex,
    setLightboxIndex,
    triggerLightboxView,
  };
}
 