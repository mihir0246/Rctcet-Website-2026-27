import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage on mount
    const stored = localStorage.getItem('rctcet_admin');
    if (stored) {
      try { setAdmin(JSON.parse(stored)); } catch (_) {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const q = query(
      collection(db, 'admins'),
      where('email', '==', email),
      where('password', '==', password)
    );
    const snap = await getDocs(q);
    if (snap.empty) throw new Error('Invalid credentials');
    const adminData = { email, role: snap.docs[0].data().role || 'admin' };
    setAdmin(adminData);
    localStorage.setItem('rctcet_admin', JSON.stringify(adminData));
    return adminData;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('rctcet_admin');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
