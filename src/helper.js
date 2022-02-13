module.exports = async f => {
  f.mqTL.on('message', (topic, msg) => {
    topic = `unis/devices/5gby/${topic.substring(0, 12)}/sys/messages/up`
    f.mqFN.publish(topic, msg)
  })

  await new Promise((res, rej) => {
    f.mqTL.subscribe(
      [
        '121940019260/p',
        '121940019270/p',
        '121940019280/p',
        '121940019290/p',
        '121940019300/p',
        '121940019310/p',
        '121940019320/p',
        '121940019330/p',
        '121940019340/p',
        '121940019350/p',
        '121940019360/p',
        '121940019370/p',
        '121940019380/p',
        '121940019390/p',
        '121940019400/p',
        '121940019410/p',
        '121940019420/p',
        '121940019430/p',
        '121940019440/p',
        '121940019450/p',
      ],
      err => {
        if (err) return rej(err)
        res()
      }
    )
  })
}
