import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientsListPage from '../app/ingredients/page';

global.fetch = jest.fn();

describe('IngredientsListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => [],
    });

    render(<IngredientsListPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders ingredient list', async () => {
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => [
        { id: 1, name: 'Sugar' },
        { id: 2, name: 'Salt' },
      ],
    });

    render(<IngredientsListPage />);

    expect(await screen.findByText('Sugar')).toBeInTheDocument();
    expect(await screen.findByText('Salt')).toBeInTheDocument();
  });

  it('handles remove from list', async () => {
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => [
        { id: 1, name: 'Sugar' },
      ],
    });

    render(<IngredientsListPage />);

    const removeButton = await screen.findByText('Remove From List');
    
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => ({ message: 'Ingredient removed successfully' }),
    });

    fireEvent.click(removeButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/user/ingredients', expect.anything());
    expect(await screen.findByText('Ingredient removed successfully')).toBeInTheDocument();
  });

  it('handles remove from list error', async () => {
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => [
        { id: 1, name: 'Sugar' },
      ],
    });

    render(<IngredientsListPage />);

    const removeButton = await screen.findByText('Remove From List');
  
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => ({ error: 'Error removing ingredient' }),
    });

    fireEvent.click(removeButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/user/ingredients', expect.anything());
    expect(await screen.findByText('Error removing ingredient')).toBeInTheDocument();
  });
});
