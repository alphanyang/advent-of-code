import { hash } from 'crypto'
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

let currNode = 'AAA'
const lastNode = 'ZZZ'
console.log(currNode)
console.log(lastNode)
let count = 0
while(currNode != lastNode) {
    for(let i = 0; i < direction.length; i++) {
        count++
        const dir = charMap[direction[i]]
        let tempNode = (hashMap.get(currNode) as string[])[dir]
        console.log(direction[i] + " " + tempNode)
        currNode = tempNode
    }
}
console.log(count)

