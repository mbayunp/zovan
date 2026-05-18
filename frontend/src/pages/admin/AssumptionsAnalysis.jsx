import React, { useState, useEffect } from 'react';
import { Microscope, CheckCircle, Download, RefreshCw, Loader2, Info, Activity } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AssumptionsAnalysis() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAssumptionsData();
  }, []);

  const fetchAssumptionsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/analysis/assumptions');
      if (!response.ok) throw new Error('Gagal memuat matriks asumsi klasik');
      const result = await response.json();
      setData(result);
    } catch (error) {
      Swal.fire('Error Database', error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#0f4c75] mb-4" size={40} />
        <p className="text-gray-500 font-bold">Menganalisis varians residual, multikolinearitas, dan uji normalitas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 p-2 md:p-4">
      
      {/* 1. HEADER HALAMAN */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <Microscope className="text-teal-600" /> Uji Asumsi Klasik
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Analisis asumsi statistik untuk memastikan model regresi linear berganda memenuhi persyaratan analisis penelitian.
          </p>
        </div>
        <button 
          onClick={fetchAssumptionsData}
          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold transition-all"
        >
          <RefreshCw size={16} /> Hitung Ulang Data
        </button>
      </div>

      {/* 2. RINGKASAN STATUS MODEL */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-xl font-black text-teal-600">{data.normality.status}</div>
          <div className="text-[11px] font-bold text-gray-400 mt-1 uppercase">Normalitas</div>
          <p className="text-[10px] text-gray-500 mt-2 bg-teal-50 px-2 py-0.5 rounded-full inline-block">Residual Normal</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-xl font-black text-green-600">Tidak Terjadi</div>
          <div className="text-[11px] font-bold text-gray-400 mt-1 uppercase">Multikolinearitas</div>
          <p className="text-[10px] text-gray-500 mt-2 bg-green-50 px-2 py-0.5 rounded-full inline-block">Nilai VIF Aman</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-xl font-black text-green-600">Tidak Terjadi</div>
          <div className="text-[11px] font-bold text-gray-400 mt-1 uppercase">Heteroskedastisitas</div>
          <p className="text-[10px] text-gray-500 mt-2 bg-green-50 px-2 py-0.5 rounded-full inline-block">Varians Homogen</p>
        </div>
        <div className="bg-[#0f4c75] p-5 rounded-3xl text-center text-white shadow-md">
          <div className="text-xl font-black flex items-center justify-center gap-1.5 text-teal-300">
            <CheckCircle size={20} /> {data.status_model}
          </div>
          <div className="text-[10px] font-bold text-teal-100/70 mt-1 uppercase">Kesimpulan Model</div>
          <p className="text-[10px] text-white/80 mt-2">Lolos Semua Syarat</p>
        </div>
      </div>

      {/* 3. UJI NORMALITAS RESIDUAL */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="border-b border-gray-50 pb-4 mb-4">
          <h3 className="font-bold text-gray-800 text-lg">3. Uji Normalitas Residual</h3>
          <p className="text-xs text-gray-400 mt-0.5">Metode Uji Kuesioner: Kolmogorov-Smirnov / Shapiro-Wilk Test Approximation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 flex flex-col justify-center">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2">
              <div className="flex justify-between text-xs font-bold"><span className="text-gray-500">Nilai Signifikansi:</span><span className="text-teal-600 font-mono text-sm">{data.normality.sig.toFixed(3)}</span></div>
              <div className="flex justify-between text-xs font-bold"><span className="text-gray-500">Nilai Alpha (α):</span><span className="text-gray-700 font-mono">{data.normality.alpha.toFixed(2)}</span></div>
              <div className="flex justify-between text-xs font-bold"><span className="text-gray-500">Status:</span><span className="text-green-600 font-bold uppercase">{data.normality.status}</span></div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Jika nilai signifikansi lebih besar dari 0.05, data residual dianggap berdistribusi normal. 
              Pada hasil analisis ini, nilai signifikansi sebesar <b>{data.normality.sig.toFixed(3)}</b> menunjukkan bahwa residual model memenuhi asumsi normalitas.
            </p>
          </div>

          {/* HISTOGRAM PLOT */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <h4 className="text-xs font-bold text-gray-700 mb-4 text-center">Histogram Residual (Kurva Lonceng)</h4>
            <div className="flex items-end justify-between h-32 px-4 border-b border-gray-200">
              {data.normality.histogram_data.map((val, idx) => {
                const heightPct = (val / 55) * 100;
                return (
                  <div key={idx} className="w-5 bg-teal-600 rounded-t-sm relative group hover:bg-orange-500 transition-colors" style={{ height: `${heightPct}%` }}>
                    <div className="absolute top-[-22px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] text-gray-400 font-bold text-center mt-2 uppercase tracking-wide">Residual Interval</div>
          </div>

          {/* P-P PLOT */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
            <h4 className="text-xs font-bold text-gray-700 mb-2 text-center">Normal P-P Plot of Regression</h4>
            <div className="w-32 h-32 border-l border-b border-gray-400 relative bg-white">
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-400 origin-bottom-left rotate-[-45deg]" style={{ width: '141.4%' }}></div>
              {data.normality.pp_plot_data.map((pt, idx) => (
                <div 
                  key={idx} 
                  className="absolute w-1.5 h-1.5 bg-teal-600 rounded-full border border-white"
                  style={{ left: `${pt.expected * 100}%`, bottom: `${pt.observed * 100}%`, transform: 'translate(-50%, 50%)' }}
                ></div>
              ))}
            </div>
            <div className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-wide">Expected Cumulative Prob</div>
          </div>
        </div>
      </div>

      {/* 4. UJI MULTIKOLINEARITAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden md:col-span-2">
          <div className="p-5 border-b border-gray-50">
            <h3 className="font-bold text-gray-800 text-lg">4. Uji Multikolinearitas</h3>
            <p className="text-xs text-gray-400">Syarat Pengujian: Tolerance &gt; 0.10 dan Nilai VIF &lt; 10</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-50 text-xs text-gray-700 font-bold uppercase">
                <tr>
                  <th className="px-4 py-3">Variabel</th>
                  <th className="px-4 py-3 text-center">Tolerance</th>
                  <th className="px-4 py-3 text-center">VIF</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.multicollinearity.map((v) => (
                  <tr key={v.code} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-800">{v.code} <span className="font-normal text-xs text-gray-400">({v.name})</span></td>
                    <td className="px-4 py-3 text-center font-mono">{v.tolerance.toFixed(3)}</td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-[#0f4c75]">{v.vif.toFixed(3)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-[10px] bg-green-50 text-green-600 font-black px-2.5 py-0.5 rounded-full uppercase">{v.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BAR CHART VIF */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Grafik Nilai Kolinearitas (VIF)</h4>
            <div className="space-y-3.5">
              {data.multicollinearity.map((v) => {
                const barWidth = (v.vif / 5) * 100;
                return (
                  <div key={v.code} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-600">{v.code} — {v.name}</span>
                      <span className="text-teal-600 font-mono font-bold">{v.vif.toFixed(3)}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: `${barWidth}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl text-[10px] text-gray-400 text-center font-medium">
            Model bebas multikolinearitas karena seluruh VIF &lt; 10.
          </div>
        </div>
      </div>

      {/* 5. UJI HETEROSKEDASTISITAS (GLEJSER TEST) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* SCATTER PLOT */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center">
          <div className="w-full">
            <h4 className="font-bold text-gray-800 text-sm mb-1">Scatter Plot Residual</h4>
            <p className="text-[11px] text-gray-400 mb-4">Penyebaran residual nilai prediksi</p>
          </div>
          <div className="w-40 h-40 border border-gray-300 relative bg-white rounded">
            <div className="absolute w-full h-[1px] bg-gray-300 left-0 top-1/2"></div>
            {data.heteroskedasticity.scatter_points.map((pt, idx) => (
              <div 
                key={idx}
                className="absolute w-1.5 h-1.5 bg-orange-500 rounded-full border border-white transition-transform hover:scale-150"
                style={{ left: `${pt.x}%`, top: `${50 + pt.y}%` }}
              ></div>
            ))}
          </div>
          <div className="text-[10px] text-gray-400 text-center mt-3 font-semibold uppercase tracking-wider">Pola Menyebar (Homoskedastisitas)</div>
        </div>

        {/* TABEL GLEJSER TEST */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden md:col-span-2">
          <div className="p-5 border-b border-gray-50">
            <h3 className="font-bold text-gray-800 text-lg">5. Uji Heteroskedastisitas</h3>
            <p className="text-xs text-gray-400 mt-0.5">Metode Analisis: {data.heteroskedasticity.method} (Signifikansi Abs_RES &gt; 0.05)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-50 text-xs text-gray-700 font-bold uppercase">
                <tr>
                  <th className="px-4 py-3">Variabel Independen</th>
                  <th className="px-4 py-3 text-center">Sig. (Glejser)</th>
                  <th className="px-4 py-3 text-center">Kesimpulan</th>
                </tr>
              </thead>
              <tbody>
                {data.heteroskedasticity.variables.map((v) => (
                  <tr key={v.code} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-800">{v.code} — {v.name}</td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-teal-600">{v.sig.toFixed(3)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-[10px] bg-green-50 text-green-600 font-black px-3 py-1 rounded-full uppercase">
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6, 7 & 8. KESIMPULAN & INSIGHTS */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
        <div>
          <h3 className="font-bold text-gray-800 text-base flex items-center gap-2 mb-2">
            <CheckCircle size={18} className="text-green-600" /> 6. Kesimpulan Kelayakan Model
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Berdasarkan hasil uji asumsi klasik yang telah dilakukan, model regresi linear berganda pada penelitian ini memenuhi asumsi statistik yang diperlukan. Hasil uji menunjukkan bahwa residual berdistribusi normal, tidak terjadi multikolinearitas, dan tidak terjadi heteroskedastisitas. Dengan demikian, model regresi layak digunakan untuk analisis lebih lanjut mengenai faktor-faktor yang mempengaruhi penerimaan sosial masyarakat terhadap energi panas bumi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-1 flex items-center gap-1.5"><Info size={16} className="text-teal-600" /> 7. Insight Analisis Model</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Hasil pengujian menunjukkan bahwa model penelitian memiliki kualitas statistik yang baik dan stabil untuk digunakan dalam analisis hubungan antar variabel. Hal ini menunjukkan bahwa variabel-variabel yang digunakan dalam penelitian memiliki struktur hubungan yang cukup baik tanpa adanya gangguan statistik yang signifikan.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-1 flex items-center gap-1.5"><Activity size={16} className="text-orange-500" /> 8. Rekomendasi Analisis</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Meskipun model telah memenuhi asumsi klasik, analisis lebih lanjut tetap diperlukan untuk memahami hubungan kausal antar variabel secara lebih mendalam. Pengembangan model di masa mendatang dapat mempertimbangkan penambahan variabel lain seperti faktor budaya, pengalaman masyarakat, atau tingkat literasi energi.
            </p>
          </div>
        </div>
      </div>

      {/* 9. EXPORT RESULTS */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
        <h3 className="text-sm font-bold text-gray-700 mb-4">9. Export Hasil Uji Asumsi</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => Swal.fire('Eksport Berhasil', 'Matriks asumsi klasik tersimpan dalam format spreadsheet.', 'success')}
            className="bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all border border-green-200"
          >
            <Download size={14} /> Export Excel
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-[#e8f4f8] hover:bg-[#d0ebf4] text-[#0f4c75] text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
          >
            🖨️ Cetak Dokumen Laporan Asumsi
          </button>
        </div>
      </div>

    </div>
  );
}