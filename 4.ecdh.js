const { getCurves, createECDH } = require('crypto')
const { encrypting, decrypting, objectLog } = require('./util.js')

const algorithm = 'aes192'
const textEncoding = 'utf8'
const cipherEncoding = 'hex'

Promise.all(getCurves().map(curveName => {

  // user create ecdh by curveName
  const user = createECDH(curveName)

  return Promise.resolve({
    curveName,
    userKey: user.generateKeys()
  })
  .then(({ curveName, userKey }) => {

    // server create ecdh by curveName
    const server = createECDH(curveName)

    return {
      serverKey: server.generateKeys(),
      data: encrypting({
        algorithm,
        message: 'message from server.',
        password: server.computeSecret(userKey),
        inputEncoding: textEncoding,
        outputEncoding: cipherEncoding
      })
    }
  })
  .then(({ serverKey, data }) => ({
    curveName,
    server_send: data,
    user_read: decrypting({
      algorithm,
      encrypted: data,
      password: user.computeSecret(serverKey),
      inputEncoding: cipherEncoding,
      outputEncoding: textEncoding
    })
  }))
  .catch(({ message }) => ({
    curveName,
    message
  }))
}))
.then(results => results.forEach(objectLog))