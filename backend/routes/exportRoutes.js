const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

router.get('/respondents', exportController.exportRespondents);

module.exports = router;