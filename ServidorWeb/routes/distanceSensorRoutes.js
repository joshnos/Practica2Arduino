const express = require('express');
const router = express.Router();

const controller = require('../controllers/distanceSensorController');

router.get('/', controller.getSensor);
router.put('/status', controller.setStatus);
router.put('/distance', controller.setMinDistance);

module.exports = router;