import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../apis/calendarApi';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';

//cualquier interacción con el store se hará con este hook
export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async(calendarEvent) => {
    try {
      if( calendarEvent.id ) {
          // Actualizando
          await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
          dispatch( onUpdateEvent({ ...calendarEvent, user }) );
          return;
      } 

      // Creando
      const { data } = await calendarApi.post('/events', calendarEvent );
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.savedEvent.id, user }) );

    } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  }

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
};
