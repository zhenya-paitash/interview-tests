const asyncHandler = require('express-async-handler')

// @desc      Feedback
// @route     POST /api/feedback
// @access    Public ✔️
const feedback = asyncHandler(async (req, res) => {
  const { username, email, phone, birthday, message } = req.body
  if (!username || !email || !phone || !birthday || !message) {
    res.status(400)
    throw new Error('There is no necessary data to continue.')
  }

  // ? SET DELAY
  setTimeout(() => {
    res.status(201).json({
      status: 'success',
      message,
    })
  }, 1000)
})

module.exports = {
  feedback,
}
