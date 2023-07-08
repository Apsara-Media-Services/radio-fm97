'use client';

import { PodcastService } from '@/services';
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
import { findIndex, last, split, unionBy } from 'lodash';
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

const podcastService = new PodcastService();

const WaveSurferPlayer = (props: any) => {
  const [activeProp, setActiveProp] = useState({ ...props });
  const { control, setControl, setPlayer } = useAppContext();

  const containerRef: any = useRef();
  const wavesurfer: any = useWavesurfer(containerRef, activeProp);
  const [ready, setReady] = useState(false);
  const [expandList, setExpandList] = useState(false);
  const [lists, setLists] = useState([{ ...props }]);
  const [loadingList, setLoadingList] = useState(true);

  const fetchData = async () => {
    let podcast_slug = null as any;
    props?.post?.podcasts?.edges.map(({ node: { slug } }: any) => {
      if (!podcast_slug) podcast_slug = slug;
    });
    if (!podcast_slug) return;
    return await podcastService.getPodcastPosts(podcast_slug as any, {
      variables: { first: 10 },
    });
  };

  if (loadingList)
    fetchData()
      .then(({ posts: { edges } }) => {
        if (!edges.length) return;
        setLists((pre: any) => {
          edges.map(({ node: { enclosure, databaseId, title } }: any) => {
            if (enclosure) {
              const url = split(enclosure, '\n', 1);
              pre.push({ url, databaseId, title });
            }
          });
          const arr = unionBy(pre, 'databaseId');
          return arr;
        });
        setLoadingList(false);
      })
      .catch(console.error);

  const handleClose = () => {
    wavesurfer.destroy();
    setReady(false);
    setPlayer({});
  };

  const handleSkip = (e: string) => {
    const i = findIndex(lists, ({ databaseId }: any) => {
      return databaseId == activeProp.databaseId;
    });

    if (e === 'next') {
      const arr = lists[i + 1] ? lists[i + 1] : lists[0];
      wavesurfer.destroy();
      setReady(false);
      setActiveProp({ ...arr });
    }

    if (e === 'prev') {
      const arr = lists[i - 1] ? lists[i - 1] : last(lists);
      wavesurfer.destroy();
      setReady(false);
      setActiveProp({ ...arr });
    }
  };

  const handleSetPlayer = (item: object) => {
    wavesurfer.destroy();
    setReady(false);
    setActiveProp({ ...item });
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
      return { ...prev, speed: s };
    });
  };

  const handlePlaying = () => {
    setControl((prev: any) => {
      return { ...prev, isPlaying: !prev.isPlaying };
    });
  };

  const handleMute = () => {
    setControl((prev: any) => {
      return { ...prev, muted: !prev.muted };
    });
  };

  const handleVolume = (e: any) => {
    const val = e.target.value;
    setControl((prev: any) => {
      if (val == 0) return { ...prev, volume: val, muted: true };
      return { ...prev, volume: val };
    });
  };

  useEffect(() => {
    if (!wavesurfer) return;

    control.isPlaying ? wavesurfer.play() : wavesurfer.pause();
    wavesurfer.setVolume(control.volume);
    wavesurfer.setMuted(control.muted);
    wavesurfer.setPlaybackRate(control.speed, true);

    const subscriptions = [
      wavesurfer.on('play', () => {
        setControl((prev: any) => {
          return { ...prev, isPlaying: true };
        });
      }),
      wavesurfer.on('interaction', () => {
        setControl((prev: any) => {
          return { ...prev, isPlaying: true };
        });
      }),
      wavesurfer.on('ready', () => {
        setReady(true);
        setControl((prev: any) => {
          return { ...prev, isPlaying: true };
        });
        containerRef.current.appendChild(wavesurfer.media);
      }),
      wavesurfer.on('finish', () => {
        setTimeout(() => {
          const i = findIndex(lists, ({ databaseId }: any) => {
            return databaseId == activeProp.databaseId;
          });
          const arr = lists[i + 1] ? lists[i + 1] : lists[0];
          wavesurfer.destroy();
          setReady(false);
          setActiveProp({ ...arr });
        }, 3000);
      }),
    ];
    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [control, wavesurfer, lists]);

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
              {expandList ? 'Your PlayList' : activeProp?.title}
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
            {lists.map((item: any) => (
              <li key={item.databaseId} className="mb-1 flex items-baseline">
                <button className="me-2">
                  {item?.databaseId == activeProp?.databaseId ? (
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
                  onClick={() => handleSetPlayer(item)}
                >
                  <span
                    className={
                      item?.databaseId == activeProp?.databaseId
                        ? 'font-semibold'
                        : 'font-light'
                    }
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {loadingList && <div className="py-4">Loading...</div>}
        </div>
      </div>

      <div className="">
        <div className="flex items-center leading-4 gap-x-2">
          <button onClick={() => handleSkip('prev')} title="Skip Previous">
            <SkipPreviousRounded />
          </button>

          <button className="" onClick={handlePlaying}>
            {control.isPlaying ? (
              <PauseCircleFilled style={{ fontSize: 50 }} />
            ) : (
              <PlayCircleFilled style={{ fontSize: 50 }} />
            )}
          </button>

          <button onClick={() => handleSkip('next')} title="Skip Next">
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
