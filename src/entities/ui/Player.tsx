import React from 'react'
import style from './Player.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import BG from '../../shared/assets/images/player/BG.svg';
import CASET_BG from '../../shared/assets/images/player/CASET_BG.svg';
import CASET from '../../shared/assets/images/player/CASET.svg';
import UP from '../../shared/assets/images/player/UP.svg';
import Screen from '../../shared/assets/images/player/Screen.svg';

const Player = () => {
    return (
        <div className={classNames(style.container, {}, [])}>
            <BG />
            <CASET_BG className={classNames(style.casetBg, {}, [])} />
            <CASET className={classNames(style.caset, {}, [])} />
            <UP className={classNames(style.up, {}, [])} />
            <Screen className={classNames(style.screen, {}, [])} />
        </div>
    )
}

export { Player }