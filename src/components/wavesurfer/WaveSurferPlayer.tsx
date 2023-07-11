'use client';

import { useAppContext } from '@components/AppContext';
import {
  CloseRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
  MinimizeRounded,
  PauseCircleFilled,
  PauseRounded,
  PlayArrowRounded,
  PlayCircleFilled,
  SkipNextRounded,
  SkipPreviousRounded,
  VolumeOffRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import { findIndex } from 'lodash';
import React from 'react';
import WaveSurfer from 'wavesurfer.js';

// Import React hooks
const { useRef, useState, useEffect } = React;

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const ws: any = WaveSurfer.create({
      height: 30,
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

const WaveSurferPlayer = ({ control }: any) => {
  const { setControl } = useAppContext();
  const [ready, setReady] = useState(false);
  const [expandList, setExpandList] = useState(false);

  const { speed, volume, isPlaying, muted, lists } = control;
  const index = findIndex(lists, { active: true });

  const [currentState, setCurrentState] = useState();

  const containerRef: any = useRef();
  const wavesurfer: any = useWavesurfer(containerRef, currentState);

  const handleClose = () => {
    wavesurfer.destroy();
    setReady(false);
    setControl((pre: any) => {
      return { ...pre, lists: [], open: false };
    });
  };

  const handleSkip = (i: any) => {
    if (lists.length <= 1) return;
    wavesurfer.destroy();
    setReady(false);
    let dest = index + i;
    if (dest >= lists.length) dest = 0;
    if (dest <= -1) dest = lists.length - 1;

    setControl((pre: any) => {
      const { lists } = pre;
      lists[index].active = false;
      lists[dest].active = true;
      return { ...pre, lists };
    });
  };

  const handleSetPlayer = (i: any) => {
    if (i == index) return;
    wavesurfer.destroy();
    setReady(false);
    setControl((pre: any) => {
      const { lists } = pre;
      lists[index].active = false;
      lists[i].active = true;
      return { ...pre, lists };
    });
  };

  const handleExpandList = () => {
    setExpandList((pre) => {
      return !pre;
    });
  };

  const handleSpeed = () => {
    setControl((prev: any) => {
      let s = prev.speed;
      s < 2 ? (s += 0.5) : (s = 1);
      wavesurfer.setPlaybackRate(s, true);
      return { ...prev, speed: s };
    });
  };

  const handlePlaying = () => {
    setControl((prev: any) => {
      prev.isPlaying ? wavesurfer.pause() : wavesurfer.play();
      return { ...prev, isPlaying: !prev.isPlaying };
    });
  };

  const handleMute = () => {
    setControl((prev: any) => {
      wavesurfer.setMuted(!prev.muted);
      return { ...prev, muted: !prev.muted };
    });
  };

  const handleVolume = (e: any) => {
    const val = e.target.value;
    setControl((prev: any) => {
      if (val == 0) {
        wavesurfer.setMuted(true);
        return { ...prev, volume: val, muted: true };
      } else {
        wavesurfer.setMuted(false);
        wavesurfer.setVolume(val);
        return { ...prev, volume: val, muted: false };
      }
    });
  };

  useEffect(() => {
    setCurrentState(lists[index]);
    if (!wavesurfer) return;

    const subscriptions = [
      wavesurfer.on('play', () => {
        wavesurfer.setVolume(volume);
        wavesurfer.setMuted(muted);
        wavesurfer.setPlaybackRate(speed, true);
      }),
      wavesurfer.on('interaction', () => {
        wavesurfer.play();
        setControl((prev: any) => {
          return { ...prev, isPlaying: true };
        });
      }),
      wavesurfer.on('ready', () => {
        setReady(true);
        containerRef.current.appendChild(wavesurfer.media);
        isPlaying ? wavesurfer.play() : wavesurfer.pause();
      }),
      wavesurfer.on('finish', () => {
        setTimeout(() => {
          setControl((pre: any) => {
            const { lists } = pre;
            if (lists.length > 1) {
              wavesurfer.destroy();
              setReady(false);
              lists[index].active = false;
              if (lists[index + 1]) {
                lists[index + 1].active = true;
              } else {
                lists[0].active = true;
              }
            } else {
              wavesurfer.play();
            }
            return { ...pre, isPlaying: true, lists };
          });
        }, 3000);
      }),
    ];
    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [index, isPlaying, lists, muted, setControl, speed, volume, wavesurfer]);

  return (
    <div className="bg-ams-light dark:bg-zinc-900 block max-w-4xl mx-auto p-3">
      <div className="mb-3">
        <div className="flex justify-between items-baseline mb-1">
          <div className="flex gap-1 items-baseline">
            <button onClick={handleExpandList}>
              {expandList ? <ExpandLessRounded /> : <ExpandMoreRounded />}
            </button>
            <button
              onClick={handleExpandList}
              className="font-semibold text-left"
            >
              {expandList ? 'Your PlayList' : control.lists[index]?.title}
            </button>
          </div>
          <div className="flex gap-1">
            <button>
              <MinimizeRounded />
            </button>
            <button onClick={handleClose}>
              <CloseRounded />
            </button>
          </div>
        </div>
        <div className={expandList ? 'block' : 'hidden'}>
          <ul className="list-none">
            {control.lists.map((item: any, key: any) => (
              <li key={item.databaseId} className="mb-1 flex items-baseline">
                <button className="me-2">
                  {item.active ? (
                    control.isPlaying ? (
                      <PauseRounded />
                    ) : (
                      <PlayArrowRounded />
                    )
                  ) : (
                    <PlayArrowRounded />
                  )}
                </button>
                <button
                  className="text-left"
                  value={item}
                  onClick={() => handleSetPlayer(key)}
                >
                  <span
                    className={item.active ? 'font-semibold' : 'font-light'}
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {/* {loadingList && <div className="py-4">Loading...</div>} */}
        </div>
      </div>

      <div className="">
        <div className="flex items-center leading-4 gap-x-2">
          <button onClick={() => handleSkip(-1)} title="Skip Previous">
            <SkipPreviousRounded />
          </button>

          <button className="" onClick={handlePlaying}>
            {control.isPlaying ? (
              <PauseCircleFilled style={{ fontSize: 50 }} />
            ) : (
              <PlayCircleFilled style={{ fontSize: 50 }} />
            )}
          </button>

          <button onClick={() => handleSkip(1)} title="Skip Next">
            <SkipNextRounded />
          </button>
          <button className="" onClick={handleSpeed}>
            {control.speed}X
          </button>
          <div className="flex items-center">
            <button className="mr-1" onClick={handleMute}>
              {control.muted ? <VolumeOffRounded /> : <VolumeUpRounded />}
            </button>
            <input
              className="hidden lg:block"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={control.volume}
              onChange={handleVolume}
            />
          </div>
          {!ready && <span>Loading...</span>}
          <div className="w-full">
            <div ref={containerRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveSurferPlayer;
