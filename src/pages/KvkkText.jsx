import React from 'react'
import { useNavigate } from 'react-router-dom'

const KvkkText = () => {
  const navigate = useNavigate()  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display text-slate-700 dark:text-slate-300 font-light text-xs leading-relaxed max-w-4xl mx-auto px-6 flex flex-col gap-6">
      <h1 className="text-2xl font-serif text-slate-800 dark:text-white font-normal border-b pb-3">
        KVKK Aydınlatma ve Çerez Politikası Metni
      </h1>
      
      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">1. Veri Sorumlusu Kimliği</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz veri sorumlusu olarak <strong>Görkem Emlak (Cemal Ciğer)</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir. Merkez adresimiz: Yeşilyurt Mh. Mavi Bulvar Girişi Sezer 4 Apartmanı Altı No: 13 Seyhan, Adana.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">2. Kişisel Verilerin İşlenme Amacı</h2>
        <p>
          Sitemiz üzerinde toplanan kişisel verileriniz (İsim, soyisim, telefon, e-posta, favori ilan listeleriniz ve tarayıcı arayüz mod seçimleriniz); emlak danışmanlığı süreçlerimizin yürütülmesi, taleplerinizin WhatsApp veya telefon kanalıyla Cemal Bey'e iletilerek takibinin yapılması ve güvenli üye oturumu açılması amaçlarıyla KVKK’nın 5. ve 6. maddelerine uygun olarak işlenmektedir.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">3. Üçüncü Taraflara ve Yurt Dışına Veri Aktarımı</h2>
        <p>
          Platformumuzda kullanılan <strong>Google Sign-In (Google ile Giriş)</strong> ve <strong>WhatsApp Destek Hattı</strong> entegrasyonları, altyapı sunucuları yurt dışında bulunan üçüncü taraf sistemlerdir. Bu butonları kullanarak oturum açtığınızda veya mesaj gönderdiğinizde, temel kimlik ve iletişim verilerinizin yurt dışındaki güvenli sunuculara aktarılmasına <strong>Açık Rıza</strong> vermiş sayılırsınız. Verileriniz bunun dışında hiçbir reklam ajansı veya üçüncü şahısla kesinlikle paylaşılmaz.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">4. Haklarınız</h2>
        <p>
          KVKK’nın 11. maddesi uyarınca dilediğiniz an info@gorkememlak.com adresine yazarak kayıtlı verilerinizin ne olduğunu öğrenme, düzeltme talep etme veya sistemimizden (not geçmişleri ve üyelik dahil) tamamen silinmesini isteme hakkına sahipsiniz.
        </p>
      </section>
      <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-4 flex justify-center sm:justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)} // Pops context cleanly straight back into forms channels
          className="btn-premium px-12 py-3.5 text-xs font-semibold uppercase tracking-widest cursor-pointer shadow-md select-none w-full sm:w-auto text-center"
        >
          Metni Okudum, Kapat
        </button>
      </div>
    </div>
  )
}

export default KvkkText
