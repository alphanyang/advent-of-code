import * as fs from 'fs'


const input = fs.readFileSync('input.txt', 'utf-8')
const lines = input.split('\n')

let maps = new Map<number, number[][]>()
/*
    Map => {50 98 02}
           {52 50 48}

        if source# is not mapped to a destination, they remain the same
        find the lowest final destination
*/

let lineCount = 0
let slowPointer = 0
let fastPointer = 1
let key = ''
while(fastPointer < lines.length) {
    if(lines[slowPointer].includes('seeds:')) {
        let seeds = lines[slowPointer].split(':')
        maps.set(lineCount, [seeds[1].trim().split(' ').map(Number)])
        slowPointer++
    }

    if(lines[fastPointer].includes('map')) {
        slowPointer = fastPointer
        // key = lines[slowPointer].split(' ')[0]
        lineCount++
        maps.set(lineCount, [])
    } else if(lines[fastPointer] !== '') {
        let temp = fastPointer - slowPointer - 1
        const mapValue = maps.get(lineCount);
        if (mapValue) {
          mapValue[temp] = lines[fastPointer].trim().split(' ').map(Number)
        }
    } else if(lines[fastPointer] == '') {
        slowPointer = fastPointer
        // key = ''
    }
    fastPointer++
}


slowPointer = 0; fastPointer = 1
let currentSoruce = maps.get(slowPointer)?.[0] ?? [];
while(fastPointer <= lineCount) {
    console.log(fastPointer + 1)
    let changed = new Array<number>(currentSoruce.length).fill(0)
    maps.get(fastPointer)?.forEach( row => {
        for(let i = 0; i < currentSoruce.length; i++) {
            let num = currentSoruce[i]
            if(num >= row[1] && num < (row[1]) + (row[2]) && changed[i] == 0) {
                // console.log("changing " + currentSoruce[i] + " to " + (num + ((row[0]) - (row[1]))))
                currentSoruce[i] = num + ((row[0]) - (row[1]))
                changed[i]++
            }
        }
        console.log(currentSoruce)
        console.log(changed)
    })
    console.log("End of row " + (fastPointer + 1))
    fastPointer++
}

console.log(currentSoruce)
let lowest = Number.MAX_VALUE
currentSoruce.forEach( (num) => {
    lowest = Math.min(lowest, num)
})
console.log(lowest)