const Respondent = require('../models/Respondent'); 

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

const getRTable = (n) => {
    const rTableValues = {
        30: 0.361, 31: 0.355, 32: 0.349, 33: 0.344, 34: 0.339, 35: 0.334,
        40: 0.312, 50: 0.279, 60: 0.254, 70: 0.235, 80: 0.220, 90: 0.207, 
        100: 0.195, 150: 0.159
    };
    const keys = Object.keys(rTableValues).map(Number).sort((a, b) => a - b);
    let closestN = keys[0];
    for (let key of keys) { if (n >= key) closestN = key; }
    return rTableValues[closestN] || 0.3;
};

exports.getUjiValiditas = async (req, res) => {
    try {
        // 1. AMBIL DATA ASLI DARI DATABASE
        const respondents = await Respondent.findAll({ raw: true });

        // 2. FILTER & PARSE JSON (Aman dari CSV error)
        const validData = [];
        respondents.forEach(r => {
            if (r.raw_answers && r.raw_answers !== '{}' && r.raw_answers.trim() !== '') {
                try {
                    const answers = typeof r.raw_answers === 'string' 
                        ? JSON.parse(r.raw_answers) 
                        : r.raw_answers;
                    validData.push(answers);
                } catch (err) {
                    // Abaikan baris yang JSON-nya rusak
                }
            }
        });

        const n = validData.length;
        if (n < 3) return res.status(400).json({ message: "Data terlalu sedikit atau raw_answers kosong/rusak." });

        const rTabel = getRTable(n);
        let hasilValiditas = [];

        // 3. DEFINISI INSTRUMEN SESUAI KUNCI DI JSON (Misal: "X1.1")
        // Lengkapi sesuai kuesioner asli Anda
        const instrumen = [
            { variabel: 'X1 (Risiko)', items: ['X1.1', 'X1.2', 'X1.3', 'X1.4', 'X1.5'] },
            { variabel: 'X2 (Ekonomi)', items: ['X2.1', 'X2.2', 'X2.3', 'X2.4'] },
            { variabel: 'X3 (Pemerintah)', items: ['X3.1', 'X3.2', 'X3.3'] },
            { variabel: 'X4 (Perusahaan)', items: ['X4.1', 'X4.2', 'X4.3'] },
            { variabel: 'Y (Penerimaan)', items: ['Y.1', 'Y.2'] }
        ];

        // 4. LOOPING PERHITUNGAN
        instrumen.forEach(varGroup => {
            // Hitung total skor per variabel untuk setiap responden
            const skorTotalVariabel = validData.map(row => {
                return varGroup.items.reduce((total, item) => total + (row[item] || 0), 0);
            });

            varGroup.items.forEach(item => {
                const skorPerItem = validData.map(row => row[item] || 0);
                
                // Pastikan tidak menghitung korelasi dari deret angka yang sama persis semua (Standar Deviasi = 0)
                const isUniform = skorPerItem.every(val => val === skorPerItem[0]);
                const rHitung = isUniform ? 0 : hitungPearson(skorPerItem, skorTotalVariabel);

                hasilValiditas.push({
                    item: item, 
                    variabel: varGroup.variabel,
                    rHitung: isNaN(rHitung) ? 0 : rHitung,
                    rTabel: rTabel,
                    isValid: rHitung > rTabel
                });
            });
        });

        // 5. KIRIM HASIL KE FRONTEND
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