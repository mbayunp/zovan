import { 
  Users, Calendar, MapPin, Activity, Download, FileSpreadsheet, Database, Lightbulb, Link as LinkIcon 
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function Statistik() {
  // --- MOCK DATA UNTUK GRAFIK (Nanti diganti dengan data dari API Backend) ---
  const demografiUsia = [
    { name: '18-25 Tahun', value: 45 },
    { name: '26-35 Tahun', value: 35 },
    { name: '36-45 Tahun', value: 15 },
    { name: '> 45 Tahun', value: 5 },
  ];

  const pengetahuanGeothermal = [
    { name: 'Sangat Paham', value: 20 },
    { name: 'Cukup Paham', value: 45 },
    { name: 'Kurang Paham', value: 25 },
    { name: 'Tidak Tahu', value: 10 },
  ];

  const perbandinganVariabel = [
    { name: 'Risiko (X1)', skor: 3.2 },
    { name: 'Manfaat (X2)', skor: 4.1 },
    { name: 'Pemerintah (X3)', skor: 3.5 },
    { name: 'Perusahaan (X4)', skor: 3.4 },
    { name: 'Pengetahuan (X5)', skor: 3.8 },
    { name: 'Partisipasi (X6)', skor: 4.3 },
  ];

  const penerimaanSosial = [
    { name: 'Sangat Mendukung', value: 40 },
    { name: 'Mendukung', value: 35 },
    { name: 'Netral', value: 15 },
    { name: 'Menolak', value: 10 },
  ];

  // Palet Warna untuk Chart
  const COLORS = ['#146C72', '#F7941D', '#2E7D32', '#94A3B8'];

  return (
    <div className="bg-geo-gray min-h-screen font-sans pb-24 overflow-hidden">
      
      {/* 1. HERO SECTION MODERN */}
      <section className="relative bg-gradient-to-br from-geo-teal via-teal-800 to-teal-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Dekorasi Visual */}
        <div className="absolute top-0 right-10 w-72 h-72 bg-geo-orange rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <div className="inline-block bg-teal-700/50 backdrop-blur-sm border border-teal-500/30 text-teal-100 font-semibold px-4 py-1.5 rounded-full text-sm mb-6">
            Live Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight leading-tight">
            Statistik Persepsi <span className="text-geo-orange">Masyarakat</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-50/90 leading-relaxed max-w-3xl mx-auto font-light">
            Visualisasi data agregat dari platform NgobrolGeo. Menampilkan gambaran komprehensif mengenai persepsi, pengetahuan, hingga penerimaan sosial terhadap pengembangan geothermal.
          </p>
        </div>
      </section>

      {/* 2. RINGKASAN DATA SURVEI (Stat Cards) */}
      <section className="container mx-auto px-6 max-w-6xl -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Responden", value: "524", icon: <Users size={28} />, color: "text-geo-teal", bg: "bg-teal-50" },
            { title: "Responden Hari Ini", value: "18", icon: <Activity size={28} />, color: "text-geo-orange", bg: "bg-orange-50" },
            { title: "Responden Minggu Ini", value: "76", icon: <Calendar size={28} />, color: "text-geo-green", bg: "bg-green-50" },
            { title: "Wilayah Terbanyak", value: "Jawa Barat", icon: <MapPin size={28} />, color: "text-blue-600", bg: "bg-blue-50" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-xl shadow-teal-900/5 border border-gray-100 flex items-center gap-5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.title}</p>
                <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 & 4. DEMOGRAFI & PENGETAHUAN (Pie Charts) */}
      <section className="container mx-auto px-6 max-w-6xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Demografi Usia */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h2 className="text-xl md:text-2xl font-black text-geo-teal mb-2">Distribusi Usia Responden</h2>
            <p className="text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">Demografi berdasarkan rentang umur.</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={demografiUsia} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {demografiUsia.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 text-center mt-6 bg-gray-50 py-2 rounded-lg font-medium">Sebagian besar responden berusia produktif (18-35 tahun).</p>
          </div>

          {/* Pengetahuan Geothermal */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h2 className="text-xl md:text-2xl font-black text-geo-teal mb-2">Pengetahuan Geothermal (X5)</h2>
            <p className="text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">Tingkat pemahaman awal masyarakat.</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pengetahuanGeothermal} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={{fontSize: 12}}>
                    {pengetahuanGeothermal.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 text-center mt-6 bg-gray-50 py-2 rounded-lg font-medium">Mayoritas responden memiliki pemahaman dasar geothermal.</p>
          </div>

        </div>
      </section>

      {/* 5 - 9. ANALISIS VARIABEL X1 - X6 (Bar Chart) */}
      <section className="container mx-auto px-6 max-w-6xl mb-12">
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-md border border-gray-100">
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h2 className="text-2xl md:text-3xl font-black text-geo-teal mb-2">Skor Rata-Rata Variabel (X1 - X6)</h2>
            <p className="text-gray-600">Perbandingan persepsi masyarakat terhadap risiko, manfaat, kepercayaan, dan partisipasi (Skala 1-5).</p>
          </div>
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perbandinganVariabel} margin={{ top: 20, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{fontSize: 11, fill: '#64748b'}} interval={0} angle={-30} textAnchor="end" height={60} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="skor" fill="#146C72" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {perbandinganVariabel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.skor > 4 ? '#F7941D' : '#146C72'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 text-center mt-8 bg-orange-50 py-3 px-4 rounded-xl border border-orange-100">
            <span className="font-bold text-geo-orange">Insight Menarik:</span> Persepsi Manfaat Ekonomi (X2) dan Partisipasi Masyarakat (X6) memiliki skor persetujuan tertinggi.
          </p>
        </div>
      </section>

      {/* 10. PENERIMAAN SOSIAL (Y) */}
      <section className="container mx-auto px-6 max-w-6xl mb-16">
        <div className="bg-gradient-to-br from-teal-800 to-geo-teal p-8 md:p-12 lg:p-14 rounded-[2.5rem] text-white shadow-2xl flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
          {/* Aksen visual */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 border-[40px] border-teal-700/50 rounded-full"></div>

          <div className="flex-1 relative z-10 w-full">
            <div className="inline-block bg-geo-orange text-white font-bold px-4 py-1.5 rounded-full text-xs mb-4 uppercase tracking-wider">
              Variabel Dependen (Y)
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Penerimaan Sosial</h2>
            <p className="text-teal-100 text-lg leading-relaxed mb-8 font-light">
              Indikator utama penelitian ini menunjukkan sejauh mana masyarakat mendukung pengembangan proyek energi panas bumi di daerah mereka maupun secara nasional.
            </p>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md inline-block">
              <p className="text-4xl md:text-5xl font-black text-geo-orange mb-2">75%</p>
              <p className="text-teal-50 text-sm font-medium">Akumulasi Responden Mendukung & Sangat Mendukung</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-80 md:h-96 bg-white rounded-3xl p-4 shadow-inner relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={penerimaanSosial} margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{fontSize: 12, fill: '#475569', fontWeight: 600}} width={110} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#F7941D" radius={[0, 6, 6, 0]} barSize={28}>
                  {penerimaanSosial.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index < 2 ? '#F7941D' : '#146C72'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 11 & 12. INSIGHT AWAL & ANALISIS */}
      <section className="container mx-auto px-6 max-w-6xl mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-orange-50/80 p-8 md:p-10 rounded-3xl border border-orange-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white p-3 rounded-2xl shadow-sm text-geo-orange">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">Temuan Awal</h3>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            Data menunjukkan bahwa <strong className="text-geo-teal">Tingkat Pengetahuan (X5)</strong> berbanding lurus dengan Tingkat Penerimaan (Y). Kekhawatiran terhadap <strong className="text-geo-teal">Risiko Lingkungan (X1)</strong> dapat ditekan jika <strong className="text-geo-teal">Kepercayaan (X3 & X4)</strong> tinggi.
          </p>
        </div>

        <div className="bg-teal-50/80 p-8 md:p-10 rounded-3xl border border-teal-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white p-3 rounded-2xl shadow-sm text-geo-teal">
              <LinkIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">Analisis Lanjutan</h3>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            Analisis lebih lanjut akan menggunakan pendekatan <strong className="text-geo-teal">Regresi Linear Berganda</strong> untuk membuktikan secara matematis seberapa besar pengaruh variabel X1–X6 secara simultan terhadap Penerimaan (Y).
          </p>
        </div>
      </section>

      {/* 13. DOWNLOAD DATASET */}
      <section className="container mx-auto px-6 max-w-4xl text-center">
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl shadow-teal-900/5 border border-gray-100 relative overflow-hidden">
          {/* Background Pattern */}
          <Database className="absolute -top-10 -right-10 text-gray-50 w-64 h-64 -z-0" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-teal-50 text-geo-teal rounded-full flex items-center justify-center mx-auto mb-6">
              <Download size={36} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4 tracking-tight">Unduh Data Penelitian</h2>
            <p className="text-gray-500 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Sebagai bagian dari transparansi penelitian, data agregat hasil survei (yang telah dianonimkan) dapat diunduh untuk keperluan akademik lebih lanjut.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_8px_30px_rgb(22,163,74,0.3)] hover:-translate-y-1">
                <FileSpreadsheet size={24} />
                Format Excel (.xlsx)
              </button>
              <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_8px_30px_rgb(31,41,55,0.3)] hover:-translate-y-1">
                <Database size={24} />
                Format CSV (.csv)
              </button>
            </div>
            <p className="text-sm font-medium text-gray-400 mt-8 bg-gray-50 inline-block px-4 py-2 rounded-lg">
              *Data tidak mengandung informasi identitas pribadi (PII) responden..
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}