import * as alphabets from './alphabets';

const getRandomLetter = (alphabet) => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

const initialSettings = {
    isUnique: true,
    isAnimation: false,
};

export { alphabets, getRandomLetter, initialSettings };
