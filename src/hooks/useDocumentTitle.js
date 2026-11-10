import { useEffect } from 'react';

/**
 * Aggiorna il titolo della tab del browser.
 * Se il titolo cambia, l'utente vede la sezione corrente nella tab.
 */
export default function useDocumentTitle(title) {
  useEffect(() => {
    const original = document.title;
    document.title = title ? `${title} — NYT News Reader` : 'NYT News Reader';
    return () => {
      document.title = original;
    };
  }, [title]);
}