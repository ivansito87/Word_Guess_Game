// Varibles

var genre = ["country", "rock", "blues", "classic", "dance", "electronic", "reggae"]   // Create an array containg all the words to be guessed
var theWord = "";           // an empty string that will contain the workd picked from the array 
var lettersOfWord = []      // we are creating an array that will split the letters of the picked word and place them in this array 
var spaces = 0;              // we are adding to this vaiable as many letters as they are in the array
var currentGuessed = [];    // current guessed this array will be populated after after the user presses a key
var wrongGuess = [];         // we will store the pressed keys in this array to show them in the page
var wins = 0;           
var losses = 0;             
var guessesLeft = 9;            // here is how many attempts does the user has 

// Functions

function gameBegins() {                                         // starts the game
    theWord = genre[Math.floor(Math.random() * genre.length)];  // first we need to generate a word from the genre array 
    lettersOfWord = theWord.split("");                          // then we split the word into an array where each one of its characters represents an index
    spaces = lettersOfWord.length;                              // we set the varable spaces equal to the number of letters in the word
    for (var i = 0; i < spaces; i++) {                          // here we are pusing a _ underscore to the array of current guessed so that we can use this in the HTML
        currentGuessed.push("_");                               // and we push as many lines as there are charactrs in the array 
    }
    document.getElementById("displayedWord").innerHTML = "  " + currentGuessed.join("  ");      // here we place the _ spaces in to the HTML 
}

function resetGame() {              // function to reset the game 
    guessesLeft = 9;                // we reset the game by setting the vatriables equal to empty and guesses left = 9 
    wrongGuess = [];
    currentGuessed = [];
    gameBegins()                    // when we call this funciton that game starts again 
}

function compareLetter(myChar) {            // in this function the letter is checked to  determin who is the winner
    var letterInWord = false;               // letter in word is false to prevent the game to continue going
    for (let i = 0; i < spaces; i++) {      // for i in the total of spaces 
        if (theWord[i] == myChar) {         // if the index of the word is equal to myChar then leetes in word equals tre
            letterInWord = true;
        }
    }
    if (letterInWord) {
        //check each letter to see if it matches word
        for (let i = 0; i < spaces; i++) {
            if (theWord[i] == myChar) {
                currentGuessed[i] = myChar;
            }
        }
    }
    else {
        wrongGuess.push(myChar);
        guessesLeft--;
    }
}

// to check if the player wins or losses
function complete() {
    if (lettersOfWord.toString() == currentGuessed.toString()) {
        wins++;
        resetGame()
        document.getElementById("winCount").innerHTML = " " + wins;
    } else if (guessesLeft === 0) {
        losses++;
        resetGame()
        document.getElementById("lossCount").innerHTML = " " + losses;
    }
    document.getElementById("displayedWord").innerHTML = "  " + currentGuessed.join(" ");
    document.getElementById("guessesLeft").innerHTML = " " + guessesLeft;
}

gameBegins()

//Convert Input to lower case we use this function to retrieve the key imputs from the user 

document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    compareLetter(guesses);
    complete();
    document.getElementById("wrongGuesses").innerHTML = "  " + wrongGuess.join(" ");
}

