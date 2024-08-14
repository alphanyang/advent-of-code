import * as fs from 'fs'

const [timeString, distanceString] = fs.readFileSync('input.txt', 'utf-8').split('\n')

const time = parseInt(timeString.replace(/\D/g, ''))
const distance = parseInt(distanceString.replace(/\D/g, ''))
console.log(time)
console.log(distance)

let start = 1
let end = time - 1
while(start < end) {
    let timeLeftStart = time - start
    let timeLeftEnd = time - end

    if(timeLeftStart*start <= distance) {
        // console.log("Time Held: " + start + " Distance Traveled: " + timeLeftStart*start)
        start++
    }

    if(timeLeftEnd*end <= distance) {
        // console.log("Time (end) Held: " + end + " Distance Traveled: " + timeLeftEnd*end)
        end--
    }

    if(timeLeftStart*start > distance && timeLeftEnd*end > distance){
        console.log("Time Held: " + start + " Distance Traveled: " + timeLeftStart*start)
        console.log("Time (end) Held: " + end + " Distance Traveled: " + timeLeftEnd*end)
        console.log(start, end)
        console.log("Answer: " + (end - start + 1))
        break
    }
}
//range of winning numbers, end and start
//test if end and start can win if not index
