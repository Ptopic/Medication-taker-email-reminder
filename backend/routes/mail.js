const router = require('express').Router();

const { sendEmail } = require('../controllers/mail.js');

router.post('/send', sendEmail);

module.exports = router;
