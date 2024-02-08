import calendarApi from '../../src/apis/calendarApi';

describe('CalendarAPI tests', () => {
   test('debe tener la configuración por defecto', () => {
    // console.log(calendarApi);
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('debe tener x-token en el header de todas las peticiones', async() => {
    const token = "ABC-123-XYZ";
    localStorage.setItem("token", token);
    const res = await calendarApi
      .get("/auth")
      .then((res) => res)
      .catch((res) => res);
    expect(res.config.headers["x-token"]).toBe(token);

  })
});
