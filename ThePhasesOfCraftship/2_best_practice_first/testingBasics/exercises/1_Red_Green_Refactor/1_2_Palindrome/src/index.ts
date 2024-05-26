
export function isPalindrome(text: string) {
    return text.split("").reverse().join("") === text;
}