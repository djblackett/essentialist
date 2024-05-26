import {fizzbuzz} from "./fizzbuzz";

describe("fizzbuzz", () => {

    const inputs = [3, 5, 9, 10, 15, 42, 43, 45]
    const results = ["fizz", "buzz", "fizz", "buzz", "fizzbuzz", "fizz", "43", "fizzbuzz"]

    const testCases = inputs.map((input, index) => [input, results[index]]);

    test.each(testCases)(
        "given %p as input, returns %p",
        (input, expectedResult) => {
            const result = fizzbuzz(input as number);
            expect(result).toEqual(expectedResult);
        }
    );

    test("should return a string", () => {
        expect(typeof fizzbuzz(5)).toBe("string")
    });

    test("102 should throw an error", () => {
        expect(() => fizzbuzz(102)).toThrow(new Error("Numbers must be between 1 and 100 (inclusive)"))
    })

    test("non-number inputs should throw error", () => {
        expect(() => fizzbuzz("25" as unknown as number)).toThrow("Input must be a number")
    })
});


