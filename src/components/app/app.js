import React, { useState } from 'react';
import { alphabets, getRandomLetter } from '../../utils/';

import './app.scss';

const ANIMATION_DURATION = 1000;

const App = () => {
    const { russianAlphabet } = alphabets;
    const [letter, setLetter] = useState(russianAlphabet[0]);
    const [fakeLetter, setFakeLetter] = useState();
    const [isAnimation, setIsAnimation] = useState(false);
    const [pastLetters, setPastLetters] = useState([]);
    const [isUnique, setIsUnique] = useState(false);

    const animationChangeLetter = () => {
        setIsAnimation(true);
        const letterIntervalId = setInterval(() => {
            setFakeLetter(getRandomLetter(russianAlphabet));
        }, 60);

        return new Promise((resolve) => {
            setTimeout(() => {
                clearInterval(letterIntervalId);
                resolve('letter change');
            }, ANIMATION_DURATION);
        });
    };

    const onAnimationEnd = () => {
        setIsAnimation(false);
        setPastLetters([...pastLetters, letter]);
        if (isUnique) {
            const filtered = russianAlphabet.filter((l) => ![...pastLetters, letter].includes(l));
            setLetter(getRandomLetter(filtered));
        } else {
            setLetter(getRandomLetter(russianAlphabet));
        }
    };

    const onChangeClick = () => {
        animationChangeLetter().then(onAnimationEnd);
    };

    return (
        <div className="app">
            <div className="letter">{isAnimation ? fakeLetter : letter}</div>
            <button className="btn" onClick={onChangeClick} disabled={isAnimation} >
                Сменить букву
            </button>
            <div className="settings">
                <h2>Настройки</h2>
                <label>
                    <input
                        type="checkbox"
                        name="repeat"
                        onChange={() => setIsUnique((state) => !state)}
                        checked={isUnique}
                    />
                    <span>Буквы должны быть уникальные</span>
                </label>
            </div>
        </div>
    );
};

export default App;
