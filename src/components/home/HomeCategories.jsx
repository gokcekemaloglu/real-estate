import React from 'react'
import { useNavigate } from 'react-router-dom';
import ImagePlaceholder from '../ImagePlaceholder';

const HomeCategories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: "sale",
      title: "Satılık İlanlar",
      subtitle: "Bütçenize Uygun Ev, Daire ve Arsa Seçenekleri",
      bgImage: "https://unsplash.com",
      queryParam: "filter[listingType]=sale"
    },
    {
      id: "rent",
      title: "Kiralık İlanlar",
      subtitle: "Aileler ve Esnaflar İçin Bütçe Dostu Güvenilir Kiralıklar",
      bgImage: "https://unsplash.com",
      queryParam: "filter[listingType]=rent"
    },
    {
      id: "transfer",
      title: "Devren Yatırımlar",
      subtitle: "Hazır Kurulu Düzen Ticari Esnaf Fırsatları",
      bgImage: "https://unsplash.com",
      queryParam: "filter[listingType]=transfer_sale&"
    }
  ];
  const handleCategoryClick = (query) => {
    navigate(`/properties?${query}&page=1`);
  };
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/20 border-y border-slate-100 dark:border-slate-900/60 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">        
        {/* Section Title Ribbon */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[12px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-2 block">
            Hızlı Kategoriler
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900 dark:text-white font-serif">
            Aradığınız Portföyü <span className="italic text-brand-gold dark:text-amber-400">Hemen Bulun</span>
          </h2>
          <div className="w-12 h-px bg-brand-gold/40 mx-auto mt-4"></div>
        </div>
        {/* Dynamic Responsive Layout Category Grid Framework */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const isImageBroken = category.bgImage.includes("unsplash.com") && !category.bgImage.includes("images.unsplash.com")
            const placeholderType = 
              category.id === "sale" ? "category_sale" : 
              category.id === "rent" ? "category_rent" : "category_transfer";
            return (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.queryParam)}
              className="relative h-96 group overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-lg cursor-pointer bg-brand-dark animate-fade-in"
            >
              {isImageBroken ? (
                <ImagePlaceholder type={placeholderType}/>
              ) : (
                <img
                  src={category.bgImage}
                  alt={category.title}
                  className="w-full h-full object-cover grayscale opacity-60  group-hover:opacity-80 group-hover:scale-105 group-hover:grayscale-0   transition-all duration-700 contrast-105"
                  loading="lazy"
                />
              )}
                           
              {/* Dark Overlaid Vignette Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>

              {/* Central Absolute Title Card Metadata segment */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 z-20">
                <span className="text-[12px] uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  {category.subtitle}
                </span>
                <h3 className="text-xl font-serif font-normal text-white tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                  {category.title}
                </h3>
                <div className="w-8 h-px bg-amber-400/60 mt-2 group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}

export default HomeCategories
