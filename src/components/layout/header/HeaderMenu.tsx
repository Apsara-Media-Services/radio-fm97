import HeaderMenuContent from '@/components/layout/header/HeaderMenuContent';
import HeaderMenuThemeSwitcher from '@/components/layout/header/HeaderMenuThemeSwitcher';
import { IComponentProps } from '@/types/component';
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';
import { CloseRounded, MenuRounded } from '@mui/icons-material';
import classNames from 'classnames';
import { Fragment } from 'react';

const HeaderMenu = ({ className }: IComponentProps) => {
  return (
    <div
      className={classNames('flex items-center justify-end gap-5', className)}
    >
      <HeaderMenuThemeSwitcher />
      <Menu as="div" className="relative hidden md:inline-block">
        {({ open }) => (
          <>
            <MenuButton
              className={classNames(
                'flex focus:outline-none cursor-pointer text-menu',
                open ? 'text-accent' : 'text-hover'
              )}
            >
              {open ? (
                <CloseRounded style={{ fontSize: 30 }} />
              ) : (
                <MenuRounded style={{ fontSize: 30 }} className="" />
              )}
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 top-[47px] origin-top-right z-10 min-w-max overflow-auto bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 focus:outline-none">
                <HeaderMenuContent className="p-5 grid gap-8" />
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default HeaderMenu;
