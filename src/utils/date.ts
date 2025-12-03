import dayjs from '@/libs/dayjs';

function timestampTo12Hour(timestamp?: number | string) {
  return dayjs.tz(timestamp).format('hh:mm A');
}

function secondToHHMMSS(seconds: number | string) {
  seconds = Number(seconds);
  return dayjs.tz().duration(seconds, 'seconds').format('HH:mm:ss');
}

function dateTo12Hour(date?: Date | string) {
  return dayjs.tz(date).format('hh:mm A');
}

export { timestampTo12Hour, secondToHHMMSS, dateTo12Hour };
