'use client';

import PostCategoryTag from '@/components/post/PostCategoryTag';
import PostDate from '@/components/post/PostDate';
import { PodcastService } from '@/services';
import { IPostComponentProps } from '@/types/components/post';
import { useAppContext } from '@components/AppContext';
import { Headset, PlaylistAddRounded } from '@mui/icons-material';
import { split, unionBy } from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const podcastService = new PodcastService();

const PostItemDetail = ({ post, className }: IPostComponentProps) => {
  const { setControl } = useAppContext();
  const [lists, setLists] = useState([]);

  const handlePlaying = () => {
    if (!lists.length) return;
    setControl((prev: any) => {
      return { ...prev, isPlaying: true, lists, open: true };
    });
  };

  useEffect(() => {
    if (!post?.enclosure) return;
    const currentAudio = {} as any;
    const audiosUrl = post?.enclosure ? split(post.enclosure, '\n', 1) : [];
    if (!audiosUrl.length) return;
    currentAudio.info = {
      url: audiosUrl[0],
      databaseId: post.databaseId,
      title: post.title,
      active: true,
    };

    const fetchData = async () => {
      let podcast_slug = null as any;
      post?.podcasts?.edges.map(({ node: { slug } }: any) => {
        if (!podcast_slug) podcast_slug = slug;
      });
      if (!podcast_slug) return;
      return await podcastService.getPodcastPosts(podcast_slug as any, {
        variables: { first: 10 },
      });
    };

    fetchData()
      .then(({ posts: { edges } }) => {
        if (!edges.length) return;
        let lists = [] as any;
        lists.push(currentAudio.info);
        edges.map(({ node: { enclosure, databaseId, title } }: any) => {
          if (enclosure) {
            const url = split(enclosure, '\n', 1);
            lists.push({ url: url[0], databaseId, title, active: false });
          }
        });
        lists = unionBy(lists, 'databaseId');
        setLists(lists);
      })
      .catch(console.error);
  }, [post]);

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
      {lists.length > 0 && (
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
