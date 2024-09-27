import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import Header from '../components/Header';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header Component', () => {
  test('does not render logout button when user is not authenticated', () => {
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' } as any);

    render(<Header />);
    
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('renders logout button when user is authenticated', () => {
    useSession.mockReturnValue({ 
      data: { 
        user: { 
          name: "John",
          email: "john@example.com"
        }
      }, 
      status: 'authenticated' 
    } as any);
    
    render(<Header />);
    
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Register/i)).not.toBeInTheDocument();
  });

  test('calls signOut on logout button click', async () => {
    useSession.mockReturnValue({ 
      data: { 
        user: { 
          name: "John",
          email: "john@example.com"
        }
      }, 
      status: 'authenticated' 
    } as any);

    render(<Header />);

    fireEvent.click(screen.getByRole('button', { name: /Logout/i }));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });
});
