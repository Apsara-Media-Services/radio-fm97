import dayjs from '@/libs/dayjs';

function timestampTo12Hour(timestamp?: number | string) {
  return dayjs(timestamp).format('hh:mm A');
}

function secondToHHMMSS(seconds: number | string) {
  seconds = Number(seconds);
  return dayjs.duration(seconds, 'seconds').format('HH:mm:ss');
}

export { timestampTo12Hour, secondToHHMMSS };
