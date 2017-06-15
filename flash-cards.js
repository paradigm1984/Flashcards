// https://github.com/jasonboru/Flashcard-Generator

// ============================== VARIABLES =============================== //


// including the inquirer package. This package allows you to add
// prompts in your terminal.
var inquirer = require("inquirer");
// including the colors package
var colors = require("colors");

var fs = require("fs");

// including a file you will create later
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var library = require("./cardLibrary.json");
var colors = require("colors");


var drawnCard;
var playerCard;
var count = 0;


// ================================== LOGIC =================================== //

// this function will run the menu when the application is run
function openMenu() {

	// the inquirer.prompt function will display this array to the user which is the menu.
	inquirer.prompt([
	{
		type: "list",
		message: "\n Please choose an option from the list below...",
		choices: ["Create", "Use All", "Random", "Shuffle", "Show All", "Exit"],
		name: "menuOptions",
	}	
	]).then(function(answer) { // waits to take the answer of the user with the .then.
		var waitMessage;

		// switch case to grab what the user has input.
		switch (answer.menuOptions) {

			case "Create":
				console.log("Ok, lets make a new flashcard!");
				// run the createCard function on a timer
				waitMessage = setTimeout(createCard, 1000);
				break;

			case "Use All":
				console.log("Ok, lets run through the deck.");
				// run the askQuestions function on a timer
				waitMessage = setTimeout(askQuestions, 1000);
				break;

			case "Random":
				console.log("Ok, I'll pick one random card from the deck.");
				// run the randomCard function on a timer
				waitMessage = setTimeout(randomCard, 1000);	
				break;

			case "Shuffle":
				console.log("Ok, I'll shuffle all of the cards in the deck.");
				// run the shuffleDeck function on a timer
				waitMessage = setTimeout(shuffleDeck, 1000);
				break;

			case "Show All":
				console.log("Ok, I'll print all from the cards in the deck to your screen.");
				// run the showCards function on a timer
				waitMessage = setTimeout(showCards, 1000);	
				break;

			case "Exit":
				console.log("Thank you for using flashcard generator.");
				// return nothing
				return;
				break;					
		}
	});
}

// run the open menu function so that it runs as soon as the 
//program starts
openMenu();

// ================================= FUNCTIONS ================================== //

