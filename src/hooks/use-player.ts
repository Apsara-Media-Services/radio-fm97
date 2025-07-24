'use client';

import { useState, useEffect } from 'react';
import { VolumeDownRounded, VolumeMuteRounded, VolumeOffRounded, VolumeUpRounded } from '@mui/icons-material';

const usePlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumePrevious, setVolumePrevious] = useState(volume);
  const [VolumeIcon, setVolumeIcon] = useState(() => VolumeUpRounded);
  const [volumePopup, setVolumePopup] = useState(false);

  function handlePlaying(_value?: boolean) {
    const value = _value ?? !playing
    setPlaying(value);
  }

  function handleMute() {
    const _muted = !muted;
    if (_muted) {
      setVolume(0);
    } else {
      if (volumePrevious === 0) {
        setVolume(1);
      } else {
        setVolume(volumePrevious);
      }
    }
    setMuted(_muted)
  }

  function handleVolume(vol: number | string) {
    vol = Number(vol);
    setVolume(vol);
    setVolumePrevious(vol);
    setMuted(vol == 0);
  }

  useEffect(() => {
    if (volume <= 0 || muted) {
      setVolumeIcon(() => VolumeOffRounded);
    } else if (volume < 0.1) {
      setVolumeIcon(() => VolumeMuteRounded);
    } else if (volume < 0.5) {
      setVolumeIcon(() => VolumeDownRounded);
    } else if (volume <= 1) {
      setVolumeIcon(() => VolumeUpRounded);
    }
  }, [volume, muted]);

  return { 
    playing, 
    setPlaying, 
    muted, 
    setMuted, 
    volume, 
    setVolume, 
    volumePrevious, 
    setVolumePrevious, 
    VolumeIcon, 
    setVolumeIcon, 
    volumePopup, 
    setVolumePopup,
    handlePlaying,
    handleMute, 
    handleVolume,
   };
};

export default usePlayer;
