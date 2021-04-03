import * as alphabets from './alphabets';

const getRandomLetter = (alphabet: string[] ): string => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

const initialSettings: ISettingsState = {
    isUnique: true,
    isAnimation: false,
};

const parseStorage = (storage: string | null) => {
    if (!storage) {
        return null;
    }
    return JSON.parse(storage)
}

export { alphabets, getRandomLetter, parseStorage, initialSettings };
