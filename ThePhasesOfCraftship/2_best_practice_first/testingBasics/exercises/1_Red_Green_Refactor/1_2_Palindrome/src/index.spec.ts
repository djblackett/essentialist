import {isPalindrome} from "./index";

describe('palindrome checker', () => {

    test("'mom' should return true", () => {
        expect(isPalindrome("mom")).toBe(true);
    })

    test("'Mom' should return true", () => {
        expect(isPalindrome("Mom")).toBe(true);
    })

    test("'MoM' should return true", () => {
        expect(isPalindrome("MoM")).toBe(true);
    })

    test("'Momx' should return false", () => {
        expect(isPalindrome("Momx")).toBe(false);
    })

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