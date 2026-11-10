import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NewsProvider, useNews } from './NewsContext';

function wrapper({ children }) {
  return <NewsProvider>{children}</NewsProvider>;
}

describe('NewsContext', () => {
  it('parte con sezione home e loading true', () => {
    const { result } = renderHook(() => useNews(), { wrapper });

    expect(result.current.state.section).toBe('home');
    expect(result.current.state.loading).toBe(true);
    expect(result.current.state.articles).toEqual([]);
    expect(result.current.state.error).toBeNull();
  });

  it('SET_SECTION cambia sezione e resetta errori', () => {
    const { result } = renderHook(() => useNews(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'SET_SECTION', payload: 'world' });
    });

    expect(result.current.state.section).toBe('world');
    expect(result.current.state.error).toBeNull();
    expect(result.current.state.loading).toBe(true);
  });

  it('FETCH_SUCCESS salva gli articoli e spegne loading', () => {
    const { result } = renderHook(() => useNews(), { wrapper });
    const articles = [{ title: 'A' }];

    act(() => {
      result.current.dispatch({ type: 'FETCH_SUCCESS', payload: articles });
    });

    expect(result.current.state.articles).toEqual(articles);
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.error).toBeNull();
  });

  it('FETCH_ERROR salva errore e svuota articoli', () => {
    const { result } = renderHook(() => useNews(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'FETCH_ERROR', payload: 'Boom' });
    });

    expect(result.current.state.error).toBe('Boom');
    expect(result.current.state.articles).toEqual([]);
    expect(result.current.state.loading).toBe(false);
  });

  it('useNews lancia se usato fuori dal Provider', () => {
    // Silenzia il console.error che React emette quando un errore
    // viene lanciato durante il render in un test
    const original = console.error;
    console.error = () => {};

    expect(() => renderHook(() => useNews())).toThrow(
      'useNews must be used within <NewsProvider>'
    );

    console.error = original;
  });
});