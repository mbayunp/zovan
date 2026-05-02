import React from 'react';
import { Database, Users, BarChart3, CheckSquare, Microscope, TrendingUp, Download, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';

// Daftar menu diekspor agar bisa dipakai juga di Dashboard untuk merender Judul Header
export const MENU_ITEMS = [
    { id: 'raw', icon: Users, label: 'Data Mentah' },
    { id: 'skor', icon: BarChart3, label: 'Skor Agregat' },
    { id: 'validitas', icon: CheckSquare, label: 'Uji Validitas' },
    { id: 'asumsi', icon: Microscope, label: 'Uji Asumsi' },
    { id: 'regresi', icon: TrendingUp, label: 'Analisis Regresi' },
    { id: 'export', icon: Download, label: 'Export Data' },
];

export default function Sidebar({ activeTab, setActiveTab }) {
    const handleLogout = () => {
        Swal.fire({
            title: 'Keluar?',
            text: "Anda akan keluar dari sesi Admin.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#95a5a6',
            confirmButtonText: 'Ya, Keluar!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.href = '/admin/login';
            }
        });
    };

    return (
        <aside className="bg-white w-64 border-r border-gray-200 flex-col justify-between hidden md:flex z-20 shrink-0">
            <div>
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-teal-50 p-2 rounded-xl text-[#0f4c75]">
                            <Database size={24} />
                        </div>
                        <h1 className="font-black text-xl text-[#0f4c75]">NgobrolGeo</h1>
                    </div>
                </div>

                {/* Nav Links */}
                <div className="p-4 space-y-1.5 mt-2">
                    <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Menu Analitik</p>
                    {MENU_ITEMS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-[#0f4c75] text-white shadow-md shadow-blue-900/10'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#0f4c75]'
                                }`}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* User / Logout Area */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white px-4 py-3 rounded-xl text-sm font-bold transition-all"
                >
                    <LogOut size={16} /> Keluar Sistem
                </button>
            </div>
        </aside>
    );
}