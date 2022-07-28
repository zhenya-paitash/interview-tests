const errNotFound = (req, res, next) => {
  const err = new Error('Page not found ❌')
  res.status(404)
  next(err)
}

const errHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const statusCode =
    res.statusCode && res.statusCode >= 300 ? res.statusCode : 500

  res.status(statusCode).json({
    code: statusCode,
    status: 'error',
    message: err.message,
    stack: isProduction ? null : err.stack,
  })
}

module.exports = {
  errNotFound,
  errHandler,
}
