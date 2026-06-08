import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBn7JOBPKnriibWF1Ct4c-MxVZflSD0wV4",
  authDomain: "devzilla-11af1.firebaseapp.com",
  projectId: "devzilla-11af1",
  storageBucket: "devzilla-11af1.firebasestorage.app",
  messagingSenderId: "63777443875",
  appId: "1:63777443875:web:5e16c0e3d32a8fd2e76196",
  measurementId: "G-HYVTV61690"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
