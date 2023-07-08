import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './NotFoundPage.module.scss'

interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            Страница не найдена
        </div>
    )
}

export default NotFoundPage