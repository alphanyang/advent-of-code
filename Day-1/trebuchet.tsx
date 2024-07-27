import * as fs from 'fs';

// Read the input file
const input = fs.readFileSync('input.txt', 'utf-8');
const lines = input.split('\n');

var sum = 0;
// Parse the input
lines.forEach((line) => {
    // \D is a regex that matches any non-digit character
    // g is a flag that makes the regex global, meaning it will match all occurrences
    // so this line will remove all non-digit characters from the string
    line = line.replace(/\D/g, '');

    // If the line is empty, skip it
    if(line.length === 0) {
        return;
    }

    if(line.length == 1) {
        sum += parseInt(line, 10) * 10 + parseInt(line, 10);
    } else {
        var calibrationInt = parseInt(line.charAt(0), 10) * 10 + parseInt(line.charAt(line.length-1), 10);
        sum += calibrationInt;
    }
});

console.log(sum);

