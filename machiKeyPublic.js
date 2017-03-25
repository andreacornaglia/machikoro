if(process.env.IS_HEROKU === 'true'){
  
} else {
  var localKey = require('./machikey')
}

var config = {
    apiKey: process.env.Firebase_apiKey || localKey.Firebase_apiKey,
    authDomain: process.env.Firebase_authDomain || localKey.Firebase_authDomain,
    databaseURL: process.env.Firebase_databaseURL || localKey.Firebase_databaseURL,
    storageBucket: process.env.Firebase_storageBucket || localKey.Firebase_storageBucket,
    messagingSenderId: process.env.Firebase_messagingSenderId || localKey.Firebase_messagingSenderId
}

module.exports = config