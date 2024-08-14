import * as fs from 'fs'

const [timeString, distanceString] = fs.readFileSync('input.txt', 'utf-8').split('\n')


const timeParser = timeString.split(':')[1].trim().split('  ').map(Number)
let time: Array<number> = []

timeParser.forEach( index => {
    if(index != 0) {
        time.push(index)
    }
})
console.log(time)
const distance = distanceString.split(':')[1].trim().split('  ').map(Number)

const rangeArray: Array<[number, number]> = []
for(let i = 0; i < distance.length; i++){
    rangeArray.push([time[i], distance[i]])
}

// console.log(rangeArray)

let result: Array<number> = []

rangeArray.forEach( (boatRide) => {
    var timeLimit = boatRide[0]
    var distance = boatRide[1]
    
    let start = 1
    let end = timeLimit - 1

    while(start < end) {
        let timeLeftStart = timeLimit - start
        let timeLeftEnd = timeLimit - end

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
            result.push(end-start+1)
            break
        }
    }
})

let ans = 1;
result.forEach( num => {
        ans*=num
    }
)
console.log(ans)
//range of winning numbers, end and start
//test if end and start can win if not index
