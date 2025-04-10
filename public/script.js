// Japanese Romanization Script
const delay = ms => new Promise(res => setTimeout(res, ms));

const isHiragana = (txt) => !txt.split('').some(x => !(x in hiraganaToRomaji));
const isKatakana = (txt) => !txt.split('').some(x => !(x in katakanaToRomaji));
const isMixOfBoth = (txt) => !txt.split('').some(x => !(x in {...katakanaToRomaji, ...hiraganaToRomaji}));

const hiraganaToRomaji = {
    "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo", "ん": "n",
    "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go",
    "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo",
    "だ": "da", "ぢ": "ji", "づ": "zu", "で": "de", "ど": "do",
    "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo",
    "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po",
    "きゃ": "kya", "きゅ": "kyu", "きょ": "kyo",
    "しゃ": "sha", "しゅ": "shu", "しょ": "sho",
    "ちゃ": "cha", "ちゅ": "chu", "ちょ": "cho",
    "にゃ": "nya", "にゅ": "nyu", "にょ": "nyo",
    "ひゃ": "hya", "ひゅ": "hyu", "ひょ": "hyo",
    "みゃ": "mya", "みゅ": "myu", "みょ": "myo",
    "りゃ": "rya", "りゅ": "ryu", "りょ": "ryo",
    "ぎゃ": "gya", "ぎゅ": "gyu", "ぎょ": "gyo",
    "じゃ": "ja", "じゅ": "ju", "じょ": "jo",
    "びゃ": "bya", "びゅ": "byu", "びょ": "byo",
    "ぴゃ": "pya", "ぴゅ": "pyu", "ぴょ": "pyo",
    "っ": "small-tsu"
};

const katakanaToRomaji = {
    "ア": "a", "イ": "i", "ウ": "u", "エ": "e", "オ": "o",
    "カ": "ka", "キ": "ki", "ク": "ku", "ケ": "ke", "コ": "ko",
    "サ": "sa", "シ": "shi", "ス": "su", "セ": "se", "ソ": "so",
    "タ": "ta", "チ": "chi", "ツ": "tsu", "テ": "te", "ト": "to",
    "ナ": "na", "ニ": "ni", "ヌ": "nu", "ネ": "ne", "ノ": "no",
    "ハ": "ha", "ヒ": "hi", "フ": "fu", "ヘ": "he", "ホ": "ho",
    "マ": "ma", "ミ": "mi", "ム": "mu", "メ": "me", "モ": "mo",
    "ヤ": "ya", "ユ": "yu", "ヨ": "yo",
    "ラ": "ra", "リ": "ri", "ル": "ru", "レ": "re", "ロ": "ro",
    "ワ": "wa", "ヲ": "wo", "ン": "n",
    "ガ": "ga", "ギ": "gi", "グ": "gu", "ゲ": "ge", "ゴ": "go",
    "ザ": "za", "ジ": "ji", "ズ": "zu", "ゼ": "ze", "ゾ": "zo",
    "ダ": "da", "ヂ": "ji", "ヅ": "zu", "デ": "de", "ド": "do",
    "バ": "ba", "ビ": "bi", "ブ": "bu", "ベ": "be", "ボ": "bo",
    "パ": "pa", "ピ": "pi", "プ": "pu", "ペ": "pe", "ポ": "po",
    "キャ": "kya", "キュ": "kyu", "キョ": "kyo", "ヴェ": "we",
    "シャ": "sha", "シュ": "shu", "ショ": "sho", "シェ": "she",
    "チャ": "cha", "チュ": "chu", "チョ": "cho", "チェ": "che",
    "ニャ": "nya", "ニュ": "nyu", "ニョ": "nyo",
    "ヒャ": "hya", "ヒュ": "hyu", "ヒョ": "hyo",
    "ミャ": "mya", "ミュ": "myu", "ミョ": "myo",
    "リャ": "rya", "リュ": "ryu", "リョ": "ryo",
    "ギャ": "gya", "ギュ": "gyu", "ギョ": "gyo",
    "ジャ": "ja", "ジュ": "ju", "ジョ": "jo",
    "ビャ": "bya", "ビュ": "byu", "ビョ": "byo",
    "ピャ": "pya", "ピュ": "pyu", "ピョ": "pyo",
    "ファ": "fa", "フィ": "fi", "フェ": "fe", "フォ": "fo",
    "ッ": "small-tsu"
};

function romanize(input) {
    let output = "";
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        let nextChar = input[i + 1];
        let pair = char + nextChar;

        // Handle small tsu (っ or ッ) which doubles the next consonant
        if (char === "っ" || char === "ッ") {
            if (nextChar && /^[か-ごさ-ぞた-どは-ぽカ-ゴサ-ゾタ-ドハ-ポ]/.test(nextChar)) {
                output += (hiraganaToRomaji[nextChar]?.[0] || katakanaToRomaji[nextChar]?.[0] || "");
            }
            continue;
        }

        // Check for digraphs (e.g., きゃ, キャ)
        if (hiraganaToRomaji[pair]) {
            output += hiraganaToRomaji[pair];
            i++;
        } else if (katakanaToRomaji[pair]) {
            output += katakanaToRomaji[pair];
            i++;
        } else if (hiraganaToRomaji[char]) {
            output += hiraganaToRomaji[char];
        } else if (katakanaToRomaji[char]) {
            output += katakanaToRomaji[char];
        } else if (char === "ー") {
            // Handle long vowel mark "ー"
            if (output.length > 0) {
                const lastVowel = output[output.length - 1];
                if ("aeiou".includes(lastVowel)) {
                    output += lastVowel; // Extend the last vowel
                }
            }
        } else {
            output += char; // If not a recognized kana, keep the character
        }
    }

    // Replace "small-tsu" placeholders with doubled consonants
    output = output.replace(/small-tsu([bcdfghjklmnpqrstvwxyz])/g, "$1$1");

    return output;
}

async function getWord(alphabet) {
    const randomReq = await fetch("/random/"+alphabet);
    if(!randomReq.ok) {
        return false;
    }

    return await randomReq.json();
}

// #region Customization
function resetCSSVariablesToDefaults() {
    const defaultVariables = {
        '--bg-color': '#ffffff',
        '--main-text-color': '#ffffff',
        '--game-bg-color': '#304F4F',
        '--pw-text': '#ffffff',
        '--pw-bg-color': '#1C3D3D',
        '--header-color': '#000000',
        '--button-hover-bg': '#808080',
        '--button-selected': '#114411',
        '--stat-good': '#8a2be2',
        '--stat-bad': '#ff0000',
        '--background-image': 'url("https://www.pngarts.com/files/8/Anime-PNG-Image-Transparent.png")'
    };

    for (const [variable, value] of Object.entries(defaultVariables)) {
        document.documentElement.style.setProperty(variable, value);
    }
}

function saveCSSVariablesToLocalStorage() {
    const variables = [
        '--bg-color', '--main-text-color', '--game-bg-color',
        '--pw-text', '--pw-bg-color', '--header-color',
        '--button-hover-bg', '--button-selected', '--stat-good', '--stat-bad', '--background-image'
    ];

    const savedVariables = {};

    variables.forEach(variable => {
        const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        savedVariables[variable] = value;
    });

    localStorage.setItem('cssVariables', JSON.stringify(savedVariables));
    alert('CSS settings saved!');
}

function loadCSSVariablesFromLocalStorage() {
    const savedVariables = JSON.parse(localStorage.getItem('cssVariables'));

    if (savedVariables) {
        for (const [variable, value] of Object.entries(savedVariables)) {
            document.documentElement.style.setProperty(variable, value);
        }
    }
}

function customizeCSSVariables() {
    if(document.querySelector("#popup")) {
        return;
    }
    
    // Create the popup container
    const popup = document.createElement('div');
    popup.id = "popup";
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.border = '1px solid #ccc';
    popup.style.borderRadius = '10px';
    popup.style.zIndex = '1000';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.style.width = '300px';
    popup.style.fontFamily = 'Arial, sans-serif';
    popup.style.overflow = "auto";
    popup.style.maxHeight = "60vh";

    // Make the popup draggable
    let isDragging = false;
    let offsetX, offsetY;

    // Title
    const title = document.createElement('h3');
    title.textContent = 'Customize CSS Variables';
    title.style.marginBottom = '15px';
    title.style.color = 'black';
    title.style.cursor = 'move'; // Make title draggable
    popup.appendChild(title);

    // Add mouse event listeners to make the popup draggable
    title.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - popup.getBoundingClientRect().left;
        offsetY = e.clientY - popup.getBoundingClientRect().top;
        document.addEventListener('mousemove', dragPopup);
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.removeEventListener('mousemove', dragPopup);
        });
    });

    function dragPopup(e) {
        if (isDragging) {
            popup.style.left = `${e.clientX - offsetX}px`;
            popup.style.top = `${e.clientY - offsetY}px`;
        }
    }

    // Input fields for each variable
    const variables = {
        '--bg-color': "Background",
        '--main-text-color': "Foreground", 
        '--game-bg-color': "Main Window Bg",
        '--pw-text': "Previous Word Text",
        '--pw-bg-color': "Previous Word Bg",
        '--header-color': "Header",
        '--button-hover-bg': "Change Alphabet Hover",
        '--button-selected': "Alphabet selected",
        '--stat-good': "Good", 
        '--stat-bad': "Bad"
    }

    function addLabeledInput(variable, labelText, inputType) {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '10px';

        const label = document.createElement('label');
        label.textContent = labelText;
        label.style.display = 'block';
        label.style.marginBottom = '5px';

        const input = document.createElement('input');
        input.type = inputType;
        input.value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim() || '#ffffff';
        input.style.width = '100%';
        input.addEventListener('input', () => {
            document.documentElement.style.setProperty(variable, input.value);
        });

        wrapper.appendChild(label);
        wrapper.appendChild(input);

        return wrapper;
    }

    Object.keys(variables).forEach(variable => {
        popup.appendChild(addLabeledInput(variable, variables[variable] + ': ', 'color'));
    });

    popup.appendChild(addLabeledInput('--background-image', 'Background Image URL' + ': ', 'text'));

    // Close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '15px';
    closeButton.style.padding = '10px';
    closeButton.style.width = '100%';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.backgroundColor = '#444';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';

    const saveButton = closeButton.cloneNode();
    saveButton.textContent = "Save";
    saveButton.style.backgroundColor = '#141';

    const resetButton = closeButton.cloneNode();
    resetButton.textContent = "Reset";
    resetButton.style.backgroundColor = '#411';

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    resetButton.addEventListener('click', () => {
        resetCSSVariablesToDefaults();
        saveCSSVariablesToLocalStorage();
        document.body.removeChild(popup);
    });

    saveButton.addEventListener('click', () => {
        saveCSSVariablesToLocalStorage();
        document.body.removeChild(popup);
    });

    popup.appendChild(resetButton);
    popup.appendChild(closeButton);
    popup.appendChild(saveButton);

    // Append popup to the document body
    document.body.appendChild(popup);
}


window.addEventListener('DOMContentLoaded', loadCSSVariablesFromLocalStorage);
//#endregion
// It's a weird thing to put in such a simple website