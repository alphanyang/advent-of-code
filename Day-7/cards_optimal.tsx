
import * as fs from'fs'
import { exit } from 'process';

const wordMap: { [key: string]: number } = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14,
};

let classify = function(hand: string[]) {
    hand.reduce((total, x) => (x == 'Q' ? total+1 : total), 0)
    let counts: Array<number> = []
    hand.forEach( card => {
        counts.push(hand.reduce((total, x) => (x==card ? total+1 : total),0))
    })

    if(counts.includes(5)) {
        return 6
    }
    if(counts.includes(4)) {
        return 5
    }
    if(counts.includes(3)) {
        if(counts.includes(2)) {
            return 4
        }
        return 3
    }
    if(counts.reduce((total,x) => (x == 2 ? total+1: total),0) == 4) {
        return 2
    }
    if(counts.includes(2)) {
        return 1
    }
    return 0
}

let strength = function(hand: string[]) {
    return [
        classify(hand),
        hand.map(card => wordMap[card] || card)
    ];
} 

let plays: Array<[string, number]> = []

let input = fs.readFileSync('input.txt', 'utf-8').split('\n')

input.forEach( (line) => {
   let [hand, bid] = line.split(' ')
   plays.push([hand, parseInt(bid)])
})

plays.sort((a, b) => {
    const handA = classify(a[0].split(''))
    const handB = classify(b[0].split(''))
    console.log(handA)
    console.log(handB)
    console.log(a[0].split('')+"")
    console.log(b[0].split('')+"\n")
    if (handA < handB) return -1
    if (handA > handB) return 1
    if (handA == handB) {
        for(let i = 0; i < 5; i++){
            if(wordMap[a[0].charAt(i)] > wordMap[b[0].charAt(i)]){
                return 1
            }
            if(wordMap[a[0].charAt(i)] < wordMap[b[0].charAt(i)]){
                return -1
            }
        }
    }
    return 0;
})


// plays.forEach( play => {
//     play[0] = play[0].split(' ').sort((a, b) => wordMap[a] - wordMap[b]).toString()
// })

let total = 0
for(let i = 0; i < plays.length; i++) {
    let bid = plays[i][1]
    console.log(bid)
    total+= bid*(i+1)
}

console.log(plays)
console.log(total)
