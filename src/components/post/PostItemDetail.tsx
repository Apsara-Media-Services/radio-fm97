'use client';

import PostCategoryTag from '@/components/post/PostCategoryTag';
import PostDate from '@/components/post/PostDate';
import { IPostComponentProps } from '@/types/components/post';
import { useAppContext } from '@components/AppContext';
import WaveSurferPlayer from '@components/wavesurfer/WaveSurferPlayer';
import { Headset, PlaylistAddRounded } from '@mui/icons-material';
import { split } from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const PostItemDetail = ({ post, className }: IPostComponentProps) => {
  const { setPlayer, setControl } = useAppContext();
  const [enclosure, setEnclosure] = useState(null) as any;

  const handlePlaying = () => {
    const ws = (
      <WaveSurferPlayer
        databaseId={post?.databaseId}
        title={post?.title}
        url={enclosure}
        post={post}
      />
    );
    setPlayer(ws);
    setControl((prev: any) => {
      return { ...prev, isPlaying: true };
    });
  };

  useEffect(() => {
    if (!post?.enclosure) return;
    const audios = split(post.enclosure, '\n', 1);
    if (!audios) return;
    setEnclosure(audios[0]);
  }, [post?.enclosure]);

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
        <div className="py-2 mb-2">
          <button className="me-2" onClick={handlePlaying}>
            <Headset style={{ fontSize: 30 }} />
            <span> ស្តាប់សំលេងផ្សាយ</span>
          </button>
          <button title="Add to Your PlayList">
            <PlaylistAddRounded />
          </button>
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
