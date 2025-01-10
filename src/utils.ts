import { Word } from "./types";

export function randomEntry(table: Array<Word>): Word {
    const randomIndex = Math.floor(Math.random() * table.length);

    return table[randomIndex];
}