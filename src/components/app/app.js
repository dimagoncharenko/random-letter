import React, { useEffect, useState, useCallback } from 'react';
import { alphabets, getRandomLetter, initialSettings } from '../../utils';
import Letter from '../Letter';
import Settings from '../Settings';

import './app.scss';

const ANIMATION_DURATION = 500;



const App = () => {
    const { russianAlphabet } = alphabets;
    const [letter, setLetter] = useState();
    const [fakeLetter, setFakeLetter] = useState();
    const [isAnimationPending, setIsAnimationPending] = useState(false);
    const [relevantLetters, setRelevatLetters] = useState(russianAlphabet);
    const [pastLetters, setPastLetters] = useState([]);
    const [settings, setSettings] = useState({})
    
    const isHasRelevantLetters = relevantLetters.length;

    const updateRelevantLetters = useCallback(
        (newLetter) => {
            if (settings.isUnique) {
                const filtered = russianAlphabet.filter((l) => ![...pastLetters, newLetter].includes(l));
                setRelevatLetters(filtered);
                return;
            }

            setRelevatLetters(russianAlphabet);
        },
        [pastLetters, russianAlphabet, settings.isUnique]
    );

    useEffect(() => {
        const storageLetters = JSON.parse(localStorage.getItem('pastLetters')) || [];
        const stogeSettings = JSON.parse(localStorage.getItem('settings')) || initialSettings;
        setPastLetters(storageLetters);
        setSettings(stogeSettings);
    }, []);

    useEffect(() => {
        if (!pastLetters.length) {
            return;
        }
        localStorage.setItem('pastLetters', JSON.stringify(pastLetters));
    }, [pastLetters]);

    useEffect(() => {
        updateRelevantLetters();
    }, [settings.isUnique, updateRelevantLetters]);

    const onNewGame = () => {
        setPastLetters([]);
        setLetter('');
        setRelevatLetters(russianAlphabet);
        localStorage.removeItem('pastLetters');
    };

    const animationChangeLetter = () => {
        if (!settings.isAnimation) {
            return Promise.resolve();
        }

        setIsAnimationPending(true);

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
        setIsAnimationPending(false);
        const newLetter = getRandomLetter(relevantLetters);
        setLetter(newLetter);
        return newLetter;
    };

    const onChangeClick = async () => {
        const newLetter = await animationChangeLetter().then(onAnimationEnd);
        setPastLetters([...pastLetters, newLetter]);
        updateRelevantLetters(newLetter);
    };

    return (
        <div className="app">
            {!isHasRelevantLetters && 'Уникальные буквы закончились'}
            <Letter isAnimationPending={isAnimationPending} fakeLetter={fakeLetter} letter={letter} />
            <button className="btn" onClick={onChangeClick} disabled={isAnimationPending || !isHasRelevantLetters}>
                Сменить букву
            </button>
            <button className="btn" onClick={onNewGame}>
                Новая игра
            </button>

            <div className="past-letters">
                <h2>История</h2>
                {pastLetters.map((letter) => `${letter} `)}
            </div>
            <Settings
                settings={settings}
                setSettings={setSettings}
            />
        </div>
    );
};

export default App;
