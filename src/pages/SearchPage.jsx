import { useState } from 'react';
import { searchArticles } from '../services/nytApi';
import NewsGrid from '../components/NewsGrid';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); // previene il reload della pagina

    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const { data } = await searchArticles(trimmed);
      setResults(data.response?.docs || []);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Ricerca fallita. Riprova.';
      setError(message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '0.5rem',
          maxWidth: '600px',
          margin: '0 auto 3rem',
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca articoli (es. climate, election...)"
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '1px solid #e2e2e2',
            fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          style={{
            background: '#121212',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            cursor: loading || !query.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !query.trim() ? 0.5 : 1,
          }}
        >
          {loading ? 'Cerco…' : 'Cerca'}
        </button>
      </form>

      {loading && <Loader />}

      {error && <ErrorState message={error} />}

      {!loading && !error && hasSearched && results.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', margin: '2rem 0' }}>
          Nessun risultato per “{query}”.
        </p>
      )}

      {!loading && !error && results.length > 0 && (
        <NewsGrid articles={results} />
      )}
    </div>
  );
}