import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {

    return (
        <Button
            className={classNames('', {}, [className])}
            theme={ThemeButton.CLEAR}
        >
        </Button>
    )
}