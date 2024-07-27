import * as fs from 'fs';

// Read the input file
const inpurt = fs.readFileSync('games.txt', 'utf-8');
const lines = inpurt.split('\n');

// Check if Game is possible
// Check each set of games
// color is separated by ',' and set is separated by ;
// blue, red, green;

var sum = 0;
var found = 0;
var redMax = 1, blueMax = 1, greenMax = 1;
lines.forEach((line) => {
    var game_number = line.split(':');
    game_number[0] = game_number[0].replace(/\D/g,'');
    redMax = 1, blueMax = 1, greenMax = 1;
    game_number[1].split(';').forEach((set) => {
        set.split(',').forEach((cube) => {
            if(cube.includes("red")){
                redMax = Math.max(parseInt(cube.replace(/\D/g, ''), 10), redMax)
                console.log(redMax)
            }
            if(cube.includes("blue")){
                blueMax = Math.max(parseInt(cube.replace(/\D/g, ''), 10), blueMax)
                console.log(blueMax)
            }
            if(cube.includes("green")){
                greenMax = Math.max(parseInt(cube.replace(/\D/g, ''), 10), greenMax)
                console.log(greenMax)
            }
        })
    })
    sum += (redMax * greenMax * blueMax)
    console.log(sum)
})