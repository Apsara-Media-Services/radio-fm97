'use client';

import {
  AddRounded,
  Forward10Rounded,
  LoopRounded,
  PauseCircleFilled,
  PlayCircleFilled,
  RemoveRounded,
  Replay10Rounded,
  SkipNextRounded,
  SkipPreviousRounded,
  VolumeDownRounded,
  VolumeMuteRounded,
  VolumeOffRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import { parseInt } from 'lodash';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

// import _ReactPlayer, { ReactPlayerProps } from 'react-player';

// const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const Player = (props: any) => {
  const { activeListItem, handleSkip } = props;

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [ready, setReady] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [played, setPlayed] = useState(0);
  const containerRef = useRef() as any;

  if (!containerRef) return <></>;

  const handleSpeed = () => {
    setPlaybackRate((pre: any) => {
      let s = pre;
      s < 2 ? (s += 0.5) : (s = 1);
      return s;
    });
  };

  const handlePlayPause = () => {
    setPlaying((pre: boolean) => !pre);
  };

  const handleMute = () => {
    setVolume(0);
  };

  const handleVolumeDown = () => {
    setVolume((pre) => {
      let vol = Math.ceil(pre * 100);
      if (vol - 5 < 5) {
        vol -= 1;
      } else {
        vol -= 5;
      }
      if (vol <= 0) {
        vol = 0;
      }
      return vol / 100;
    });
  };

  const handleVolumeUp = () => {
    setVolume((pre) => {
      let vol = Math.ceil(pre * 100);
      if (vol >= 5) {
        vol += 5;
      } else {
        vol += 1;
      }
      if (vol >= 100) {
        vol = 100;
      }
      return vol / 100;
    });
  };

  const toHHMMSS = (numSecs: any) => {
    const secNum = parseInt(numSecs, 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - hours * 3600) / 60);
    const seconds = secNum - hours * 3600 - minutes * 60;
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSeek = (sec: number) => {
    if (!ready) return;
    containerRef.current.seekTo(played + sec, 'fraction');
  };
  const handleSeekMouseDown = () => {
    setSeeking(true);
  };
  const handleSeekChange = (e: any) => {
    setPlayed(Number(e.target.value));
  };
  const handleSeekMouseUp = (e: any) => {
    setSeeking(false);
    containerRef.current.seekTo(Number(e.target.value));
  };
  const handleProgress = (e: any) => {
    if (!seeking) setPlayed(e.played);
  };

  let vol = <></>;
  if (volume <= 0) vol = <VolumeOffRounded />;
  else if (volume < 0.3) vol = <VolumeMuteRounded />;
  else if (volume < 0.6) vol = <VolumeDownRounded />;
  else if (volume <= 1) vol = <VolumeUpRounded />;

  return (
    <>
      {ReactPlayer.canPlay(activeListItem.url) && (
        <ReactPlayer
          ref={containerRef}
          url={activeListItem.url}
          playing={playing}
          volume={volume}
          muted={volume ? false : true}
          playbackRate={playbackRate}
          controls={false}
          height={0}
          width={0}
          // config={{ file: { forceAudio: true } }}
          // loop={false}
          // onPlay={() => setPlaying(true)}
          // onPause={() => setPlaying(false)}
          // onPlaybackRateChange={(speed: number) => setPlaybackRate(speed)}
          onError={(e) => console.warn(e)}
          onReady={() => setReady(true)}
          // onPlay={}
          // onPause={}
          onProgress={handleProgress}
          // onDuration={}
          onEnded={() => handleSkip(1)}
        />
      )}
      {ready && (
        //  bg-gradient-to-r from-ams-red via-ams-purple to-ams-blue bg-clip-text
        <div className="w-full text-ams-red dark:text-gray-200">
          <div className="">
            <div className="flex items-center justify-center leading-4 gap-x-2">
              <button onClick={() => handleSkip(-1)} title="Skip Previous">
                <SkipPreviousRounded style={{ fontSize: 30 }} />
              </button>
              <button onClick={() => handleSeek(-0.15)} title="Replay 10sec">
                <Replay10Rounded style={{ fontSize: 30 }} />
              </button>

              <button className="" onClick={handlePlayPause}>
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
                {/* <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
                  <LoopRounded />
                </button> */}
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
        </div>
      )}
    </>
  );
};

export default Player;
