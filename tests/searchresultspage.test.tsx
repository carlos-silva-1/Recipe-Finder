import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResultsPage from '../app/search/page';
import { useSearchParams } from 'next/navigation';

global.fetch = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

useSearchParams.mockReturnValue({
  get: jest.fn().mockReturnValue('test-query'),
});

describe('SearchResultsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<SearchResultsPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders search results', async () => {
    const mockIngredients = [
      { id: 1, name: 'Sugar' },
      { id: 2, name: 'Salt' },
    ];
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockIngredients,
    });

    render(<SearchResultsPage />);

    expect(await screen.findByText('Sugar')).toBeInTheDocument();
    expect(await screen.findByText('Salt')).toBeInTheDocument();
  });

  it('handles add to list successfully', async () => {
    const mockIngredients = [
      { id: 1, name: 'Sugar' },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockIngredients,
    });

    render(<SearchResultsPage />);

    const addButton = await screen.findByText('Add To List');

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Ingredient added successfully' }),
    });

    fireEvent.click(addButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/user/ingredients', expect.anything());
    await waitFor(() => {
      expect(screen.getByText('Ingredient added successfully')).toBeInTheDocument();
    });
  });

  it('handles add to list error', async () => {
    const mockIngredients = [
      { id: 1, name: 'Sugar' },
    ];
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockIngredients,
    });

    render(<SearchResultsPage />);

    const addButton = await screen.findByText('Add To List');
    
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Error adding ingredient' }),
    });

    fireEvent.click(addButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/user/ingredients', expect.anything());
    await waitFor(() => {
      expect(screen.getByText('Error adding ingredient')).toBeInTheDocument();
    });
  });
});
