import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ArticleCard from './ArticleCard';

const mockArticle = {
  title: 'Test Article Title',
  abstract: 'This is a test abstract for the article.',
  byline: 'By Test Author',
  section: 'Technology',
  url: 'https://example.com/article',
  multimedia: [{ format: 'superJumbo', url: 'images/test.jpg' }],
};

describe('ArticleCard', () => {
  it('mostra titolo, abstract e sezione', () => {
    render(<ArticleCard article={mockArticle} variant="default" />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText(/test abstract/i)).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });

  it('non mostra abstract nella variante compact', () => {
    render(<ArticleCard article={mockArticle} variant="compact" />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.queryByText(/test abstract/i)).not.toBeInTheDocument();
  });

  it('genera URL immagine completo per percorsi relativi', () => {
    render(<ArticleCard article={mockArticle} variant="hero" />);
    // L'immagine ha alt="" (decorativa), quindi non ha ruolo "img":
    // la cerchiamo con querySelector, coerente con l'accessibilità.
    const img = document.querySelector('img');
    expect(img).toHaveAttribute(
      'src',
      'https://www.nytimes.com/images/test.jpg'
    );
  });

  it("usa URL assoluto se l'immagine inizia con http", () => {
    const absolute = {
      ...mockArticle,
      multimedia: [
        { format: 'superJumbo', url: 'https://static01.nyt.com/img.jpg' },
      ],
    };
    render(<ArticleCard article={absolute} variant="hero" />);
    const img = document.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://static01.nyt.com/img.jpg');
  });

  it('non renderizza immagine se multimedia è assente', () => {
    const noImage = { ...mockArticle, multimedia: [] };
    render(<ArticleCard article={noImage} variant="default" />);
    expect(document.querySelector('img')).toBeNull();
  });

  it('apre il link in una nuova tab con rel sicuro', () => {
    render(<ArticleCard article={mockArticle} variant="default" />);
    const link = screen.getByRole('link', { name: 'Test Article Title' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});