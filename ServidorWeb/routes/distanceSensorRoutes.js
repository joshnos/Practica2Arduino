const express = require('express');
const router = express.Router();

const controller = require('../controllers/distanceSensorController');

router.get('/', controller.getSensor);
router.put('/status', controller.setStatus);
router.put('/limit', controller.setLimit);
router.put('/distance', controller.setdistance);

module.exports = router;