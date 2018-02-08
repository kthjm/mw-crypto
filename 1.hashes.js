const { getHashes } = require('crypto')
const { randomKey, hashing, hmacing, objectLog } = require('./util.js')

const message = 'Unrecoverable...'
const encoding = 'hex'

randomKey().then(password =>
  Promise.all(getHashes().map(algorithm =>
    Promise.resolve().then(() => ({
      message,
      algorithm,
      encoding,
      hash: hashing({ algorithm, message, encoding }),
      hmac: hmacing({ algorithm, message, encoding, password })
    }))
    .catch(({ message }) => ({
      algorithm,
      message
    }))
  ))
  .then(results => results.forEach(objectLog))
)