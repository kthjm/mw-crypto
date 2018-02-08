const {
  randomBytes,
  createCipher,
  createDecipher,
  createHash,
  createHmac,
  createSign,
  createVerify
} = require('crypto')

const randomBytesAsync = require('util').promisify(randomBytes)

const randomKey = ({ size=48, encoding='hex' } = {}) =>
  randomBytesAsync(size)
  .then(buffer => buffer.toString(encoding))

const objectLog = (obj) => {
  console.log(``)
  Object.entries(obj).forEach(([key,value]) => console.log(`${key}: ${value}`))
  console.log(``)
}

const encrypting = ({
  algorithm,
  password,
  message,
  inputEncoding = 'utf8',
  outputEncoding = 'hex'
} = {}) => {
  let result
  const cipher = createCipher(algorithm, password)
  result = cipher.update(message, inputEncoding, outputEncoding)
  result += cipher.final(outputEncoding)
  return result
}

const decrypting = ({
  algorithm,
  password,
  encrypted,
  inputEncoding = 'hex',
  outputEncoding = 'utf8'
} = {}) => {
  let result
  const decipher = createDecipher(algorithm, password)
  result = decipher.update(encrypted, inputEncoding, outputEncoding)
  result += decipher.final(outputEncoding)
  return result
}

const hashing = ({ algorithm, message, encoding }) => {
  const hash = createHash(algorithm)
  hash.update(message)
  return hash.digest(encoding)
}

const hmacing = ({ algorithm, password, message, encoding }) => {
  const hmac = createHmac(algorithm, password)
  hmac.update(message)
  return hmac.digest(encoding)
}

const signing = ({ algorithm, data, privateKey, encoding }) => {
  const sign = createSign(algorithm)
  sign.update(data)
  return sign.sign(privateKey, encoding)
}

const verifying = ({ algorithm, data, publicKey, encoding, signature }) => {
  const verify = createVerify(algorithm)
  verify.update(data)
  return verify.verify(publicKey, signature, encoding)
}

module.exports = {
  randomKey,
  objectLog,
  encrypting,
  decrypting,
  hashing,
  hmacing,
  signing,
  verifying
}