import React, { useEffect, useRef, useState } from 'react'
import style from './Player.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import BG from '../../shared/assets/images/player/BG.svg';
import CASET_BG from '../../shared/assets/images/player/CASET_BG.svg';
import CASET from '../../shared/assets/images/player/CASET.svg';
import UP from '../../shared/assets/images/player/UP.svg';
import Screen from '../../shared/assets/images/player/Screen.svg';
import PodcastData from '../../app/constants/PodcastData.json';
import { IEpisode } from 'app/types/PodcastDataType';

const Player = () => {
    /**The index of the track that's being played */
    const [trackIndex, setTrackIndex] = useState(0);
    /**The current progress of the track */
    const [trackProgress, setTrackProgress] = useState(0);
    /**Whether or not the track is being played */
    const [isPlaying, setIsPlaying] = useState(false);

    const tracks = (PodcastData as IEpisode[])
    const { title, season, episode, recording_sourse, links, timings } = tracks[trackIndex];

    // Refs
    const audioRef = useRef(new Audio(recording_sourse));
    const isReady = useRef(false);
    const intervalRef = useRef()

    // Destructure for conciseness
    const { duration } = audioRef.current;

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }

    const startTimer = () => {
        // Clear any timers already running

        (intervalRef.current as NodeJS.Timer) =
            setInterval(() => {
                if (audioRef.current.ended) {
                    toNextTrack();
                } else {
                    setTrackProgress(audioRef.current.currentTime);
                }
            }, 1000);
    }

    const onScrub = (value: number) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }

    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
    // eslint-disable-next-line max-len
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handle setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(recording_sourse);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [trackIndex]);

    useEffect(() => {
        console.log(trackProgress);
    }, [trackProgress])

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    return (
        <div className={classNames(style.container, {}, [])}>
            <BG />
            <CASET_BG className={classNames(style.casetBg, {}, [])} />
            <CASET className={classNames(style.caset, {}, [])} />
            <UP className={classNames(style.up, {}, [])} />
            <Screen className={classNames(style.screen, {}, [])} />
            <button onClick={() => setIsPlaying(true)}>Play</button>
            <button onClick={() => setIsPlaying(false)}>Pause</button>
            <input
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                className="progress"
                onChange={(e) => onScrub(+e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
                style={{ background: trackStyling }}
            />
        </div>
    )
}

export { Player }