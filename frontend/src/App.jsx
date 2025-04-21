import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import API_BASE_URL from "../config";

const response = await fetch(`${API_BASE_URL}/upload`, {
  method: "POST",
  body: formData,
});


function App() {
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const response = await fetch(`http://localhost:8000/validate_user/${currentUser.uid}`);
          const data = await response.json();
          setAuthorized(data.allowed === true);
        } catch (error) {
          console.error("Authorization check failed", error);
          setAuthorized(false);
        }
      } else {
        setAuthorized(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (user === null) return <Login />;
  if (authorized === false) return <Register />;
  if (authorized === true) return <Dashboard />;
  return null;
}

export default App;
