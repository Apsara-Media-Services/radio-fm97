'use client';

import {
  HeaderLogo,
  HeaderMenu,
  HeaderMenuHighlight, // HeaderMenuHighlight,
} from '@/components/layout/header/index';
import { IComponentProps } from '@/types/component';
import Container from '@components/common/Container';
import classNames from 'classnames';

const Header = ({ className }: IComponentProps) => {
  return (
    <div
      className={classNames(
        'bg-ams-light dark:bg-zinc-800 sticky top-0 z-10 shadow-lg',
        className
      )}
    >
      <Container>
        <div className="hidden md:flex ">
          <HeaderLogo className="flex-1" />
          <div className="flex align-middle items-center">
            <HeaderMenuHighlight className="me-3" />
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
