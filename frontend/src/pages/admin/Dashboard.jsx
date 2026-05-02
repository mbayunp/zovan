import React, { useState, useEffect } from 'react';
import { Loader2, Menu } from 'lucide-react';
import Swal from 'sweetalert2';
import Sidebar, { MENU_ITEMS } from '../../components/Sidebar';
import SkorAgregat from './SkorAgregat';
import UjiValiditas from './UjiValiditas'; // <-- Modul baru

export default function Dashboard() {
    const [stats, setStats] = useState({ totalRespondents: 0, meanY: 0, data: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('raw');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/stats/dashboard');
            if (!response.ok) throw new Error('Gagal mengambil data dari server');
            const result = await response.json();

            // Konversi string ke angka agar aman untuk .toFixed()
            const cleanData = {
                totalRespondents: result.totalRespondents || 0,
                meanY: Number(result.meanY || 0),
                data: (result.data || []).map(row => ({
                    ...row,
                    x1_score: Number(row.x1_score || 0),
                    x2_score: Number(row.x2_score || 0),
                    x3_score: Number(row.x3_score || 0),
                    x4_score: Number(row.x4_score || 0),
                    y_score: Number(row.y_score || 0),
                }))
            };

            setStats(cleanData);
        } catch (error) {
            Swal.fire('Error!', error.message, 'error');
            // Mock data fallback
            setStats({
                totalRespondents: 1,
                meanY: 5.00,
                data: [{ id: 1, gender: 'Laki-laki', usia: '17-25', edu: 'SD', x1_score: 5, x2_score: 5, x3_score: 5, x4_score: 5, y_score: 5 }]
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-[#0f4c75] mb-4" size={48} />
                <p className="text-gray-500 font-semibold">Memuat Data Analitik...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#f0f2f5] font-sans overflow-hidden">

            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">

                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold text-[#0f4c75]">
                                {MENU_ITEMS.find(t => t.id === activeTab)?.label}
                            </h2>
                            <p className="text-xs text-gray-500 font-medium">Panel Admin WKP Gunung Gede Pangrango</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-800">Admin Peneliti</p>
                            <p className="text-xs text-green-600">Online</p>
                        </div>
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            A
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-6">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <h3 className="text-3xl font-black text-[#0f4c75]">{stats.totalRespondents}</h3>
                            <p className="text-xs md:text-sm text-gray-500 mt-1 font-bold">Total Responden</p>
                            <p className="text-[10px] md:text-xs text-green-600 mt-1 bg-green-50 rounded-full inline-block px-2">Target: 150</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <h3 className="text-3xl font-black text-[#0f4c75]">{stats.meanY?.toFixed(2)}</h3>
                            <p className="text-xs md:text-sm text-gray-500 mt-1 font-bold">Rata-rata Penerimaan</p>
                            <p className="text-[10px] md:text-xs text-gray-400 mt-1">Skala 1 - 5</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <h3 className="text-3xl font-black text-[#0f4c75]">100%</h3>
                            <p className="text-xs md:text-sm text-gray-500 mt-1 font-bold">Kelengkapan Data</p>
                            <p className="text-[10px] md:text-xs text-green-600 mt-1 bg-green-50 rounded-full inline-block px-2">Valid</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <h3 className="text-3xl font-black text-[#0f4c75]">4</h3>
                            <p className="text-xs md:text-sm text-gray-500 mt-1 font-bold">Variabel Independen</p>
                            <p className="text-[10px] md:text-xs text-gray-400 mt-1">X1, X2, X3, X4</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">

                        {/* KONTEN 1: DATA MENTAH */}
                        {activeTab === 'raw' && (
                            <div className="p-6">
                                <div className="mb-6 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-bold text-[#0f4c75]">Tabel Data Demografi & Skor Rata-Rata</h2>
                                        <p className="text-sm text-gray-500">Menampilkan seluruh respons yang masuk ke database.</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto rounded-xl border border-gray-100">
                                    <table className="w-full text-left text-sm text-gray-600">
                                        <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                                            <tr>
                                                <th className="px-4 py-4 whitespace-nowrap">ID</th>
                                                <th className="px-4 py-4 whitespace-nowrap">Gender</th>
                                                <th className="px-4 py-4 whitespace-nowrap">Usia</th>
                                                <th className="px-4 py-4 whitespace-nowrap">Pendidikan</th>
                                                <th className="px-4 py-4 text-center whitespace-nowrap">X1 (Risiko)</th>
                                                <th className="px-4 py-4 text-center whitespace-nowrap">X2 (Ekonomi)</th>
                                                <th className="px-4 py-4 text-center whitespace-nowrap">X3 (Kepercayaan)</th>
                                                <th className="px-4 py-4 text-center whitespace-nowrap">X4 (Pengetahuan)</th>
                                                <th className="px-4 py-4 text-center text-[#0f4c75] whitespace-nowrap">Y (Penerimaan)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.data.length === 0 ? (
                                                <tr>
                                                    <td colSpan="9" className="text-center py-16 text-gray-400">Belum ada data responden.</td>
                                                </tr>
                                            ) : (
                                                stats.data.map((row, index) => (
                                                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                        <td className="px-4 py-3 font-bold text-[#0f4c75]">R{String(index + 1).padStart(3, '0')}</td>
                                                        <td className="px-4 py-3">{row.gender}</td>
                                                        <td className="px-4 py-3">{row.usia}</td>
                                                        <td className="px-4 py-3">{row.edu}</td>
                                                        <td className="px-4 py-3 text-center">{row.x1_score?.toFixed(2)}</td>
                                                        <td className="px-4 py-3 text-center">{row.x2_score?.toFixed(2)}</td>
                                                        <td className="px-4 py-3 text-center">{row.x3_score?.toFixed(2)}</td>
                                                        <td className="px-4 py-3 text-center">{row.x4_score?.toFixed(2)}</td>
                                                        <td className="px-4 py-3 text-center font-bold text-[#0f4c75] bg-blue-50/50">{row.y_score?.toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* KONTEN 2: SKOR AGREGAT */}
                        {activeTab === 'skor' && (
                            <SkorAgregat rawData={stats.data} />
                        )}

                        {/* KONTEN 3: UJI VALIDITAS */}
                        {activeTab === 'validitas' && (
                            <UjiValiditas />
                        )}

                        {/* KONTEN 4-6: TAB LAINNYA (Placeholder yang sudah diperbaiki agar tidak crash) */}
                        {['asumsi', 'regresi', 'export'].includes(activeTab) && (() => {
                            const activeItem = MENU_ITEMS.find(t => t.id === activeTab);
                            const ActiveIcon = activeItem?.icon;

                            return (
                                <div className="flex flex-col items-center justify-center py-24 text-center">
                                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#0f4c75] shadow-inner">
                                        {/* Render Icon sebagai komponen React, bukan fungsi */}
                                        {ActiveIcon && <ActiveIcon size={48} />}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Modul {activeItem?.label}</h2>
                                    <p className="text-gray-500 max-w-md">
                                        Area ini sudah siap untuk dihubungkan dengan perhitungan lanjutan dari Backend Express Anda.
                                    </p>
                                </div>
                            );
                        })()}

                    </div>
                </div>
            </main>
        </div>
    );
}