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


exports.exportRegression = async (req, res) => {
    try {
        // Simulasi data regresi untuk export
        const data = [
            { variabel: 'X1 Risiko', coef: 0.321, sig: 0.043 },
            { variabel: 'X2 Ekonomi', coef: 0.452, sig: 0.000 }
        ];

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Hasil Regresi');
        worksheet.columns = [
            { header: 'Variabel', key: 'variabel', width: 20 },
            { header: 'Koefisien', key: 'coef', width: 15 },
            { header: 'Signifikansi', key: 'sig', width: 15 }
        ];
        worksheet.addRows(data);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Laporan_Regresi.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.exportFullReport = async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Sistem Analitik NgobrolGeo';

        // --- SHEET 1: RINGKASAN EKSEKUTIF ---
        const sheet1 = workbook.addWorksheet('Ringkasan Riset');

        // Desain Header Sheet 1
        sheet1.columns = [{ width: 25 }, { width: 30 }];
        sheet1.addRow(['LAPORAN LENGKAP ANALISIS REGRESI NGOBROLGEO']);
        sheet1.addRow(['Tanggal Export', new Date().toLocaleDateString('id-ID')]);
        sheet1.addRow(['WKP Target', 'Gunung Gede Pangrango']);
        sheet1.addRow([]); // Baris kosong

        sheet1.addRow(['PARAMETER', 'NILAI KESIMPULAN']);
        sheet1.addRow(['Total Responden', '100 Data Valid']);
        sheet1.addRow(['R-Square (Determinasi)', '61.5%']);
        sheet1.addRow(['Status Uji Asumsi', 'Lolos (Normal & Homoskedastisitas)']);
        sheet1.addRow(['Faktor Paling Dominan', 'X2 - Manfaat Ekonomi']);

        // Format tebal (bold) untuk baris header
        sheet1.getRow(1).font = { bold: true, size: 14 };
        sheet1.getRow(5).font = { bold: true };

        // --- SHEET 2: TABEL REGRESI ---
        const sheet2 = workbook.addWorksheet('Detail Koefisien Regresi');
        sheet2.columns = [
            { header: 'Kode Variabel', key: 'code', width: 20 },
            { header: 'Nama Variabel', key: 'name', width: 25 },
            { header: 'Koefisien (B)', key: 'coef', width: 15 },
            { header: 'Signifikansi', key: 'sig', width: 15 },
            { header: 'Kesimpulan', key: 'status', width: 20 }
        ];

        sheet2.addRows([
            { code: 'X1', name: 'Persepsi Risiko', coef: 0.321, sig: 0.043, status: 'Signifikan' },
            { code: 'X2', name: 'Manfaat Ekonomi', coef: 0.452, sig: 0.000, status: 'Signifikan' },
            { code: 'X3', name: 'Kepercayaan Pemerintah', coef: 0.214, sig: 0.022, status: 'Signifikan' },
            { code: 'X4', name: 'Tanggung Jawab Perusahaan', coef: 0.182, sig: 0.063, status: 'Tidak Signifikan' },
            { code: 'X5', name: 'Pengetahuan Geothermal', coef: 0.163, sig: 0.052, status: 'Mendekati' },
            { code: 'X6', name: 'Partisipasi Masyarakat', coef: 0.201, sig: 0.031, status: 'Signifikan' }
        ]);

        // Format tebal untuk header tabel sheet 2
        sheet2.getRow(1).font = { bold: true };

        // Kunci proses download file
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Laporan_Lengkap_NgobrolGeo.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};