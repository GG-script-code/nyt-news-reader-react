# NYT News Reader

A React single-page application that reimagines The New York Times home page: live news from the NYT Top Stories API, section-based routing, article search, and a responsive editorial layout.

> **Progetto d'esame** — Full Stack Development e AI, React. Autore: Giuseppe (GG-script-code).

---

## Live demo

🔗 [https://nyt-news-reader-react.netlify.app/](https://nyt-news-reader-react.netlify.app/) 

## Features

- **Home editoriale**: hero + sidebar + griglia a 12 colonne ispirata al NYT
- **Navigazione per sezioni**: `world`, `technology`, `science`, `arts` con React Router
- **Ricerca articoli**: form controllato, risultati su griglia, gestione no-results
- **Stati API completi**: loading (skeleton shimmer), error (con retry), success, no-data
- **Design responsive**: da mobile (1 colonna) a desktop (12 colonne) senza rotture
- **Test automatici**: 16 test su componente, custom hook e stato globale

## Stack

| Tecnologia | Ruolo |
|-----------|-------|
| **React 19** + Vite | UI e build |
| **React Router 7** | Routing client-side (`/`, `/section/:section`, `/search`) |
| **Axios** | HTTP client con istanza centralizzata e timeout |
| **Context API + `useReducer`** | Stato globale (sezione, articoli, loading, error) |
| **CSS Modules** | Styling isolato per componente |
| **Vitest + Testing Library** | Test automatici |

## Scelte architetturali

- **Context API invece di Redux**: lo stato dell'app è semplice (sezione, articoli, stati API) e `useReducer` offre transizioni esplicite (`SET_SECTION`, `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`) senza il boilerplate di Redux.
- **Custom hook `useTopStories`**: incapsula la logica di fetching e i quattro stati API, riutilizzabile e testabile in isolamento.
- **Race condition gestita**: ogni `useEffect` di fetch usa un flag `cancelled` nel cleanup, così cambiando sezione rapidamente non si sovrascrive lo stato con risposte obsolete.
- **Immagini con `alt=""`**: le immagini degli articoli sono decorative rispetto al titolo (che è già testo), scelta di accessibilità coerente con le linee guida WCAG.
- **Skeleton loader con shimmer**: performance percepita migliore rispetto a uno spinner generico, allineata alle testate professionali.

## Setup locale

```bash
# 1. Clona
git clone https://github.com/GG-script-code/nyt-news-reader-react.git
cd nyt-news-reader-react

# 2. Installa
npm install

# 3. Configura la chiave API
cp .env.example .env
# Apri .env e inserisci la tua chiave NYT (https://developer.nytimes.com/get-started)

# 4. Avvia
npm run dev        # http://localhost:5173
npm run test       # 16 test automatici
npm run build      # build di produzione

## Struttura del progetto

```text
src/
├── components/    # Navbar, ArticleCard, NewsGrid, Loader, ErrorState, ScrollToTop
├── pages/         # HomePage, SectionPage, SearchPage
├── context/       # NewsContext (state + fetchSection)
├── services/      # nytApi (istanza Axios + endpoint)
├── hooks/         # useTopStories, useDocumentTitle
├── styles/        # (riservato a fogli globali, se necessari)
├── utils/         # formatters (date, truncate, getBestImage)
└── __tests__/     # (co-locati accanto ai file, es. ArticleCard.test.jsx)
```

## API

I dati provengono da **The New York Times Developer Network**:

- **Top Stories:** `GET /svc/topstories/v2/{section}.json`
- **Most Popular:** `GET /svc/mostpopular/v2/viewed/{period}.json` (predisposto)
- **Article Search:** `GET /svc/search/v2/articlesearch.json`

## Licenza

Progetto didattico. I contenuti editoriali sono © The New York Times Company.

---

### 6.6 — Verifica finale e commit

Riavvia il server:

```powershell
npm run dev
```