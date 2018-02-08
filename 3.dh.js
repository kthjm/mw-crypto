const { createDiffieHellman } = require('crypto')
const { encrypting, decrypting, objectLog } = require('./util.js')

const algorithm = 'aes192'
const textEncoding = 'utf8'
const cipherEncoding = 'hex'

// user create dh by primeLength
const user = createDiffieHellman(512)

Promise.resolve({
  prime: user.getPrime(),
  userKey: user.generateKeys()
})
.then(({ prime, userKey }) => {

  // server create dh by prime
  const server = createDiffieHellman(prime)

  return {
    data: encrypting({
      algorithm,
      message: 'message from server.',
      password: server.computeSecret(userKey),
      inputEncoding: textEncoding,
      outputEncoding: cipherEncoding
    }),
    serverKey: server.generateKeys()
  }
})
.then(({ data, serverKey }) => ({
  server_send: data,
  user_read: decrypting({
    algorithm,
    encrypted: data,
    password: user.computeSecret(serverKey),
    inputEncoding: cipherEncoding,
    outputEncoding: textEncoding
  })
}))
.then(objectLog)
.catch(({ message }) => objectLog({ message }))