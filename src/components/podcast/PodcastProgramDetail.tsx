'use client';

import { useAppContext } from '@/components/AppContext';
import PodcastHero from '@/components/podcast/PodcastHero';
import PodcastPostList from '@/components/podcast/PodcastPostList';
import { Caster } from '@/gql/caster';
import { IPodcastProgramDetailComponentProps } from '@/types/component';
import { useEffect } from 'react';

import { Container } from '../common';

const PodcastProgramDetail = ({
  className,
  program,
}: IPodcastProgramDetailComponentProps) => {
  const { setPosts, setProgram } = useAppContext();

  useEffect(() => {
    const posts = Caster.program(program).posts;

    setProgram(program);
    setPosts(posts);
  }, []);

  return (
    <div className={className}>
      <PodcastHero program={program} />
      <Container className="py-5">
        <PodcastPostList />
      </Container>
    </div>
  );
};

export default PodcastProgramDetail;
