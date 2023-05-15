import { ILineSeparatorComponentProps } from '@/types/component';
import classNames from 'classnames';

const LineSeparator = (props: ILineSeparatorComponentProps) => {
  const {
    weight = 'border-b-2',
    color = 'border-zinc-300 dark:border-zinc-50',
    className,
  } = props;
  return <div className={classNames(weight, color, className)}></div>;
};

export default LineSeparator;
