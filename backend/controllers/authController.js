const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// (Opsional) Fungsi ini hanya dijalankan sekali untuk membuat Admin pertama dengan password terenkripsi
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "Admin berhasil dibuat!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Cek apakah email ada
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "Email tidak ditemukan!" });

        // 2. Cek apakah password cocok
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password salah!" });

        // 3. Buat Token JWT
        // Rahasia token diambil dari .env (tambahkan JWT_SECRET=rahasianegara123 di file .env Anda)
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'secret_key_default',
            { expiresIn: '1d' } // Token berlaku 1 hari
        );

        res.status(200).json({
            message: "Login berhasil!",
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};