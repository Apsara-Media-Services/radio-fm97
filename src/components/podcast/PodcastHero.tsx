'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import LineClamp from '@/components/common/LineClamp';
import app from '@/configs/app';
import { IComponentProps } from '@/types/component';
import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import { getAcfMediaUrl, getPostAudio } from '@/utils/wp';
import { Button, Image } from '@heroui/react';
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
} from '@mui/icons-material';

import { Container } from '../common';

interface IProps extends IComponentProps {
  program: WP_REST_API_ACF_Program;
  post: WP_REST_API_ACF_Post;
}

const PodcastHero = ({ className, program, post }: IProps) => {
  const { state, post: activePost, play } = useSharedPlayer();

  const { url } = getPostAudio(post);

  function isActivePost() {
    return post.id === activePost?.id;
  }

  return (
    <div className={className}>
      <div className="min-h-96 flex items-center relative py-8">
        <div className="bg-img bg-black/80 absolute inset-0 z-10" />

        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover opacity-100 absolute inset-0"
          src={getAcfMediaUrl(program.acf.thumbnail)}
          fallbackSrc={app.logo}
        />

        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 max-w-4xl mx-auto">
            <div className="relative rounded-full aspect-square shadow-lg h-48 md:h-60">
              <Image
                removeWrapper
                alt="Card background"
                className="w-full h-full object-cover opacity-100 rounded-full"
                src={getAcfMediaUrl(program.acf.thumbnail)}
                fallbackSrc={app.logo}
              />
            </div>
            <div className="text-white w-full md:w-auto">
              <div className="text-2xl md:text-3xl font-semibold">
                <span
                  className={
                    'before:absolute before:-bottom-3 before:h-1 before:w-9 before:bg-ams-primary relative'
                  }
                >
                  {program.name}
                </span>
              </div>
              <h5 className="my-5 text-lg text-slate-200">
                <LineClamp content={program.description} line={4} />
              </h5>
              {url && (
                <div>
                  <Button
                    variant="solid"
                    className="bg-ams-primary text-white font-semibold"
                    isLoading={state.loading && isActivePost()}
                    onPress={() => play(program, post)}
                    startContent={
                      state.playing && isActivePost() ? (
                        <PauseCircleFilledRounded />
                      ) : (
                        <PlayCircleFilledRounded />
                      )
                    }
                  >
                    ស្តាប់វគ្គចុងក្រោយ
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PodcastHero;
