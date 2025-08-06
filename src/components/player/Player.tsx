'use client';

import { useSharedPlayer } from '@/components/PlayerContext';
import PlayerPlayPause from '@/components/player/PlayerPlayPause';
import PlayerProgress from '@/components/player/PlayerProgress';
import PlayerVolume from '@/components/player/PlayerVolume';
import { IComponentProps } from '@/types/component';
import { secondToHHMMSS } from '@/utils/date';
import { Button } from '@heroui/react';
import {
  Forward10Rounded,
  LoopRounded,
  Replay10Rounded,
  SkipNextRounded,
  SkipPreviousRounded,
} from '@mui/icons-material';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';

interface IProps extends IComponentProps {
  url: string;
}

const Player = (props: IProps) => {
  const { url } = props;

  const {
    state,
    setPlayerRef,
    handlePlayPause,
    handleSkipChange,
    handleLoopToggle,
    handleProgress,
    handleTimeUpdate,
    handleDurationChange,
    handleSeekInSeconds,
    handleEnded,
  } = useSharedPlayer();

  useEffect(() => {
    handlePlayPause(false);
  }, []);

  if (!url) return <></>;

  return (
    <>
      <div className={props.className}>
        <div className="mt-3">
          <PlayerProgress />
          <div className="flex justify-between">
            <p className="text-small text-gray-100">
              {secondToHHMMSS(state.duration * state.played)}
            </p>
            <p className="text-small text-gray-100/50">
              {secondToHHMMSS(state.duration)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-100">
          <Button
            onPress={() => handleLoopToggle()}
            isIconOnly
            className={
              state.loop
                ? 'bg-gray-100/50 p-1'
                : 'data-[hover]:bg-gray-100/10 p-1'
            }
            radius="full"
            variant="light"
          >
            <LoopRounded />
          </Button>

          <Button
            onPress={() => handleSkipChange(-1)}
            isIconOnly
            className="data-[hover]:bg-gray-100/10 p-1"
            radius="full"
            variant="light"
          >
            <SkipPreviousRounded />
          </Button>

          <Button
            onPress={() => handleSeekInSeconds(-10)}
            isIconOnly
            className="data-[hover]:bg-gray-100/10 p-1 outline-none"
            radius="full"
            variant="light"
          >
            <Replay10Rounded />
          </Button>

          <PlayerPlayPause />

          <Button
            onPress={() => handleSeekInSeconds(10)}
            isIconOnly
            className="data-[hover]:bg-gray-100/10 p-1 outline-none"
            radius="full"
            variant="light"
          >
            <Forward10Rounded />
          </Button>

          <Button
            onPress={() => handleSkipChange(1)}
            isIconOnly
            className="data-[hover]:bg-gray-100/10 p-1"
            radius="full"
            variant="light"
          >
            <SkipNextRounded />
          </Button>

          <PlayerVolume />
        </div>
      </div>
      {ReactPlayer.canPlay && ReactPlayer.canPlay(url) && (
        <ReactPlayer
          ref={setPlayerRef}
          src={url}
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
        />
      )}
      {/* {ready && (
        //  bg-gradient-to-r from-ams-red via-ams-purple to-ams-blue bg-clip-text
        <div className="hidden w-full text-ams-red dark:text-gray-200">
          <div>
            <div className="flex items-center justify-center leading-4 gap-x-2">
              <button onClick={() => handleSkip(-1)} title="Skip Previous">
                <SkipPreviousRounded style={{ fontSize: 30 }} />
              </button>
              <button onClick={() => handleSeek(-0.15)} title="Replay 10sec">
                <Replay10Rounded style={{ fontSize: 30 }} />
              </button>

              <button className="" onClick={handlePlayPausePause}>
                {playing ? (
                  <PauseCircleFilled style={{ fontSize: 60 }} />
                ) : (
                  <PlayCircleFilled style={{ fontSize: 60 }} />
                )}
              </button>
              <button onClick={() => handleSeek(0.15)} title="Forward 10sec">
                <Forward10Rounded style={{ fontSize: 30 }} />
              </button>
              <button onClick={() => handleSkip(1)} title="Skip Next">
                <SkipNextRounded style={{ fontSize: 30 }} />
              </button>
            </div>
            <div className="flex justify-between items-center leading-4 gap-x-2 mb-3">
              <div className="text-sm">
                {containerRef?.current &&
                  `${toHHMMSS(
                    containerRef?.current?.getCurrentTime()
                  )} - ${toHHMMSS(containerRef?.current?.getSecondsLoaded())}`}
              </div>
              <div className="flex items-center leading-4 gap-x-2">
                <button
                  onClick={() => setLoop((pre) => !pre)}
                  className={
                    loop
                      ? 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'
                      : ''
                  }
                >
                  <LoopRounded />
                </button>
                <button className="" onClick={handleSpeed}>
                  {playbackRate}X
                </button>
                <div className="flex items-center">
                  <button onClick={handleVolumeDown}>
                    <RemoveRounded />
                  </button>
                  <button onClick={handleMute}>{vol}</button>
                  <button onClick={handleVolumeUp}>
                    <AddRounded />
                  </button>
                </div>
              </div>
            </div>
            <input
              className="w-full"
              type="range"
              min={0}
              max={0.9999}
              step={0.001}
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <div>
                <span>ស្តាប់លើ Apple</span>
              </div>
              <div>
                <span>ស្តាប់លើ Google</span>
              </div>
            </div>
            <div className="text-center">
              <ShareRounded />
              <div>
                <span className="text-xs">ចែករំលែក</span>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Player;
