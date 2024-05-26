
export function fizzbuzz(num: number) {

    if (num < 1 || num > 100) {
        throw new Error("Numbers must be between 1 and 100 (inclusive)");
    }

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