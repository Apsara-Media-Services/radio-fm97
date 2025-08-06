'use client';

import { Container } from '../common';
import { useSharedPlayer } from '@/components/PlayerContext';
import PodcastHero from '@/components/podcast/PodcastHero';
import PodcastPostList from '@/components/podcast/PodcastPostList';
import { Caster } from '@/gql/caster';
import { Podcast, Post } from '@/gql/graphql';
import { IComponentProps } from '@/types/component';
import { first } from 'lodash';
import { useEffect } from 'react';


interface IProps extends IComponentProps {
  podcast: Podcast;
}

const PodcastPage = (props: IProps) => {
  const { setPodcast, setPodcastPosts, setActivePodcastPost } =
    useSharedPlayer();

  useEffect(() => {
    const posts = Caster.podcast(props.podcast).posts;

    setPodcast(props.podcast);
    setPodcastPosts(posts);
    setActivePodcastPost(first(posts) || ({} as Post));
  }, []);

  return (
    <div className={props.className}>
      <PodcastHero />
      <Container className="py-5">
        <PodcastPostList />
      </Container>
    </div>
  );
};

export default PodcastPage;
