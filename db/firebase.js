import firebaseKeys from '../machikey'
import firebase from 'firebase'

firebase.initializeApp(firebaseKeys)

// firebase.database().ref('hello').set('bye')
// firebase.datbase()
const database = firebase.database()
const auth = firebase.auth()

// export default firebase

module.exports = { firebase, database, auth }
