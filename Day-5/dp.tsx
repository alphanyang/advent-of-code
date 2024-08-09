/* fibbonaci dynamic programming problem
   1. recursion
   2. store
   3. bottom up
*/

let fibboMap = new Map<number, number>()
let memoArray = new Array<number>()

let count = 0
let fibbonaci: (num: number, memo: Array<number>) => number = function (
    num: number,
    memo: Array<number>
): number {
    if(memo[num-3] != null) {
        return memo[num-3] as number
    } 
    let result = 0
    if(num == 1 || num == 2) {
        result = 1
    } else {
        result = fibbonaci(num-1, memo) + fibbonaci(num-2, memo)
        memo[num-3] = result
        count++
    }
    return result
}

console.log(fibbonaci(100, memoArray))
console.log(memoArray)
console.log(count +  " calulations")