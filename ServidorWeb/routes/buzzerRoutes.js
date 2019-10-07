const express = require('express');
const router = express.Router();

const controller = require('../controllers/buzzerController');

router.get('/', controller.getBuzzer);
router.put('/status', controller.setStatus);
router.put('/frecuency', controller.setFrecuency);

module.exports = router;