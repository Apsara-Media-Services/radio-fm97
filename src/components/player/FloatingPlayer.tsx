'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import LineClamp from '@/components/common/LineClamp';
import Player from '@/components/player/Player';
import app from '@/configs/app';
import { IComponentProps } from '@/types/component';
import { getMediaUrl } from '@/utils/wp';
import { Button, Card, CardBody, Image } from '@heroui/react';
import { CloseRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingPlayer = ({ className }: IComponentProps) => {
  const { state, isVisible, isMinimal, setIsMinimal, program, post, reset } =
    useSharedPlayer();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsDisabled(!state.canPlay || state.loading);
  }, [state.canPlay, state.loading]);

  return (
    <div className={className}>
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
            <div className="h-auto w-full text-center">
              <Button
                onPress={() => setIsMinimal(!isMinimal)}
                variant="solid"
                className="inline data-hover:bg-none bg-ams-primary rounded-none rounded-t-medium text-white w-30 h-8"
              >
                <KeyboardArrowUpRounded
                  style={{
                    fontSize: 32,
                    transform: isMinimal ? 'rotate(0deg)' : 'rotate(180deg)',
                  }}
                />
              </Button>
            </div>
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
                    className="dark border-none bg-background/60 dark:bg-default-100/50 rounded-none rounded-t-medium"
                    shadow="sm"
                  >
                    <CardBody>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start justify-center">
                        {!isMinimal && (
                          <div className="relative aspect-square rounded-medium shadow-lg h-40 md:h-40">
                            <Image
                              removeWrapper
                              alt={post?.title || program?.name || app.name}
                              className="w-full h-full object-cover opacity-100"
                              src={getMediaUrl(program?.radio?.thumbnail?.node)}
                              fallbackSrc={app.logo}
                            />
                          </div>
                        )}

                        <div className="w-full">
                          <div className="mb-2">
                            {!isMinimal && (
                              <div className="text-ams-primary font-semibold">
                                {program?.name ?? app.tag}
                              </div>
                            )}
                            <h5 className="">
                              <LineClamp
                                content={
                                  state.live
                                    ? 'ផ្សាយផ្ទាល់'
                                    : (post?.title ?? app.name)
                                }
                                line={1}
                              />
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
                          onPress={reset}
                          radius="full"
                          variant="light"
                          className="text-white"
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

export default FloatingPlayer;
