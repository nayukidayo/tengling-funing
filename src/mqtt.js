const fp = require('fastify-plugin')
const mqtt = require('mqtt')

module.exports = fp(async f => {
  const mqTL = mqtt.connect({
    host: 'mq.tenlink.com',
    port: 1883,
    username: 'admin@dlv',
    password: '123456',
  })
  const mqFN = mqtt.connect({
    host: '60.160.229.92',
    port: 58002,
    username: 'iot',
    password: '123456',
  })

  mqTL.on('connect', () => {
    mqTL.subscribe({
      '121940019260/p': { qos: 1 },
      '121940019270/p': { qos: 1 },
      '121940019280/p': { qos: 1 },
      '121940019290/p': { qos: 1 },
      '121940019300/p': { qos: 1 },
      '121940019310/p': { qos: 1 },
      '121940019320/p': { qos: 1 },
      '121940019330/p': { qos: 1 },
      '121940019340/p': { qos: 1 },
      '121940019350/p': { qos: 1 },
      '121940019360/p': { qos: 1 },
      '121940019370/p': { qos: 1 },
      '121940019380/p': { qos: 1 },
      '121940019390/p': { qos: 1 },
      '121940019400/p': { qos: 1 },
      '121940019410/p': { qos: 1 },
      '121940019420/p': { qos: 1 },
      '121940019430/p': { qos: 1 },
      '121940019440/p': { qos: 1 },
      '121940019450/p': { qos: 1 },
    })
  })

  mqTL.on('message', (topic, msg, packet) => {
    topic = `unis/devices/5gby/${topic.substring(0, 12)}/sys/messages/up`
    const json = JSON.parse(msg.toString())
    if (json.Data?.MW0 === '1') {
      json.Data.MW0 = '0'
      msg = JSON.stringify(json)
    }
    mqFN.publish(topic, msg, { qos: packet.qos, retain: packet.retain })
  })

  f.decorate('mqTL', mqTL)
  f.decorate('mqFN', mqFN)
})
