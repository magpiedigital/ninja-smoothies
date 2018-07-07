import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBEvE-OeHYzNbvHjy2ueKEyduW3ZX_PeuA",
    authDomain: "ninja-smoothies-37681.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-37681.firebaseio.com",
    projectId: "ninja-smoothies-37681",
    storageBucket: "ninja-smoothies-37681.appspot.com",
    messagingSenderId: "713558414311"
}

const firebaseApp = firebase.initializeApp(config)
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

export default firebaseApp.firestore()