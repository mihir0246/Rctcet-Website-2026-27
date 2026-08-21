// One-time script to add an admin user to Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyClsdZeFbSFMLCw8YWc96m1HsPRrkF4ru0",
  authDomain: "rctcet-1b6e4.firebaseapp.com",
  projectId: "rctcet-1b6e4",
  storageBucket: "rctcet-1b6e4.firebasestorage.app",
  messagingSenderId: "210277545370",
  appId: "1:210277545370:web:17eb63e1885c5a43f1f623",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const adminData = {
  email: "fuzailk05@gmail.com",
  password: "RcAdmin123",
  role: "admin",
};

try {
  const docRef = await addDoc(collection(db, "admins"), adminData);
  console.log("✅ Admin added successfully! Document ID:", docRef.id);
} catch (err) {
  console.error("❌ Error adding admin:", err.message);
}
