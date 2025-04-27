const express = require('express');
const router = express.Router();
const consumptionController = require('../controllers/consumptionController');

router.post('/', consumptionController.createConsumption);
router.get('/', consumptionController.getConsumptions);
router.get('/:id', consumptionController.getConsumptionById);

module.exports = router;