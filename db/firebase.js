import firebaseKeys from '../machikey'
import firebase from 'firebase'
import machiObject from '../public/machiObject.json'

firebase.initializeApp(firebaseKeys)

// const database = firebase.database().ref('hello').set('bye')
// firebase.datbase()
const database = firebase.database().ref('/').set(machiObject)
const auth = firebase.auth()

// export default firebase

module.exports = { firebase, database, auth }
