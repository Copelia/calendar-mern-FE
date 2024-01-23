import { dateFnsLocalizer } from 'react-big-calendar';
import esES from 'date-fns/locale/en-US';
import { format, parse, startOfWeek, getDay } from 'date-fns';

const locales = {
  'es': esES,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
