import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Send, CheckCircle2, User, HelpCircle } from 'lucide-react';
import Swal from 'sweetalert2';

// === DATA PERTANYAAN (Dari Referensi) ===
const QUESTIONS = {
  X1: [
    { id: 'X1.1', text: 'Proyek panas bumi berpotensi merusak lingkungan di sekitar tempat tinggal saya.' },
    { id: 'X1.2', text: 'Aktivitas geotermal dapat menyebabkan bencana alam, seperti gempa bumi atau longsor.' },
    { id: 'X1.3', text: 'Proyek geotermal dapat menimbulkan gangguan terhadap kesehatan masyarakat.' },
    { id: 'X1.4', text: 'Risiko dari pengembangan energi panas bumi tergolong tinggi.' },
    { id: 'X1.5', text: 'Dampak negatif proyek geotermal lebih besar dibandingkan manfaatnya.' }
  ],
  X2: [
    { id: 'X2.1', text: 'Pengembangan panas bumi dapat meningkatkan perekonomian masyarakat lokal.' },
    { id: 'X2.2', text: 'Proyek geotermal membuka peluang kerja bagi masyarakat sekitar.' },
    { id: 'X2.3', text: 'Kehadiran proyek geotermal dapat meningkatkan pendapatan masyarakat.' },
    { id: 'X2.4', text: 'Proyek geotermal berkontribusi terhadap peningkatan kualitas infrastruktur di daerah saya.' },
    { id: 'X2.5', text: 'Proyek geotermal memberikan manfaat ekonomi yang nyata.' }
  ],
  X3: [
    { id: 'X3.1', text: 'Pemerintah mengelola proyek geotermal secara baik dan bertanggung jawab.' },
    { id: 'X3.2', text: 'Perusahaan pengembang memperhatikan keselamatan masyarakat sekitar.' },
    { id: 'X3.3', text: 'Informasi yang diberikan mengenai proyek geotermal dapat dipercaya.' },
    { id: 'X3.4', text: 'Pihak terkait bertanggung jawab atas dampak yang ditimbulkan oleh proyek geotermal.' },
    { id: 'X3.5', text: 'Masyarakat dilibatkan atau diperhatikan dalam proses pengambilan keputusan terkait proyek geotermal.' }
  ],
  X4: [
    { id: 'X4.1', text: 'Saya memahami pengertian energi panas bumi (geotermal).' },
    { id: 'X4.2', text: 'Saya memahami proses pembangkitan listrik dari energi panas bumi.' },
    { id: 'X4.3', text: 'Saya mengetahui manfaat energi panas bumi bagi lingkungan.' },
    { id: 'X4.4', text: 'Saya memahami risiko yang mungkin ditimbulkan dari proyek geotermal.' },
    { id: 'X4.5', text: 'Saya telah memperoleh informasi yang cukup mengenai proyek geotermal di daerah saya.' }
  ],
  Y: [
    { id: 'Y1', text: 'Saya mendukung rencana pengembangan proyek panas bumi di Gunung Gede Pangrango.' },
    { id: 'Y2', text: 'Saya bersedia untuk berpartisipasi aktif dalam sosialisasi proyek geotermal.' },
    { id: 'Y3', text: 'Saya percaya bahwa proyek geotermal akan membawa perubahan positif bagi daerah saya.' },
    { id: 'Y4', text: 'Secara keseluruhan, saya menerima kehadiran proyek geotermal di wilayah saya.' }
  ]
};

export default function Survey() {
  const [step, setStep] = useState(1);
  const totalSteps = 7; // Demo, X1, X2, X3, X4, Y, Success
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk Demografi
  const [demo, setDemo] = useState({ gender: '', usia: '', edu: '', income: '' });

  // State untuk Jawaban Likert (Format: { 'X1.1': 4, 'X1.2': 5, ... })
  const [answers, setAnswers] = useState({});

  const handleDemoChange = (e) => setDemo({ ...demo, [e.target.name]: e.target.value });
  const handleLikertChange = (id, value) => setAnswers({ ...answers, [id]: value });

  // Navigasi Stepper
  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Hitung persentase progress
  const calculateProgress = () => {
    const totalQuestions = 4 + 24; // 4 demo + 24 likert
    let answered = Object.values(demo).filter(v => v !== '').length + Object.keys(answers).length;
    return Math.round((answered / totalQuestions) * 100);
  };

  // Format data sebelum dikirim ke Backend
  // Format data dan kirim ke Backend
  const handleSubmit = async () => {
    // 1. Validasi sederhana (Pastikan demografi terisi)
    if (!demo.gender || !demo.usia || !demo.edu || !demo.income) {
      Swal.fire({
        title: 'Data Belum Lengkap',
        text: 'Mohon lengkapi Karakteristik Responden di Langkah 1.',
        icon: 'warning',
        confirmButtonColor: '#e74c3c'
      });
      return; // Hentikan proses jika belum lengkap
    }

    // (Opsional) Validasi jumlah jawaban Likert bisa ditambah di sini

    setIsSubmitting(true);
    const payload = {
      profile: demo,
      rawAnswers: answers
    };

    try {
      // 2. Tembak API Backend yang sudah kita buat
      const response = await fetch('http://localhost:5000/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Gagal mengirim survei');

      // 3. Munculkan SweetAlert2 JIKA SUKSES
      Swal.fire({
        title: 'Berhasil!',
        text: 'Data survei berhasil dikirim. Terima kasih atas partisipasi Anda!',
        icon: 'success',
        confirmButtonColor: '#1b9aaa', // Warna geo-teal
      });

      nextStep(); // Lanjut ke halaman "Terima Kasih" (Step 7)

    } catch (error) {
      // 4. Munculkan SweetAlert2 JIKA GAGAL/ERROR
      Swal.fire({
        title: 'Terjadi Kesalahan!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#e74c3c',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Komponen pembantu untuk merender daftar pertanyaan Likert
  const renderLikertSection = (varCode, title, subtitle) => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-geo-orange/10 p-3 rounded-2xl text-geo-orange">
          <HelpCircle size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        {QUESTIONS[varCode].map((q) => (
          <div key={q.id} className="bg-gray-50 p-5 md:p-6 rounded-3xl border border-gray-100">
            <p className="text-gray-800 font-semibold mb-4 leading-relaxed">
              <span className="text-geo-teal font-black mr-2">{q.id}</span>
              {q.text}
            </p>
            <div className="flex justify-between gap-1 md:gap-3">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleLikertChange(q.id, val)}
                  className={`flex-1 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all ${answers[q.id] === val
                    ? 'bg-geo-teal text-white shadow-md scale-105'
                    : 'bg-white text-gray-400 hover:bg-teal-50 hover:text-geo-teal border border-gray-200'
                    }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-3 px-1 text-[10px] md:text-xs font-bold text-gray-400 uppercase">
              <span>Sangat Tidak Setuju</span>
              <span>Sangat Setuju</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-geo-gray min-h-screen pt-24 pb-20 px-4 md:px-6 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* HEADER & PROGRESS BAR */}
        {step < 7 && (
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-geo-teal">Survei Geotermal</h1>
                <p className="text-gray-500 font-medium text-sm md:text-base">WKP Gunung Gede Pangrango</p>
              </div>
              <div className="text-right">
                <span className="text-xs md:text-sm font-bold text-geo-orange bg-orange-50 px-3 py-1 rounded-full">
                  Langkah {step} dari 6
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-2 md:h-3 rounded-full overflow-hidden">
              <div
                className="bg-geo-orange h-full transition-all duration-500 ease-out"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <p className="text-right text-xs text-gray-400 mt-2 font-semibold">
              {calculateProgress()}% Terisi
            </p>
          </div>
        )}

        {/* FORM CARD */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-teal-900/5 border border-gray-100 p-6 md:p-10 relative">

          {/* STEP 1: DEMOGRAFI */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-teal-50 p-3 rounded-2xl text-geo-teal">
                  <User size={28} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-gray-800">Karakteristik Responden</h2>
                  <p className="text-gray-500 text-sm">Informasi ini dijaga kerahasiaannya.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">1. Jenis Kelamin</label>
                  <select name="gender" value={demo.gender} onChange={handleDemoChange} className="w-full bg-gray-50 border-2 border-transparent focus:border-geo-teal rounded-2xl p-4 outline-none transition-all appearance-none cursor-pointer">
                    <option value="">-- Pilih --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">2. Usia</label>
                  <select name="usia" value={demo.usia} onChange={handleDemoChange} className="w-full bg-gray-50 border-2 border-transparent focus:border-geo-teal rounded-2xl p-4 outline-none transition-all appearance-none cursor-pointer">
                    <option value="">-- Pilih --</option>
                    <option value="17-25">17–25 tahun</option>
                    <option value="26-35">26–35 tahun</option>
                    <option value="36-45">36–45 tahun</option>
                    <option value="46-55">46–55 tahun</option>
                    <option value="56-65">56–65 tahun</option>
                    <option value=">65">&gt;65 tahun</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">3. Pendidikan Terakhir</label>
                  <select name="edu" value={demo.edu} onChange={handleDemoChange} className="w-full bg-gray-50 border-2 border-transparent focus:border-geo-teal rounded-2xl p-4 outline-none transition-all appearance-none cursor-pointer">
                    <option value="">-- Pilih --</option>
                    <option value="Tidak Sekolah">Tidak Sekolah</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA</option>
                    <option value="Perguruan Tinggi">Perguruan Tinggi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">4. Tingkat Pendapatan</label>
                  <select name="income" value={demo.income} onChange={handleDemoChange} className="w-full bg-gray-50 border-2 border-transparent focus:border-geo-teal rounded-2xl p-4 outline-none transition-all appearance-none cursor-pointer">
                    <option value="">-- Pilih --</option>
                    <option value="<UMK">&lt; UMK</option>
                    <option value=">=UMK">≥ UMK</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2-6: VARIABEL PENELITIAN */}
          {step === 2 && renderLikertSection('X1', 'Persepsi Risiko (X1)', 'Bagaimana pandangan Anda terhadap potensi risiko?')}
          {step === 3 && renderLikertSection('X2', 'Manfaat Ekonomi (X2)', 'Bagaimana pandangan Anda terhadap potensi ekonomi?')}
          {step === 4 && renderLikertSection('X3', 'Kepercayaan (X3)', 'Seberapa besar kepercayaan Anda pada pihak pengelola?')}
          {step === 5 && renderLikertSection('X4', 'Pengetahuan (X4)', 'Sejauh mana pemahaman Anda terkait geotermal?')}
          {step === 6 && renderLikertSection('Y', 'Penerimaan Sosial (Y)', 'Bagaimana tingkat penerimaan Anda terhadap proyek ini?')}

          {/* STEP 7: SUCCESS */}
          {step === 7 && (
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-black text-gray-800 mb-4 tracking-tight">Data Berhasil Terkirim!</h2>
              <p className="text-gray-500 mb-10 max-w-sm mx-auto">
                Terima kasih telah meluangkan waktu. Jawaban Anda sangat berharga untuk penelitian pengembangan energi panas bumi.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-geo-teal text-white px-8 py-4 rounded-2xl font-bold hover:bg-teal-700 transition-all inline-flex items-center gap-2"
              >
                Kembali ke Beranda <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          {step < 7 && (
            <div className="flex gap-3 md:gap-4 mt-12 pt-8 border-t border-gray-100">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center justify-center gap-2 px-4 md:px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                >
                  <ChevronLeft size={20} /> <span className="hidden md:inline">Kembali</span>
                </button>
              )}

              <button
                onClick={step === 6 ? handleSubmit : nextStep}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 bg-geo-teal text-white px-4 md:px-8 py-4 rounded-2xl font-bold hover:bg-teal-700 shadow-xl shadow-teal-900/10 transition-all disabled:opacity-70"
              >
                {isSubmitting ? 'Mengirim Data...' : (step === 6 ? 'Kirim Survei' : 'Selanjutnya')}
                {step === 6 && !isSubmitting ? <Send size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}