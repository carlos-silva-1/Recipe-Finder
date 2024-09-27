import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchResultsPage from '../app/search/page';

global.fetch = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

const push = jest.fn();
mockedUseRouter.mockReturnValue({ push } as any);

describe('SearchResultsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays search results on successful fetch', async () => {
    mockedUseSearchParams.mockReturnValue({ get: jest.fn(() => 'apple') });

    fetch.mockResolvedValueOnce({
      json: async () => [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Green Apple' },
      ],
    });

    render(<SearchResultsPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Search Results for "apple"')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Green Apple')).toBeInTheDocument();
    });
    
  });

  it('displays no results message when no ingredients found', async () => {
    mockedUseSearchParams.mockReturnValue({ get: jest.fn(() => 'nonexistent') });

    fetch.mockResolvedValueOnce({ json: async () => [] });

    render(<SearchResultsPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Search Results for "nonexistent"')).toBeInTheDocument());
    expect(screen.getByText('No ingredients found.')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    mockedUseSearchParams.mockReturnValue({ get: jest.fn(() => 'error') });

    (fetch as jest.Mock).mockResolvedValueOnce(new Error('API is down'));

    render(<SearchResultsPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Error fetching ingredients')).toBeInTheDocument());
  });
});
