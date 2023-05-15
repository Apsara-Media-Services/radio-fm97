import { APP_NAME, APP_NAME_ALT, LOGO } from '@/constants/app';
import { IComponentProps } from '@/types/component';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

const HeaderLogo = ({ className }: IComponentProps) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-center align-center md:justify-start py-3',
        className
      )}
    >
      <Link href="/">
        <div className="flex items-center relative">
          <span className="sr-only">{APP_NAME_ALT}</span>
          <div className="h-10 w-20 relative">
            <Image
              fill
              sizes="100vw"
              alt={APP_NAME_ALT}
              src="/images/secondary-logo.png"
              className="object-contain"
            />
          </div>
          <div className="mx-3 w-[2.5px] h-8 bg-ams-blue dark:bg-zinc-400"></div>
          <div className="h-10 w-10 relative mr-1">
            <Image
              fill
              sizes="100vw"
              alt={APP_NAME_ALT}
              src={LOGO}
              className="rounded-lg"
            />
          </div>
          <div className="text-xl/10 md:text-2xl/10 font-semibold bg-gradient-to-r from-ams-red via-ams-purple to-ams-blue text-transparent bg-clip-text px-1 hidden lg:block">
            {APP_NAME}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HeaderLogo;
