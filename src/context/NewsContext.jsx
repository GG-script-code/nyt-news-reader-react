import { createContext, useContext, useReducer } from 'react';

/**
 * Stato globale dell'applicazione.
 *
 * - section: sezione NYT attiva ('home', 'world', 'technology', ...)
 * - articles: articoli della sezione corrente
 * - loading / error: stati della richiesta API
 *
 * Le transizioni sono esplicite (SET_SECTION, FETCH_SUCCESS, FETCH_ERROR)
 * così il flusso è prevedibile e debuggabile.
 */
const NewsContext = createContext(null);

const initialState = {
  section: 'home',
  articles: [],
  loading: true,
  error: null,
};

function newsReducer(state, action) {
  switch (action.type) {
    case 'SET_SECTION':
      // Cambio sezione: azzero errori e metto l'app in loading
      return { ...state, section: action.payload, loading: true, error: null };
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, articles: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, articles: [], loading: false, error: action.payload };
    default:
      return state;
  }
}

export function NewsProvider({ children }) {
  const [state, dispatch] = useReducer(newsReducer, initialState);
  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsContext.Provider>
  );
}

/**
 * Hook per consumare il Context. Lancia se usato fuori dal Provider:
 * errore esplicito invece di `undefined` silenzioso.
 */
export function useNews() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within <NewsProvider>');
  }
  return context;
}