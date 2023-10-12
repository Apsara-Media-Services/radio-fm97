'use client';

import { Container } from '../common';
import Player from '@components/player/Player';
import { Image } from '@nextui-org/react';
import { isEmpty } from 'lodash';
import { format } from 'date-fns';

const Hero = (props: any) => {
  const {
    className,
    coverImage,
    name,
    activeListItem,
    handleSkip,
    playing,
    setPlaying,
  } = props;

  // const classes = {
  //   title: {
  //     wrapper: '',
  //     title: 'text-xl xl:leading-relaxed font-medium',
  //   },
  //   excerpt: {
  //     wrapper: 'mt-3',
  //     excerpt: 'text-base text-gray-500 dark:text-zinc-400',
  //   },
  //   meta: {
  //     wrapper: 'flex items-center text-sm mt-3',
  //     author: {
  //       wrapper: 'flex items-center',
  //       avatar: 'w-12 h-12 relative mr-4',
  //       name: 'font-medium text-black dark:text-zinc-200',
  //     },
  //     date: {
  //       wrapper: '',
  //       date: 'text-gray-500 dark:text-zinc-300',
  //     },
  //     category: {
  //       wrapper: 'mr-3 mb-3',
  //       name: 'text-sm text-white bg-ams-red',
  //     },
  //   },
  //   lineSeparator: 'border-none pb-4',
  // };

  return (
    <div className={className}>
      <div className="aspect-video lg:aspect-[16/4] flex items-center relative py-8">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />

        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover opacity-100 absolute inset-0"
          src={coverImage}
        />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-20 z-20 items-center">
            <div className="relative rounded-full aspect-square shadow-lg h-60 mr-auto lg:mr-0 ml-auto">
              <Image
                removeWrapper
                alt="Card background"
                className="w-full h-full object-cover opacity-100 rounded-full"
                src={activeListItem?.featuredImage?.node?.sourceUrl}
              />
            </div>
            <div className="text-white">
              {!isEmpty(activeListItem) && (
                <>
                  <div className="air-now space-y-4 text-xl md:text-2xl font-semibold">
                    <span
                      className={
                        'before:absolute before:-bottom-3 before:h-1 before:w-9 before:bg-ams-red relative'
                      }
                    >
                      {name}
                    </span>
                    <h5>{activeListItem?.title}</h5>
                    <div className="flex gap-1 items-center my-1">
                      {format(new Date(activeListItem?.date), 'dd/MMMM/yyyy')}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-8">
            {activeListItem?.url && (
              <Player
                activeListItem={activeListItem}
                playing={playing}
                setPlaying={setPlaying}
                handleSkip={handleSkip}
              />
            )}
          </div>
        </Container>
      </div>
      {/* To be develop next version for the feature play via podcast app and sharing. */}
      {/* <div className="program-options my-8">
        <div className="max-w-xl md:max-w-5xl xl:max-w-7xl container mx-auto px-3 sm:px-5 z-10">
          <div className="grid md:grid-cols-3 gap-y-4 text-base md:text-lg lg:text-xl font-semibold dark:text-white">
            <div className="current-program">
              <div className="air-now">
                <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                  <div>
                    <span className="text-ams-red font-semibold">
                      {'Google'}
                    </span>{' '}
                    :
                  </div>
                  <time className="font-normal">
                    ស្តាប់វិទ្យុនៅលើ Google Podcast
                  </time>
                </div>
              </div>
            </div>
            <div className="up-next border-t-2 pt-4 md:border-t-0 md:pt-0 md:border-l-2 md:pl-4 dark:border-white">
              <div>
                <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                  <div>
                    <span className="text-ams-red">{'Apple'}</span> :
                  </div>{' '}
                  <time className="font-normal">
                    ស្តាប់វិទ្យុនៅលើ Apple Podcast
                  </time>
                </div>
              </div>
            </div>
            <div className="list-programs border-t-2 pt-4 md:border-t-0 md:pt-0 md:border-l-2 md:pl-4 dark:border-white flex gap-x-2 items-center">
              <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                <ShareRounded className="text-ams-red" />
                <h3 className="">{' ចែករំលែកទៅកាន់បណ្តាញសង្គម'}</h3>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
