import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6i91MkHZd1WgkFV9QsP8NPQ_OyIs0NaQ",
  authDomain: "bimm-market.firebaseapp.com",
  projectId: "bimm-market",
  storageBucket: "bimm-market.firebasestorage.app",
  messagingSenderId: "252360235867",
  appId: "1:252360235867:web:5368908c8d06525fed187e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
