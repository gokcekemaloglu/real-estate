import React from 'react'
import { useSelector } from 'react-redux';
import useFavoritesCall from '../../hooks/useFavoritesCall';

const SIZE_CLASSES = {
  sm: { button: "w-7 h-7", icon: "w-3.5 h-3.5" },
  md: { button: "w-8 h-8", icon: "w-4 h-4" },
  lg: { button: "w-11 h-11", icon: "w-5 h-5" },
};

const FavoriteButton = ({ propertyId, size = "md", className = "" }) => {
  const { favoriteIds } = useSelector((state) => state.favorites);
  const { toggleFavorite } = useFavoritesCall();
 
  const isFavorite = favoriteIds?.includes(propertyId);
  const { button: buttonSize, icon: iconSize } = SIZE_CLASSES[size] || SIZE_CLASSES.md;
 
  const handleClick = (e) => {
    e.stopPropagation(); // Kart/galeri üzerindeki navigate/lightbox tetikleyicilerini engelle
    if (propertyId) toggleFavorite(propertyId);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`z-20 ${buttonSize} rounded-full bg-brand-dark/60 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group/heart ${className}`}
      title={isFavorite ? "Favorilerimden Kaldır" : "Favorilerime Ekle"}
    >
      <svg
        className={`${iconSize} transition-colors duration-300 ${isFavorite ? "fill-brand-gold text-brand-gold animate-heart-beat" : "fill-transparent text-white group-hover/heart:text-brand-gold"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.318 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  )
}

export default FavoriteButton