require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // 1. Tes koneksi ke MySQL
        await sequelize.authenticate();
        console.log('✅ Koneksi ke MySQL berhasil terhubung.');

        // 2. Sinkronisasi Model ke Database
        // alter: true akan otomatis membuat/mengubah tabel jika ada perubahan di model Respondent.js
        await sequelize.sync({ alter: true });
        console.log('✅ Semua model telah tersinkronisasi dengan database.');

        // 3. Jalankan Server
        app.listen(PORT, () => {
            console.log(`🚀 Server NgobrolGeo berjalan di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Gagal terhubung ke database:', error);
        process.exit(1); // Matikan proses jika gagal konek DB
    }
};

startServer();