import React, { useState } from 'react';
import { alphabets, getRandomLetter } from '../../utils/';

import './app.scss';

const ANIMATION_DURATION = 500;

const App = () => {
    const { russianAlphabet } = alphabets;
    const [letter, setLetter] = useState(russianAlphabet[0]);

    const onLetterChange = () => {
        const letterIntervalId = setInterval(() => {
            let newLetter = getRandomLetter(russianAlphabet);
            setLetter(newLetter);
        }, 60);

        setTimeout(() => {
            clearInterval(letterIntervalId);
        }, ANIMATION_DURATION);
    };

    return (
        <div className="app">
            <div className="letter">{letter}</div>
            <button className="btn" onClick={onLetterChange}>
                Сменить букву
            </button>
        </div>
    );
};

export default App;
