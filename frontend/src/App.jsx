import React, { useState } from "react";
import ComparisonView from "./ComparisonView";
import ConfigPanel from "./ConfigPanel";
import "./App.css";

function App() {
  const [docId, setDocId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCompare = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/compare/${docId}`);
      if (!res.ok) throw new Error("Erro ao buscar comparação");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="logo-area">
        <img src="/logofolha.png" alt="Logo Folha de S. Paulo" className="folha-logo" />
      </div>
      <h1>Comparação Semântica de Notícias</h1>
      <ConfigPanel
        docId={docId}
        setDocId={setDocId}
        onCompare={handleCompare}
        loading={loading}
      />
      {error && <div className="error">{error}</div>}
      {result && <ComparisonView result={result} />}
    </div>
  );
}

export default App;
