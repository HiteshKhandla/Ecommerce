

import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVGPRVw3CcWbYb6l8vdEQxhgsHrXJTuvk",
  authDomain: "ecommerce-546a8.firebaseapp.com",
  projectId: "ecommerce-546a8",
  storageBucket: "ecommerce-546a8.appspot.com",
  messagingSenderId: "118925800327",
  appId: "1:118925800327:web:08cd35755d5dfb54145922"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app

