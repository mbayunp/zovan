const ExcelJS = require('exceljs');
const { Parser } = require('json2csv');
const Respondent = require('../models/Respondent');

exports.exportRespondents = async (req, res) => {
    try {
        const data = await Respondent.findAll({ raw: true });

        // Konfigurasi Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Responden');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Gender', key: 'gender', width: 15 },
            { header: 'Usia', key: 'usia', width: 15 },
            { header: 'Pendidikan', key: 'edu', width: 15 },
            { header: 'Skor Y', key: 'y_score', width: 15 }
        ];

        worksheet.addRows(data);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Data_Responden.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};