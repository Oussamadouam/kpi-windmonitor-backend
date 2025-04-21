import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import API_BASE_URL from "../config";

const response = await fetch(`${API_BASE_URL}/upload`, {
  method: "POST",
  body: formData,
});


function App() {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Vérifier l'autorisation dans Firestore
        try {
          const res = await fetch(`http://localhost:8000/validate_user/${currentUser.uid}`);
          const data = await res.json();
          setIsAuthorized(data.allowed);
        } catch (error) {
          console.error('Erreur de validation utilisateur:', error);
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) return <Login />;
  if (!isAuthorized) return <Register />;
  return <Dashboard />;
}

export default App;
