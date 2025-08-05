import app from '@/configs/app';
import { AMS_SECONDARY_LOGO } from '@/constants/app';
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
          <span className="sr-only">{app.appName}</span>
          <div className="h-10 w-20 relative">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={app.appName}
              src={AMS_SECONDARY_LOGO}
              className="object-contain"
            />
          </div>
          <div className="mx-3 w-[2.5px] h-8 bg-ams-blue dark:bg-zinc-400"></div>
          <div className="h-10 w-10 relative mr-1">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={app.appName}
              src={ app.appLogo }
              className="rounded-lg"
            />
          </div>
          <div className="text-xl/10 md:text-2xl/10 font-semibold bg-gradient-to-r from-ams-primary via-ams-purple to-ams-secondary text-transparent bg-clip-text px-1 hidden lg:block relative">
            {app.appName}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HeaderLogo;
