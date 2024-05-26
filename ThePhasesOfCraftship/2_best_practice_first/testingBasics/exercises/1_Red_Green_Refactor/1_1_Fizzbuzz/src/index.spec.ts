import {fizzbuzz} from "./fizzbuzz";

describe("fizzbuzz", () => {

    test("should return a string", () => {
        expect(typeof fizzbuzz(5)).toBe("string")
    });

    test("input of 5 should return buzz", () => {
        expect(fizzbuzz(5)).toEqual("buzz");
    });

    test("10 should return buzz", () => {
        expect(fizzbuzz(10)).toEqual("buzz");
        });

    test("3 should return fizz", () => {
        expect(fizzbuzz(3)).toEqual("fizz");
    })

    test("6 should return fizz", () => {
        expect(fizzbuzz(6)).toEqual("fizz");
    })

    test("15 should return fizzbuzz", () => {
        expect(fizzbuzz(15)).toEqual("fizzbuzz")
    })
});


