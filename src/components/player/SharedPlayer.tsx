'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import Player from '@/components/player/Player';
import app from '@/configs/app';
import { IComponentProps } from '@/types/component';
import { getAcfMediaUrl, getMediaUrl } from '@/utils/wp';
import { Button, Card, CardBody, Image } from '@heroui/react';
import { CloseRounded, Crop54Outlined, Remove } from '@mui/icons-material';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

const SharedPlayer = ({ className }: IComponentProps) => {
  const { state, isVisible, isMinimal, setIsMinimal, program, post, reset } =
    useSharedPlayer();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsDisabled(!state.canPlay || state.loading);
  }, [state.canPlay, state.loading]);

  return (
    <div className={classNames('dark', className)}>
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* <div className="h-auto w-full text-center">
              <Button
                onPress={() => setIsMinimal(!isMinimal)}
                variant="solid"
                className="inline data-hover:bg-none bg-ams-primary rounded-none rounded-t-medium text-body w-30 h-8"
              >
                <KeyboardArrowUpRounded
                  style={{
                    fontSize: 32,
                    transform: isMinimal ? 'rotate(0deg)' : 'rotate(180deg)',
                  }}
                />
              </Button>
            </div> */}
            <AnimatePresence initial={false}>
              {
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 rounded-none rounded-t-medium"
                    shadow="sm"
                  >
                    <CardBody>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start justify-center">
                        {!isMinimal && (
                          <div className="relative aspect-square rounded-medium shadow-lg h-40 md:h-40">
                            <Image
                              fill
                              as={NextImage}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              removeWrapper
                              alt={
                                post?.title?.rendered ||
                                program?.name ||
                                app.name
                              }
                              className="w-full h-full object-cover opacity-100"
                              src={
                                program?.acf?.thumbnail
                                  ? getAcfMediaUrl(program.acf?.thumbnail)
                                  : getMediaUrl(post?.relation?.featuredmedia)
                              }
                            />
                          </div>
                        )}

                        <div className="w-full">
                          <div className="mb-2">
                            {!isMinimal && (
                              <div className="text-accent font-semibold">
                                {program?.name ?? app.tag}
                              </div>
                            )}
                            <h5 className="line-clamp-1 text-title">
                              {state.live
                                ? 'ផ្សាយផ្ទាល់'
                                : (post?.title?.rendered ?? app.name)}
                            </h5>
                          </div>
                          <Player
                            isInline={isMinimal}
                            isLive={state.live}
                            isDisabled={isDisabled}
                          />
                        </div>
                      </div>

                      <div className="absolute top-0 right-0">
                        <Button
                          onPress={() => setIsMinimal(!isMinimal)}
                          radius="full"
                          variant="light"
                          className="text-body"
                          isIconOnly
                          data-hover="bg-none"
                        >
                          {isMinimal ? <Crop54Outlined /> : <Remove />}
                        </Button>
                        <Button
                          onPress={reset}
                          radius="full"
                          variant="light"
                          className="text-body hover:text-title"
                          isIconOnly
                          data-hover="bg-none"
                        >
                          <CloseRounded />
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              }
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SharedPlayer;
