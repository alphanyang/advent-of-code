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