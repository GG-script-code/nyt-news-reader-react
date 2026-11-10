import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import NewsGrid from '../components/NewsGrid';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function SectionPage() {
  const { section } = useParams();
  const { state, fetchSection } = useNews();
  const { articles, loading, error } = state;

  const formatted = section.charAt(0).toUpperCase() + section.slice(1);
  useDocumentTitle(formatted);

  useEffect(() => {
    fetchSection(section);
  }, [section, fetchSection]);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={() => fetchSection(section)} />;
  if (articles.length === 0) {
    return (
      <p style={{ textAlign: 'center', margin: '4rem 0', color: '#666' }}>
        Nessun articolo disponibile per questa sezione.
      </p>
    );
  }

  return <NewsGrid articles={articles} />;
}