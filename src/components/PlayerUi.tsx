'use client';

import { useAppContext } from '@/components/AppContext';
import {
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const PlayerUi = (props: any) => {
  const { className } = props;
  const { player, setPlayer } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progess, setProgress] = useState('0%');

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolume = (e: any) => {
    const vol = e.target.value;
    setVolume(vol);
  };

  const handleonProgress = (e: any) => {
    const percent = e.played * 100 + '%';
    setProgress(percent);
  };

  return (
    <div
      className={classNames(
        'bg-ams-light dark:bg-zinc-700 block max-w-3xl mx-auto',
        className
      )}
    >
      <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
        <div className="h-1 bg-red-700" style={{ width: progess }}></div>
      </div>
      <div className="flex justify-between items-center">
        <div>A</div>
        <div className="flex items-center">
          <ReactPlayer
            className="hidden"
            url={
              'https://asset.ams.com.kh/radiomedia/wp-content/uploads/2023/06/27121319/មហាជនសរសើរសមត្ថភាព_ល្អហួស_ក្រោយលេចមុខដើរម៉ូដ_KALKIN_SPRINGSUMMER.mp3'
            }
            onProgress={handleonProgress}
            playing={isPlaying}
            volume={volume}
            muted={isMuted}
            controls={false}
            height={0}
            config={{ file: { forceAudio: true } }}
          />
          <button onClick={handlePlay}>
            {isPlaying ? (
              <PauseCircleIcon width={40} />
            ) : (
              <PlayCircleIcon width={40} />
            )}
          </button>
          <button>
            <ForwardIcon width={20} />
          </button>
          <button className="mr-1" onClick={handleMute}>
            {isMuted ? (
              <SpeakerXMarkIcon width={20} />
            ) : (
              <SpeakerWaveIcon width={20} />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            disabled={isMuted}
            onChange={handleVolume}
          />
        </div>
        <div>B</div>
      </div>
    </div>
  );
};

export default PlayerUi;
