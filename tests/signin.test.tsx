import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from '../app/auth/signin/page';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedSignIn = signIn as jest.MockedFunction<typeof signIn>;
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('SignIn Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows an error message when sign-in fails', async () => {
    mockedSignIn.mockResolvedValueOnce({ error: 'Invalid Credentials' } as any);
    
    render(<SignInPage />);
    
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid Credentials')).toBeInTheDocument();
    });
  });

  test('redirects to home page on successful sign-in', async () => {
    mockedSignIn.mockResolvedValueOnce({ error: null } as any);
    const push = jest.fn();
    mockedUseRouter.mockReturnValue({ push } as any);
    
    render(<SignInPage />);
    
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/');
    });
  });
});
