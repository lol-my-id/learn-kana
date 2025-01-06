import express from "express";
import { parseHiragana, parseKatakana } from "./parser";
import { randomEntry } from "./utils";

const PORT = 8080;
const app = express();

let hiraganaRecords = [];
let katakanaRecords = [];

app.use(express.static('./public'));

app.get('/random/:what', (req, res) => {
    try {
        const what = req.params.what;

        switch(what) {
            case "h":
            case "hiragana":
                res.status(200).send(randomEntry(hiraganaRecords)); // csv entry
                break;
            case "k":
            case "katakana":
                res.status(200).send(randomEntry(katakanaRecords)); // csv entry
                break;
            case "m":
            case "mix":
                res.status(200).send(randomEntry(Math.floor(Math.random() * 2) ? hiraganaRecords : katakanaRecords)); // csv entry
                break;
        }
    
        res.status(406).send("Invalid param, available params: hiragana, katakana, mix");
    } catch {
        res.end();
    }
})
  
app.listen(PORT, async () => {
    hiraganaRecords = await parseHiragana();
    katakanaRecords = await parseKatakana();
    
    console.log(`Japanese learning app listening on port ${PORT}`)
})