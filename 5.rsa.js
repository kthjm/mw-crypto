const RSA = require('node-rsa')
const { objectLog } = require('./util.js')

const rsa = new RSA({ b: 512 })

objectLog({
  isEmpty: rsa.isEmpty(),
  isPrivate: rsa.isPrivate(),
  isPublic: rsa.isPublic(),
  keySize: rsa.getKeySize(),
  maxMessageSize: rsa.getMaxMessageSize()
})

const buffer = 'hello RSA!'

const encrypted = rsa.encrypt(buffer, 'base64', 'utf8')
const decrypted = rsa.decrypt(encrypted, 'utf8')
objectLog({ encrypted, decrypted })

const signature = rsa.sign(buffer, 'base64', 'utf8')
const verified = rsa.verify(buffer, signature, 'utf8', 'base64')
objectLog({ signature, verified })

console.log(`
pkcs1:
${rsa.exportKey('pkcs1-public-pem')}
${rsa.exportKey('pkcs1-private-pem')}
`)

console.log(`
pkcs8:
${rsa.exportKey('pkcs8-public-pem')}
${rsa.exportKey('pkcs8-private-pem')}
`)