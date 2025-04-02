import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import { AuthContext } from '../context/AuthContext';

const ProtectedComponent = () => <div>Protected Content</div>;

it('redirects unauthenticated user to login', () => {
  render(
    <AuthContext.Provider value={{ user: null }}>
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  expect(screen.getByText(/login page/i)).toBeInTheDocument();
});

it('renders protected content if user is authenticated', () => {
  render(
    <AuthContext.Provider value={{ user: { name: 'Test User' } }}>
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  expect(screen.getByText(/protected content/i)).toBeInTheDocument();
});
