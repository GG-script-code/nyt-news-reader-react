/**
 * Formatta una data ISO in formato editoriale italiano.
 * Esempio: "2026-11-10T08:30:00Z" → "10 novembre 2026"
 */
export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Tronca un testo a `maxLength` caratteri, aggiungendo ellissi.
 * Utile per gli abstract delle card.
 */
export function truncate(text, maxLength = 160) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Estrae l'URL completo dell'immagine migliore da un oggetto `multimedia` del NYT.
 * Gestisce sia URL relativi (Top Stories) che URL assoluti (Article Search).
 * Ritorna null se non c'è multimedia.
 */
export function getBestImage(multimedia) {
  if (!Array.isArray(multimedia) || multimedia.length === 0) return null;
  
  const preferred = ['superJumbo', 'jumbo', 'xlarge', 'large'];
  let url = null;

  for (const format of preferred) {
    const found = multimedia.find((m) => m.format === format);
    if (found) {
      url = found.url;
      break;
    }
  }

  // Fallback: prendi il primo disponibile se nessun formato preferito è stato trovato
  if (!url) {
    url = multimedia[0].url;
  }

  // Se l'URL è già assoluto (inizia con http), restituiscilo così com'è.
  // Se è relativo, prefissalo con il dominio del NYT.
  if (url.startsWith('http')) {
    return url;
  }
  return `https://www.nytimes.com/${url}`;
}