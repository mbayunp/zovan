const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

router.get('/regression', analysisController.getRegressionAnalysis);
router.get('/assumptions', analysisController.getAssumptionsAnalysis);

module.exports = router;