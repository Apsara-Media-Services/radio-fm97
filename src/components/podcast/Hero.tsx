'use client';

import { PostExcerpt, PostTitle } from '../post';
import Player from '@components/player/Player';
import PostPodcastTag from '@components/podcast/PostPodcastTag';
import Image from 'next/image';

const Hero = (props: any) => {
  const { className, coverImage, name, activeListItem, handleSkip } = props;

  const classes = {
    title: {
      wrapper: '',
      title: 'text-lg xl:leading-relaxed font-medium',
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
        <div className="aspect-video relative rounded-md shadow-lg">
          <Image src={coverImage} width={600} height={400} alt={name} />
        </div>
        <div>
          <div className="air-now">
            <PostPodcastTag
              post={activeListItem}
              config={{
                showCategoryTagMultiple: true,
              }}
              classes={classes.meta.category}
            />

            {/* <div className="text-xl md:text-2xl my-1 font-semibold">{name}</div> */}
            {/* <div className="flex gap-1 items-center my-1 text-sm md:text-base">
              <time></time>
            </div> */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
