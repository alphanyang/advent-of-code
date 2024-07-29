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
const allowedSymbols = new Set(['*']);
// 2D array, Array containing and Array of Strings = [] empty array
const schematicsArray : Array<Array<string>> = [];
let sum = 0;
let i = 0;
lines.forEach((line) => {
    schematicsArray[i] = line.split('');
    i++;
});
i =0
schematicsArray.forEach((line) => {
    let j = 0
    line.forEach((point) => {
        if (allowedSymbols.has(point)) {
            // Function to extract the full number
            const extractNumber = (i: number, j: number): string => {
                let numberStr = '';
                let k = j;

                // Extract left part of the number
                while (k >= 0 && !isNaN(Number(schematicsArray[i][k])) && schematicsArray[i][k] !== ' ') {
                    numberStr = schematicsArray[i][k] + numberStr;
                    k--;
                }

                // Reset k to the original position
                k = j + 1;

                // Extract right part of the number
                while (k < schematicsArray[i].length && !isNaN(Number(schematicsArray[i][k])) && schematicsArray[i][k] !== ' ') {
                    numberStr += schematicsArray[i][k];
                    k++;
                }

                return numberStr;
            };

            // Check around the point
            const checkAndLog = (i: number, j: number) => {
                if (schematicsArray[i][j] !== '.' && !isNaN(Number(schematicsArray[i][j]))) {
                    const fullNumber = extractNumber(i, j);
                    if (Number.isInteger(Number(fullNumber))) {
                        //check duplicate
                        if( !pointStack.has(Number(fullNumber) )){
                            pointStack.add(Number(fullNumber))
                        }
                    }
                }
            };

            //Initalize a new stack everytime we want to check for duplicates
            let pointStack = new Set<number>()
            // Check all surrounding points
            checkAndLog(i - 1, j - 1);
            checkAndLog(i - 1, j);
            checkAndLog(i - 1, j + 1);
            checkAndLog(i + 1, j - 1);
            checkAndLog(i + 1, j);
            checkAndLog(i + 1, j + 1);
            checkAndLog(i, j - 1);
            checkAndLog(i, j + 1);
            if(pointStack.size == 2){
                let ratio = 1;
                pointStack.forEach((gear) => {
                    ratio *= gear
                })
                sum+=ratio
                console.log(sum)
            }
        }
        j++;
    })
    i++
})
//create a 2d array?
