import { useState, useEffect, useCallback } from 'react';
import { getTopStories } from '../services/nytApi';

/**
 * Custom hook per recuperare le Top Stories di una sezione del NYT.
 * Gestisce i quattro stati canonici: loading, error, success, no-data.
 * Espone `retry` per il pulsante "Riprova".
 */
export function useTopStories(section = 'home') {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(
    async (isCancelled = () => false) => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await getTopStories(section);
        if (!isCancelled()) setArticles(data.results || []);
      } catch (err) {
        if (!isCancelled()) {
          const message =
            err.response?.data?.message ||
            err.response?.data?.fault?.faultstring ||
            'Errore nel caricamento delle notizie. Riprova.';
          setError(message);
          setArticles([]);
        }
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    [section]
  );

  useEffect(() => {
    let cancelled = false;
    fetchArticles(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    isEmpty: !loading && !error && articles.length === 0,
    retry: () => fetchArticles(),
  };
}

export default useTopStories;