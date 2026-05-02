const express = require('express');
const router = express.Router();

// 1. Import statsController yang lama
const statsController = require('../controllers/statsController');

// 2. IMPORT validitasController YANG BARU DIBUAT (Tambahkan baris ini)
const validitasController = require('../controllers/validitasController');

// Rute-rute Anda
router.get('/dashboard', statsController.getDashboardStats);
router.get('/validitas', validitasController.getUjiValiditas);

module.exports = router;