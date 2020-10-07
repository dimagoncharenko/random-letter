import React, { useState } from 'react';
import { russianAlphabet } from '../../utils/alphabets';

const getRandomLetter = (alphabet) => {
    return alphabet[ Math.floor(Math.random() * alphabet.length)]
};

const App = () => {
    const [letter, setLetter] = useState(russianAlphabet[0]);

    const onLetterChange = () => {
        let newLetter = getRandomLetter(russianAlphabet);

        if (newLetter === letter) {
            onLetterChange();
        } else {
            setLetter(newLetter);
        }
    };

    return (
        <div className="app">
            <div className="letter">{letter}</div>
            <button className="btn" onClick={onLetterChange}>Сменить букву</button>
        </div>
    );
};

export default App;
