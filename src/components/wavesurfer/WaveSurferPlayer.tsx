// Import WaveSurfer
import { useAppContext } from '../AppContext';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { cloneDeep } from 'lodash';
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

    if (options.media) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(options.media);
    }

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const WaveSurferPlayer = (props: any) => {
  const containerRef: any = useRef();
  const wavesurfer: any = useWavesurfer(containerRef, props);
  const { setPlayer } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  // On play button click
  // const onPlayClick = useCallback(() => {
  //   wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  //   setPlayer(cloneDeep(wavesurfer));
  // }, [setPlayer, wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;

    setPlayer(cloneDeep(wavesurfer));

    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [setPlayer, wavesurfer]);

  return (
    <>
      <div className="py-4" ref={containerRef} />
      {/* 
      <button onClick={onPlayClick}>
        {isPlaying ? (
          <PauseCircleIcon className="h-20 w-20" />
        ) : (
          <PlayCircleIcon className="h-20 w-20" />
        )}
      </button> */}
    </>
  );
};

export default WaveSurferPlayer;
