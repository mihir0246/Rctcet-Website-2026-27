import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let position = "GBM";
        let roles = ["MEMBER"];
        try {
          const token = await user.getIdToken();
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.user) {
            position = data.user.position || "GBM";
            roles = data.user.roles || ["MEMBER"];
          }
        } catch (e) {
          console.error("Failed to fetch user role from backend", e);
        }
        setAdmin({ email: user.email, uid: user.uid, position, roles });
      } else {
        setAdmin(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Auth observer handles setting the admin state, but we can do it here immediately too for faster UI
    let position = "GBM";
    let roles = ["MEMBER"];
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.user) {
        position = data.user.position || "GBM";
        roles = data.user.roles || ["MEMBER"];
      }
    } catch (e) {
      console.error("Failed to fetch user role from backend", e);
    }
    
    setAdmin({ email: user.email, uid: user.uid, position, roles });
    return user;
  };

  const logout = async () => {
    await signOut(auth);
    setAdmin(null);
  };

  const getToken = async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, getToken, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
