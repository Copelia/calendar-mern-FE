export const events = [
  {
    id: '1',
    start: new Date('2023-10-21 13:00:00'),
    end: new Date('2023-10-21 15:00:00'),
    title: 'Cumple',
    notes: 'Comprar pastel'
  },
  {
    id: '2',
    start: new Date('2023-11-21 13:00:00'),
    end: new Date('2023-11-21 15:00:00'),
    title: 'Cumple Chita',
    notes: 'Comprar pastel'
  },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  //se esparce events para romper la referencia al arr original
  events: [...events],
  activeEvent: null
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  //se esparce events para romper la referencia al arr original
  events: [...events],
  activeEvent: { ...events[0] }
};
