'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import { IComponentProps } from '@/types/component';
import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import { secondToHHMMSS } from '@/utils/date';
import { getPostAudio } from '@/utils/wp';
import { Button, Spinner } from '@heroui/react';
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
} from '@mui/icons-material';

interface IProps extends IComponentProps {
  label?: string;
  program: WP_REST_API_ACF_Program;
  post: WP_REST_API_ACF_Post;
}

const PodcastPlayButton = (props: IProps) => {
  const { label, program, post, className } = props;

  const { state, post: activePost, play } = useSharedPlayer();
  const { url, duration } = getPostAudio(post);

  function isActivePost() {
    return post.id === activePost?.id;
  }

  if (!url) {
    return <></>;
  }

  return (
    <div className={className}>
      <Button
        variant="solid"
        className="bg-ams-primary text-base dark:bg-ams-primary-dark text-white"
        onPress={() => play(program, post)}
        startContent={
          state.loading && isActivePost() ? (
            <Spinner color="white" size="sm" />
          ) : state.playing && isActivePost() ? (
            <PauseCircleFilledRounded />
          ) : (
            <PlayCircleFilledRounded />
          )
        }
      >
        {label ?? `ស្តាប់សំលេង ~ ${secondToHHMMSS(duration)}`}
      </Button>
    </div>
  );
};

export default PodcastPlayButton;
