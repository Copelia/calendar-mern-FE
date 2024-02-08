import { onLogout } from "../../../src/store";
import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent, onLogoutCalendar } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../__fixtures/calendarStates";

describe('pruebas en calendarSlice', () => {
  test('debe regresar edo por defecto', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test('debe activar el evento', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
    expect(state.activeEvent).toEqual(events[0]);
  });

  test('debe agregar el evento', () => {
    const newEvent = {
      id: '3',
      start: new Date('2023-10-21 13:00:00'),
      end: new Date('2023-10-21 15:00:00'),
      title: 'Examen',
      notes: 'Comprar pastel'
    }
    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
    expect(state.events).toEqual([ ...events, newEvent]);
  });

  test('debe actualizar el evento', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2023-10-21 13:00:00'),
      end: new Date('2023-10-21 15:00:00'),
      title: 'Examen Cope',
      notes: 'Comprar pastel'
    }
    const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
    expect(state.events).toContain(updatedEvent);
  });

  test('debe borrar evento activo', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
    expect(state.activeEvent).toBe(null);
  });

  test('debe establecer eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);

  });

  test('debe limpiar el estado', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
    expect(state).toEqual(initialState);
  });

});
