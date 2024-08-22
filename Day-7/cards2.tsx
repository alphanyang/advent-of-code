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
    'J': 1,
    'Q': 12,
    'K': 13,
    'A': 14,
};

const input = fs.readFileSync('input.txt', 'utf-8').split('\n')

let hands: Array<[Array<number>, String, number, number, number]> = []
input.forEach( (plays) => {
    let freq =  Array<number>(15).fill(0)
    const play = plays.split(' ')
    let jokerCount = 0
    play[0].split('').forEach( (card) => {
        if(wordMap[card] == 1) {
            jokerCount++
        } else {

        freq[wordMap[card]]++
        }
    })
    // let hand = play[0].split('').sort((a, b) => ((wordMap[a])) - (wordMap[b])).toString()
    let wager = parseInt(play[1])

    hands.push([freq, play[0], wager, 0, jokerCount])
})

hands.forEach( (hand) => {
    let jokerCount = hand[4]
    if(jokerCount == 5) {
        hand[3] = 4.8
        console.log("Five Jokers")
    } else if(jokerCount == 4) {
        hand[3] = 4.9
        console.log("Four Jokers, fake Five")
    } else if ( jokerCount > 0 && jokerCount < 4 ){
        console.log(jokerCount)
        hand[3] = 0
        if(hand[0].includes(4) && jokerCount == 1) {
            hand[3] = 4 + jokerCount*0.9
            console.log("Four of a Kind")
        } else if(hand[0].includes(3) && jokerCount == 2) {
            hand[3] = 4.9
            console.log("Fake Five")
        } else if(hand[0].includes(3) && jokerCount == 1) {
            hand[3] = 4
            console.log("Fake Four of a Kind")
        } else if(hand[0].includes(2)) {
            let count = 0
            hand[3] = 0
            for(let i = hand[0].length; i > 1; i--) {
                if(hand[0][i] == 2) {
                    count++;
                    if(count == 2) {
                        hand[3] = 3
                        console.log("Fake Full House")
                        break
                    }
                }
            }
            if(count == 1) {
                if(jokerCount == 3) {
                    hand[3] = 4.9
                    console.log("Fake Five of a Kind")
                } else if (jokerCount == 2) {
                    hand[3] = 4
                    console.log("Fake Four of a Kind")
                }
                else if (jokerCount == 1) {
                    hand[3] = 2
                    console.log("Fake Three of a Kind")
                }
            }
        } else {
            for(let i = hand[0].length; i > 1; i--) {
                if(jokerCount == 1) {
                    hand[3] = 0
                    console.log("Fake two of a Kind")
                } else if(jokerCount ==  2) {
                    hand[3] = 2
                    console.log("Fake Three of a Kind")
                } else if(jokerCount ==  3) {
                    hand[3] = 4
                    console.log("Fake Four of a kind")
                }
            }
        }
    } else if(jokerCount == 0) {
        if(hand[0].includes(5)) {
            hand[3] = 5
            console.log("Five of a Kind")
        } else if(hand[0].includes(4)) {
            hand[3] = 4
            console.log("Four of a Kind")
        } else if(hand[0].includes(3) && hand[0].includes(2)) {
            hand[3] = 3
            console.log("Full House")
        } else if(hand[0].includes(3)) {
            hand[3] = 2
            console.log("Three of a Kind")
        } else if(hand[0].includes(2)) {
            let count = 0
            hand[3] = 0
            for(let i = hand[0].length; i > 0; i--) {
                if(hand[0][i] == 2) {
                    count++;
                    if(count == 2) {
                        hand[3] = 1
                        break
                    }
                }
            }
            console.log("Two of a Kind")
        } else {
            for(let i = hand[0].length; i > 0; i--) {
                if(hand[0][i] == 1) {
                    hand[3] = -1
                    console.log("High Card")
                    break
                }
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

console.log(hands)

let totalWinnings = 0
for(let i = 0; i < hands.length; i++) {
    totalWinnings += hands[i][2]*(i+1)
    // console.log(hands[i][2])
}
const modifiedHands = hands.map(hand => hand.slice(1));
fs.writeFileSync('output.txt', JSON.stringify(modifiedHands));
console.log(totalWinnings)