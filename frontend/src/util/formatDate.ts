import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function formatDate(date: string): string {
  return format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
    locale: pt,
  });
}
