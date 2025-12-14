'use client';

import { WP_REST_API_ACF_Post, WP_REST_API_ACF_Program } from '@/types/wp';
import { isUrlAccessible } from '@/utils/common';
import { getPostAudio } from '@/utils/wp';
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
  VolumeDownRounded,
  VolumeMuteRounded,
  VolumeOffRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

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
  canPlay: false,
  live: false,
  loading: false,
  ready: false,
};

type PlayerState = Omit<typeof initialState, 'src'> & {
  src?: string;
};

const usePlayer = () => {
  const [state, setState] = useState<PlayerState>(initialState);
  const playerRef = useRef<HTMLVideoElement | null>(null);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMinimal, setIsMinimal] = useState<boolean>(false);

  const [PlayingIcon, setPlayingIcon] = useState(() => PlayCircleFilledRounded);
  const [VolumeIcon, setVolumeIcon] = useState(() => VolumeUpRounded);

  const [program, setProgram] = useState({} as WP_REST_API_ACF_Program);
  const [post, setPost] = useState({} as WP_REST_API_ACF_Post);

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

  useEffect(() => {
    const checkCanPlay = async () => {
      if (
        !state.src ||
        !ReactPlayer.canPlay ||
        !ReactPlayer.canPlay(state.src as string)
      ) {
        setState((prevState) => ({ ...prevState, canPlay: false }));
        return;
      }
      const accessible = await isUrlAccessible(state.src as string);
      setState((prevState) => ({ ...prevState, canPlay: accessible }));
    };
    checkCanPlay();
  }, [state.src]);

  useEffect(() => {
    if (!state.playing) return;
    setIsVisible(true);
  }, [state.playing]);

  const load = (src?: string, state?: Partial<PlayerState>) => {
    setState((prevState) => ({
      ...prevState,
      src,
      playing: false,
      played: 0,
      loaded: 0,
      pip: false,
      ...state,
    }));
  };

  const reset = () => {
    setState(initialState);
    setProgram({} as WP_REST_API_ACF_Program);
    setPost({} as WP_REST_API_ACF_Post);
    setIsVisible(false);
    setIsMinimal(false);
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

  // function handleSkipChange(i: number) {
  //   const currentIdx = findIndex(programPosts, { id: activeProgramPost.id });
  //   const nextIdx = currentIdx + i;
  //   const next = nth(programPosts, nextIdx) ?? programPosts[0];

  //   setActiveProgramPost(next);
  // }

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
    if (state.live) return;
    setState((prevState) => ({ ...prevState, seeking: true }));
    setState((prevState) => ({
      ...prevState,
      played: seek,
    }));
  };

  const handleSeekChangeEnd = (seek: number) => {
    if (state.live) return;
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

  const handleReady = () => {
    setState((prevState) => ({ ...prevState, ready: true }));
  };

  const handleWaiting = () => {
    setState((prevState) => ({ ...prevState, loading: true }));
  };

  const handlePlaying = () => {
    setState((prevState) => ({ ...prevState, loading: false }));
  };

  const play = (
    _program: WP_REST_API_ACF_Program,
    _post: WP_REST_API_ACF_Post
  ) => {
    const { url } = getPostAudio(_post);

    if (!url) {
      return;
    }

    setProgram(_program);
    setPost(_post);
    if (_post.id === post.id) {
      handlePlayPause(!state.playing);
      return;
    }
    load(url, { live: false, playing: true });
  };

  function isActivePost(_post: WP_REST_API_ACF_Post) {
    return _post.id === post?.id;
  }

  return {
    program,
    setProgram,
    post,
    setPost,
    state,
    PlayingIcon,
    VolumeIcon,
    playerRef,
    isVisible,
    isMinimal,
    load,
    reset,
    setIsVisible,
    setIsMinimal,
    setPlayerRef,
    handleReady,
    handleWaiting,
    handlePlaying,
    handlePlayPause,
    handleMuteToggle,
    handleVolumeChange,
    handleLoopToggle,
    handleVolumePopupChange,
    handleSeekInSeconds,
    handleSeekChange,
    handleSeekChangeEnd,
    handleProgress,
    handleTimeUpdate,
    handleDurationChange,
    handleEnded,
    play,
    isActivePost,
  };
};

export default usePlayer;
