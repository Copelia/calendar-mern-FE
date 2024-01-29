import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../helpers/calendarLocalizer';
import { Navbar } from '../components/NavBar';
import { CalendarBox } from '../components/CalendarBox';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';

export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = ( user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    };

    return {
      style
    }
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    //almacenar en local storage
    localStorage.setItem('lastView', event);
    //set last view no es necesario, con la línea anterior ya está aplicando el cambio
    setLastView(event)
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)'}}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarBox
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
};
