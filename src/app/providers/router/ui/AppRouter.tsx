import React from 'react';
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'

const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map(({ element, path }) => (
                <Route
                    path={path}
                    key={path}
                    element={(
                        <div className='page-wrapper'>
                            {element}
                        </div>
                    )}
                />
            ))}
        </Routes>
    )
}

export default AppRouter