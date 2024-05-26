import {fizzbuzz} from "./fizzbuzz";

describe("fizzbuzz", () => {

    test("should return a string", () => {
        expect(typeof fizzbuzz(5)).toBe("string")
    });

    test("input of 5 should return buzz", () => {
        expect(fizzbuzz(5)).toEqual("buzz");
    });



});


