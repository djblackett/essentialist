
export function fizzbuzz(num: number) {

    if (typeof num !== "number") {
        throw new Error("Input must be a number")
    }

    if (num < 1 || num > 100) {
        throw new Error("Numbers must be between 1 and 100 (inclusive)");
    }

    if (num % 3 == 0 && num % 5 == 0) {
        return "FizzBuzz";
    }
    if (num % 5 === 0) {
        return "Buzz"
    } else if (num % 3 === 0) {
        return "Fizz"
    }
    return num.toString(10)
}