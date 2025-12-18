import dayjs from 'dayjs';
import 'dayjs/locale/km';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);

dayjs.tz.setDefault('Asia/Phnom_Penh');

export default dayjs;

export const TIMEZONE = 'Asia/Phnom_Penh';
