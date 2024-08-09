import * as fs from 'fs'
let [numbers, ...blocks] = fs.readFileSync('input.txt', 'utf-8').split('\n\n');

let intSeeds = numbers.split(':')[1].split(" ").slice(1).map(Number) as number[]

let seeds: Array<[number, number]> = []

for(let i = 0; i < intSeeds.length; i+=2) {
    seeds.push([intSeeds[i], intSeeds[i] + intSeeds[i+1]]);
}

console.log(seeds)

blocks.forEach( block => {
    let ranges: number[][] = []
    let nums = block.split(':')
    nums[1].trim().split('\n').forEach( line => {
        ranges.push(line.split(' ').map(Number) as number[])
        //console.log(ranges)
    })
    let newArray: Array<[number, number]> = []
    while(seeds.length > 0) {
        let tempRange = seeds.pop()
        let start = (tempRange as [number, number])[0]
        let end = (tempRange as [number, number])[1]
        let found: boolean = false  
        ranges.forEach( line => {
            let [a, b, c] = line
            let os = Math.max(start, b)
            let oe = Math.min(end, b + c)
            if(os < oe) {
                newArray.push([os - b + a, oe - b + a])
                if(os > start) {
                    seeds.push([start, os])
                }
                if(end > oe) {
                    seeds.push([oe, end])
                }
                found = true;
            }
        })
        if(!found) {
            newArray.push([start, end])
        }
    }
    seeds = newArray
})

let min = Number.MAX_VALUE
seeds.forEach( num => {
    num.forEach( num2 => {
        min = Math.min(num2, min)
    })
})
console.log(min)