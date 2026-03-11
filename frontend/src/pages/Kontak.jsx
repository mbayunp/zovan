import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Send, MessageSquare, Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function Kontak() {
  // State untuk FAQ (menyimpan index FAQ yang sedang terbuka)
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Nanti logika kirim form ke backend (Express) ditaruh di sini
    alert("Pesan berhasil disimulasikan! (Fitur backend menyusul)");
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    { 
      q: "Apakah survei ini bersifat anonim?", 
      a: "Ya, seluruh jawaban responden akan diproses secara anonim dan tidak akan dipublikasikan secara individual." 
    },
    { 
      q: "Apakah saya harus memahami energi geothermal untuk mengisi survei?", 
      a: "Tidak. Survei ini justru bertujuan untuk mengetahui sejauh mana tingkat pengetahuan masyarakat mengenai energi panas bumi saat ini." 
    },
    { 
      q: "Berapa lama waktu yang dibutuhkan untuk mengisi survei?", 
      a: "Rata-rata responden dapat menyelesaikan seluruh tahapan survei dalam waktu sekitar 5 hingga 7 menit." 
    }
  ];

  return (
    <div className="bg-geo-gray min-h-screen font-sans pb-24">
      
      {/* 1. HERO KONTAK MODERN */}
      <section className="relative bg-gradient-to-br from-geo-teal via-teal-800 to-teal-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Dekorasi Visual */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-geo-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <div className="inline-block bg-teal-700/50 backdrop-blur-sm border border-teal-500/30 text-teal-100 font-semibold px-4 py-1.5 rounded-full text-sm mb-6">
            Mari Berdiskusi
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight">
            Hubungi Peneliti <span className="text-geo-orange">NgobrolGeo</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-50/90 leading-relaxed max-w-3xl mx-auto font-light">
            Jika Anda memiliki pertanyaan mengenai penelitian, ingin mengetahui lebih lanjut tentang platform, atau ingin berdiskusi mengenai penerimaan sosial, silakan menghubungi kami.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="container mx-auto px-6 max-w-6xl -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* KOLOM KIRI: Informasi & Kontak Dasar */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            
            {/* Card Kontak Cepat */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-teal-900/5 border-t-4 border-t-geo-orange border-x border-b border-gray-100">
              <h2 className="text-2xl font-bold text-geo-teal mb-8">Informasi Kontak</h2>
              <div className="space-y-8">
                <a href="mailto:zovannf972@gmail.com" className="flex items-center gap-5 group">
                  <div className="bg-orange-50 p-4 rounded-2xl text-geo-orange group-hover:bg-geo-orange group-hover:text-white transition-colors duration-300">
                    <Mail size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Peneliti</p>
                    <p className="text-lg font-bold text-gray-800 group-hover:text-geo-orange transition-colors">
                      zovannf972@gmail.com
                    </p>
                  </div>
                </a>
                
                <a href="tel:085172249702" className="flex items-center gap-5 group">
                  <div className="bg-orange-50 p-4 rounded-2xl text-geo-orange group-hover:bg-geo-orange group-hover:text-white transition-colors duration-300">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nomor Kontak</p>
                    <p className="text-lg font-bold text-gray-800 group-hover:text-geo-orange transition-colors">
                      0851-7224-9702
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* 2 & 3. Informasi Peneliti & Tujuan Kontak */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-gray-100">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <Info className="text-geo-teal w-6 h-6" />
                <h3 className="text-xl font-bold text-gray-800">Tentang Riset Ini</h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                NgobrolGeo merupakan platform penelitian yang berfokus pada hubungan antara faktor sosial, persepsi masyarakat, dan penerimaan terhadap pengembangan energi terbarukan di Indonesia.
              </p>
              
              <h4 className="font-bold text-gray-800 mb-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">Anda dapat menghubungi kami untuk:</h4>
              <ul className="space-y-3 text-sm md:text-base text-gray-600">
                {[
                  "Menanyakan informasi penelitian",
                  "Memberikan masukan terkait survei",
                  "Menyampaikan pertanyaan seputar geothermal",
                  "Berdiskusi mengenai energi terbarukan"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-geo-orange mt-0.5 flex-shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* KOLOM KANAN: Form Kontak */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-teal-900/5 border border-gray-100">
              <div className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-2xl md:text-3xl font-black text-geo-teal mb-2">Kirim Pesan Langsung</h2>
                <p className="text-gray-500">Pesan Anda akan diteruskan langsung ke email peneliti secara aman.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-geo-teal/50 focus:border-geo-teal transition-all outline-none"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-geo-teal/50 focus:border-geo-teal transition-all outline-none"
                      placeholder="alamat@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subjek Pesan</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-geo-teal/50 focus:border-geo-teal transition-all outline-none"
                    placeholder="Contoh: Pertanyaan seputar survei"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pesan Anda</label>
                  <textarea 
                    rows="6" 
                    required
                    className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-geo-teal/50 focus:border-geo-teal transition-all outline-none resize-none"
                    placeholder="Tuliskan pesan, pertanyaan, atau masukan Anda secara detail di sini..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-geo-orange hover:bg-geo-orange-dark text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-[0_8px_30px_rgb(247,148,29,0.2)] hover:shadow-[0_8px_30px_rgb(247,148,29,0.4)] hover:-translate-y-1"
                >
                  <Send size={24} />
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* 7. PERTANYAAN UMUM (FAQ ACCORDION) */}
      <section className="py-24 container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-geo-teal mb-4 tracking-tight">Pertanyaan Umum (FAQ)</h2>
          <p className="text-gray-600 text-lg">Beberapa hal yang sering ditanyakan mengenai NgobrolGeo.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === index ? 'border-geo-teal shadow-md' : 'border-gray-200 shadow-sm hover:border-gray-300'}`}
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`font-bold pr-4 ${openFaq === index ? 'text-geo-teal' : 'text-gray-800'}`}>
                  {faq.q}
                </span>
                <div className={`p-1 rounded-full transition-colors ${openFaq === index ? 'bg-teal-50 text-geo-teal' : 'text-gray-400'}`}>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              <div 
                className={`px-6 transition-all duration-300 ease-in-out ${openFaq === index ? 'pb-6 max-h-40 opacity-100' : 'max-h-0 opacity-0 pb-0'}`}
              >
                <p className="text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. AJAKAN PARTISIPASI (CTA) */}
      <section className="container mx-auto px-6 max-w-5xl">
        <div className="bg-gradient-to-r from-teal-50 to-orange-50 border border-teal-100/50 rounded-[2.5rem] p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-black text-geo-teal mb-6 relative z-10">Kami Menghargai Partisipasi Anda</h2>
          <p className="text-gray-700 leading-relaxed mb-10 max-w-2xl mx-auto text-lg relative z-10">
            Dengan mengisi survei NgobrolGeo, Anda turut berkontribusi dalam memberikan pemahaman yang lebih baik mengenai bagaimana masyarakat memandang pengembangan energi panas bumi.
          </p>
          <Link to="/survey" className="relative z-10 bg-geo-orange hover:bg-geo-orange-dark text-white px-10 py-4 rounded-full font-black text-lg transition-all shadow-[0_8px_30px_rgb(247,148,29,0.3)] hover:shadow-[0_8px_30px_rgb(247,148,29,0.5)] inline-flex items-center gap-2 hover:-translate-y-1">
            Mulai Isi Survei
          </Link>
        </div>
      </section>

    </div>
  );
}