const router = require('express').Router()
const { feedback } = require('../controllers/feedbackController')

// POST
router.route('/').post(feedback)
// ! DELETE this after test
router.route('/').get(feedback)

module.exports = router
