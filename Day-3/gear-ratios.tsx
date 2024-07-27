/*  ....
    467.
    ...#
    
    we can check symbols around to 7

    4,6,7 after 7 is a . so 467 is a int
    then check around 4 _ 7 if there are symbols

    OR

    we check around every symbol
    if we hit a digit, find out the full value of the integer
*/

import * as fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf-8');
const lines = input.split('\n');
const allowedSymbols = new Set(['+', '=', '*', '-', '/', '%', '&', '|', '^', '!', '?', ':']);
// 2D array, Array containing and Array of Strings = [] empty array
const schematicsArray : Array<Array<string>> = [];
let i = 0;
lines.forEach((line) => {
    //console.log(line.split('.'))
    schematicsArray[i] = line.split('');
    i++;
    
});

schematicsArray.forEach((line) => {
    line.forEach((point) => {
        if( allowedSymbols.has(point) ){
            //how to check around
            console.log(point)
        }
    })
})
//create a 2d array?
