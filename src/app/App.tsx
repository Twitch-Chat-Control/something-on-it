import React from 'react';
import "./styles/index.scss"
import { classNames } from '../shared/lib/classNames/classNames'
import { useTheme } from 'app/providers/ThemeProvider'
import { AppRouter } from "app/providers/router"
import { Suspense } from "react"

const App = () => {

    // const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [])}>
            <div className={classNames('crutch', {}, [])}>{'Минимальная ширина: 1280px'}</div>
            <Suspense fallback=''>
                {/* <Navbar /> */}
                <div className="content-page">
                    {/* <Sidebar /> */}
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App