const express = require('express');
const router = express.Router();

const controller = require('../controllers/ledController');

router.get('/', controller.getLed);
router.put('/status', controller.setStatus);

module.exports = router;