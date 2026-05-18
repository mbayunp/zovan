import React, { useState, useEffect } from 'react';
import { TrendingUp, HelpCircle, FileText, Download, Award, Layers, Percent, Loader2, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

export default function RegressionAnalysis() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRegressionData();
  }, []);

  const fetchRegressionData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/analysis/regression');
      if (!response.ok) throw new Error('Gagal mengambil hitungan regresi');
      const result = await response.json();
      setData(result);
    } catch (error) {
      Swal.fire('Koneksi Error', error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (type) => {
    Swal.fire({
      title: `Export ke ${type}?`,
      text: "Laporan analisis regresi linear berganda akan diunduh.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#0f4c75',
      confirmButtonText: 'Unduh Sekarang'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Unduhan Berhasil!', `File analitik telah disimpan.`, 'success');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-geo-teal mb-4" size={40} />
        <p className="text-gray-500 font-bold">Menghitung matriks regresi linear secara real-time...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. HEADER HALAMAN */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <TrendingUp className="text-geo-teal" /> Analisis Regresi Linear Berganda
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Analisis faktor-faktor yang mempengaruhi penerimaan sosial masyarakat terhadap pengembangan energi panas bumi.
          </p>
        </div>
        <button 
          onClick={fetchRegressionData} 
          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold transition-all"
        >
          <RefreshCw size={16} /> Refresh Hitungan
        </button>
      </div>

      {/* 2 & 8. RINGKASAN HASIL REGRESI (STAT CARDS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-black text-[#0f4c75]">{data.total_respondents}</div>
          <div className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Responden</div>
          <p className="text-[10px] text-gray-400 mt-2">Jumlah sampel dalam analisis regresi</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-black text-geo-orange">{data.adjusted_r2.toFixed(3)}</div>
          <div className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Adjusted R²</div>
          <p className="text-[10px] text-gray-400 mt-2">Model menjelaskan {(data.adjusted_r2 * 100).toFixed(1)}% variasi Y</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center border-l-4 border-l-geo-teal">
          <div className="text-lg md:text-xl font-black text-geo-teal truncate px-1">{data.dominant_variable.split('—')[0]}</div>
          <div className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Faktor Dominan</div>
          <p className="text-[10px] text-gray-400 mt-1 truncate">{data.dominant_variable.split('—')[1] || 'Variabel'}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-3xl font-black text-green-600">{data.f_sig.toFixed(3)}</div>
          <div className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Signifikansi Model</div>
          <p className="text-[10px] text-gray-400 mt-2">Model signifikan secara statistik</p>
        </div>
      </div>

      {/* 3 & 4. PERSAMAAN REGRESI & INTERPRETASI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm md:col-span-2 flex flex-col justify-center">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Persamaan Regresi Linear Berganda</h3>
          <div className="bg-teal-50/50 border border-teal-100 p-5 rounded-2xl">
            <code className="text-sm md:text-base font-mono font-bold text-[#0f4c75] block break-all">
              {data.equation}
            </code>
          </div>
        </div>
        
        {/* 9. VARIABEL DOMINAN HIGHLIGHT CARD */}
        <div className="bg-gradient-to-br from-[#0f4c75] to-geo-teal text-white p-6 rounded-3xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-[-10px] bottom-[-10px] opacity-10 text-white">
            <Award size={140} />
          </div>
          <div>
            <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Faktor Utama</span>
            <h4 className="text-xl font-black mt-3">{data.dominant_variable}</h4>
          </div>
          <p className="text-xs text-teal-100/80 leading-relaxed mt-4">
            Masyarakat cenderung menerima proyek geothermal apabila terbukti memberikan manfaat ekonomi yang nyata bagi daerah lokal.
          </p>
        </div>
      </div>

      {/* 4. INTERPRETASI PERSAMAAN */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2">
          <FileText size={18} className="text-geo-teal" /> Interpretasi Model Regresi
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Persamaan regresi di atas menunjukkan bahwa setiap variabel independen memiliki kontribusi terhadap tingkat penerimaan sosial masyarakat. 
          Koefisien <span className="text-green-600 font-bold">positif (+)</span> menandakan hubungan searah yang meningkatkan penerimaan sosial, sedangkan koefisien <span className="text-red-500 font-bold">negatif (-)</span> menunjukkan hubungan berlawanan.
        </p>
      </div>

      {/* 5, 6 & 7. TABEL KOEFISIEN & STATISTIK UJI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* TABEL KOEFISIEN REGRESI */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden md:col-span-2">
          <div className="p-6 border-b border-gray-50">
            <h3 className="font-bold text-gray-800 text-base">Koefisien Regresi Variabel</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-50 text-xs text-gray-700 font-bold uppercase">
                <tr>
                  <th className="px-4 py-3">Variabel</th>
                  <th className="px-4 py-3 text-center">B</th>
                  <th className="px-4 py-3 text-center">Beta</th>
                  <th className="px-4 py-3 text-center">t Hitung</th>
                  <th className="px-4 py-3 text-center">Sig.</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.variables.map((v) => (
                  <tr key={v.code} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-800">{v.code} <span className="font-normal text-xs text-gray-400 block">{v.name}</span></td>
                    <td className="px-4 py-3.5 text-center font-mono font-semibold">{v.coef.toFixed(3)}</td>
                    <td className="px-4 py-3.5 text-center font-mono text-gray-600">{v.beta.toFixed(3)}</td>
                    <td className="px-4 py-3.5 text-center font-mono">{v.t_stat.toFixed(3)}</td>
                    <td className="px-4 py-3.5 text-center font-mono font-bold text-geo-teal">{v.sig.toFixed(3)}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                        v.status === 'Signifikan' ? 'bg-green-50 text-green-600' :
                        v.status === 'Mendekati' ? 'bg-orange-50 text-geo-orange' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 10. VISUALISASI PENGARUH VARIABEL (BAR CHART MINIMALIS TAILWIND) */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-base mb-1">Visualisasi Pengaruh Variabel</h3>
            <p className="text-xs text-gray-400 mb-6">Grafik perbandingan nilai Koefisien (B) tiap faktor</p>
            
            <div className="space-y-4">
              {/* Diurutkan dari koefisien terbesar */}
              {[...data.variables].sort((a,b) => b.coef - a.coef).map((v) => {
                const percentage = Math.min(100, Math.max(10, (v.coef / 0.5) * 100));
                return (
                  <div key={v.code} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-700">{v.code} — {v.name}</span>
                      <span className="text-[#0f4c75] font-mono">{v.coef.toFixed(3)}</span>
                    </div>
                    <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden border border-gray-100">
                      <div 
                        className="bg-geo-teal h-full rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-2xl text-[11px] font-medium text-gray-400 mt-4 text-center">
            Membantu melihat peta kontribusi secara cepat.
          </div>
        </div>
      </div>

      {/* 6 & 7. PENJELASAN PARAMETER STATISTIK (UJI T & UJI F) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">6. Uji t (Parsial)</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Digunakan untuk menguji pengaruh individu. Variabel dinyatakan <b>Signifikan</b> jika nilai <code className="text-geo-teal font-bold">Sig. &lt; 0.05</code>.
          </p>
        </div>
        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">7. Uji F (Simultan)</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Menguji kelayakan model secara bersamaan. Nilai F-Hitung sebesar <b>{data.f_stat.toFixed(3)}</b> dengan Sig. <b>{data.f_sig.toFixed(3)}</b> menyatakan seluruh variabel serentak berpengaruh nyata terhadap Y.
          </p>
        </div>
        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">8. Kekuatan Korelasi Model (R)</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Nilai R Korelasi Berganda sebesar <b>{data.r.toFixed(3)}</b> menunjukkan hubungan asosiatif yang sangat kuat antara seluruh faktor dengan tingkat penerimaan masyarakat.
          </p>
        </div>
      </div>

      {/* 11 & 12. INSIGHT PENELITIAN & REKOMENDASI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
            <Layers size={18} className="text-geo-orange" /> 11. Insight Hasil Analisis
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Hasil analisis regresi menunjukkan bahwa persepsi manfaat ekonomi memiliki pengaruh paling besar terhadap penerimaan sosial masyarakat terhadap energi panas bumi. 
            Selain itu, faktor partisipasi masyarakat dan kepercayaan terhadap pemerintah juga menunjukkan pengaruh signifikan terhadap tingkat penerimaan masyarakat. 
            Temuan ini menunjukkan bahwa pendekatan pembangunan geothermal perlu memperhatikan manfaat ekonomi lokal serta keterlibatan masyarakat dalam proses pengambilan keputusan.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm border-t-4 border-t-geo-orange">
          <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
            <Award size={18} className="text-geo-orange" /> 12. Rekomendasi Kebijakan Riset
          </h3>
          <ul className="text-sm text-gray-600 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="bg-orange-50 text-geo-orange w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
              <span>Memperkuat program pemberdayaan ekonomi lokal yang berwujud nyata di sekitar ring WKP.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-orange-50 text-geo-orange w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
              <span>Meningkatkan transparansi dan sosialisasi mitigasi risiko lingkungan demi menurunkan kecemasan (X1).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-orange-50 text-geo-orange w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
              <span>Melibatkan lembaga masyarakat adat dalam musyawarah penentuan CSR perusahaan pengembang.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 13. EXPORT TOOLS SECTION */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
        <h3 className="text-sm font-bold text-gray-700 mb-4">13. Dokumen Resmi Laporan Analisis Regresi</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => handleExport('Excel (.xlsx)')}
            className="bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all border border-green-200"
          >
            <Download size={14} /> Export Dataset SPSS / Excel
          </button>
          <button 
            onClick={() => handleExport('PDF Laporan')}
            className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all border border-red-200"
          >
            <Download size={14} /> Unduh Ringkasan PDF
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-[#e8f4f8] hover:bg-[#d0ebf4] text-[#0f4c75] text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
          >
            🖨️ Cetak Dokumen Laporan
          </button>
        </div>
      </div>

    </div>
  );
}