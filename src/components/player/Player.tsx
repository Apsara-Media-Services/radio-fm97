'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import PlayerPlayPause from '@/components/player/PlayerPlayPause';
import PlayerProgress from '@/components/player/PlayerProgress';
import PlayerVolume from '@/components/player/PlayerVolume';
import { IComponentProps } from '@/types/component';
import { Button } from '@heroui/react';
import {
  Forward10Rounded,
  LoopRounded,
  Pause,
  PlayArrow,
  Replay10Rounded,
} from '@mui/icons-material';
import classNames from 'classnames';
import ReactPlayer from 'react-player';

interface IProps extends IComponentProps {
  isLive?: boolean;
  isInline?: boolean;
  isDisabled?: boolean;
}

const Player = (props: IProps) => {
  const { isLive, isInline, isDisabled } = props;

  const {
    state,
    setPlayerRef,
    handlePlayPause,
    handleLoopToggle,
    handleTimeUpdate,
    handleDurationChange,
    handleSeekInSeconds,
    handleEnded,
    handleProgress,
    handleReady,
    handleWaiting,
    handlePlaying,
  } = useSharedPlayer();

  let player = (
    <>
      <PlayerProgress isLive={isLive} isDisabled={isDisabled} />

      <div className="flex items-center justify-center gap-x-2 md:gap-x-4 text-gray-100">
        <Button
          onPress={() => handleLoopToggle()}
          isIconOnly
          className={classNames(
            state.loop
              ? 'bg-gray-100/50'
              : 'data-hover:bg-gray-100/10 text-gray-100'
          )}
          radius="full"
          variant="light"
          isDisabled={isDisabled || isLive}
        >
          <LoopRounded />
        </Button>

        <Button
          onPress={() => handleSeekInSeconds(-10)}
          isIconOnly
          className="data-hover:bg-gray-100/10 outline-none text-gray-100"
          radius="full"
          variant="light"
          isDisabled={isDisabled || isLive}
        >
          <Replay10Rounded />
        </Button>

        <PlayerPlayPause isDisabled={isDisabled} />

        <Button
          onPress={() => handleSeekInSeconds(10)}
          isIconOnly
          className="data-hover:bg-gray-100/10 outline-none text-gray-100"
          radius="full"
          variant="light"
          isDisabled={isDisabled || isLive}
        >
          <Forward10Rounded />
        </Button>

        <PlayerVolume isDisabled={isDisabled} />
      </div>
    </>
  );

  if (isInline) {
    player = (
      <>
        <div className="flex items-center gap-2">
          <Button
            onPress={() => handleSeekInSeconds(-10)}
            isIconOnly
            className={classNames(
              'w-fit min-w-fit h-fit text-gray-100',
              isLive ? 'hidden' : 'hidden md:block'
            )}
            radius="full"
            variant="light"
            isDisabled={isDisabled || isLive}
          >
            <Replay10Rounded style={{ fontSize: 20 }} />
          </Button>
          <Button
            onPress={() => handlePlayPause()}
            isIconOnly
            className={classNames('w-fit min-w-fit h-fit text-gray-100')}
            radius="full"
            variant="light"
            isDisabled={isDisabled}
          >
            {state.playing && <Pause />}
            {!state.playing && <PlayArrow />}
          </Button>
          <Button
            onPress={() => handleSeekInSeconds(10)}
            isIconOnly
            className={classNames(
              'w-fit min-w-fit h-fit text-gray-100',
              isLive ? 'hidden' : 'hidden md:block'
            )}
            radius="full"
            variant="light"
            isDisabled={isDisabled || isLive}
          >
            <Forward10Rounded style={{ fontSize: 20 }} />
          </Button>
          <PlayerProgress isInline isLive={isLive} isDisabled={isDisabled} />
          <PlayerVolume isInline isDisabled={isDisabled} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={props.className}>{player}</div>
      {state.canPlay && (
        <ReactPlayer
          ref={setPlayerRef}
          playsInline={true}
          src={state.src}
          playing={state.playing}
          volume={state.volume}
          muted={state.muted}
          controls={false}
          height={0}
          width={0}
          loop={state.loop}
          onPlay={() => handlePlayPause(true)}
          onPause={() => handlePlayPause(false)}
          onProgress={handleProgress}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={handleEnded}
          onReady={handleReady}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
        />
      )}
    </>
  );
};

export default Player;
