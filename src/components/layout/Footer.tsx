import { Container, SectionHeader } from '@/components/common';
import { FacebookIcon, YoutubeIcon } from '@/components/icons';
import app from '@/configs/app';
import { AMS_LOGO } from '@/constants/app';
import { amsGroupSites, footerMenus } from '@/data/menu';
import { Facebook, YouTube } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

import ReactIcon from '../my-icon/react.svg';

const Footer = () => {
  return (
    <section className="bg-ams-light dark:bg-zinc-800">
      <Container className="py-3 sm:py-5">
        <section className="flex justify-center sm:justify-start sm:text-left mb-3">
          <Link href="/" className="inline-block">
            <div className="relative w-40 h-20">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="AMS"
                src={AMS_LOGO}
                className="object-contain"
              />
            </div>
          </Link>
        </section>
        <section className="grid md:grid-cols-7 xl:grid-cols-3 gap-5 md:gap-3 lg:gap-5">
          <div className="md:col-span-2 xl:col-auto">
            <SectionHeader
              type="secondary"
              title={app.name}
              lineColor="bg-zinc-50"
              className="text-lg lg:text-xl font-semibold mb-5"
            />
            <div className="grid grid-cols-2 md:grid-cols-none lg:grid-cols-2 gap-3">
              {footerMenus.map((item, index) => (
                <div key={`footer-ams-${index}`}>
                  <Link
                    href={item.href}
                    className="hover:text-ams-primary dark:text-zinc-200 dark:hover:text-white"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 xl:col-auto">
            <SectionHeader
              type="secondary"
              title="បណ្ដាញព័ត៌មានផ្សេងទៀតពី AMS GROUP"
              lineColor="bg-zinc-50"
              className="text-lg lg:text-xl font-semibold mb-5"
            />
            <div className="grid grid-cols-2 md:grid-cols-none lg:grid-cols-2 gap-3">
              {amsGroupSites.map((item, index) => (
                <div key={`ams-group-${index}`}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ams-primary dark:text-zinc-200 dark:hover:text-white"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 xl:col-auto lg:pl-4 ">
            <SectionHeader
              type="secondary"
              title="តាមដានយើងតាមរយៈ"
              lineColor="bg-zinc-50"
              className="text-lg lg:text-xl font-semibold mb-5"
            />
            <div className="flex gap-3">
              {/* <ReactIcon className="css-class" /> */}
              {app.followUs.map((item, index) => (
                <div key={`footer-${index}`}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ams-primary dark:text-zinc-200 dark:hover:text-white"
                  >
                    {item.key === 'facebook' && (
                      // <FacebookIcon className="w-8 h-8 text-blue-600" />
                      <Facebook className="text-blue-600" fontSize="large" />
                    )}
                    {item.key === 'youtube' && (
                      // <YoutubeIcon className="text-red-600" />
                      <YouTube className="text-red-600" fontSize="large" />
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="copy-right mt-8 py-2 lg:px-0 flex items-center justify-between flex-col md:flex-row text-sm text-center">
          <div className="md:text-left py-1">
            ឆ្នាំ{new Date().getFullYear()} © រក្សាសិទ្ធគ្រប់យ៉ាងដោយ
            អប្សរាមេឌាសឺវីស / Apsara Media Services (AMS)
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Footer;
