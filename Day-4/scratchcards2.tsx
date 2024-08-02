import * as fs from "fs"

const input = fs.readFileSync("input.txt", "utf-8")
const lines = input.split('\n')

let scartchCardMap = new Map<Number, Set<Number>>()
let winningNumbersMap = new Map<Number, Set<Number>>()
let copiesCount = new Array<number>(lines.length).fill(1)

let winningNumberCount = 0
let totalCopies = 0

lines.forEach( (line) => {
    let lineCount = 0
    let card = line.split(':')
    let cardNumbers
    card.forEach( (numbers) => {
        cardNumbers = numbers.split('|')
    })
    
    let key = parseInt(card[0].replace(/\D/g,''))
    let winNums = cardNumbers[0].split(' ')
    let nums = cardNumbers[1].split(' ')
    let tempSet = new Set<Number>()

    for(let x = 0; x < winNums.length; x++){
        let integerNum = parseInt(winNums[x])
        if(!Number.isNaN(integerNum)) {
            winningNumbersMap.set(key, tempSet.add(integerNum))
        }
    }

    tempSet = new Set<Number>()
    for(let i = 0; i < nums.length; i++){
        let integerNum = parseInt(nums[i])
        if(!Number.isNaN(integerNum)) {
            scartchCardMap.set(key, tempSet.add(integerNum))
        }
    }
    lineCount++;
})

for(let lineCount = 0; lineCount < lines.length; lineCount++) {
    console.log("Card Number: " + (lineCount + 1))
    let winNums = winningNumbersMap.get(lineCount + 1)
    let nums = scartchCardMap.get(lineCount + 1)
    winningNumberCount = 0
    winNums?.forEach( element => {
        if(nums?.has(element)) {
            winningNumberCount++
            if((lineCount + winningNumberCount) < lines.length){
                copiesCount[lineCount + winningNumberCount] += 1 * copiesCount[lineCount]
            }
            nums?.delete(element)
        }
    })
    console.log("Copies count: " + copiesCount[lineCount])
    totalCopies += copiesCount[lineCount]
    console.log(totalCopies)
}