import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { getTopStories } from '../services/nytApi';
import NewsGrid from '../components/NewsGrid';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

export default function SectionPage() {
  const { section } = useParams();
  const { state, dispatch } = useNews();
  const { articles, loading, error } = state;

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      dispatch({ type: 'FETCH_START' });
      try {
        const { data } = await getTopStories(section);
        if (!cancelled) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data.results || [] });
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err.response?.data?.message || 'Errore nel caricamento.';
          dispatch({ type: 'FETCH_ERROR', payload: message });
        }
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [section, dispatch]);

  if (loading) return <Loader />;
  if (error)
    return (
      <ErrorState message={error} onRetry={() => window.location.reload()} />
    );
  if (articles.length === 0)
    return (
      <p style={{ textAlign: 'center', margin: '4rem 0', color: '#666' }}>
        Nessun articolo disponibile per questa sezione.
      </p>
    );

  return <NewsGrid articles={articles} />;
}