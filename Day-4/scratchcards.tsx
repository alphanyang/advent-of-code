import * as fs from "fs"

const input = fs.readFileSync("input.txt", "utf-8")
const lines = input.split('\n')

let scartchCardMap = new Map<String, Array<String>>()

let winningNumberCount = 0
let totalPoints = 0

lines.forEach( (line) => {
    let card = line.split(':')
    let cardNumbers
    card.forEach( (numbers) => {
        cardNumbers = numbers.split('|')
    })

    scartchCardMap.set(card[0].replace(/\D/g,''), cardNumbers)
})

scartchCardMap.forEach( (card) => {
    let winningNumbers = card[0].split(' ')
    let cardNumbers = card[1].split(' ')
    winningNumberCount = 0
    winningNumbers.forEach((number) => {
        cardNumbers.forEach((cardNumber) => {
            if(number != null && cardNumber === number && number !== "" ) {
                console.log(cardNumber + " " + number)
                winningNumberCount++
            } else {
                // Remove the number that wasnt found
            }
        })
        
    })
    console.log("Winning number count: " + winningNumberCount)
    const points: number = winningNumberCount != 0 ? 2**(winningNumberCount-1) : 0;
    console.log("Points: " + points)
    totalPoints+=points
    console.log("Total Points: " + totalPoints)
})