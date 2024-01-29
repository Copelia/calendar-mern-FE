import axios from 'axios';
import { getEnvVars } from '../helpers/getEnvVars';

const { VITE_API_URL } = getEnvVars();

const calendarApi = axios.create({
  baseURL: VITE_API_URL
});

//Config interceptores
calendarApi.interceptors.request.use(config => {

  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }

  return config;
})

export default calendarApi;