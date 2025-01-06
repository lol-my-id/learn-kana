import { parse } from "csv-parse";
import { readFileSync } from "fs";

export function parseHiragana(): Promise<Array<string>> {
    const hiraganaRecords = [];
    return new Promise((resolve,reject)=>{
        const parser = parse(readFileSync("./hiragana.csv"), { delimiter: "," });
        parser.on("readable", function () {
            let record: any;
            while ((record = parser.read()) !== null) {
                hiraganaRecords.push(record[1]);
            }
        });
    
        hiraganaRecords.shift();

        parser.on("error", reject);
        parser.on("end", resolve.bind(this, hiraganaRecords));
    })
}

export function parseKatakana(): Promise<Array<string>> {
    const katakanaRecords = [];
    return new Promise((resolve,reject)=>{
        const parser = parse(readFileSync("./katakana.csv"), { delimiter: "," });
        parser.on("readable", function () {
            let record: any;
            while ((record = parser.read()) !== null) {
                if((record?.[1] ?? "").toString().includes("・"))
                    continue;

                katakanaRecords.push(record[1]);
            }
        });
    
        katakanaRecords.shift();

        parser.on("error", reject);
        parser.on("end", resolve.bind(this, katakanaRecords));
    })
}
