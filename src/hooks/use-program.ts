'use client';

import { IPaginator } from '@/types/fetch';
import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import { useState } from 'react';

const useProgram = () => {
  const [program, setProgram] = useState<WP_REST_API_ACF_Program>(
    {} as WP_REST_API_ACF_Program
  );
  const [posts, setPosts] = useState<WP_REST_API_ACF_Post[]>([]);
  const [paginator, setPaginator] = useState<IPaginator>({} as IPaginator);

  return {
    program,
    setProgram,
    posts,
    setPosts,
    paginator,
    setPaginator,
  };
};

export default useProgram;
