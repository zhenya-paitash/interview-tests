const asyncHandler = require('express-async-handler')

// @desc      Feedback
// @route     POST /api/feedback
// @access    Public ✔️
const feedback = asyncHandler(async (req, res) => {
  const message = req.body.message || 'You didn\'t send a message 😒'

  res.status(201).json({
    status: 'success',
    message
  })
})

module.exports = {
  feedback,
}
