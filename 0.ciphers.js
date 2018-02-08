const { getCiphers } = require('crypto')
const { randomKey, encrypting, decrypting, objectLog } = require('./util.js')

const cipherEncoding = 'hex'
const textEncoding = 'utf8'

randomKey().then(password =>
  Promise.all(getCiphers().map(algorithm =>
    Promise.resolve()
    .then(() =>
      encrypting({
        algorithm,
        password,
        message: 'will be recovered.',
        inputEncoding: textEncoding,
        outputEncoding: cipherEncoding
      })
    )
    .then(encrypted => ({
      algorithm,
      encrypted,
      decrypted: decrypting({
        algorithm,
        password,
        encrypted,
        inputEncoding: cipherEncoding,
        outputEncoding: textEncoding
      })
    }))
    .catch((err) => ({
      algorithm,
      message: err.message
    }))
  ))
  .then(results => results.forEach(objectLog))
)