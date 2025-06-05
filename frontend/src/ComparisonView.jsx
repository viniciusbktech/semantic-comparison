import React from "react";
import "./ComparisonView.css";

export default function ComparisonView({ result }) {
  const { selected, similar } = result;
  return (
    <div className="comparison-view">
      <div className="selected-doc">
        <h2>Documento Consultado</h2>
        <h3>{selected.Title}</h3>
        <div className="doc-category">Categoria: <b>{selected.categories}</b></div>
        <div className="doc-content">{selected.Content}</div>
      </div>
      <div className="similar-docs">
        <h2>Documentos Similares</h2>
        {similar.length === 0 && <div>Nenhum documento similar encontrado.</div>}
        <ul>
          {similar.map(doc => (
            <li key={doc.id} className="similar-item">
              <a href={doc.Url} target="_blank" rel="noopener noreferrer" className="doc-title-link">
                {doc.Title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
