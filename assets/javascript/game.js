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

function gameBegins() {
    theWord = genre[Math.floor(Math.random() * genre.length)]; // pulls the word from the array 
    lettersOfWord = theWord.split("");  // Splits the word into an array var= ["r", "o", "c", "k"]    
    console.log(lettersOfWord)
    spaces = lettersOfWord.length;     // sets a variable containing the number of items in the word in this case the arra
    console.log(spaces)                // array created one line before         
    
    // loops to push the number of var = spaces from the variable to show in the space designated for the word in the html and creates
    //                                
    for (var i = 0; i < spaces; i++) {
        currentGuessed.push("_");       // pushes a underscore equivalent to the number of spaces from above to populate the 
    }                                   // to populate the array created in the beginning currentGuessed = []    
    document.getElementById("displayedWord").innerHTML = "  " + currentGuessed.join("  ");
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
