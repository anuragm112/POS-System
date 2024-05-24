const express = require('express')
const router = express.Router()
const {sendEmail} = require('./sendEmailController')
const { verifyToken } = require('../../backend/middleware/authMiddleware')
router.post('/sendEmail', sendEmail);
module.exports = router