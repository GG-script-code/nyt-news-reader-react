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
 * Estrae l'URL dell'immagine migliore da un oggetto `multimedia` del NYT.
 * Prova prima `superJumbo`, poi `jumbo`, poi il primo disponibile.
 * Ritorna null se non c'è multimedia.
 */
export function getBestImage(multimedia) {
  if (!Array.isArray(multimedia) || multimedia.length === 0) return null;
  const preferred = ['superJumbo', 'jumbo', 'xlarge', 'large'];
  for (const format of preferred) {
    const found = multimedia.find((m) => m.format === format);
    if (found) return found.url;
  }
  return multimedia[0].url;
}