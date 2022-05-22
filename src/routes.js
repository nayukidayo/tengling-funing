module.exports = async f => {
  // 远程控制
  f.post(
    '/:topic',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            topic: { type: 'string', maxLength: 12 },
          },
          required: ['topic'],
        },
        body: {
          type: 'object',
          properties: {
            key: { type: 'string', maxLength: 5 },
            value: { type: 'string', maxLength: 4 },
          },
          required: ['key', 'value'],
        },
      },
    },
    async req => {
      const { topic } = req.params
      const { key, value } = req.body

      const msg = `{"Data":{"${key}":"${value}"}}`

      await new Promise((res, rej) => {
        f.mqTL.publish(`${topic}/s`, msg, { qos: 1 }, err => {
          if (err) return rej(err)
          res()
        })
      })

      return { err: 0, msg: '请求成功' }
    }
  )
}
