const Respondent = require('../models/Respondent');

exports.getDashboardStats = async (req, res) => {
    try {
        const respondents = await Respondent.findAll();
        const total = respondents.length;

        // Hitung rata-rata Penerimaan Sosial (Y)
        let totalY = 0;
        respondents.forEach(r => {
            totalY += r.y_score || 0;
        });
        const meanY = total > 0 ? (totalY / total).toFixed(2) : 0;

        res.status(200).json({
            totalRespondents: total,
            meanY: meanY,
            data: respondents // Kirim juga data mentahnya untuk tabel
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};