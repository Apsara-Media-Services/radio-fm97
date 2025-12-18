import { SectionHeader } from '@/components/common';
import app from '@/configs/app';
import { amsGroupSites, footerMenus } from '@/data/menu';
import { IComponentProps } from '@/types/component';
import Link from 'next/link';

const HeaderMenuContent = ({ className }: IComponentProps) => {
  return (
    <div className={className}>
      <div className="">
        <SectionHeader
          type="secondary"
          title={app.name}
          lineColor="bg-zinc-300 dark:bg-zinc-50"
          className="text-lg lg:text-xl font-semibold mb-5 text-title"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {footerMenus.map((item, index) => (
            <div key={`footer-ams-${index}`} className="md:text-lg">
              <Link href={item.href} className="text-menu text-hover">
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <SectionHeader
          type="secondary"
          title="បណ្ដាញព័ត៌មានផ្សេងទៀតពី AMS GROUP"
          lineColor="bg-zinc-300 dark:bg-zinc-50"
          className="text-lg lg:text-xl font-semibold mb-5 text-gray-900 dark:text-white"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {amsGroupSites.map((item, index) => (
            <div key={`ams-group-${index}`} className="md:text-lg">
              <a
                href={item.href}
                className="text-gray-700 dark:text-slate-300 hover:text-ams-primary dark:hover:text-ams-primary-dark"
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderMenuContent;
