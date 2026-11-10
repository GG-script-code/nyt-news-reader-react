import { useEffect } from 'react';
import { useNews } from './context/NewsContext';
import { getTopStories } from './services/nytApi';
import NewsGrid from './components/NewsGrid';
import Loader from './components/Loader';
import ErrorState from './components/ErrorState';

const SECTIONS = ['home', 'world', 'technology', 'science', 'arts'];

function App() {
  const { state, dispatch } = useNews();
  const { section, articles, loading, error } = state;

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
            err.response?.data?.message ||
            err.response?.data?.fault?.faultstring ||
            'Errore nel caricamento delle notizie.';
          dispatch({ type: 'FETCH_ERROR', payload: message });
        }
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [section, dispatch]);

  function retry() {
    dispatch({ type: 'FETCH_START' });
    getTopStories(section)
      .then(({ data }) =>
        dispatch({ type: 'FETCH_SUCCESS', payload: data.results || [] })
      )
      .catch((err) =>
        dispatch({
          type: 'FETCH_ERROR',
          payload:
            err.response?.data?.message ||
            'Errore nel caricamento delle notizie.',
        })
      );
  }

  return (
    <>
      <header style={{ borderBottom: '1px solid #e2e2e2', padding: '1rem 2rem' }}>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          NYT News Reader
        </h1>
        <nav
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => dispatch({ type: 'SET_SECTION', payload: s })}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: section === s ? '#c8102e' : '#121212',
                fontWeight: section === s ? 700 : 400,
                padding: '0.25rem 0',
                borderBottom:
                  section === s ? '2px solid #c8102e' : '2px solid transparent',
              }}
            >
              {s}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {loading && <Loader />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && articles.length === 0 && (
          <p style={{ textAlign: 'center', margin: '4rem 0', color: '#666' }}>
            Nessun articolo disponibile per questa sezione.
          </p>
        )}
        {!loading && !error && articles.length > 0 && (
          <NewsGrid articles={articles} />
        )}
      </main>
    </>
  );
}

export default App;