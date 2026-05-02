// --- File: controllers/validitasController.js ---

// Import Model Database Anda (Sesuaikan path dan namanya)
// const { Respondent } = require('../models'); 

const hitungPearson = (skorItem, skorTotal) => {
    const n = skorItem.length;
    if (n === 0) return 0;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (let i = 0; i < n; i++) {
        sumX += skorItem[i];
        sumY += skorTotal[i];
        sumXY += skorItem[i] * skorTotal[i];
        sumX2 += skorItem[i] * skorItem[i];
        sumY2 += skorTotal[i] * skorTotal[i];
    }
    const pembilang = (n * sumXY) - (sumX * sumY);
    const penyebut = Math.sqrt(((n * sumX2) - (sumX * sumX)) * ((n * sumY2) - (sumY * sumY)));
    return penyebut === 0 ? 0 : pembilang / penyebut;
};

// Tabel nilai r (Signifikansi 5%) yang disederhanakan
const getRTable = (n) => {
    // Anda bisa melengkapi daftar r-tabel ini sesuai kebutuhan
    const rTableValues = {
        30: 0.361, 31: 0.355, 32: 0.349, 33: 0.344, 34: 0.339, 35: 0.334,
        40: 0.312, 50: 0.279, 100: 0.195, 150: 0.159
    };
    // Mengambil nilai r-tabel terdekat jika N tidak persis ada di objek
    const keys = Object.keys(rTableValues).map(Number).sort((a, b) => a - b);
    let closestN = keys[0];
    for (let key of keys) { if (n >= key) closestN = key; }
    return rTableValues[closestN] || 0.3; // Default fallback
};

exports.getUjiValiditas = async (req, res) => {
    try {
        // 1. AMBIL DATA ASLI DARI DATABASE
        // const rawData = await Respondent.findAll({ raw: true });

        // --- MOCK UP DATABASE FETCH SEMENTARA UNTUK TESTING MENGHINDARI ERROR ---
        // Hapus mock data ini jika Anda sudah membuka comment kode Sequelize di atas
        const rawData = [
            { id: 1, x1_1: 4, x1_2: 5, x1_3: 4, x2_1: 5, x2_2: 5 }, // Data responden 1
            { id: 2, x1_1: 5, x1_2: 4, x1_3: 5, x2_1: 4, x2_2: 3 }  // Data responden 2
        ];

        const n = rawData.length;

        // Jika data kosong, cegah perhitungan
        if (n === 0) return res.json({ totalRespondents: 0, rTabel: 0, data: [] });

        const rTabel = getRTable(n);
        let hasilValiditas = [];

        // 2. DEFINISIKAN STRUKTUR INSTRUMEN (Sesuaikan dengan nama kolom DB Anda)
        // Misal X1 punya 3 pertanyaan, X2 punya 2, dsb. (Total 24 pertanyaan)
        const instrumen = [
            { variabel: 'X1 (Risiko)', items: ['x1_1', 'x1_2', 'x1_3'] },
            { variabel: 'X2 (Ekonomi)', items: ['x2_1', 'x2_2'] },
            // Tambahkan X3, X4, dan Y di sini...
        ];

        // 3. LAKUKAN LOOPING PERHITUNGAN OTOMATIS
        instrumen.forEach(varGroup => {
            // Hitung skor total variabel tersebut untuk setiap responden
            const skorTotalVariabel = rawData.map(row => {
                return varGroup.items.reduce((total, item) => total + (row[item] || 0), 0);
            });

            // Hitung Pearson untuk masing-masing item/pertanyaan
            varGroup.items.forEach(item => {
                const skorPerItem = rawData.map(row => row[item] || 0);
                const rHitung = hitungPearson(skorPerItem, skorTotalVariabel);

                hasilValiditas.push({
                    item: item.toUpperCase().replace('_', '.'), // x1_1 jadi X1.1
                    variabel: varGroup.variabel,
                    rHitung: isNaN(rHitung) ? 0 : rHitung,
                    rTabel: rTabel,
                    isValid: rHitung > rTabel
                });
            });
        });

        // 4. KIRIM HASIL KE FRONTEND
        res.json({
            totalRespondents: n,
            rTabel: rTabel,
            data: hasilValiditas
        });

    } catch (error) {
        console.error("Error di validitasController:", error);
        res.status(500).json({ message: "Terjadi kesalahan di server saat menghitung validitas" });
    }
};