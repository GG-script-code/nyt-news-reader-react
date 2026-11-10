import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Riporta lo scroll in cima ad ogni cambio di rotta.
 * Deve essere montato dentro <BrowserRouter> ma fuori da <Routes>.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}