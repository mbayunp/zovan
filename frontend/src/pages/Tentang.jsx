import { BookOpen, Target, ShieldCheck, FileText, Users, Globe, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function Tentang() {
  return (
    <div className="bg-geo-gray min-h-screen font-sans overflow-hidden">
      
      {/* 1. HERO SECTION MODERN */}
      <section className="relative bg-gradient-to-br from-geo-teal via-teal-800 to-teal-900 text-white py-24 lg:py-32">
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-geo-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <div className="inline-block bg-teal-700/50 backdrop-blur-sm border border-teal-500/30 text-teal-100 font-semibold px-4 py-1.5 rounded-full text-sm mb-6">
            Riset Akademik
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight leading-tight">
            Tentang Penelitian <span className="text-geo-orange">NgobrolGeo</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-50/90 leading-relaxed max-w-3xl mx-auto font-light">
            Platform survei digital yang dikembangkan untuk memahami persepsi masyarakat terhadap energi panas bumi (geothermal) di Indonesia sebagai bagian dari transisi menuju energi bersih yang berkelanjutan.
          </p>
        </div>
      </section>

      {/* 2 & 3. LATAR BELAKANG & TENTANG PLATFORM */}
      <section className="py-20 container mx-auto px-6 relative z-20 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-teal-900/5 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
              <div className="bg-orange-50 p-3 rounded-2xl text-geo-orange">
                <BookOpen className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-geo-teal">Latar Belakang</h2>
            </div>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Indonesia merupakan salah satu negara dengan potensi energi panas bumi terbesar di dunia (lebih dari 20 gigawatt) yang tersebar di jalur cincin api (Ring of Fire). Energi ini merupakan sumber terbarukan yang rendah emisi dan beroperasi stabil.
              </p>
              <p>
                Namun, pengembangan proyek geothermal seringkali menghadapi tantangan sosial seperti persepsi risiko lingkungan, kepercayaan terhadap institusi, dan tingkat pengetahuan masyarakat yang memengaruhi penerimaan sosial.
              </p>
              <p className="font-medium text-geo-teal">
                Penelitian ini dilakukan untuk memberikan gambaran komprehensif mengenai persepsi masyarakat guna mendukung kebijakan energi yang inklusif.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-teal-900/5 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
              <div className="bg-teal-50 p-3 rounded-2xl text-geo-teal">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-geo-teal">Platform NgobrolGeo</h2>
            </div>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                NgobrolGeo dirancang khusus untuk memfasilitasi partisipasi masyarakat dalam memberikan pandangan mereka mengenai pengembangan energi terbarukan.
              </p>
              <p>
                Melalui platform ini, responden dapat menyampaikan persepsi mengenai tingkat pengetahuan, manfaat ekonomi, potensi risiko, hingga penerimaan terhadap proyek geothermal di daerah mereka.
              </p>
              <p className="font-medium text-geo-teal">
                Data yang dikumpulkan akan dianalisis secara ilmiah untuk memahami pola persepsi masyarakat dan dinamika sosial terkait energi panas bumi.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* 6. MODEL PENELITIAN */}
      <section className="bg-white py-24 border-y border-gray-100 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-geo-teal mb-4 tracking-tight">Model & Variabel Penelitian</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Penelitian ini mengkaji hubungan antara beberapa variabel sosial yang mempengaruhi tingkat penerimaan masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { id: "X1", title: "Risiko Lingkungan", desc: "Pandangan mengenai potensi dampak lingkungan dari kegiatan eksplorasi." },
              { id: "X2", title: "Manfaat Ekonomi", desc: "Pandangan mengenai lapangan kerja dan pembangunan daerah." },
              { id: "X3", title: "Kepercayaan (Pemerintah)", desc: "Kepercayaan dalam mengatur dan mengawasi proyek." },
              { id: "X4", title: "Kepercayaan (Perusahaan)", desc: "Kepercayaan terhadap entitas pengembang proyek." },
              { id: "X5", title: "Pengetahuan Geothermal", desc: "Tingkat pemahaman konsep energi dan cara kerjanya." },
              { id: "X6", title: "Partisipasi Masyarakat", desc: "Sejauh mana masyarakat dilibatkan dalam keputusan." },
            ].map((variabel) => (
              <div key={variabel.id} className="group bg-gray-50 p-6 md:p-8 rounded-3xl border-2 border-transparent hover:border-geo-orange hover:bg-white transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs font-black text-geo-orange bg-orange-100 px-3 py-1.5 rounded-full uppercase tracking-wider group-hover:bg-geo-orange group-hover:text-white transition-colors">
                    Variabel {variabel.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{variabel.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{variabel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TUJUAN PENELITIAN */}
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <div className="bg-gradient-to-br from-teal-900 to-geo-teal rounded-[2rem] p-8 md:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Aksen visual */}
          <Target className="absolute -right-10 -bottom-10 w-64 h-64 text-teal-800 opacity-30" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                <Target className="text-geo-orange w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">Tujuan Utama Penelitian</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                "Mengidentifikasi tingkat pengetahuan masyarakat mengenai energi panas bumi.",
                "Menganalisis persepsi manfaat ekonomi dari pengembangan geothermal.",
                "Mengidentifikasi kekhawatiran masyarakat terhadap potensi risiko lingkungan.",
                "Mengukur tingkat kepercayaan terhadap pemerintah dalam regulasi energi.",
                "Mengukur tingkat kepercayaan terhadap perusahaan pengelola proyek.",
                "Menganalisis peran partisipasi masyarakat dalam penerimaan sosial."
              ].map((tujuan, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <CheckCircle2 className="text-geo-orange w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p className="text-teal-50 text-sm md:text-base leading-relaxed">{tujuan}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. MANFAAT PENELITIAN */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-geo-teal mb-4 tracking-tight">Manfaat Penelitian</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Bagi Akademisi", icon: <BookOpen size={28} />, desc: "Kontribusi kajian ilmiah mengenai hubungan energi terbarukan dan dinamika sosial." },
              { title: "Bagi Pemerintah", icon: <ShieldCheck size={28} />, desc: "Masukan perumusan kebijakan energi yang inklusif berdasarkan perspektif masyarakat." },
              { title: "Bagi Industri", icon: <Lightbulb size={28} />, desc: "Membantu perusahaan memahami faktor sosial penentu penerimaan proyek." },
              { title: "Bagi Masyarakat", icon: <Users size={28} />, desc: "Memberikan ruang untuk menyampaikan pandangan mengenai energi terbarukan." },
            ].map((manfaat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 mx-auto bg-gray-50 text-gray-400 group-hover:bg-geo-orange group-hover:text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 transition-all duration-300 transform group-hover:rotate-6">
                  {manfaat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{manfaat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed px-2">{manfaat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8, 9, 10. METODOLOGI, PARTISIPASI, KERAHASIAAN */}
      <section className="py-24 container mx-auto px-6 max-w-4xl">
        <div className="space-y-6 md:space-y-8">
          
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-6 items-start group">
            <div className="bg-teal-50 p-4 rounded-2xl text-geo-teal group-hover:bg-geo-teal group-hover:text-white transition-colors">
              <FileText className="w-8 h-8 flex-shrink-0" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Metodologi Penelitian</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Penelitian ini menggunakan metode survei kuantitatif. Jawaban responden akan dianalisis menggunakan metode analisis statistik dan pendekatan pemodelan data untuk memahami hubungan antar variabel secara presisi.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-6 items-start group">
            <div className="bg-orange-50 p-4 rounded-2xl text-geo-orange group-hover:bg-geo-orange group-hover:text-white transition-colors">
              <Users className="w-8 h-8 flex-shrink-0" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Partisipasi Masyarakat</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Dengan berpartisipasi, responden berkontribusi nyata dalam riset energi terbarukan. Pandangan masyarakat adalah kunci untuk memastikan implementasi teknologi energi dapat diterima dengan baik di daerah.
              </p>
            </div>
          </div>

          <div className="bg-teal-800 p-6 md:p-8 rounded-3xl shadow-md border border-teal-700 flex flex-col sm:flex-row gap-6 items-start">
            <div className="bg-white/10 p-4 rounded-2xl text-geo-orange border border-white/20">
              <ShieldCheck className="w-8 h-8 flex-shrink-0" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Kerahasiaan & Etika Data</h3>
              <p className="text-teal-50 leading-relaxed text-sm md:text-base">
                Data dijaga kerahasiaannya khusus untuk keperluan akademik. Identitas tidak akan dipublikasikan, dan data diproses secara agregat. Partisipasi bersifat sukarela dan anonim.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}