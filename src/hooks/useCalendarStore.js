import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../apis/calendarApi';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { convertEventstoDate } from '../helpers/convertEventstoDate';

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
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );

    } catch (error) {
        console.log(error);
        Swal.fire('Error while saving', error.response.data.msg, 'error');
    }
  };

  const startDeletingEvent = async() => {
    try{
      await calendarApi.delete(`/events/${ activeEvent.id }`);
      dispatch(onDeleteEvent());
    } catch (error){
      console.log(error);
      Swal.fire('Error while deleting', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async() => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventstoDate(data.events);
      dispatch(onLoadEvents(events));

    } catch (error) {
      console.log('Error loading events');
      console.log(error);
    }
  }

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
};
