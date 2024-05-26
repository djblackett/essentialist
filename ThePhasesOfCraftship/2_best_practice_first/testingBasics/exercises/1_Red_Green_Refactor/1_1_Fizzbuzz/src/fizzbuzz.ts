
export function fizzbuzz(num: number) {
    if (num % 5 === 0) {
        return "buzz"
    } else if (num === 3) {
        return "fizz"
    }
    return num.toString(10)
}