import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <header
        style={{
          textAlign: 'center',
          padding: '2rem 1rem 0',
          borderBottom: '1px solid #e2e2e2',
        }}
      >
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '2.5rem',
            margin: '0 0 1rem',
            letterSpacing: '-0.02em',
            color: '#121212',
          }}
        >
          NYT News Reader
        </h1>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/section/:section" element={<SectionPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="*"
            element={
              <p
                style={{
                  textAlign: 'center',
                  margin: '4rem',
                  color: '#666',
                }}
              >
                Pagina non trovata
              </p>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;