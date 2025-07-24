import dayjs from '@/libs/dayjs';

function timestampTo12Hour(timestamp?: number | string) {
  return dayjs(timestamp).format('hh:mm A');
}

export { timestampTo12Hour };