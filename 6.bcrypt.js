const bcrypt = require('bcrypt')
const { objectLog } = require('./util.js')

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt
.hash(myPlaintextPassword, saltRounds)
.then(hash =>
  Promise.all(
    [
      myPlaintextPassword,
      someOtherPlaintextPassword
    ]
    .map(plainText =>
      bcrypt
      .compare(plainText,hash)
      .then(auth => ({
        plainText,
        auth,
        hash
      }))
    )
  )
)
.then(results => results.forEach(objectLog))
