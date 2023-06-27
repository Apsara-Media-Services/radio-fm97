import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import {
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/outline';
import { Slider } from 'antd';
import React from 'react';
import WaveSurfer from 'wavesurfer.js';

// Import React hooks
const { useRef, useState, useEffect, useCallback } = React;

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws: any = WaveSurfer.create({
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
  const [mute, setMute] = useState(false);
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
    setMute(!mute);
  }, [wavesurfer]);

  const handleChange = useCallback(
    (val: number) => {
      if (isNaN(val)) {
        return;
      }
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
    <>
      <div className="mb-2 flex items-center">
        <button className="mr-2" onClick={handlePlaying}>
          {isPlaying ? (
            <PauseCircleOutlined style={{ fontSize: '40px' }} />
          ) : (
            <PlayCircleOutlined style={{ fontSize: '40px' }} />
          )}
        </button>
        {!ready && 'Loading...'}
        <div className="w-full" ref={containerRef} />
      </div>

      <div className="mb-4 flex items-center">
        <div className="flex me-1">
          <button onClick={() => handleSpeed(false)} style={{ fontSize: 0 }}>
            <StepBackwardOutlined style={{ fontSize: '20px' }} />
          </button>
          <span
            style={{ fontSize: '14px', width: '35px', textAlign: 'center' }}
          >
            {speed}X
          </span>
          <button onClick={() => handleSpeed(true)} style={{ fontSize: 0 }}>
            <StepForwardOutlined style={{ fontSize: '20px' }} />
          </button>
        </div>
        <button className="mr-1" onClick={handleMute}>
          {mute ? (
            <SpeakerXMarkIcon width={20} />
          ) : (
            <SpeakerWaveIcon width={20} />
          )}
        </button>

        <Slider
          className="w-full"
          disabled={mute}
          min={0}
          max={1}
          step={0.01}
          value={typeof volume === 'number' ? volume : 0}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default WaveSurferPlayer;
