const express = require('express')
const cors = require('cors')
const { errNotFound, errHandler } = require('./middleware/errorMiddleware')

// CONFIG
const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/api/feedback', require('./routes/feedbackRoute'))

// ERRORS
app.use(errNotFound)
app.use(errHandler)

// SERVER
app.listen(PORT, () => console.log(`Server run on port: ${PORT}`))
