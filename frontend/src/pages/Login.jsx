import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config";

const response = await fetch(`${API_BASE_URL}/upload`, {
  method: "POST",
  body: formData,
});


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur d'authentification. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        <input
          type="email"
          placeholder="Email"
          className="input mb-3 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="input mb-4 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button onClick={handleLogin} className="btn w-full bg-blue-500 text-white">
          Se connecter
        </button>
        <p className="mt-4 text-sm text-center">
          Pas encore inscrit ?{" "}
          <a href="/register" className="text-blue-600 font-semibold">Créer un compte</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
