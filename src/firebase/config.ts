import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYQaB7n9_lpbTMiIIXrh2emjdNonOfxs4",
  authDomain: "phone-bh-fix.firebaseapp.com",
  projectId: "phone-bh-fix",
  storageBucket: "phone-bh-fix.appspot.com",
  messagingSenderId: "625025974846",
  appId: "1:625025974846:web:ea53f91769c6562a10876f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, "gs://phone-bh-fix.appspot.com");

export { auth, db, storage };
