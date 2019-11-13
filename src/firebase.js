import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
    .initializeApp({databaseURL : 'https://vueandfirebase-842cc.firebaseio.com'})
    .database()

export const dessertsRef = db.ref('desserts');
export const minumanRef = db.ref('minuman');