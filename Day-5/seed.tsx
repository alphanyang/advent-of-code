import * as fs from 'fs'


const [input, ...blocks] = fs.readFileSync('input.txt', 'utf-8').split('\n\n')

let seeds: number[] = input.split(':')[1].trim().split(' ').map(Number) as number[]

console.log(seeds)

blocks.forEach(block => {
    let ranges: number[][] = []
    block.split('\n').slice(1).forEach( (num) => {
        ranges.push(num.split(' ').map(Number) as number[])
    })
    let newArray: number[] = []
    seeds.forEach( (seed) => {
        let found: boolean = false;
        ranges.forEach( (range) => {
            let [a,b,c] = range
            if(b <= seed && seed < b + c) {
                newArray.push(seed - b + a)
                found = true;
            }
        })
        if(!found) {
            newArray.push(seed)
        }
        
    })
    seeds = newArray
})

seeds.sort((a,b) => a-b)
console.log(seeds[0])

