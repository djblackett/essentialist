import {isPalindrome} from "./index";

describe('palindrome checker', () => {

    const inputs = ["mom", "Mom", "MoM", "Momx", "xMomx",
        "Was It A Rat I Saw", "Never Odd or Even", "Never Odd or Even1",
        "1Never Odd or Even1"]

    const results = [true, true, true, false, true, true, true, false, true]

    const testCases = inputs.map((input, index) => [input, results[index]]);

    test.each(testCases)(
        "given %p as input, returns %p",
        (input, expectedResult) => {
            const result = isPalindrome(input as string);
            expect(result).toEqual(expectedResult);
        }
    );

    // "mom" returns true
    // "Mom" returns true
    // "MoM" returns true
    // "Momx" returns false
    // "xMomx" returns true
    // "Was It A Rat I Saw" returns true
    // "Never Odd or Even" returns true
    // "Never Odd or Even1" returns false
    // "1Never Odd or Even1" returns true


})