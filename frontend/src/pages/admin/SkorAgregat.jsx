import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { BarChart3 } from 'lucide-react';

export default function SkorAgregat({ rawData }) {
    // Menghitung rata-rata skor agregat dari seluruh responden
    const chartData = useMemo(() => {
        if (!rawData || rawData.length === 0) return [];

        const totalRespondents = rawData.length;

        // Akumulasi total skor per variabel
        const sums = rawData.reduce((acc, curr) => ({
            x1: acc.x1 + (curr.x1_score || 0),
            x2: acc.x2 + (curr.x2_score || 0),
            x3: acc.x3 + (curr.x3_score || 0),
            x4: acc.x4 + (curr.x4_score || 0),
            y: acc.y + (curr.y_score || 0),
        }), { x1: 0, x2: 0, x3: 0, x4: 0, y: 0 });

        // Mengembalikan array objek untuk Recharts
        return [
            { variabel: 'X1 (Risiko)', skor: Number((sums.x1 / totalRespondents).toFixed(2)), fill: '#3b82f6' },
            { variabel: 'X2 (Ekonomi)', skor: Number((sums.x2 / totalRespondents).toFixed(2)), fill: '#10b981' },
            { variabel: 'X3 (Kepercayaan)', skor: Number((sums.x3 / totalRespondents).toFixed(2)), fill: '#f59e0b' },
            { variabel: 'X4 (Pengetahuan)', skor: Number((sums.x4 / totalRespondents).toFixed(2)), fill: '#8b5cf6' },
            { variabel: 'Y (Penerimaan)', skor: Number((sums.y / totalRespondents).toFixed(2)), fill: '#0f4c75' },
        ];
    }, [rawData]);

    return (
        <div className="p-6">
            <div className="mb-8 flex items-center gap-3">
                <div className="bg-blue-50 p-3 rounded-xl text-[#0f4c75]">
                    <BarChart3 size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-[#0f4c75]">Skor Agregat & Distribusi Variabel</h2>
                    <p className="text-sm text-gray-500">Nilai rata-rata dari seluruh responden per variabel penelitian (Skala 1-5).</p>
                </div>
            </div>

            {chartData.length === 0 ? (
                <div className="flex justify-center items-center h-64 bg-gray-50 rounded-xl border border-gray-100 text-gray-400">
                    Belum ada data untuk divisualisasikan.
                </div>
            ) : (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="variabel" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} dy={10} />
                                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f3f4f6' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="skor" radius={[6, 6, 0, 0]} maxBarSize={60}>
                                    <LabelList dataKey="skor" position="top" fill="#4b5563" fontSize={14} fontWeight="bold" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
}