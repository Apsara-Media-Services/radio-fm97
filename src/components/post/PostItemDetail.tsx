'use client';

import WaveSurferPlayer from '../wavesurfer/WaveSurferPlayer';
import PostCategoryTag from '@/components/post/PostCategoryTag';
import PostDate from '@/components/post/PostDate';
import { IPostComponentProps } from '@/types/components/post';
import { split } from 'lodash';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';

const PostItemDetail = ({ post, className }: IPostComponentProps) => {
  // const audio = new Audio();
  // audio.controls = true;
  // audio.className = 'block mt-1';
  // console.warn(post);

  const audios = post?.enclosure ? split(post.enclosure, '\n') : [];
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
      {audios.length > 0 && (
        <WaveSurferPlayer
          height={40}
          // splitChannels={false}
          // normalize={false}
          waveColor={'#545454'}
          progressColor={'#a6a6a6'}
          cursorColor={'#ddd5e9'}
          cursorWidth={1}
          barWidth={1}
          barGap={1}
          // barRadius={0}
          // barHeight={null}
          // minPxPerSec={10}
          // fillParent={true}
          // media={audio}
          // autoplay={false}
          interact={true}
          // hideScrollbar={true}
          // audioRate={1}
          // autoScroll={true}
          // autoCenter={true}
          // sampleRate={8000}
          url={audios[0]}
        />
      )}
      <div className="">
        <Image
          alt={post?.title as string}
          src={post?.featuredImage?.node.sourceUrl as string}
          className={'w-full mb-3'}
          width={828}
          height={552}
          // onLoadingComplete={(result) => {
          //   if (result.naturalWidth === 0) {
          //     setImgSrc(fallbackSrc);
          //   }
          // }}
          // onError={() => {
          //   setImgSrc(fallbackSrc);
          // }}
        />
      </div>

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
