import calendarApi from '../../src/apis/calendarApi';

describe('CalendarAPI tests', () => {
   test('debe tener la configuración por defecto', () => {

    console.log(calendarApi);
    // expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);

  })
});
