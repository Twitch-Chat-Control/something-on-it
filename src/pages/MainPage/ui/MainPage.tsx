import InWorkPath from '../../../shared/assets/images/InWork.svg';
import s from './MainPage.module.scss'
import { Player } from 'entities/ui/Player';
import PodcastData from '../../../app/constants/PodcastData.json';
import { Caset } from 'entities/ui/Caset/Caset';
import { IEpisode } from 'app/types/PodcastDataType';
import { useState } from 'react';

const MainPage = () => {
    /**The index of the track that's being played */
    const [trackIndex, setTrackIndex] = useState(0);
    return (
        <div className={s.page}>
            {/* <InWorkPath /> */}
            <div className={s.flex}>
                <Player setTrackIndex={setTrackIndex} trackIndex={trackIndex} />
                <div className={s.casetsContainer}>
                    {(PodcastData as IEpisode[]).map((episode, index) => (
                        <Caset
                            index={index}
                            track={episode}
                            key={index}
                            isPlaying={false}
                            onClick={(index) => setTrackIndex(index)}
                        />
                    ))}
                </div>
            </div>
            <InWorkPath />
        </div>
    )
}

export { MainPage }