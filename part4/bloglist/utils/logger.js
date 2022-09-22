const info = (...params) => {
  console.log(...params)
}


const error = (...params) => {
  console.error(...params)
}

const requestLogger = (request, response, next) => {
  console.log('Method', request.method)
  console.log('Path', request.path)
  console.log('Body', request.body)
  console.log('---')
  next()
}

module.exports = {
  info, error, requestLogger
}
