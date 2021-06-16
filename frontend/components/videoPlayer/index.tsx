import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core';
import PlayerControls from './PlayerControls';
import screenfull from 'screenfull';

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: '100%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      height: '55vh',
    },
  },
}));

const format = (seconds) => {
  if (isNaN(seconds)) {
    return '00:00';
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }

  return `${mm}:${ss}`;
};

let count = 0;

function VideoPlayer({ poster, videoSources, videoTitle }) {
  const classes = useStyles();
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    quality: 'SD',
    url: videoSources.SD,
    durationPlayed: 0,
  });

  const {
    playing,
    muted,
    volume,
    playbackRate,
    played,
    seeking,
    quality,
    url,
    durationPlayed,
  } = state;

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForWard = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(`${newValue / 100}`),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeekUp = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(`${newValue / 100}`),
      muted: newValue === 0 ? true : false,
    });
  };

  const handlePlaybackRateChange = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const toggleFullScreen = () => {
    let sc: any = screenfull;
    sc.toggle(playerContainerRef.current);
  };

  const handleProgress = (changeState) => {
    if (count > 1) {
      controlsRef.current.style.visibility = 'hidden';
      count = 0;
    }

    if (controlsRef.current.style.visibility == 'visible') {
      count += 1;
    }

    if (!seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(`${newValue / 100}`) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = 'visible';
    count = 0;
  };

  const handleQualityChange = (quality) => {
    if (quality === 'LOW') {
      setState({
        ...state,
        url: videoSources.LOW,
        quality: 'LOW',
        durationPlayed: playerRef.current.getCurrentTime(),
      });
    }
    if (quality === 'HD') {
      setState({
        ...state,
        url: videoSources.HD,
        quality: 'HD',
        durationPlayed: playerRef.current.getCurrentTime(),
      });
    }
    if (quality === 'SD') {
      setState({
        ...state,
        url: videoSources.SD,
        quality: 'SD',
        durationPlayed: playerRef.current.getCurrentTime(),
      });
    }
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : '00:00';
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : '00:00';

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  return (
    <>
      <div
        ref={playerContainerRef}
        className={classes.playerWrapper}
        onMouseMove={handleMouseMove}
      >
        <ReactPlayer
          ref={playerRef}
          width='100%'
          height='100%'
          url={`http://localhost:5000${url}#t=${durationPlayed}`}
          muted={muted}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          onProgress={handleProgress}
        />

        <PlayerControls
          ref={controlsRef}
          onPlayPause={handlePlayPause}
          playing={playing}
          onRewind={handleRewind}
          onFastForward={handleFastForWard}
          muted={muted}
          onMute={handleMute}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekUp={handleVolumeSeekUp}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRateChange}
          onToggleFullScreen={toggleFullScreen}
          played={played}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          quality={quality}
          onQualityChange={handleQualityChange}
          poster={poster}
          videoTitle={videoTitle}
        />
      </div>
    </>
  );
}

export default VideoPlayer;
