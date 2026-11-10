import { useEffect } from 'react';
import { useNews } from './context/NewsContext';
import { getTopStories } from './services/nytApi';

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
    return () => {
      cancelled = true;
    };
  }, [section, dispatch]);

  function changeSection(newSection) {
    dispatch({ type: 'SET_SECTION', payload: newSection });
  }

  if (loading) return <p>Caricamento in corso...</p>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => changeSection(section)}>Riprova</button>
      </div>
    );
  }

  return (
    <div>
      <h1>NYT News Reader</h1>
      <p>Sezione attiva: <strong>{section}</strong></p>
      <div>
        {['home', 'world', 'technology', 'science'].map((s) => (
          <button
            key={s}
            onClick={() => changeSection(s)}
            style={{ marginRight: '0.5rem' }}
          >
            {s}
          </button>
        ))}
      </div>
      <p>Articoli caricati: {articles.length}</p>
      <ul>
        {articles.slice(0, 5).map((article) => (
          <li key={article.url}>
            <strong>{article.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;