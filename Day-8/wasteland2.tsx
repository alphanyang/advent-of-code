import * as fs from 'fs'

const charMap: { [key: string] : number} = {
    'L' : 0,
    'R' : 1
}

const [direction, ...input] = fs.readFileSync('input.txt', 'utf-8').split('\n')
input.shift()

let hashMap = new Map<string, string[]>()
input.forEach( line => {
    const temp = line.split(' = ')
    const key = temp[0]
    const node = temp[1].replace(/[()]/g, '').split(', ')
    hashMap.set(key, node)
})

const keysArray = Array.from(hashMap.keys())
let startingPoints: string[] = []
keysArray.forEach( key => {
    if(key[2] == 'A') {
        startingPoints.push(key)
    }
})

let checkPosition = function(curr: string[]) {
    let bool = true
    curr.forEach( position => {
        if(position.charAt(2) != 'Z') {
            bool = false
        }
    })
    return bool
}

console.log(!checkPosition(startingPoints))
let count: number[] = []
for(let j = 0; j < startingPoints.length; j++) {
    let counter = 0
    while(startingPoints[j].charAt(2) != 'Z') {
        for(let i = 0; i < direction.length; i++) {
            counter++
            const dir = charMap[direction[i]]
            const tempNode = (hashMap.get(startingPoints[j]) as string[])[dir]
            // console.log(direction[i] + " " + tempNode)
            startingPoints[j] = tempNode
        }
    }
    count.push(counter)
}

const lcm = (...arr: number[]): number => {
    const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
    const _lcm = (x: number, y: number): number => (x * y) / gcd(x, y);
    return [...arr].reduce((a: number, b: number) => _lcm(a, b));
};

let ans = lcm(...count)
console.log(ans)
