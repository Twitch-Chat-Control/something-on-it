import React from 'react'
import InWorkPath from '../../../shared/assets/images/InWork.svg';
import s from './MainPage.module.scss'
import { Player } from 'entities/ui/Player';

const MainPage = () => {
    return (
        <div className={s.page}>
            <Player />
            <InWorkPath />
        </div>
    )
}

export default MainPage