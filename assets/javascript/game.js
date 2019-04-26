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

'use strict';

var Trail = function (options) {
    this.size = options.size || 50;
    this.trailLength = options.trailLength || 20;
    this.interval = options.interval || 15;
    this.hueSpeed = options.hueSpeed || 6;

    this.boxes = [];
    this.hue = 0;
    this.mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    this.init = function () {
        for (var i = 0; i < this.trailLength; i++) {
            this.boxes[i] = document.createElement('div');
            this.boxes[i].className = 'box';
            this.boxes[i].style.width = this.size + 'px';
            this.boxes[i].style.height = this.size + 'px';
            document.body.appendChild(this.boxes[i]);
        }

        var self = this;

        // document.onmousemove = function() {
        //   event = event || window.event;
        //   self.mouse.x = event.clientX;
        //   self.mouse.y = event.clientY;
        //   console.log(event);
        // };

        //Periodically update mouse tracing and boxes
        setInterval(function () {
            self.updateHue();
            self.updateBoxes();
        }, this.interval);
    }

    //Update hue and constrain to 360
    this.updateHue = function () {
        this.hue = (this.hue + this.hueSpeed) % 360;
    }

    //Update box positions and stylings
    this.updateBoxes = function () {
        for (var i = 0; i < this.boxes.length; i++) {
            if (i + 1 === this.boxes.length) {
                this.boxes[i].style.top = this.mouse.y - this.size / 2 + 'px';
                this.boxes[i].style.left = this.mouse.x - this.size / 2 + 'px';
                this.boxes[i].style.backgroundColor = 'hsl(' + this.hue + ', 90%, 50%)';
            } else {
                this.boxes[i].style.top = this.boxes[i + 1].style.top;
                this.boxes[i].style.left = this.boxes[i + 1].style.left;
                this.boxes[i].style.backgroundColor = this.boxes[i + 1].style.backgroundColor;
            }
        }
    }
}

var options = {
    trailLength: 30,
    size: 20,
    interval: 10,
    hueSpeed: 2
};
var trail = new Trail(options);
trail.init();

//Hotfix
document.onmousemove = function () {
    trail.mouse.x = event.clientX;
    trail.mouse.y = event.clientY;
};
