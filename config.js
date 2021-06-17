import  firebase from 'firebase';
require("@firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyAu1NcrXm93DFkrM3Dqc_7XoP3SEBd9Ejo",
    authDomain: "willy-c3824.firebaseapp.com",
    projectId: "willy-c3824",
    storageBucket: "willy-c3824.appspot.com",
    messagingSenderId: "938254203602",
    appId: "1:938254203602:web:14f818fbb36c7dfa0ecb0b"
  };
  firebase.initializeApp ( firebaseConfig );
  export default firebase.firestore();