# 🧠 Poetry Assistant Data Structure & Algorithm - Rhyme Finder
A simple Node.js command-line application that analyzes and finds rhyming words based on a given input. It categorizes rhymes into masculine, feminine, and exact rhymes using a custom syllable-counting algorithm.

# 📂 Project Structure
* ads.js: The main implementation of the rhyme finder using queues to process and display results interactively.
* text.js: A refactored version of ads.js using functional programming and cleaner structure.
* wordlist2.txt: A dictionary of words used for rhyme matching.
* pseudocode.txt: Pseudocode documentation outlining the logic for all core functions.

# 📼 Video demo of the application 
[Demo Video](https://www.youtube.com/watch?v=QcO1LgaBglI)

# 🚀 Features
Takes user input from the terminal and checks for rhyming words.
Categorizes rhymes:
* Masculine: Rhymes with 1 syllable.
* Feminine: Rhymes with more than 1 syllable.
* Exact: Rhymes with identical word length.
* Implements a syllable counter to help classify rhyme types.

Uses basic data structures like queues to manage and display matches.

# 🛠️ Technologies
* JavaScript (Node.js)
* Readline module for CLI interaction
* File system module for reading word data
