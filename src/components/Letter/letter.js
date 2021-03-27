import React from 'react';

const Letter = ({ isAnimationPending, fakeLetter, letter }) => {
    const renderLetter = () => {
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
