import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../app/register/page';
import { useRouter } from 'next/navigation';

global.fetch = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('Register Page', () => {
  const push = jest.fn();
  mockedUseRouter.mockReturnValue({ push } as any);

  beforeEach(() => {
    fetch.mockClear();
    push.mockClear();
  });

  test('should register a new user successfully and navigate to sign-in page', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'User created successfully' }),
    });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'Jack' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Dee' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'jack.dee@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/auth/signin');
    });
  });

  test('should fail to register a user with an existing email', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email already in use' }),
    });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email already in use/i)).toBeInTheDocument();
    });
  });
});
