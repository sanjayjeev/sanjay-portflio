import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null
const database = app ? getFirestore(app) : null

export async function submitContactMessage({ name, email, subject, message }) {
  if (!database) throw new Error('Firebase is not configured yet. Add the VITE_FIREBASE_* values to .env.local.')

  await addDoc(collection(database, 'contactMessages'), {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    createdAt: serverTimestamp(),
    source: 'portfolio',
  })
}
