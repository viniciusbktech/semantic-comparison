import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 10;

export default function DocumentsList() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(1);

  // Garante que a página nunca seja menor que 1
  const setSafePage = (newPage) => {
    if (newPage < 1) newPage = 1;
    setPage(newPage);
  }
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/documents?page=${page}&size=${PAGE_SIZE}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar documentos');
        return res.json();
      })
      .then(data => {
        console.log('Resposta /documents:', data);
        setDocuments(
          Array.isArray(data)
            ? data
            : data.documents || data.items || data.results || []
        );
        setTotal(data.total || (Array.isArray(data) ? data.length : 0));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32, background: '#f9f9fb', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          margin: '0 auto 18px auto',
          display: 'block',
          background: '#fff',
          color: '#1a73e8',
          border: '1px solid #1a73e8',
          borderRadius: 6,
          padding: '7px 22px',
          fontWeight: 500,
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: '0 1px 4px #0001',
          transition: 'background 0.18s, color 0.18s',
        }}
        onMouseOver={e => { e.currentTarget.style.background = '#1a73e8'; e.currentTarget.style.color = '#fff'; }}
        onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1a73e8'; }}
      >
        ← Voltar para Início
      </button>
      <h2 style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700, color: '#1a1a1a', letterSpacing: 0.5 }}>
        Lista de Documentos
      </h2>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {loading ? (
        <div style={{ textAlign: 'center', color: '#888' }}>Carregando...</div>
      ) : (
        <>
          {documents.length === 0 ? (
            <div style={{ margin: 32, color: '#666', textAlign: 'center' }}>
              Nenhum documento encontrado.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {documents.map(doc => (
                <div key={doc.id || doc._id} style={{
                  background: '#fff',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px #0002',
                  padding: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, color: '#222' }}>{doc.Title || doc.title}</div>
                    <div style={{ fontFamily: 'monospace', color: '#666', fontSize: 13, wordBreak: 'break-all' }}>{doc.id || doc._id}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(doc.id || doc._id)}
                    style={{
                      background: copiedId === (doc.id || doc._id) ? '#13c26b' : '#1a73e8',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 18px',
                      fontWeight: 500,
                      fontSize: 14,
                      cursor: 'pointer',
                      boxShadow: '0 1px 4px #0001',
                      transition: 'background 0.2s',
                      outline: copiedId === (doc.id || doc._id) ? '2px solid #13c26b' : 'none',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = copiedId === (doc.id || doc._id) ? '#13c26b' : '#1762c4'}
                    onMouseOut={e => e.currentTarget.style.background = copiedId === (doc.id || doc._id) ? '#13c26b' : '#1a73e8'}
                  >
                    {copiedId === (doc.id || doc._id) ? 'Copiado!' : 'Copiar _id'}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div style={{
            marginTop: 32,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14
          }}>
            <button
              onClick={() => setSafePage(page - 1)}
              disabled={page <= 1}
              style={{
                background: '#eee',
                color: '#888',
                border: 'none',
                borderRadius: 6,
                padding: '7px 16px',
                fontWeight: 500,
                fontSize: 14,
                cursor: page <= 1 ? 'not-allowed' : 'pointer',
                opacity: page <= 1 ? 0.6 : 1
              }}
            >Anterior</button>
            <span style={{ fontWeight: 500, color: '#444', fontSize: 15 }}>
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setSafePage(page + 1)}
              disabled={page >= totalPages}
              style={{
                background: '#eee',
                color: '#888',
                border: 'none',
                borderRadius: 6,
                padding: '7px 16px',
                fontWeight: 500,
                fontSize: 14,
                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                opacity: page >= totalPages ? 0.6 : 1
              }}
            >Próxima</button>
          </div>
        </>
      )}
    </div>
  );
}
