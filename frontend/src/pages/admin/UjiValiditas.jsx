import React, { useState, useEffect } from 'react';
import { CheckSquare, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

export default function UjiValiditas() {
    const [validityData, setValidityData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [info, setInfo] = useState({ n: 0, rTabel: 0 });

    useEffect(() => {
        fetchValiditasData();
    }, []);

    const fetchValiditasData = async () => {
        try {
            // PERUBAHAN: Membuka kunci fetch ke Backend Express
            const response = await fetch('http://localhost:5000/api/stats/validitas');
            if (!response.ok) throw new Error('Gagal mengambil data dari server');

            const result = await response.json();

            setInfo({ n: result.totalRespondents, rTabel: result.rTabel });
            setValidityData(result.data || []);
        } catch (error) {
            Swal.fire('Error!', 'Gagal memuat atau menghitung data validitas dari database.', 'error');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="animate-spin text-[#0f4c75] mb-2" size={32} />
                <p className="text-gray-500 font-medium text-sm">Menarik data & menghitung Pearson Product Moment...</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center gap-3">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                    <CheckSquare size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-[#0f4c75]">Uji Validitas Instrumen</h2>
                    <p className="text-sm text-gray-500">Perhitungan Korelasi Pearson (r-hitung vs r-tabel) signifikansi 5%.</p>
                </div>
            </div>

            {/* Info Panel */}
            <div className="flex gap-4 mb-6">
                <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                    <span className="text-sm text-gray-500 font-medium">N (Responden):</span>
                    <span className="font-bold text-[#0f4c75]">{info.n}</span>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                    <span className="text-sm text-gray-500 font-medium">Syarat r-tabel:</span>
                    <span className="font-bold text-[#0f4c75]">{info.rTabel}</span>
                </div>
            </div>

            {/* Tabel Hasil Validitas */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {validityData.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium">
                        Belum ada data respons dari database untuk diuji.
                    </div>
                ) : (
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Item Soal</th>
                                <th className="px-6 py-4">Variabel</th>
                                <th className="px-6 py-4 text-center">r-hitung</th>
                                <th className="px-6 py-4 text-center">r-tabel</th>
                                <th className="px-6 py-4 text-center">Keterangan</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {validityData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-[#0f4c75]">{row.item}</td>
                                    <td className="px-6 py-4">{row.variabel}</td>
                                    <td className="px-6 py-4 text-center font-semibold">{row.rHitung.toFixed(3)}</td>
                                    <td className="px-6 py-4 text-center text-gray-500">{row.rTabel.toFixed(3)}</td>
                                    <td className="px-6 py-4 text-center text-xs font-bold">
                                        {row.isValid ? (
                                            <span className="text-emerald-600">r-hitung &gt; r-tabel</span>
                                        ) : (
                                            <span className="text-red-500">r-hitung &lt; r-tabel</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center">
                                        {row.isValid ? (
                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
                                                <CheckCircle2 size={14} /> Valid
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold">
                                                <XCircle size={14} /> Gugur
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}