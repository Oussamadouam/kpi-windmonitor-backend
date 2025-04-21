import React, { useState } from "react";

function UploadForm() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Veuillez choisir un fichier Excel.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kpi/uploadfile/`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("kpi_data", JSON.stringify(result.kpi));
        window.location.reload(); // Pour rafraîchir le dashboard
      } else {
        alert(result.detail || "Erreur lors du traitement.");
      }
    } catch (err) {
      alert("Erreur réseau : " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Envoyer</button>
    </div>
  );
}

export default UploadForm;
