const languages = ["eng", "ru"] as const;

export type Language = (typeof languages)[number];

export interface LanguageInfo {
    name: string;
    flag: string;
    alphabet: string;
}

const languageInfo: Record<Language, LanguageInfo> = {
    eng: {
        name: "English",
        flag: "",
        alphabet: "abcdefghijklmnopqrstuvwxyz",
    },
    ru: {
        name: "Русский",
        flag: "",
        alphabet: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
    },
};

export function getLanguageInfo(language: Language): LanguageInfo | undefined {
    return languageInfo[language];
}

export function isAlphabetIncludesLetter(
    alphabet: string,
    letter: string
): boolean {
    return alphabet.includes(letter.toLowerCase());
}
