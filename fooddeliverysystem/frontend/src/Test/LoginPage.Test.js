import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/LoginPage'; // ✅ Make sure this is the correct path
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

test('renders login form with email and password fields', () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ login: jest.fn() }}>
        <LoginPage />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
