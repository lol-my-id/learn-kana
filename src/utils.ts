import { Word } from "./types";

export function randomEntry(table: Array<Word>): Word {
    const randomIndex = Math.floor(Math.random() * table.length);

    return table[randomIndex];
}

export function isHiragana(text: string): boolean {
    if (!text) return false;
    // Allow hiragana range and common small/diacritic marks and long vowel mark
    return /^[\u3041-\u3096\u3099\u309A\u30FC\u309B\u309C]+$/.test(text);
}

export function isKatakana(text: string): boolean {
    if (!text) return false;
    // Allow katakana range, prolonged sound mark and iteration marks
    return /^[\u30A1-\u30FA\u30FD-\u30FF\u30FC]+$/.test(text);
}

export function randomKanaEntry(table: Array<Word>, alphabet: 'hiragana' | 'katakana'): Word {
    if (!Array.isArray(table) || table.length === 0) return undefined as any;

    const candidates = table.filter(item => {
        const reading = (item?.reading ?? "").toString();
        return alphabet === 'hiragana' ? isHiragana(reading) : isKatakana(reading);
    });

    if (candidates.length === 0) {
        // Fallback to any random entry if filtering removed everything
        return randomEntry(table);
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
}