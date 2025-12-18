import dayjs from '@/libs/dayjs';
import { isFinite, isNaN } from 'lodash';

function timestampTo12Hour(timestamp?: number | string) {
  return dayjs(timestamp).format('hh:mm A');
}

function secondToHHMMSS(seconds: number | string) {
  if (isNaN(seconds) || !isFinite(seconds)) return '00:00';

  seconds = Number(seconds);
  return dayjs.duration(seconds, 'seconds').format('mm:ss');
}

function dateTo12Hour(date?: Date | string) {
  return dayjs(date).format('hh:mm A');
}

export { timestampTo12Hour, secondToHHMMSS, dateTo12Hour };
