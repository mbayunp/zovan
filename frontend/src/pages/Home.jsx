import { Link } from 'react-router-dom';
import { Leaf, Zap, Clock, Globe, ShieldCheck, Activity, Users, CheckCircle, Lock } from 'lucide-react';

// 1. Import gambar dari folder assets
import heroImage from '../assets/images/gambar1.jpeg';

export default function Home() {
  return (
    <div className="bg-geo-gray min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white text-gray-800 py-20 lg:py-28 relative overflow-hidden">
        {/* Dekorasi Background Modern (Opsional) */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-50 rounded-l-full opacity-50 -z-0 transform translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-block bg-teal-50 border border-teal-100 text-geo-teal font-semibold px-4 py-1.5 rounded-full text-sm mb-6 flex items-center gap-2 w-max">
              <Zap size={16} className="text-geo-orange" />
              Survei Transisi Energi Indonesia
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-geo-teal leading-tight mb-6 tracking-tight">
              Ngobrolin Panas Bumi <br/>
              <span className="text-geo-orange relative">
                untuk Masa Depan
                {/* Garis bawah dekoratif */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent"/>
                </svg>
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
              NgobrolGeo adalah platform survei yang bertujuan untuk memahami bagaimana masyarakat memandang pengembangan energi panas bumi (geothermal) di Indonesia. Sampaikan pandangan Anda sekarang!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/survey" className="bg-geo-orange hover:bg-geo-orange-dark text-white px-8 py-3.5 rounded-full font-bold text-center transition-all shadow-[0_8px_30px_rgb(247,148,29,0.3)] hover:shadow-[0_8px_30px_rgb(247,148,29,0.5)] hover:-translate-y-1">
                Isi Survei Sekarang
              </Link>
              <Link to="/tentang" className="bg-white hover:bg-teal-50 text-geo-teal border-2 border-geo-teal px-8 py-3.5 rounded-full font-bold text-center transition-all hover:-translate-y-1">
                Pelajari Penelitian
              </Link>
            </div>
          </div>
          
          {/* Image Container Modern */}
          <div className="hidden lg:flex justify-center items-center relative">
            {/* Main Image */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-geo-teal/40 to-transparent z-10"></div>
              <img 
                src={heroImage} 
                alt="Ilustrasi Geothermal" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Card Element */}
            <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 z-20 animate-bounce-slow">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <Leaf size={28} />
              </div>
              <div>
                <p className="text-sm font-black text-gray-800">Energi Bersih</p>
                <p className="text-xs text-gray-500 font-medium">Transisi Berkelanjutan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TENTANG PLATFORM & 4. APA ITU GEOTHERMAL */}
      <section className="py-20 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-3xl font-bold text-geo-teal mb-4">Tentang NgobrolGeo</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Platform digital yang dikembangkan untuk mengumpulkan pandangan dan persepsi masyarakat mengenai energi panas bumi (geothermal). Indonesia memiliki potensi energi panas bumi terbesar di dunia, namun pengembangannya juga bergantung pada penerimaan masyarakat.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Data yang dikumpulkan akan digunakan untuk keperluan penelitian akademik dan analisis ilmiah mengenai penerimaan sosial terhadap energi panas bumi di Indonesia.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-3xl font-bold text-geo-teal mb-4">Apa Itu Energi Panas Bumi?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Energi yang berasal dari panas alami yang tersimpan di dalam perut bumi akibat aktivitas geologi seperti pergerakan lempeng tektonik dan aktivitas magma.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Dalam sistem pembangkit geothermal, uap panas dari dalam bumi digunakan untuk memutar turbin yang menghasilkan listrik secara stabil karena tidak bergantung pada kondisi cuaca.
          </p>
        </div>
      </section>

      {/* 3. MENGAPA ENERGI PANAS BUMI PENTING */}
      <section className="bg-geo-teal text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-geo-orange mb-6">Mengapa Energi Panas Bumi Penting?</h2>
          <p className="max-w-3xl mx-auto text-teal-50 mb-16 text-lg">
            Indonesia berada di kawasan cincin api (Ring of Fire) yang memiliki potensi geothermal sangat besar. Pemanfaatannya memiliki berbagai keunggulan dibandingkan energi fosil.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Ramah Lingkungan", desc: "Menghasilkan emisi karbon yang jauh lebih rendah.", icon: <Leaf size={40}/> },
              { title: "Sumber Energi Stabil", desc: "Menghasilkan listrik secara stabil sepanjang waktu tanpa terpengaruh cuaca.", icon: <Activity size={40}/> },
              { title: "Potensi Jangka Panjang", desc: "Tersedia secara alami dan dapat dimanfaatkan dalam waktu sangat panjang.", icon: <Clock size={40}/> },
              { title: "Transisi Energi Bersih", desc: "Mengurangi ketergantungan Indonesia terhadap energi fosil.", icon: <Zap size={40}/> },
            ].map((item, index) => (
              <div key={index} className="bg-teal-800/50 backdrop-blur-sm p-8 rounded-3xl border border-teal-700 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
                <div className="text-geo-orange mb-6 flex justify-center bg-teal-900/50 w-20 h-20 mx-auto rounded-full items-center">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-teal-100 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TUJUAN PENELITIAN & 6. MODEL PENELITIAN */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-geo-teal mb-4">Tujuan & Faktor Penelitian</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Penelitian ini bertujuan untuk memahami berbagai faktor yang mempengaruhi penerimaan sosial masyarakat terhadap pengembangan energi panas bumi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Pengetahuan tentang Geothermal",
            "Persepsi Manfaat Ekonomi",
            "Persepsi Risiko Lingkungan",
            "Kepercayaan terhadap Pemerintah",
            "Kepercayaan terhadap Perusahaan",
            "Partisipasi Masyarakat"
          ].map((faktor, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-geo-orange transition-colors">
              <div className="bg-orange-50 p-2 rounded-full">
                <CheckCircle className="text-geo-orange" size={24} />
              </div>
              <span className="font-semibold text-gray-700">{faktor}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PROSES SURVEI */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-geo-teal mb-16">Bagaimana Cara Berpartisipasi?</h2>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8 relative max-w-5xl mx-auto">
            {/* Garis penghubung untuk tampilan desktop */}
            <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-gray-100 -z-0"></div>
            
            {[
              { step: "1", title: "Data Demografi", desc: "Isi data dasar seperti umur dan domisili." },
              { step: "2", title: "Pengetahuan", desc: "Jawab pertanyaan seputar pemahaman geothermal." },
              { step: "3", title: "Opini & Persepsi", desc: "Berikan pendapat mengenai manfaat dan risiko." },
              { step: "4", title: "Selesai", desc: "Kirim jawaban untuk membantu penelitian." },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 relative z-10 bg-white px-4">
                <div className="w-20 h-20 bg-geo-orange text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                  {item.step}
                </div>
                <h3 className="font-bold text-geo-teal mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-16 text-gray-500 font-medium bg-gray-50 inline-block px-6 py-2 rounded-full">⏳ Waktu pengerjaan survei: 5–7 menit</p>
        </div>
      </section>

      {/* 10. KERAHASIAAN DATA & 11. KONTAK */}
      <section className="py-24 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div className="bg-teal-50 p-10 rounded-3xl flex flex-col sm:flex-row items-start gap-6 border border-teal-100">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <Lock className="text-geo-teal w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-geo-teal mb-3">Kerahasiaan Data</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Seluruh data responden dijaga kerahasiaannya dan hanya digunakan untuk keperluan akademik. Identitas tidak akan dipublikasikan. Partisipasi bersifat sukarela dan anonim.
            </p>
          </div>
        </div>
        <div className="bg-orange-50 p-10 rounded-3xl flex flex-col sm:flex-row items-start gap-6 border border-orange-100">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <Users className="text-geo-orange w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-geo-orange-dark mb-3">Kontak Peneliti</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Jika Anda memiliki pertanyaan terkait penelitian ini, silakan hubungi:
            </p>
            <a href="mailto:zovannf972@gmail.com" className="block font-semibold text-gray-800 hover:text-geo-orange mb-1">✉️ zovannf972@gmail.com</a>
            <a href="tel:085172249702" className="block font-semibold text-gray-800 hover:text-geo-orange">📞 0851-7224-9702</a>
          </div>
        </div>
      </section>

      {/* 9. AJAKAN MENGISI SURVEI (CTA Bawah) */}
      <section className="bg-geo-teal py-20 text-center px-6 relative overflow-hidden">
        {/* Lingkaran Dekoratif */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-600 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-800 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Suara Anda Sangat Berarti</h2>
          <p className="text-teal-100 text-lg mb-10">
            Dengan berpartisipasi, Anda berkontribusi dalam mendukung pengembangan energi yang lebih berkelanjutan dan berpihak pada masyarakat.
          </p>
          <Link to="/survey" className="bg-geo-orange hover:bg-white hover:text-geo-orange text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(247,148,29,0.5)] inline-block">
            Mulai Isi Survei Sekarang
          </Link>
        </div>
      </section>
      
    </div>
  );
}