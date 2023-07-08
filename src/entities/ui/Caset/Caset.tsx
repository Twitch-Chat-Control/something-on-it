import style from './Caset.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import CASET from '../../../shared/assets/images/player/CASET.svg';
import CASET_PART from '../../../shared/assets/images/player/CASET_PART.svg';
import { BsMicFill } from 'react-icons/bs'
import { FC } from 'react';
import { IEpisode } from 'app/types/PodcastDataType';

interface CasetProps {
    isPlaying: boolean;
    track: IEpisode;
    index: number;
    onClick: (index: number) => void
}

const Caset: FC<CasetProps> = ({ isPlaying, track, index, onClick }) => {
    const { episode, season, title } = track

    return (
        <div
            title={title.split(' | ')[0]}
            className={classNames(style.caset, {}, [])}
            onClick={() => onClick(index)}
        >
            <BsMicFill
                color={'white'}
                size={25}
                className={classNames(style.casetLabel, {}, [])}
            />
            <p className={classNames(style.casetTitle, {}, [])}>
                {`ЭПИЗОД ${episode}. СЕЗОН ${season}`}
            </p>
            <p
                className={classNames(style.casetDescription, {}, [])}>{title.split(' | ')[0]}
            </p>
            <CASET_PART className={`
                        ${classNames(style.casetPart, {}, [style.leftPart])} 
                        ${(isPlaying ? style.rotation : '')}`}
            />
            <CASET_PART className={`
                        ${classNames(style.casetPart, {}, [style.rightPart])} 
                        ${(isPlaying ? style.rotation : '')}`}
            />
            <CASET />
        </div>
    )
}

export { Caset }