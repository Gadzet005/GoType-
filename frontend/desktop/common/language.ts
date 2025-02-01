const languageCodes = ["eng", "ru"] as const;
export type LanguageCode = (typeof languageCodes)[number];

export class Language {
    private static languages: Record<LanguageCode, Language> = {
        eng: new Language("eng", "English", "abcdefghijklmnopqrstuvwxyz"),
        ru: new Language("ru", "Русский", "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"),
    };

    static byCode(code: LanguageCode): Language | undefined {
        return Language.languages[code];
    }

    readonly code: LanguageCode;
    readonly name: string;
    readonly alphabet: string;

    constructor(code: LanguageCode, name: string, alphabet: string) {
        this.code = code;
        this.name = name;
        this.alphabet = alphabet;
    }

    includes(letter: string): boolean {
        return this.alphabet.includes(letter.toLowerCase());
    }
}
