// Varibles

var genre = ["country", "rock", "blues", "classic", "dance", "electronic", "reggae"]
var theWord = "";
var lettersOfWord = []
var spaces = 0;
var currentGuessed = [];
var wrongGuess = [];
var wins = 0;
var losses = 0;
var guessesLeft = 9;

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

function resetGame() {
    guessesLeft = 9;
    wrongGuess = [];
    currentGuessed = [];
    gameBegins()
}

function compareLetter(myChar) {
    var letterInWord = false;
    for (let i = 0; i < spaces; i++) {
        if (theWord[i] == myChar) {
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

//Convert Input to lower case

document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    compareLetter(guesses);
    complete();
    document.getElementById("wrongGuesses").innerHTML = "  " + wrongGuess.join(" ");
}

