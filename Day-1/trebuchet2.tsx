import * as fs from 'fs';

// Read the input file
const input = fs.readFileSync('input.txt', 'utf-8');
const lines = input.split('\n');

const wordMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
};

var sum = 0;
// Parse the input
lines.forEach((line) => {
    // First come first serve, so we can't just replace all numbers with digits
    // We have to replace them in order
    // Define the words and their replacements

    // Function to check if the word at the current slowIndex matches any key in the wordMap
    function checkWord(line: string, slowIndex: number, word: string | any[]) {
        return line.substring(slowIndex, slowIndex + word.length) === word;
    }

    // Start with two fingers at the beginning
    let slowIndex = 0;
    let fastIndex = 0;

    while (fastIndex < line.length) {
        let found = false;

        for (const [word, replacement] of Object.entries(wordMap)) {
            if (checkWord(line, slowIndex, word)) {
                line = line.substring(0, slowIndex) + replacement + line.substring(slowIndex + word.length);
                fastIndex = slowIndex + replacement.length;
                found = true;
                break;
            }
        }

        if (!found) {
            slowIndex++;
            fastIndex = slowIndex;
        }
    }
    line = line.replace(/\D/g, '');
    // If the line is empty, skip it
    if(line.length === 0) {
        return;
    }

    if(line.length == 1) {
        var calibrationInt = parseInt(line, 10) * 10 + parseInt(line, 10);
        sum += calibrationInt;
    } else {
        var calibrationInt = parseInt(line.charAt(0), 10) * 10 + parseInt(line.charAt(line.length-1), 10);

        sum += calibrationInt;
    }
});

console.log(sum);