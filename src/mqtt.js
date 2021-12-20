const fastifyPlugin = require('fastify-plugin')
const mqtt = require('mqtt')

async function mqttConnector(f) {
  const client = mqtt.connect({
    host: 'mq.tenlink.com',
    port: 1883,
    username: 'admin@dlv',
    password: '123456',
  })
  await new Promise(res => {
    client.on('connect', res)
  })
  f.decorate('mc', client)
}

module.exports = fastifyPlugin(mqttConnector)
