const Respondent = require('../models/Respondent');

exports.submitSurvey = async (req, res) => {
    try {
        // 1. Tangkap data dari React (Pastikan namanya sesuai: profile dan rawAnswers)
        const { profile, rawAnswers } = req.body;

        // 2. Fungsi untuk menghitung rata-rata skor per variabel
        const calculateMean = (prefix, count) => {
            let sum = 0;
            let actualCount = 0;

            for (let i = 1; i <= count; i++) {
                // Karena di React Anda pakai Y1, Y2 (tanpa titik), dan X1.1, X1.2 (dengan titik)
                const key = prefix.includes('Y') ? `${prefix}${i}` : `${prefix}.${i}`;

                if (rawAnswers && rawAnswers[key]) {
                    sum += parseInt(rawAnswers[key]);
                    actualCount++;
                }
            }
            return actualCount === 0 ? 0 : sum / actualCount;
        };

        // 3. Hitung rata-rata
        const x1_score = calculateMean('X1', 5);
        const x2_score = calculateMean('X2', 5);
        const x3_score = calculateMean('X3', 5);
        const x4_score = calculateMean('X4', 5);
        const y_score = calculateMean('Y', 4);

        // 4. Simpan ke Database
        const newRespondent = await Respondent.create({
            gender: profile?.gender || 'Tidak Disebutkan',
            usia: profile?.usia || 'Tidak Disebutkan',
            edu: profile?.edu || 'Tidak Disebutkan',
            income: profile?.income || 'Tidak Disebutkan',
            x1_score,
            x2_score,
            x3_score,
            x4_score,
            y_score,
            raw_answers: JSON.stringify(rawAnswers || {})
        });

        res.status(201).json({
            message: "Survei berhasil masuk sistem!",
            id: newRespondent.id
        });

    } catch (error) {
        console.error("❌ ERROR SAAT SUBMIT SURVEI:", error);
        res.status(500).json({ error: error.message });
    }
};