import { Container } from '../common';
import Player from '@components/player/Player';
import { Image } from "@heroui/react";
import { get, isEmpty } from 'lodash';
import { IComponentProps } from '@/types/component';
import dayjs from '@/libs/dayjs';
import app from '@/configs/app';
import { useSharedPlayer } from '@/components/PlayerContext';

interface IProps extends IComponentProps {
}

const PodcastHero = ({className}: IProps) => {

  const { podcast, activePodcastPost: post } = useSharedPlayer();

  return (
    <div className={className}>
      <div className="aspect-video lg:aspect-[16/4] flex items-center relative py-8">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />

        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover opacity-100 absolute inset-0"
          src={podcast?.coverImage || app.appLogo}
          fallbackSrc={app.appLogo}
        />

        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 max-w-4xl mx-auto">
            <div className="relative rounded-full aspect-square shadow-lg h-60">
              <Image
                removeWrapper
                alt="Card background"
                className="w-full h-full object-cover opacity-100 rounded-full"
                src={post?.featuredImage?.node?.sourceUrl || app.appLogo}
                fallbackSrc={app.appLogo}
              />
            </div>
            <div className="text-white w-full md:w-auto">
              {!isEmpty(post) && (
                <>
                  <div className="air-now text-xl md:text-2xl font-semibold">
                    <span
                      className={
                        'before:absolute before:-bottom-3 before:h-1 before:w-9 before:bg-ams-red relative'
                      }
                    >
                      {podcast?.name}
                    </span>
                    <h5 className="my-5 line-clamp-3">{post?.title}</h5>
                    <div className="flex gap-1 items-center">
                      { dayjs(post.date).format('DD/MMMM/YYYY') }
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <Player
            url={get(post, 'url', '')}
            className='mt-8'
          />
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

export default PodcastHero;
