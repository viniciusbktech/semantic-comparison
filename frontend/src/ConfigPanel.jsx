import React from "react";
import "./ConfigPanel.css";

export default function ConfigPanel({ docId, setDocId, topK, setTopK, scoreThreshold, setScoreThreshold, onCompare, loading }) {
  return (
    <div className="config-panel">
      <label>
        ID do Documento:
        <input type="text" value={docId} onChange={e => setDocId(e.target.value)} placeholder="Digite o ID do documento" />
      </label>
      <button onClick={onCompare} disabled={loading || !docId}>
        {loading ? "Buscando..." : "Comparar"}
      </button>
    </div>
  );
}
