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
  const [volume, setVolume] = useState(1);
  const [mute, setMute] = useState(false);

  const handlePlaying = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  const handleMute = useCallback(() => {
    const mute = wavesurfer.getMuted();
    wavesurfer.setMuted(!mute);
    setMute(!mute);
  }, [wavesurfer]);

  const handleChange = useCallback(
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
        containerRef.current.appendChild(wavesurfer.media);
      }),
    ];
    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <button className="mr-2" onClick={handlePlaying}>
          {isPlaying ? (
            <PauseCircleIcon width={50} height={50} />
          ) : (
            <PlayCircleIcon width={50} height={50} />
          )}
        </button>
        <button className="mr-1" onClick={handleMute}>
          {mute ? (
            <SpeakerXMarkIcon width={20} />
          ) : (
            <SpeakerWaveIcon width={20} />
          )}
        </button>
        <input
          disabled={mute}
          onChange={handleChange}
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
        />
      </div>
      <div ref={containerRef} />
    </div>
  );
};

export default WaveSurferPlayer;
