import { useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import NewsGrid from '../components/NewsGrid';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function HomePage() {
  const { state, fetchSection } = useNews();
  const { articles, loading, error } = state;

  useDocumentTitle('Home');

  useEffect(() => {
    fetchSection('home');
  }, [fetchSection]);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={() => fetchSection('home')} />;
  if (articles.length === 0) {
    return (
      <p style={{ textAlign: 'center', margin: '4rem 0', color: '#666' }}>
        Nessun articolo disponibile.
      </p>
    );
  }

  return <NewsGrid articles={articles} />;
}