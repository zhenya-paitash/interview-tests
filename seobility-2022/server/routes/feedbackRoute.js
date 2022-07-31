const router = require('express').Router()
const { feedback } = require('../controllers/feedbackController')

// POST
router.route('/').post(feedback)

module.exports = router
