import React from "react";

const AboutContent = () => {
  return (
    <div className="flex flex-col gap-6 text-slate-600 dark:text-slate-300 font-light leading-relaxed text-sm md:text-base">
      <h3 className="text-xl md:text-2xl font-serif text-slate-800 dark:text-white font-normal mb-2 tracking-wide">
        Doğru Yatırımın ve Güvenli Yuvanın Adresi
      </h3>
      <p>
        Görkem Emlak, 2002 yılında Cemal Ciğer tarafından Adana'da kurulduğu günden bu yana, her bütçeye uygun doğru yuvaları ve yatırımlık portföyleri ailenizle buluşturmayı kendisine en büyük görev edinmiştir. Biz sadece bir gayrimenkul ofisi değil, çeyrek asırdır mahallenizin güvenilir bir komşusu olarak hizmet veriyoruz.
      </p>
      <p className="border-l-2 border-brand-gold pl-4 italic text-slate-500 dark:text-slate-400">
        "Bizim için en büyük kazanç lüks binalar değil, anahtarını teslim ettiğimiz bir ailenin 
        yüzündeki o dürüst mutluluk ve güven duygusudur. 2002'den beri bu sözle çalışıyoruz." 
        — Cemal Ciğer
      </p>
      <p>
        Bölgeyi çok iyi bilen tecrübemiz, şeffaf süreç yönetimimiz ve her bütçeyi kucaklayan samimi danışmanlığımızla; birikimlerinizi koruyor, geleceğinizi güvenli ve huzurlu birer yuvaya dönüştürüyoruz.
      </p>
      {/* Stat Counters for Luxury Look */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 mt-4">
        <div>
          <span className="block text-xl md:text-2xl font-serif font-medium text-brand-gold">
            24+
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
            Yıllık Tecrübe
          </span>
        </div>
        <div>
          <span className="block text-xl md:text-2xl font-serif font-medium text-brand-gold">
            1000+
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
            Mutlu Aile
          </span>
        </div>
        <div>
          <span className="block text-xl md:text-2xl font-serif font-medium text-brand-gold">
            %100
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
            Dürüst Süreç
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
// Gayrimenkulde Güvenin ve Prestijin Adresi
// Görkem Emlak, kurulduğu günden bu yana lüks konut, elite projeler ve sıra dışı yaşam alanlarını seçkin yatırımcılarla buluşturmayı misyon edinmiştir. Sadece bir gayrimenkul ofisi değil, yaşam tarzı mimarı olarak hizmet veriyoruz.

// "Her portföy bir sanat eseri, her müşteri ise benzersiz bir hikayedir. Biz, o hikayelere en kusursuz mekanları inşa etmek için buradayız." — Cemal Ciğer

// Küresel standartlarda sunduğumuz analizler, şeffaf süreç yönetimi ve kişiselleştirilmiş danışmanlık hizmetlerimizle, yatırım kararlarınızı sanata ve kalıcı bir mirasa dönüştürüyoruz.