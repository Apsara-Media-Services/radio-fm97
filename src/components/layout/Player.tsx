'use client';

import { useAppContext } from '@components/AppContext';
import { isEmpty } from 'lodash';

// import { StrictMode } from 'react';

const Player = () => {
  // return <></>;
  const { Player } = useAppContext();
  if (isEmpty(Player)) return <></>;
  return Player;
};

export default Player;
