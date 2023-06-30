'use client';

import PostCategoryTag from '@/components/post/PostCategoryTag';
import PostDate from '@/components/post/PostDate';
import { IPostComponentProps } from '@/types/components/post';
import { useAppContext } from '@components/AppContext';
import { WaveSurferPlayer } from '@components/wavesurfer/WaveSurferPlayer';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { split } from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const PostItemDetail = ({ post, className }: IPostComponentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { player, setPlayer } = useAppContext();
  const [enclosure, setEnclosure] = useState(null) as any;
  const handlePlaying = () => {
    setPlayer({ url: enclosure, autoPlay: true });
  };

  useEffect(() => {
    if (!post?.enclosure) return;
    const audios = split(post.enclosure, '\n');
    if (audios.length < 1) return;

    setEnclosure(audios[0]);
    setPlayer({ url: audios[0] });
  }, [post?.enclosure, setPlayer]);

  return (
    <article className={className}>
      <h3 className="entry-title text-xl sm:text-3xl">
        {sanitizeHtml(post?.title as string, { allowedTags: [] })}
      </h3>
      <div className="flex flex-wrap my-5 items-center justify-between">
        <div className="flex flex-wrap items-center">
          <span className="text-sm">
            <PostCategoryTag
              post={post}
              config={{ showCategoryTagMultiple: true }}
            />
          </span>
          <span className="text-sm flex items-center pl-3">
            <PostDate post={post} />
          </span>
        </div>
      </div>

      <div className="">
        <Image
          alt={post?.title as string}
          src={post?.featuredImage?.node.sourceUrl as string}
          className={'w-full mb-3'}
          width={828}
          height={552}
        />
      </div>
      {null != enclosure && (
        <div className="mb-2">
          <WaveSurferPlayer url={enclosure} />
        </div>
      )}

      <div
        className="md:text-lg"
        dangerouslySetInnerHTML={{
          __html: post?.content as string,
        }}
      />
    </article>
  );
};

export default PostItemDetail;
