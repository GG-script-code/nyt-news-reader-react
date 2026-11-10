import { useState, useEffect, useCallback } from 'react';
import { getTopStories } from '../services/nytApi';

/**
 * Custom hook per recuperare le Top Stories di una sezione del NYT.
 *
 * Gestisce i quattro stati canonici di una chiamata API:
 *  - loading: richiesta in corso
 *  - error:   richiesta fallita (con messaggio leggibile)
 *  - success: dati disponibili
 *  - no-data: risposta valida ma array vuoto
 *
 * Espone anche `retry` per il pulsante "Riprova" nello stato di errore.
 *
 * @param {string} section - sezione NYT (default: 'home')
 * @returns {{ articles, loading, error, isEmpty, retry }}
 */
export function useTopStories(section = 'home') {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await getTopStories(section);
      setArticles(data.results || []);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.fault?.faultstring ||
        'Errore nel caricamento delle notizie. Riprova.';
      setError(message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getTopStories(section);
        if (!cancelled) setArticles(data.results || []);
      } catch (err) {
        if (!cancelled) {
          const message =
            err.response?.data?.message ||
            err.response?.data?.fault?.faultstring ||
            'Errore nel caricamento delle notizie. Riprova.';
          setError(message);
          setArticles([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    // Cleanup: evita setState su componente smontato (race condition)
    return () => {
      cancelled = true;
    };
  }, [section]);

  return {
    articles,
    loading,
    error,
    isEmpty: !loading && !error && articles.length === 0,
    retry: fetchArticles,
  };
}

export default useTopStories;