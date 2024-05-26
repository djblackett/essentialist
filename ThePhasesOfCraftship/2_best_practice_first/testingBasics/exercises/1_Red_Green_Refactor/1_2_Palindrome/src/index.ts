
export function isPalindrome(text: string) {
    return text
        .replaceAll(/ +/g, "")
        .toLowerCase()
        .split("")
        .reverse()
        .join("") === text
        .toLowerCase()
        .replaceAll(/ +/g, "");
}