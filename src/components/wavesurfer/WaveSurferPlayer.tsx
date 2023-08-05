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
import { useCallback, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  useEffect(() => {
    if (!containerRef.current) return;
    if (!options?.url) return;
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
  }, [containerRef, options]);

  return wavesurfer;
};

const WaveSurferPlayer = () => {
  const { control, setControl } = useAppContext();
  const { lists, expandList, isPlaying, open, volume, speed, muted, active } =
    control;
  const [ready, setReady] = useState(false);

  const [item, setItem] = useState(lists[active]) as any;

  const containerRef: any = useRef();
  const wavesurfer = useWavesurfer(containerRef, item) as any;

  const load = () => {
    return;
  };

  const handleClose = () => {
    setControl((pre: any) => {
      return { ...pre, isPlaying: false, open: false };
    });
  };

  const handleSkip = (i: any) => {
    if (!ready) return;
    if (lists.length == 1) return;
    // if (wavesurfer) wavesurfer.destroy();
    let dest = active + i;
    if (dest >= lists.length) dest = 0;
    if (dest <= -1) dest = lists.length - 1;

    setControl((pre: any) => {
      return { ...pre, active: dest };
    });
  };

  const handleSetPlayer = (i: any) => {
    if (!ready) return;
    if (i == active) return;
    // if (wavesurfer) wavesurfer.destroy();
    setControl((pre: any) => {
      return { ...pre, active: i };
    });
  };

  const handleExpandList = () => {
    setControl((pre: any) => {
      return { ...pre, expandList: !pre.expandList };
    });
  };

  const handleSpeed = useCallback(() => {
    if (!ready) return;
    if (!wavesurfer) return;
    let s = speed;
    s < 2 ? (s += 0.5) : (s = 1);
    wavesurfer.setPlaybackRate(s, true);
    setControl((prev: any) => {
      return { ...prev, speed: s };
    });
  }, [ready, setControl, speed, wavesurfer]);

  const handlePlaying = useCallback(() => {
    if (!ready) return;
    setControl((prev: any) => {
      return { ...prev, isPlaying: !prev.isPlaying };
    });
  }, [setControl, ready]);

  const handleMute = useCallback(() => {
    if (!ready) return;
    if (!wavesurfer) return;
    wavesurfer.setMuted(!muted);
    setControl((prev: any) => {
      return { ...prev, muted: !prev.muted };
    });
  }, [ready, wavesurfer, muted, setControl]);

  const handleVolume = (e: any) => {
    if (!ready) return;
    if (!wavesurfer) return;
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
    const { speed, volume, isPlaying, muted, lists, active } = control;
    const item = lists[active];
    setItem(item);

    if (!wavesurfer) return;
    isPlaying ? wavesurfer.play() : wavesurfer.pause();

    const subscriptions = [
      wavesurfer.on('destroy', () => {
        setReady(false);
      }),
      wavesurfer.on('play', () => {
        wavesurfer.setVolume(volume);
        wavesurfer.setMuted(muted);
        wavesurfer.setPlaybackRate(speed, true);
      }),
      wavesurfer.on('ready', () => {
        wavesurfer.setVolume(volume);
        wavesurfer.setMuted(muted);
        wavesurfer.setPlaybackRate(speed, true);
        setReady(true);
        // containerRef.current.appendChild(wavesurfer.media);
      }),
      wavesurfer.on('finish', () => {
        setTimeout(() => {
          const index = lists.length == active + 1 ? 0 : active + 1;
          setControl((pre: any) => {
            // wavesurfer.destroy();
            return { ...pre, active: index };
          });
        }, 2000);
      }),
    ];
    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [control, setControl, wavesurfer]);

  // if (!open) return <></>;
  return (
    <div
      className={`bg-ams-light dark:bg-zinc-900 p-3 ${
        open ? 'block' : 'hidden'
      }`}
    >
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
              {expandList ? 'Your PlayList' : item?.title}
            </button>
          </div>
          <div className="flex gap-1">
            <button onClick={load}>
              <MinimizeRounded />
            </button>
            <button onClick={handleClose}>
              <CloseRounded />
            </button>
          </div>
        </div>
        <div className={expandList ? 'block' : 'hidden'}>
          <ul className="list-none">
            {lists.map((item: any, key: any) => (
              <li key={item.databaseId} className="mb-1 flex items-baseline">
                <button className="me-2">
                  {key == active ? (
                    isPlaying ? (
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
                    className={key == active ? 'font-semibold' : 'font-light'}
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="">
        <div className="flex items-center leading-4 gap-x-2">
          <button onClick={() => handleSkip(-1)} title="Skip Previous">
            <SkipPreviousRounded />
          </button>

          <button className="" onClick={handlePlaying}>
            {isPlaying ? (
              <PauseCircleFilled style={{ fontSize: 50 }} />
            ) : (
              <PlayCircleFilled style={{ fontSize: 50 }} />
            )}
          </button>

          <button onClick={() => handleSkip(1)} title="Skip Next">
            <SkipNextRounded />
          </button>
          <button className="" onClick={handleSpeed}>
            {speed}X
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
              onChange={handleVolume}
            />
          </div>
          <div className="w-full">
            {!ready && <span>Loading...</span>}
            <div
              className={ready ? 'block' : 'hidden'}
              ref={containerRef}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveSurferPlayer;
