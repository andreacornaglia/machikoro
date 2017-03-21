import firebaseKeys from '../machikey'
import firebase from 'firebase'
import machiObject from '../public/machiObject.json'

firebase.initializeApp(firebaseKeys)

let database = firebase.database().ref()
// database.set(machiObject)

let ref = database.child('game')

let auth = firebase.auth()

// export default firebase
module.exports = { firebase, database, auth, ref }
