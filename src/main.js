const PORT = process.env.PORT || 65507

const path = require('path')
const LOG = path.join(__dirname, '../error.log')

const f = require('fastify')({
  logger: {
    level: 'error',
    file: LOG,
  },
})

f.setErrorHandler(async (err, req, res) => {
  // console.log(req.method, req.url, err)
  if (err.validation) {
    res.code(400)
    return { err: 4001, msg: err.message }
  }
  f.log.error(err)
  res.code(500)
  return { err: 5001, msg: '服务器内部错误' }
})

!(async () => {
  try {
    await f.register(require('./mqtt'))
    await f.register(require('./helper'))
    await f.register(require('./routes'), { prefix: '/api/v1' })
    await f.listen(PORT, '0.0.0.0')
  } catch (err) {
    f.log.fatal(err)
    process.exit(1)
  }
})()
