import * as alphabets from './alphabets';

const getRandomLetter = (alphabet) => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export {
    alphabets,
    getRandomLetter
}