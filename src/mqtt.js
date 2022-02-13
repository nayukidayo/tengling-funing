const fp = require('fastify-plugin')
const mqtt = require('mqtt')

module.exports = fp(async f => {
  const mqTL = mqtt.connect({
    host: 'mq.tenlink.com',
    port: 1883,
    username: 'admin@dlv',
    password: '123456',
  })
  await new Promise(res => {
    mqTL.on('connect', res)
  })
  f.decorate('mqTL', mqTL)

  const mqFN = mqtt.connect({
    host: '60.160.229.92',
    port: 58002,
    username: 'iot',
    password: '123456',
  })
  await new Promise(res => {
    mqFN.on('connect', res)
  })
  f.decorate('mqFN', mqFN)
})
