const fs = require('fs');
const readline = require('readline');

const wordlist2 = fs.readFileSync('./wordlist2.txt', 'utf8').trim().split('\n');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function syllablesCounter(word) {
    word = word.toLowerCase();
    if (word.length <= 3) { return 1; }
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    return word.match(/[aeiouy]{1,2}/g).length;
}

function rhymes(word, chosenWord, type) {
    const endsWith = word.endsWith(chosenWord);
    const syllables = syllablesCounter(chosenWord);
    if (type === 'masculine') {
        return endsWith && syllables <= 1;
    } else if (type === 'feminine') {
        return endsWith && syllables > 1;
    } else if (type === 'exact') {
        return endsWith && word.length === chosenWord.length;
    }
    return false;
}

function findRhymes(chosenWord, type) {
    return wordlist2.filter(word => rhymes(word, chosenWord, type));
}

function displayRhymes(words, chosenWord, type) {
    if (words.length > 0) {
        console.log(`Words that ${type} rhyme with ${chosenWord}:`);
        words.forEach(word => console.log(word));
        console.log(`Number of ${type} rhymes found:`, words.length);
    } else {
        console.log(`Cannot find any ${type} words that rhyme with: ${chosenWord}`);
    }
}

function userInput() {
    rl.question('Type in the word you want to check or type "exit" to quit: ', (chosenWord) => {
        if (chosenWord.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        if (!chosenWord) {
            console.log('Invalid input. Please enter a valid word.');
        } else {
            const masculineWords = findRhymes(chosenWord, 'masculine');
            const feminineWords = findRhymes(chosenWord, 'feminine');
            const exactWords = findRhymes(chosenWord, 'exact');

            displayRhymes(masculineWords, chosenWord, 'masculine');
            displayRhymes(feminineWords, chosenWord, 'feminine');
            displayRhymes(exactWords, chosenWord, 'exact');
        }

        userInput();
    });
}

console.log('Welcome to the Rhyme Finder');
userInput();
