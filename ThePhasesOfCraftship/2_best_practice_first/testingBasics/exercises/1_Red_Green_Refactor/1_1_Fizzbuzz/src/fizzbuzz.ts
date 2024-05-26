
export function fizzbuzz(num: number) {
    if (num % 3 == 0 && num % 5 == 0) {
        return "fizzbuzz";
    }
    if (num % 5 === 0) {
        return "buzz"
    } else if (num % 3 === 0) {
        return "fizz"
    }
    return num.toString(10)
}