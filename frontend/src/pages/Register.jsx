import React, { useState } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import API_BASE_URL from "../config";

const response = await fetch(`${API_BASE_URL}/upload`, {
  method: "POST",
  body: formData,
});


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(""); // Réinitialiser les erreurs
    } catch (err) {
      setError("Erreur d'inscription. Vérifiez les informations.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>
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
        <button onClick={handleRegister} className="btn w-full bg-blue-500 text-white">
          S'inscrire
        </button>
      </div>
    </div>
  );
}

export default Register;
