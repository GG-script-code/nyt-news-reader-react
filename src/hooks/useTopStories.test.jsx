import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTopStories } from './useTopStories';
import { getTopStories } from '../services/nytApi';

// Mock del servizio API: nessuna chiamata reale al NYT durante i test
vi.mock('../services/nytApi', () => ({
  getTopStories: vi.fn(),
}));

describe('useTopStories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('restituisce loading=true al primo render', async () => {
    getTopStories.mockResolvedValue({ data: { results: [] } });
    const { result } = renderHook(() => useTopStories('home'));

    // Stato iniziale sincrono
    expect(result.current.loading).toBe(true);

    // Attendiamo la risoluzione per evitare warning act()
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it('carica gli articoli con successo', async () => {
    const articles = [{ title: 'A', url: 'u1' }];
    getTopStories.mockResolvedValue({ data: { results: articles } });

    const { result } = renderHook(() => useTopStories('home'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.articles).toEqual(articles);
    expect(result.current.error).toBeNull();
    expect(result.current.isEmpty).toBe(false);
  });

  it('gestisce lo stato di errore', async () => {
    getTopStories.mockRejectedValue({
      response: { data: { message: 'API error' } },
    });

    const { result } = renderHook(() => useTopStories('home'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('API error');
    expect(result.current.articles).toEqual([]);
  });

  it('flag isEmpty=true se la risposta è vuota', async () => {
    getTopStories.mockResolvedValue({ data: { results: [] } });

    const { result } = renderHook(() => useTopStories('home'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isEmpty).toBe(true);
  });

  it('retry richiama la fetch', async () => {
    getTopStories.mockResolvedValue({ data: { results: [{ title: 'A' }] } });

    const { result } = renderHook(() => useTopStories('home'));
    await waitFor(() => expect(result.current.loading).toBe(false));

    getTopStories.mockClear();

    await act(async () => {
      await result.current.retry();
    });

    expect(getTopStories).toHaveBeenCalledTimes(1);
  });
});