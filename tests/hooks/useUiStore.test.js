import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useUiStore } from '../../src/hooks';
import { uiSlice } from '../../src/store';
import { configureStore } from '@reduxjs/toolkit';

const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  });
}

describe('pruebas en useUiStore', () => {
  test('regresa valores por defecto', () => {
    const mockStore = getMockStore({ isDateModalOpen: false});
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
    });
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function)
    });
  });

  test('openDateModal debe dar true en isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: false});
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
    });

    //extraer objetos es buena práctica, pero si lo haces con valores primitivos, después del act
    // el valor se va a mantener, porque al ser primitivo no mutará.
    const { openDateModal } = result.current;
    act(() => {
      openDateModal();
    });

    //entonces se extrae el primitivo hasta este punto
    expect(result.current.isDateModalOpen).toBeTruthy();

  });

  test('closeDateModal debe dar false en isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: true});
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
    });

    act(() => {
      result.current.closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
