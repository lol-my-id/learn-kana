import { parse } from "csv-parse";
import { readFileSync } from "fs";
import { Word } from "./types";

export function parseHiragana(): Promise<Array<Word>> {
    const hiraganaRecords: Array<Word> = [];
    return new Promise((resolve,reject)=>{
        const parser = parse(readFileSync("./hiragana.csv"), { delimiter: "," });
        parser.on("readable", function () {
            let record: any;
            while ((record = parser.read()) !== null) {
                hiraganaRecords.push({
                    reading: record[1],
                    meaning: record[2],
                    kanji: record[0],
                    alphabet: "hiragana"
                });
            }
        });
    
        hiraganaRecords.shift();

        parser.on("error", reject);
        parser.on("end", resolve.bind(this, hiraganaRecords));
    })
}

export function parseKatakana(): Promise<Array<Word>> {
    const katakanaRecords: Array<Word> = [];
    return new Promise((resolve,reject)=>{
        const parser = parse(readFileSync("./katakana.csv"), { delimiter: "," });
        parser.on("readable", function () {
            let record: any;
            while ((record = parser.read()) !== null) {
                if((record?.[1] ?? "").toString().includes("・"))
                    continue;

                katakanaRecords.push({
                    reading: record[1],
                    meaning: record[0],
                    alphabet: "katakana"
                });
            }
        });
    
        katakanaRecords.shift();

        parser.on("error", reject);
        parser.on("end", resolve.bind(this, katakanaRecords));
    })
}
