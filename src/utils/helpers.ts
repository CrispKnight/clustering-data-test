import levenshtein from 'fast-levenshtein';

export const getMaxLength = (a: any[], b: any[]) => {
    return a.length >= b.length ? a.length : b.length;
};

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
