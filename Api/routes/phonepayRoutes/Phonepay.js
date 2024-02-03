const {newPayment, checkStatus} = require('../../controller/phonepayController/Phonepay');
const express = require('express');
const router = express();

router.post('/payment', newPayment);
router.post('/status/:id/:details', checkStatus);

module.exports = router;