
export function fizzbuzz(num: number) {
    if (num % 5 === 0) {
        return "buzz"
    }
    return num.toString(10)
}