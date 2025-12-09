'use client';

import { Post, Program } from '@/gql/graphql';
import { useState } from 'react';

const useProgram = () => {
  const [program, setProgram] = useState<Program>({} as Program);
  const [posts, setPosts] = useState<Post[]>([]);

  return {
    program,
    setProgram,
    posts,
    setPosts,
  };
};

export default useProgram;
