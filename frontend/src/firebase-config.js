import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// src/config.js
const API_BASE_URL = "https://kpi-windmonitor-backend.onrender.com"; 

export default API_BASE_URL;


const firebaseConfig = {
  apiKey: 'TA_CLE_API',
  authDomain: 'TON_DOMAINE.firebaseapp.com',
  projectId: 'TON_PROJECT_ID',
  storageBucket: 'TON_BUCKET.appspot.com',
  messagingSenderId: 'TON_ID',
  appId: 'TON_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
