import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/authSlice';
import { initialState, authenticatedState, notAuthenticatedState } from '../../__fixtures/authStates';
import { testUserCredentials } from '../../__fixtures/testUser';

describe('ui auth tests', () => {
  test('debe regresar estado por defecto', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('debe realizar login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined
    })
  });

  test('debe hacer logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined
    })
  });

  test('debe hacer logout con mensahe de error', () => {
    const errorMessage = 'Invalid credentials'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: errorMessage
    })
  });

  test('debe limpiar mensaje de error', () => {
    const errorMessage = 'Invalid credentials';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    const newState = authSlice.reducer(state, clearErrorMessage());
    expect(newState.errorMessage).toBe(undefined);
  })

});
