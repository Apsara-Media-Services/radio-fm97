'use client';

import { Podcast, Post } from '@/gql/graphql';
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
  VolumeDownRounded,
  VolumeMuteRounded,
  VolumeOffRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import { findIndex, nth } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

const initialState = {
  src: undefined,
  pip: false,
  playing: false,
  controls: false,
  light: false,
  volume: 1,
  volumePrevious: 1,
  volumePopup: false,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
  seeking: false,
  loadedSeconds: 0,
  playedSeconds: 0,
};

type PlayerState = Omit<typeof initialState, 'src'> & {
  src?: string;
};

const usePlayer = () => {
  const [state, setState] = useState<PlayerState>(initialState);
  const playerRef = useRef<HTMLVideoElement | null>(null);

  const [PlayingIcon, setPlayingIcon] = useState(() => PlayCircleFilledRounded);
  const [VolumeIcon, setVolumeIcon] = useState(() => VolumeUpRounded);

  const [podcast, setPodcast] = useState({} as Podcast);
  const [activePodcastPost, setActivePodcastPost] = useState({} as Post);
  const [podcastPosts, setPodcastPosts] = useState([] as Post[]);

  useEffect(() => {
    if (state.volume <= 0 || state.muted) {
      setVolumeIcon(() => VolumeOffRounded);
    } else if (state.volume < 0.1) {
      setVolumeIcon(() => VolumeMuteRounded);
    } else if (state.volume < 0.5) {
      setVolumeIcon(() => VolumeDownRounded);
    } else if (state.volume <= 1) {
      setVolumeIcon(() => VolumeUpRounded);
    }
  }, [state.volume, state.muted]);

  useEffect(() => {
    if (state.playing) {
      setPlayingIcon(() => PauseCircleFilledRounded);
    } else {
      setPlayingIcon(() => PlayCircleFilledRounded);
    }
  }, [state.playing]);

  const load = (src?: string) => {
    setState((prevState) => ({
      ...prevState,
      src,
      playing: false,
      played: 0,
      loaded: 0,
      pip: false,
    }));
  };

  const setPlayerRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    playerRef.current = player;
  }, []);

  const handlePlayPause = (_value?: boolean) => {
    setState((prevState) => ({
      ...prevState,
      playing: _value ?? !prevState.playing,
    }));
  };

  const handleMuteToggle = () => {
    const muted = !state.muted;
    const volume = muted
      ? 0
      : state.volumePrevious === 0
        ? 1
        : state.volumePrevious;
    setState((prevState) => ({
      ...prevState,
      muted,
      volume,
    }));
  };

  const handleVolumeChange = (volume: number | string) => {
    volume = Number(volume);
    setState((prevState) => ({
      ...prevState,
      volume,
      volumePrevious: volume,
      muted: volume === 0,
    }));
  };

  const handleVolumePopupChange = (value: boolean) => {
    setState((prevState) => ({
      ...prevState,
      volumePopup: value ?? !prevState.playing,
    }));
  };

  function handleSkipChange(i: number) {
    const currentIdx = findIndex(podcastPosts, { id: activePodcastPost.id });
    const nextIdx = currentIdx + i;
    const next = nth(podcastPosts, nextIdx) ?? podcastPosts[0];

    setActivePodcastPost(next);
  }

  const handleLoopToggle = () => {
    setState((prevState) => ({ ...prevState, loop: !prevState.loop }));
  };

  const handleSeekInSeconds = (seconds: number) => {
    const player = playerRef.current;
    if (!player || !player.duration) return;

    const newTime = Math.min(
      Math.max(player.currentTime + seconds, 0),
      player.duration
    );
    player.currentTime = newTime;

    setState((prevState) => ({
      ...prevState,
      played: newTime / player.duration,
      playedSeconds: newTime,
    }));
  };

  const handleSeekChange = (seek: number) => {
    setState((prevState) => ({ ...prevState, seeking: true }));
    setState((prevState) => ({
      ...prevState,
      played: seek,
    }));
  };

  const handleSeekChangeEnd = (seek: number) => {
    setState((prevState) => ({ ...prevState, seeking: false }));
    if (playerRef.current) {
      playerRef.current.currentTime = seek * playerRef.current.duration;
    }
  };

  const handleProgress = () => {
    const player = playerRef.current;
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking || !player.buffered?.length) return;

    setState((prevState) => ({
      ...prevState,
      loadedSeconds: player.buffered?.end(player.buffered?.length - 1),
      loaded:
        player.buffered?.end(player.buffered?.length - 1) / player.duration,
    }));
  };

  const handleTimeUpdate = () => {
    const player = playerRef.current;
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking) return;

    if (!player.duration) return;

    setState((prevState) => ({
      ...prevState,
      playedSeconds: player.currentTime,
      played: player.currentTime / player.duration,
    }));
  };

  const handleDurationChange = () => {
    const player = playerRef.current;
    if (!player) return;

    setState((prevState) => ({ ...prevState, duration: player.duration }));
  };

  const handleEnded = () => {
    setState((prevState) => ({ ...prevState, playing: prevState.loop }));
  };

  return {
    podcast,
    setPodcast,
    activePodcastPost,
    setActivePodcastPost,
    podcastPosts,
    setPodcastPosts,
    state,
    PlayingIcon,
    VolumeIcon,
    playerRef,
    load,
    setPlayerRef,
    handlePlayPause,
    handleMuteToggle,
    handleVolumeChange,
    handleLoopToggle,
    handleVolumePopupChange,
    handleSkipChange,
    handleSeekInSeconds,
    handleSeekChange,
    handleSeekChangeEnd,
    handleProgress,
    handleTimeUpdate,
    handleDurationChange,
    handleEnded,
  };
};

export default usePlayer;
