const fs = require('fs');
const readline = require('readline');

// Read the wordlist2 from the file
const wordlist2 = fs.readFileSync('./wordlist2.txt', 'utf8').trim().split('\n');
// Create an interface for reading input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Queue {
  constructor() {
    this.words = [];
  }
  enqueue(word) {
    this.words.push(word);
  }
  dequeue() {
    return this.words.shift();
  }
  clear() {
    this.words = [];
  }
  isEmpty() {
    return this.words.length === 0;
  }
}

function wordsThatRhyme(word, chosenWord){
  if(word.endsWith(chosenWord) && syllablesCounter(chosenWord) <= 1){
    return true;
  }
  return false;
}

function feminineRhymes(word, chosenWord){
  if(word.endsWith(chosenWord) && syllablesCounter(chosenWord) > 1){
    return true;
  }
  return false;
}

function exactRhymes(word, chosenWord){
  if(word.endsWith(chosenWord) && word.length === chosenWord.length){
    return true;
  }
  return false;
}

function syllablesCounter(word){
    word = word.toLowerCase();                                    
    if(word.length <= 3) {return 1;}                               
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   
    word = word.replace(/^y/, '');                               
    return word.match(/[aeiouy]{1,2}/g).length; 
}

function userInput(queue, feminineQueue, exactQueue){ 

  rl.question('Type in the word you want to check or type "exit" to quit: ', (chosenWord) => {
    if (chosenWord.toLowerCase() === 'exit'){
      rl.close();
      return;
    }

    if (invalidWord(chosenWord)){
      userInput(queue, feminineQueue, exactQueue);
      return;
    }

    // enqueue the filtered words
    addWord(queue, chosenWord);
    addFeminineWord(feminineQueue, chosenWord);
    addExactWord(exactQueue, chosenWord);  
    // display the filtered words in the terminal
    displayWords(queue, chosenWord);
    displayFeminineWords(feminineQueue, chosenWord);
    displayExactWords(exactQueue, chosenWord);

    userInput(queue, feminineQueue, exactQueue);
  });
}

function invalidWord(chosenWord){
  if (!chosenWord){
    console.log('Invalid input. Please enter a valid word.');
    return true;
  }
return false;
}

// masculine rhyme
function addWord(queue, chosenWord) {
  for (let i = 0; i < wordlist2.length; i++) {
    let word = wordlist2[i];
    if (wordsThatRhyme(word, chosenWord)) {
      queue.enqueue(word);
    }
  }
}
// feminine rhyme
function addFeminineWord(feminineQueue, chosenWord){
    for (let i = 0; i < wordlist2.length; i++) {
        let word = wordlist2[i];
        if (feminineRhymes(word, chosenWord)) {
            feminineQueue.enqueue(word);
        }
    }
}
// exact rhyme 
function addExactWord(exactQueue, chosenWord){
  for (let i = 0; i < wordlist2.length; i++){
    let word = wordlist2[i];
    if(exactRhymes(word, chosenWord)){
      exactQueue.enqueue(word);
    }
  }
}

// display masculine rhyme
function displayWords(queue, chosenWord){
  if(!queue.isEmpty()) {
    console.log('Words that rhyme with', chosenWord + ':');
    let amount = 0;
    while (!queue.isEmpty()) {
      console.log(queue.dequeue());
      amount ++;
    }
    console.log('Number of masculine words found:', amount);
  } 
  else{
    console.log('Cannot find any masculine words that rhyme with:', chosenWord);
  }
}

// display feminine rhyme
function displayFeminineWords(feminineQueue, chosenWord){
    if(!feminineQueue.isEmpty()) {
      console.log('Words that rhyme with', chosenWord + ':');
      let amount = 0;
      while (!feminineQueue.isEmpty()) {
        console.log(feminineQueue.dequeue());
        amount ++;
      }
      console.log('Number of feminine words found:', amount);
    } 
    else{
      console.log('Cannot find any feminine words that rhyme with:', chosenWord);
    }
}

// display exact rhyme 
function displayExactWords(exactQueue, chosenWord){
  if(!exactQueue.isEmpty()){
    console.log('Words that rhyme with', chosenWord + ':');
      let amount = 0;
      while (!exactQueue.isEmpty()) {
        console.log(exactQueue.dequeue());
        amount ++;
      }
      console.log('Number of exact words found:', amount);
    } 
    else{
      console.log('Cannot find any exact words that rhyme with:', chosenWord);
  }
}

function startProcess(){
  const queue = new Queue();
  const feminineQueue = new Queue();
  const exactQueue = new Queue();
  console.log('Welcome to the Rhyme Finder');
  userInput(queue, feminineQueue, exactQueue);
}

startProcess();


