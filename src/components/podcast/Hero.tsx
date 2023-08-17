'use client';

import { PostExcerpt, PostTitle } from '../post';
import { Container } from '../common';
import FallbackImage from '../common/FallbackImage';
import Player from '@components/player/Player';
import PostPodcastTag from '@components/podcast/PostPodcastTag';
// import Image from 'next/image';
import { Button, Image, Progress } from '@nextui-org/react';
import { isEmpty } from 'lodash';
import { format } from 'date-fns';

const Hero = (props: any) => {
  const { className, coverImage, name, activeListItem, handleSkip } = props;

  const classes = {
    title: {
      wrapper: '',
      title: 'text-xl xl:leading-relaxed font-medium',
    },
    excerpt: {
      wrapper: 'mt-3',
      excerpt: 'text-base text-gray-500 dark:text-zinc-400',
    },
    meta: {
      wrapper: 'flex items-center text-sm mt-3',
      author: {
        wrapper: 'flex items-center',
        avatar: 'w-12 h-12 relative mr-4',
        name: 'font-medium text-black dark:text-zinc-200',
      },
      date: {
        wrapper: '',
        date: 'text-gray-500 dark:text-zinc-300',
      },
      category: {
        wrapper: 'mr-3 mb-3',
        name: 'text-sm text-white bg-ams-red',
      },
    },
    lineSeparator: 'border-none pb-4',
  };

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
              <Player activeListItem={activeListItem} handleSkip={handleSkip} />
            )}
          </div>
        </Container>
      </div>
      <div className="">
        <div>
          {/* <div className="air-now">
            <PostPodcastTag
              post={activeListItem}
              config={{
                showCategoryTagMultiple: true,
              }}
              classes={classes.meta.category}
            />
            <PostTitle
              post={activeListItem}
              config={{
                line: 2,
                linkable: true,
              }}
              classes={classes.title}
            />
            <PostExcerpt
              post={activeListItem}
              config={{
                line: 4,
              }}
              classes={classes.excerpt}
            />
            <div className="mt-3 flex items-center leading-4 gap-x-2">
              {activeListItem?.url && (
                <Player
                  activeListItem={activeListItem}
                  handleSkip={handleSkip}
                />
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
