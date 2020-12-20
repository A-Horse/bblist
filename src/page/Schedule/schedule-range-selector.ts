import moment from 'moment';

export function generateThisMonthRange() {
  const now = moment();
  return [now.clone().date(1), now.clone().date(31)];
}
