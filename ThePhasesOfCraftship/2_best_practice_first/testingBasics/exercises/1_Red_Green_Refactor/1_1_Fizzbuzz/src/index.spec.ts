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



    test.each

    test("input of 5 should return buzz", () => {
        expect(fizzbuzz(5)).toEqual("buzz");
    });

    test("10 should return buzz", () => {
        expect(fizzbuzz(10)).toEqual("buzz");
        });

    test("3 should return fizz", () => {
        expect(fizzbuzz(3)).toEqual("fizz");
    })

    test("9 should return fizz", () => {
        expect(fizzbuzz(9)).toEqual("fizz");
    })

    test("15 should return fizzbuzz", () => {
        expect(fizzbuzz(15)).toEqual("fizzbuzz")
    })

    test("102 should throw an error", () => {
        expect(() => fizzbuzz(102)).toThrow(new Error("Numbers must be between 1 and 100 (inclusive)"))
    })

    test("non-number inputs should throw error", () => {
        expect(() => fizzbuzz("25" as unknown as number)).toThrow("Input must be a number")
    })

    test("43 should return '43'", () => {
        expect(fizzbuzz(43)).toEqual("43");
    });

    test("42 should return fizz", () => {
        expect(fizzbuzz(42)).toEqual("fizz");
    });

    test("45 should return fizzbuzz", () => {
        expect(fizzbuzz(45)).toEqual("fizzbuzz");
    })
});


