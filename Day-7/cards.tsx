import * as fs from 'fs'

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

const input = fs.readFileSync('input.txt', 'utf-8').split('\n')

let hands: Array<[Array<number>, String, number, number]> = []
input.forEach( (plays) => {
    let freq =  Array<number>(15).fill(0)
    const play = plays.split(' ')
    play[0].split('').forEach( (card) => {
        freq[wordMap[card]]++
    })
    // let hand = play[0].split('').sort((a, b) => ((wordMap[a])) - (wordMap[b])).toString()
    let wager = parseInt(play[1])

    hands.push([freq, play[0], wager, 0])
})

hands.forEach( (hand) => {
    if(hand[0].includes(5)) {
        hand[3] = 100
        console.log("Five of a Kind")
    } else if(hand[0].includes(4)) {
        hand[3] = 75
        console.log("Four of a Kind")
    } else if(hand[0].includes(3) && hand[0].includes(2)) {
        hand[3] = 50
        console.log("Full House")
    } else if(hand[0].includes(3)) {
        hand[3] = 25
        console.log("Three of a Kind")
    } else if(hand[0].includes(2)) {
        let count = 0
        hand[3] = 20
        for(let i = hand[0].length; i > 0; i--) {
            if(hand[0][i] == 2) {
                count++;
                if(count == 2) {
                    hand[3] = 23
                    break
                }
            }
        }
        console.log("Two of a Kind")
    } else {
        for(let i = hand[0].length; i > 0; i--) {
            if(hand[0][i] == 1) {
                hand[3] = 10
                break
            }
        }
    }
})

hands.sort((a, b) => {
    if (a[3] < b[3]) return -1
    if (a[3] > b[3]) return 1
    if (a[3] == b[3]) {
        for(let i = 0; i < 5; i++){
            if(wordMap[a[1].charAt(i)] > wordMap[b[1].charAt(i)]){
                return 1
            }
            if(wordMap[a[1].charAt(i)] < wordMap[b[1].charAt(i)]){
                return -1
            }
        }
    }
    return 0;
})

let totalWinnings = 0
for(let i = 0; i < hands.length; i++) {
    totalWinnings += hands[i][2]*(i+1)
    // console.log(hands[i][2])
}
const modifiedHands = hands.map(hand => hand.slice(1));
fs.writeFileSync('output.txt', JSON.stringify(modifiedHands));
console.log(totalWinnings)