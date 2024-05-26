
export function isPalindrome(text: string) {
    return text.toLowerCase().split("").reverse().join("") === text.toLowerCase();
}