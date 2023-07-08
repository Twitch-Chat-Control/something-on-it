import React from 'react';
import "./styles/index.scss"
import { classNames } from '../shared/lib/classNames/classNames'
import { MainPage } from 'pages/MainPage';

const App = () => {

    // const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [])}>
            <div className={classNames('crutch', {}, [])}>{'Минимальная ширина: 1280px'}</div>
            <MainPage />
        </div>
    )
}

export default App