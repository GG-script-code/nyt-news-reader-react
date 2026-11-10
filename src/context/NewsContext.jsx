import { createContext, useContext, useReducer, useCallback } from 'react';
import { getTopStories } from '../services/nytApi';

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

  /**
   * Funzione di fetch riutilizzabile: legge `section` corrente e aggiorna lo stato.
   * Esposta nel Context per consentire retry puliti da qualsiasi componente.
   */
  const fetchSection = useCallback(async (section) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const { data } = await getTopStories(section);
      dispatch({ type: 'FETCH_SUCCESS', payload: data.results || [] });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.fault?.faultstring ||
        'Errore nel caricamento delle notizie.';
      dispatch({ type: 'FETCH_ERROR', payload: message });
    }
  }, []);

  return (
    <NewsContext.Provider value={{ state, dispatch, fetchSection }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within <NewsProvider>');
  }
  return context;
}