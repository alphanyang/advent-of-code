import * as fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf-8')
const lines = input.split('\n')

let maps = new Map<String, string[]>()
/*
    Map => {50 98 02}
           {52 50 48}

*/

let lineCount = 0
let slowPointer = 0
let fastPointer = 1
let key = ''
while(fastPointer < lines.length) {
    if(lines[slowPointer].includes('seeds:')){
        let seeds = lines[slowPointer].split(':')
        maps.set(seeds[0], [seeds[1]])
        slowPointer++
    }

    if(lines[fastPointer].includes('map')){
        slowPointer = fastPointer
        key = lines[slowPointer]
        maps.set(key, [])
    } else if(lines[fastPointer] !== '') {
        let temp = fastPointer - slowPointer - 1
        const mapValue = maps.get(key);
        if (mapValue) {
          mapValue[temp] = lines[fastPointer];
        }
    } else if(lines[fastPointer] == ''){
        slowPointer = fastPointer
        key = ''
    }
    fastPointer++
}

console.log(maps)