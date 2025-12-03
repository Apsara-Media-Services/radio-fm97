'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import PodcastHero from '@/components/podcast/PodcastHero';
import PodcastPostList from '@/components/podcast/PodcastPostList';
import { Caster } from '@/gql/caster';
import { Post } from '@/gql/graphql';
import { IPodcastProgramDetailComponentProps } from '@/types/component';
import { first } from 'lodash';
import { useEffect } from 'react';

import { Container } from '../common';

const PodcastProgramDetail = ({
  className,
  program,
}: IPodcastProgramDetailComponentProps) => {
  const { setProgram, setProgramPosts, setActiveProgramPost } =
    useSharedPlayer();

  useEffect(() => {
    const posts = Caster.program(program).posts;

    setProgram(program);
    setProgramPosts(posts);
    setActiveProgramPost(first(posts) || ({} as Post));
  }, []);

  return (
    <div className={className}>
      <PodcastHero />
      <Container className="py-5">
        <PodcastPostList />
      </Container>
    </div>
  );
};

export default PodcastProgramDetail;
