'use client';

import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/order
import { useAppContext } from '@components/AppContext';
import {
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import WaveSurfer from 'wavesurfer.js';

// Import React hooks
const { useRef, useState, useEffect, useCallback } = React;

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ws: any = WaveSurfer.create({
      height: 40,
      waveColor: '#545454',
      progressColor: '#a6a6a6',
      cursorColor: '#ddd5e9',
      cursorWidth: 1,
      barWidth: 1,
      barGap: 1,
      interact: true,
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

const WaveSurferPlayer = (props: any) => {
  const containerRef: any = useRef();
  const wavesurfer: any = useWavesurfer(containerRef, props);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [ready, setReady] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handleSpeed = useCallback(
    (val: boolean) => {
      if (val) {
        setSpeed((prev) => {
          if (prev < 2) prev += 0.25;
          wavesurfer.setPlaybackRate(prev);
          return prev;
        });
      } else {
        setSpeed((prev) => {
          if (prev > 0.25) prev -= 0.25;
          wavesurfer.setPlaybackRate(prev);
          return prev;
        });
      }
    },
    [wavesurfer]
  );

  const handlePlaying = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  const handleMute = useCallback(() => {
    const mute = wavesurfer.getMuted();
    wavesurfer.setMuted(!mute);
    setIsMuted(!mute);
  }, [wavesurfer]);

  const handleVolume = useCallback(
    (e: any) => {
      const val = e.target.value;
      wavesurfer.setVolume(val);
      setVolume(val);
    },
    [wavesurfer]
  );

  useEffect(() => {
    if (!wavesurfer) return;
    setIsPlaying(false);
    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('interaction', () => {
        wavesurfer.play();
      }),
      wavesurfer.on('ready', () => {
        setReady(true);
        containerRef.current.appendChild(wavesurfer.media);
      }),
    ];
    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <div className="bg-ams-light dark:bg-zinc-900 block max-w-4xl mx-auto p-3">
      <div className="">
        <div className="mb-2 flex items-center">
          <button className="mr-2" onClick={handlePlaying}>
            {isPlaying ? (
              <PauseCircleIcon width={50} />
            ) : (
              <PlayCircleIcon width={50} />
            )}
          </button>
          {!ready && 'Loading...'}
          <div id="containerRef" className="w-full" ref={containerRef} />
        </div>

        <div className="flex items-center">
          <div className="flex me-2">
            <button onClick={() => handleSpeed(false)} style={{ fontSize: 0 }}>
              <StepBackwardOutlined style={{ fontSize: '20px' }} />
            </button>
            <span
              style={{ fontSize: '14px', width: '30px', textAlign: 'center' }}
            >
              {speed}X
            </span>
            <button onClick={() => handleSpeed(true)} style={{ fontSize: 0 }}>
              <StepForwardOutlined style={{ fontSize: '20px' }} />
            </button>
          </div>
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
      </div>
    </div>
  );
};

export { WaveSurferPlayer, useWavesurfer };
