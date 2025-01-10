import express, { Request, Response } from "express";
import log from "./logger";

import { parseHiragana, parseKatakana } from "./parser";
import { randomEntry } from "./utils";

const PORT = 8080;
const app = express();

let hiraganaRecords = [];
let katakanaRecords = [];

app.use(express.static('./public'));

app.get('/random/:alphabet', (req: Request, res: Response) => {
    try {
        const what = req.params.alphabet;

        switch(what) {
            case "h":
            case "hiragana":
                res.status(200).json(randomEntry(hiraganaRecords)); // csv entry
                break;
            case "k":
            case "katakana":
                res.status(200).json(randomEntry(katakanaRecords)); // csv entry
                break;
            case "m":
            case "mix":
                res.status(200).json(randomEntry(Math.floor(Math.random() * 2) ? hiraganaRecords : katakanaRecords)); // csv entry
                break;
        }
    
        res.status(406).send("Invalid param, available params: hiragana, katakana, mix");
    } catch {
        res.end();
    }
})
  
app.listen(PORT, async () => {
    log.info("Parsing alphabets");

    try {
        hiraganaRecords = await parseHiragana();
        katakanaRecords = await parseKatakana();
    } catch(err) {
        log.error("Unable to parse alphabets")
        log.fatal(err);
        process.exit(1);
    }
    
    log.info("Alphabets parsed");
    log.info(`Japanese learning app is ready and listening on port ${PORT}`)
})