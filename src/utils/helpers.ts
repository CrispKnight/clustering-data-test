import levenshtein from 'fast-levenshtein';

export const getMaxLength = (a: any[], b: any[]) => {
    return a.length >= b.length ? a.length : b.length;
};

/**
 * Checks if words are same by calculating
 * words' distance metric using Levenshtein algorithm and
 * comparing it to specified words' equality percent
 * @param wordA first word to compare
 * @param wordB second word to compare
 * @param minEqPercent required words equality percent
 * @returns true if words are same and false if not
 */
export const isSameWords = (
    wordA: string,
    wordB: string,
    minEqPercent: number
) => {
    const maxLength =
        wordA.length >= wordB.length ? wordA.length : wordB.length;
    const wordsDiff = levenshtein.get(wordA, wordB);
    const wordsEquity = 1 - wordsDiff / maxLength;

    return wordsEquity >= minEqPercent;
};

/**
 * Calcs number of similar words in lists using min words'
 * equality percent to determine if words are same
 * @param listA first list of words to compare
 * @param listB second list of words to compare
 * @param minWordsEquality required words' equality percent to determine words as same
 * @returns number of similar words in lists
 */
export const compareWordLists = (
    listA: string[],
    listB: string[],
    minWordsEquality: number
) => {
    const markedWords: string[] = [];
    let eqWordsCounter = 0;

    listA.forEach((wordA) => {
        listB.forEach((wordB) => {
            if (
                isSameWords(wordA, wordB, minWordsEquality) &&
                !markedWords.includes(wordB)
            ) {
                markedWords.push(wordB);
                eqWordsCounter += 1;
            }
        });
    });

    return eqWordsCounter;
};
