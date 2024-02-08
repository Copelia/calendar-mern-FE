import { render, screen } from '@testing-library/react';
import { AppRouter } from '../../src/router/AppRouter';
import { CalendarPage } from '../../src/calendar/pages/CalendarPage';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar/pages/CalendarPage', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('pruebas en AppRouter', () => {

  const mockCheckAuth = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('debe mostrar pantalla de carga y llamar checkAuth', () => {

    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuth,
    });

    render(<AppRouter />);
    // screen.debug();
    expect(screen.getByText('Cargando...')).toBeTruthy();
    expect(mockCheckAuth).toHaveBeenCalled();
  });

  test('debe mostrar login en caso de no estar autenticado', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuth,
    });

    const { container } = 
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('debe mostrar el calendario estando autenticado', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuth,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('CalendarPage')).toBeTruthy();


  });


});
