import { Container, SectionHeader } from '@/components/common';
import LineSeparator from '@/components/common/LineSeparator';
import { amsGroupSites, footerLearnMoreMenus, footerMenus } from '@/data/menu';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <section className="bg-ams-light dark:bg-zinc-800">
      <Container className="py-3 sm:py-5">
        <section className="flex justify-center sm:justify-start sm:text-left mb-3">
          <Link href="/" className="inline-block">
            <div className="relative w-40 h-20">
              <Image
                fill
                sizes="100vw"
                alt="AMS"
                src="/images/logo.png"
                className="object-contain"
              />
            </div>
          </Link>
        </section>
        {/* <LineSeparator className="my-5" /> */}
        <section className="grid md:grid-cols-7 xl:grid-cols-3 gap-5 md:gap-3 lg:gap-5">
          <div className="md:col-span-2 xl:col-auto">
            <SectionHeader
              type="secondary"
              title="វិទ្យុសំឡេងយុវជន ៩៧"
              lineColor="bg-zinc-50"
              className="text-lg lg:text-xl font-semibold mb-5"
            />
            <div className="grid grid-cols-2 md:grid-cols-none lg:grid-cols-2 gap-3">
              {footerMenus.map((item, index) => (
                <div key={`footer-ams-${index}`}>
                  <Link
                    href={item.href}
                    className="hover:text-ams-red dark:text-zinc-200 dark:hover:text-white"
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
                    className="hover:text-ams-red dark:text-zinc-200 dark:hover:text-white"
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
              title="ស្វែងយល់បន្ថែម"
              lineColor="bg-zinc-50"
              className="text-lg lg:text-xl font-semibold mb-5"
            />
            <div className="grid grid-cols-2 md:grid-cols-none gap-3">
              {footerLearnMoreMenus.map((item, index) => (
                <div key={`footer-${index}`}>
                  <Link
                    href={item.href}
                    className="hover:text-ams-red dark:text-zinc-200 dark:hover:text-white"
                  >
                    {item.name}
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
          <div className="md:text-right py-1">
            <Link href="#">
              គោលការណ៍ភាពឯងជន លក្ខ័ណក្នុងការប្រើប្រាស់ COOKIE (ខូខី)
            </Link>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Footer;
