'use client';

import {
  HeaderLogo,
  HeaderMenu,
  HeaderMenuHighlight,
} from '@/components/layout/header/index';
import { IComponentProps } from '@/types/component';
import Container from '@components/common/Container';
import classNames from 'classnames';

const Header = ({ className }: IComponentProps) => {
  return (
    <div
      className={classNames(
        'bg-white dark:bg-slate-950 sticky top-0 z-20 border-b border-gray-200 dark:border-slate-800',
        className
      )}
    >
      <Container>
        <div className="hidden md:flex">
          <HeaderLogo className="flex-1" />
          <div className="flex align-middle items-center gap-x-6">
            <HeaderMenuHighlight />
            <HeaderMenu />
          </div>
        </div>
        <div className="grid md:hidden grid-cols-5">
          <div className="col-span-1" />
          <HeaderLogo className="col-span-3" />
          <HeaderMenu className="col-span-1" />
        </div>
      </Container>
    </div>
  );
};

export default Header;
