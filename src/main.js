const fastify = require('fastify')({
  logger: false,
})

fastify.setErrorHandler(async err => {
  console.log(err)
  return {
    err: 1,
    msg: '请求失败'
  }
})

const start = async () => {
  try {
    await fastify.register(require('./mqtt'))
    await fastify.register(require('./routes'), { prefix: '/api/v1' })

    await fastify.listen(65507, '0.0.0.0')
  } catch (err) {
    // fastify.log.error(err)
    console.log(err)
    process.exit(1)
  }
}
start()
