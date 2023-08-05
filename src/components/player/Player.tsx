'use client';

import {
  Forward10Rounded,
  PauseCircleFilled,
  PlayCircleFilled,
  Replay10Rounded,
  SkipNextRounded,
  SkipPreviousRounded,
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
  const [volume, setVolume] = useState(0.1);
  const [muted, setMuted] = useState(false);
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
    setMuted((pre: boolean) => !pre);
  };

  const handleVolume = ({ value }: any) => {
    setVolume(Number(value));
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

  return (
    <>
      {ReactPlayer.canPlay(activeListItem.url) && (
        <ReactPlayer
          ref={containerRef}
          url={activeListItem.url}
          playing={playing}
          volume={volume}
          muted={muted}
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
        <div className="w-full">
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
            <div className="flex justify-between items-center leading-4 gap-x-2">
              <div>
                {containerRef?.current &&
                  `${toHHMMSS(
                    containerRef?.current?.getCurrentTime()
                  )} - ${toHHMMSS(containerRef?.current?.getSecondsLoaded())}`}
              </div>
              <div className="flex items-center leading-4 gap-x-2">
                <button className="" onClick={handleSpeed}>
                  Speed {playbackRate}X
                </button>
                <div className="flex items-center">
                  <button className="mr-1" onClick={handleMute}>
                    {muted ? <VolumeOffRounded /> : <VolumeUpRounded />}
                  </button>
                  <input
                    className="hidden lg:block"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={({ target }) => handleVolume(target)}
                  />
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
