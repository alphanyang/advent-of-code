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
lines.forEach((line) => {
    var game_number = line.split(':');
    game_number[0] = game_number[0].replace(/\D/g,'');
    found = 0;
    game_number[1].split(';').forEach((set) => {
        set.split(',').forEach((cube) => {
            if(cube.includes("red")){
                if(parseInt(cube.replace(/\D/g, ''), 10) > 12){
                    found = 1;
                    // break
                }
            }
            if(cube.includes("blue")){
                if(parseInt(cube.replace(/\D/g, ''), 10) > 14){
                    found = 1;
                    // break
                }
            }
            if(cube.includes("green")){
                if(parseInt(cube.replace(/\D/g, ''), 10) > 13){
                    found = 1;
                    // break
                }
            }
        })
        
    })
    if(found != 1){
        sum += parseInt(game_number[0], 10)
        console.log(sum)
    }
})