import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../app/profile/page';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

global.fetch = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-auth/react');

const mockedUseSession = useSession as jest.MockedFunction<typeof useSession>;
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

const push = jest.fn();
mockedUseRouter.mockReturnValue({ push } as any);

describe('Profile Page', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    delete (window as any).location;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information', async () => {
    mockedUseSession.mockReturnValue({ 
      data: { 
        user: { 
          firstName: "Test",
          lastName: "User",
          email: "testuser@example.com"
        }
      }, 
      status: 'authenticated' 
    } as any);

    render(<Profile />);

    expect(await screen.findByText('Test')).toBeInTheDocument();
    expect(await screen.findByText('User')).toBeInTheDocument();
    expect(await screen.findByText('testuser@example.com')).toBeInTheDocument();
  });

  it('disables update button if no new information', async () => {
    mockedUseSession.mockReturnValue({ 
      data: { 
        user: { 
          firstName: "Test",
          lastName: "User",
          email: "testuser@example.com"
        }
      }, 
      status: 'authenticated' 
    } as any);

    render(<Profile />);

    const updateButton = screen.getByRole('button', { name: /Update Profile/i });
    expect(updateButton).toBeDisabled();
  });

  it('updates user information successfully', async () => {
    mockedUseSession.mockReturnValue({ 
      data: { 
        user: { 
          firstName: "Test",
          lastName: "User",
          email: "testuser@example.com"
        }
      }, 
      status: 'authenticated' 
    } as any);

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Profile updated successfully' }),
    });

    render(<Profile />);

    fireEvent.change(screen.getByLabelText(/First Name:/i), { target: { value: 'NewFirstName' } });
    fireEvent.change(screen.getByLabelText(/Last Name:/i), { target: { value: 'NewLastName' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'newemail@example.com' } });

    const updateButton = screen.getByRole('button', { name: /Update Profile/i });
    expect(updateButton).not.toBeDisabled();

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/auth/update-profile', expect.anything());
      expect(screen.getByText('Profile updated successfully')).toBeInTheDocument();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  it('shows error message on update failure', async () => {
    mockedUseSession.mockReturnValue({ 
      data: { 
        user: { 
          firstName: "Test",
          lastName: "User",
          email: "testuser@example.com"
        }
      }, 
      status: 'authenticated' 
    } as any);

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Update failed' }),
    });

    render(<Profile />);

    fireEvent.change(screen.getByLabelText(/First Name:/i), { target: { value: 'NewFirstName' } });
    fireEvent.change(screen.getByLabelText(/Last Name:/i), { target: { value: 'NewLastName' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'newemail@example.com' } });

    const updateButton = screen.getByRole('button', { name: /Update Profile/i });
    expect(updateButton).not.toBeDisabled();

    fireEvent.click(updateButton);

    const errorMessage = await screen.findByText('Update failed');
    expect(errorMessage).toBeInTheDocument();
  });
});
