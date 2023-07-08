import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import style from './Player.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import BG from '../../shared/assets/images/player/BG.svg';
import CASET_BG from '../../shared/assets/images/player/CASET_BG.svg';
import UP from '../../shared/assets/images/player/UP.svg';
import Screen from '../../shared/assets/images/player/Screen.svg';
import PodcastData from '../../app/constants/PodcastData.json';
import { IEpisode } from 'app/types/PodcastDataType';
import { AiFillCaretRight, AiOutlinePause } from 'react-icons/ai'
import { Caset } from './Caset/Caset';

interface PlayerProps {
    trackIndex: number;
    setTrackIndex: (index: number) => void
}

const Player: FC<PlayerProps> = ({ setTrackIndex, trackIndex }) => {

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
    const duration = useMemo(() => {
        return audioRef.current.duration
    }, [trackProgress]);

    const currentTime = useMemo(() => {
        return audioRef.current.currentTime
    }, [trackProgress]);

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

    function toDateTime(seconds: number) {
        const result = new Date(seconds * 1000).toISOString().slice(11, 19);
        return result
    }

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
            <div className={classNames(style.casetContainer, {}, [])}>
                <Caset
                    index={trackIndex}
                    track={tracks[trackIndex]}
                    isPlaying={isPlaying}
                    onClick={() => console.log('')}
                />
            </div>
            <UP className={classNames(style.up, {}, [])} />
            <ul className={classNames(style.labelContainer, {}, [])}>
                <li className={classNames(style.label, {}, [style.leftLabel])}>
                    Что-то
                </li>
                <li className={classNames(style.label, {}, [style.rightLabel])}>
                    на ITшном
                </li>
            </ul>
            <Screen className={classNames(style.screen, {}, [])} />
            <ul className={classNames(style.trackContainer, {}, [])}>
                <li className={classNames(style.trackTitle, {}, [])}>
                    {`ЭПИЗОД ${episode}. СЕЗОН ${season}`}
                </li>
                <li className={classNames(style.trackTitle, {}, [])}>
                    {title.split(' | ')[0]}
                </li>
                <li className={classNames(style.slider, {}, [])}>
                    <p className={classNames(style.time, {}, [])}>
                        {currentTime ? toDateTime(currentTime) : '00:00'}
                    </p>
                    <input
                        type="range"
                        value={trackProgress}
                        step="1"
                        min={0}
                        max={duration ? duration : 10}
                        className={style.range}
                        onChange={(e) => onScrub(+e.target.value)}
                        onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}
                    />
                    <p className={classNames(style.timeEnd, {}, [])}>
                        {duration ? toDateTime(duration) : '∞'}
                    </p>
                </li>
                {isPlaying
                    ? <AiOutlinePause
                        onClick={() => setIsPlaying(false)}
                        className={classNames(style.playButton, {}, [])}
                        color={'white'}
                        size={30}
                    />
                    : <AiFillCaretRight
                        onClick={() => setIsPlaying(true)}
                        className={classNames(style.playButton, {}, [])}
                        color={'white'}
                        size={30}
                    />
                }

            </ul>
        </div>
    )
}

export { Player }