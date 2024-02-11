import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey:"API_KEY",
  authDomain: "aipaago-asignment.firebaseapp.com",
  projectId: "aipaago-asignment",
  storageBucket: "aipaago-asignment.appspot.com",
  messagingSenderId: "431655739686",
  appId: "1:431655739686:web:0d1e376793f543a637e1e7"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
