import moment from 'moment';

export default function dateFormater(unformatedDate) {
  const date = new Date(unformatedDate);
  return moment(date).format('DD/MM/YYYY');
}
