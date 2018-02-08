const RSA = require('node-rsa')
const { signing, verifying, objectLog } = require('./util.js')

const rsa = new RSA({ b: 512 })

Promise.resolve()
.then(() =>
  signing({
    // algorithm: 'sha256',
    algorithm: 'RSA-SHA256',
    data: 'signed will be verified',
    privateKey: rsa.exportKey('pkcs1-private'),
    encoding: 'hex',
  })
)
.then(signature => ({
  signature,
  verified: verifying({
    // algorithm: 'RSA-SHA256',
    algorithm: 'sha256',
    data: 'signed will be verified',
    publicKey: rsa.exportKey('pkcs1-public'),
    encoding: 'hex',
    signature
  })
}))
.then(objectLog)
.catch(err => console.error(err))
