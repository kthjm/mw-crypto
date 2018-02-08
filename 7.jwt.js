const jwt = require('jsonwebtoken')
const uuidV1 = require('uuid/v1')
const assert = require('assert')
const { randomKey, encrypting, decrypting, objectLog } = require('./util.js')

randomKey().then(password => {

  const algorithm = 'aes192'
  const message = 'will be stored in jsonwebtoken.'
  const secret = 'hogeohgoe'

  return Promise.resolve(
    encrypting({ algorithm, password, message })
  )
  .then(data => {
    objectLog({ data })
    return data
  })
  .then(data =>
    jwt.sign(
      { data },
      secret,
      {
        jwtid: uuidV1(),
        issuer: 'https://idp.example.com/',
        audience: [
          'https://idp.example.com/',
          'https://api.example.com/'
        ],
        expiresIn: '30d'
      }
    )
  )
  .then(token => {

    const tokens = token.split('.')

    objectLog({
      header: tokens[0],
      payload: tokens[1],
      signature: tokens[2]
    })

    objectLog({
      header: new Buffer(tokens[0], 'base64').toString('utf8'),
      payload: new Buffer(tokens[1], 'base64').toString('utf8')
    })

    return token
  })
  .then(token => jwt.verify(token, secret, {}))
  .then(verified => {
    objectLog(verified)
    return verified
  })
  .then(({ data }) => decrypting({ algorithm, password, encrypted: data }))
  .then(decrypted => {
    objectLog({ data: decrypted })
    assert.equal(decrypted, message)
  })
  .catch(err => console.error(err))
})