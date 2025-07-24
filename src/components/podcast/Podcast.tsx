'use client';

import { Container } from '../common';
import { first } from 'lodash';
import { useState } from 'react';
import { Caster } from '@/gql/caster';
import { Podcast, Post } from '@/gql/graphql';
import { IComponentProps } from '@/types/component';
import PodcastHero from '@/components/podcast/PodcastHero';
import PodcastPostList from '@/components/podcast/PodcastPostList';

interface IProps extends IComponentProps {
  podcast: Podcast;
}

const PodcastPage = (props: IProps) => {
  const [podcast, setPodcast] = useState(props.podcast);
  const [posts, setPosts] = useState(Caster.podcast(podcast).posts);
  const [activePost, setActivePost] = useState(first(posts) || {} as Post);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleSkip = (i: any) => {
    const length = posts.length;
    let dest = 0;
    const input = active + i;
    if (length > input) {
      if (input > -1) {
        dest = input;
      } else {
        dest = length - 1;
      }
    }
    setActive(dest);
  };

  const onClickPlay = (post: Post) => {
    setActivePost(post);
    if (activePost?.id === post.id) {
      setPlaying(!playing);
    } else {
      setPlaying(true);
    }
  };

  const onLoadMore = (_podcast: Podcast) => {
    setPodcast(_podcast);
    setPosts((pre: Post[]) => [...pre, ...Caster.podcast(_podcast).posts]);
  };

  return (
    <div className={props.className}>
      <PodcastHero podcast={podcast} post={activePost} />
      <Container className="py-5">
        <PodcastPostList 
          podcast={podcast} 
          posts={posts} 
          activePost={activePost} 
          playing={playing}
          onClickPlay={onClickPlay}
          onLoadMore={onLoadMore}
        />
      </Container>
    </div>
  );
};

export default PodcastPage;
