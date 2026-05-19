const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

// Pastikan fungsi-fungsi ini namanya SAMA PERSIS dengan yang di controller
router.get('/respondents', exportController.exportRespondents);
router.get('/regression', exportController.exportRegression);
router.get('/full-report', exportController.exportFullReport);

module.exports = router;