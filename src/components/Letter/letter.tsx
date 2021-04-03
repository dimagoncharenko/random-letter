import React from 'react';

interface OwnProps {
    isAnimationPending: boolean,
    fakeLetter: string,
    letter: string
}

const Letter: React.FC<OwnProps> = ({ isAnimationPending, fakeLetter, letter }) => {
    const renderLetter = (): string => {
        if (isAnimationPending) {
            return fakeLetter;
        }

        if (!letter) {
            return 'Буква не выбрана';
        }

        return letter;
    };

    return <div className="letter">{renderLetter()}</div>;
};

export default Letter;
