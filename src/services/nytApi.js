import axios from 'axios';

/**
 * Istanza Axios configurata per le API del New York Times.
 * Base URL e timeout centralizzati: se domani cambia l'endpoint base,
 * si modifica solo qui.
 */
const api = axios.create({
  baseURL: 'https://api.nytimes.com/svc',
  timeout: 8000,
});

/**
 * Chiave API letta da .env (Vite espone solo le variabili con prefisso VITE_).
 * Se manca, l'app lo segnala a runtime con un errore chiaro.
 */
const API_KEY = import.meta.env.VITE_NYT_API_KEY;

if (!API_KEY) {
  console.error(
    '[nytApi] VITE_NYT_API_KEY mancante. Crea un file .env nella root del progetto.'
  );
}

/**
 * Top Stories per sezione.
 * Endpoint: GET /topstories/v2/{section}.json
 * Sezioni valide: home, world, technology, science, arts, sports, business, ...
 */
export const getTopStories = (section = 'home') =>
  api.get(`/topstories/v2/${section}.json`, {
    params: { 'api-key': API_KEY },
  });

/**
 * Most Popular (più letti degli ultimi N giorni).
 * Endpoint: GET /mostpopular/v2/viewed/{period}.json
 * period: 1, 7 o 30 (giorni)
 */
export const getMostPopular = (period = 7) =>
  api.get(`/mostpopular/v2/viewed/${period}.json`, {
    params: { 'api-key': API_KEY },
  });

/**
 * Ricerca articoli.
 * Endpoint: GET /search/v2/articlesearch.json
 * Usata nella SearchPage (Fase 5).
 */
export const searchArticles = (query, page = 0) =>
  api.get('/search/v2/articlesearch.json', {
    params: { q: query, page, 'api-key': API_KEY },
  });

export default api;