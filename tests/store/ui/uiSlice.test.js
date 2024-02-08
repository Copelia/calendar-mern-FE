import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/uiSlice';

describe('ui Slice tests', () => {
  test('debe regresar estado por defecto', () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test('debe cambiar el isDateModalOpen correctamente', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.onCloseDateModal).toBeFalsy();
  });

});
