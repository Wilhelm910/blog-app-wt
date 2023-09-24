
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyAjd2_VpZpho2JDUjg0sCcsNMWHhnDczFo",
    authDomain: "blog-app-wt.firebaseapp.com",
    projectId: "blog-app-wt",
    storageBucket: "blog-app-wt.appspot.com",
    messagingSenderId: "916395421821",
    appId: "1:916395421821:web:4c3da452f8aa516760c114"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }