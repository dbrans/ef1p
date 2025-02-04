/*
Author: Kaspar Etter (https://kasparetter.com/)
Work: Explained from First Principles (https://ef1p.com/)
License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
*/

const widths = {
    ' ': 3.08813,
    '!': 5.48813,
    '"': 6.35203,
    '#': 9.28016,
    '$': 9.28016,
    '%': 12.57609,
    '&': 11.24813,
    '\'': 3.68,
    '(': 4.8,
    ')': 4.8,
    '*': 6.4,
    '+': 9.28016,
    ',': 3.39203,
    '-': 5.55203,
    '.': 3.39203,
    '/': 4.89297,
    '0': 9.28016,
    '1': 9.28016,
    '2': 9.28016,
    '3': 9.28016,
    '4': 9.28016,
    '5': 9.28016,
    '6': 9.28016,
    '7': 9.28016,
    '8': 9.28016,
    '9': 9.28016,
    ':': 4.03203,
    ';': 4.03203,
    '<': 9.28016,
    '=': 9.28016,
    '>': 9.28016,
    '?': 6.36813,
    '@': 13.15203,
    'A': 10.88016,
    'B': 10.35203,
    'C': 10.96,
    'D': 12.04813,
    'E': 9.29609,
    'F': 9.05609,
    'G': 11.74406,
    'H': 12.09609,
    'I': 4.91203,
    'J': 7.10406,
    'K': 10.89609,
    'L': 8.22406,
    'M': 14.72,
    'N': 12.09609,
    'O': 12.76813,
    'P': 9.77609,
    'Q': 12.76813,
    'R': 10.30406,
    'S': 8.48,
    'T': 9.44,
    'U': 11.68,
    'V': 10.88016,
    'W': 16.30406,
    'X': 10.28813,
    'Y': 10.06406,
    'Z': 9.98406,
    '[': 4.8,
    '\\': 4.92469,
    ']': 4.8,
    '^': 9.28016,
    '_': 6.30406,
    '`': 4.91203,
    'a': 8.11203,
    'b': 8.94406,
    'c': 7.47203,
    'd': 8.94406,
    'e': 8.38406,
    'f': 5.39203,
    'g': 8.17609,
    'h': 8.89609,
    'i': 4.09609,
    'j': 4.06859,
    'k': 8.38406,
    'l': 4.09609,
    'm': 13.13609,
    'n': 8.89609,
    'o': 8.89609,
    'p': 8.83203,
    'q': 8.94406,
    'r': 6.44813,
    's': 6.94406,
    't': 5.96813,
    'u': 8.89609,
    'v': 8.19203,
    'w': 12.25609,
    'x': 8.06406,
    'y': 8.19203,
    'z': 7.39203,
    '{': 4.8,
    '|': 4.8,
    '}': 4.8,
    '~': 9.28016,
};

export const monospaceWidth = 8.42875;

export function estimateStringWidth(text: string): number {
    let i = text.length;
    let result = 0;
    // Avoid recalculation of 'text.length'.
    while (i--) {
        // @ts-ignore
        result += widths[text.charAt(i)] ?? 10;
    }
    return result;
}

// All text styles that affect the width of a string.
export type TextStyle = 'normal' | 'bold' | 'italic' | 'small' | 'large' | 'script';

export const widthMultiplier: Record<TextStyle, number> = {
    normal: 1,
    bold: 1.01825,
    italic: 0.92355,
    small: 0.8,
    large: 1.6,
    script: 0.75,
};
