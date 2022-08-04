// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKYLFRqm0LIrPgVGvqOTgfrMt2lHC1DrU",
    authDomain: "hbnetflixclone.firebaseapp.com",
    projectId: "hbnetflixclone",
    storageBucket: "hbnetflixclone.appspot.com",
    messagingSenderId: "737777196011",
    appId: "1:737777196011:web:ee348cb25169d69ee417ae",
    measurementId: "G-23HJ3RFGK0"
  };
  
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }