/*
function App() {
  return (
    <div>
      <h1>NYT News Reader</h1>
      <p>Progetto in costruzione.</p>
    </div>
  );
}

export default App;
*/

import useTopStories from './hooks/useTopStories';

function App() {
  const { articles, loading, error, isEmpty, retry } = useTopStories('home');

  if (loading) return <p>Caricamento in corso...</p>;

  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={retry}>Riprova</button>
      </div>
    );

  if (isEmpty) return <p>Nessun articolo disponibile.</p>;

  return (
    <div>
      <h1>NYT News Reader</h1>
      <p>Articoli caricati: {articles.length}</p>
      <ul>
        {articles.slice(0, 5).map((article) => (
          <li key={article.url}>
            <strong>{article.title}</strong>
            <br />
            <small>{article.abstract}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;