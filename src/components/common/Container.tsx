import { IComponentProps } from '@/types/component';
import classNames from 'classnames';

const Container = ({ children, className }: IComponentProps) => {
  return (
    <div
      className={classNames(
        'max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl container mx-auto px-3 sm:px-5 z-10',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
