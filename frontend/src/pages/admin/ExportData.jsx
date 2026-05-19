import React from 'react';
import { Download, FileSpreadsheet, FileText, History, Settings, Database } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ExportData() {
    const exportItems = [
        { title: 'Data Responden', desc: 'Identitas & demografi anonim', icon: Database, endpoint: 'respondents' },
        { title: 'Hasil Regresi', desc: 'File laporan lengkap regresi', icon: FileText, endpoint: 'regression' },
        { title: 'Laporan Lengkap', desc: 'PDF rangkuman riset final', icon: FileSpreadsheet, endpoint: 'full-report' }
    ];

    const handleDownload = async (endpoint, title) => {
        try {
            const response = await fetch(`http://localhost:5000/api/export/${endpoint}`);
            if (!response.ok) throw new Error('Gagal mengunduh file');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title}.xlsx`;
            a.click();
            Swal.fire('Berhasil!', `File ${title} berhasil diunduh.`, 'success');
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-gray-800">Pusat Export Data</h1>
                <button className="flex items-center gap-2 bg-[#0f4c75] text-white px-4 py-2 rounded-xl text-sm font-bold">
                    <Settings size={16} /> Pengaturan Export
                </button>
            </div>

            {/* Grid Export */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exportItems.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="bg-teal-50 w-12 h-12 rounded-2xl flex items-center justify-center text-geo-teal mb-4">
                            <item.icon size={24} />
                        </div>
                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                        <p className="text-xs text-gray-400 mb-6">{item.desc}</p>
                        <button
                            onClick={() => handleDownload(item.endpoint, item.title)}
                            className="w-full py-3 bg-gray-50 hover:bg-geo-teal hover:text-white rounded-xl text-sm font-bold transition-colors"
                        >
                            Unduh Excel
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}