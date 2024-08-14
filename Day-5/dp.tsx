let memoArray: number[] = []

let count = 0
let fibbonaci: (num: number, memo: number[]) => number = function (
    num: number,
    memo: number[]
): number {
    for(let i = 2; i <= num; i++){
        memo.push((memo[i - 1] + memo[i - 2]))
        count++
    }
    return memo[num]
}
memoArray.push(0)
memoArray.push(1)
console.log(fibbonaci(5, memoArray))