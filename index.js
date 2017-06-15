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


function createCard() {

	// prompts the user for the type of card they want to make
	inquirer.prompt([

	{
		type: "list",
		message: "What type of flashcard do you want to create???"
		choices: ["Basic Card", "Cloze Card"],
		name: "cardType",
	}
	]).then(function(appData) { // then captures that into a variable called cardType
		var cardType = app.Data.cardType;
		console.log(cardType);

		// BASIC CARD CREATION
		if(cardType == "Basic Card") {
			inquirer.prompt([
			{
				type: "input",
				message: "Please fill out the front of your card (Your question).",
				name: "front",

			},
			{
				type: "input",
				message: "Please fill out the back of your card (Your answer).",
				name: "back",
			}
				]).then(function (cardData) {

					// builds an object with the front and back info once it grabs the user input
					var cardObj = {            
						type:"BasicCard",
						front: cardData.front,
						back: cardData.back,
					};

				
				// pushes the new card object to the JSON file called "./cardLibrary.json"
				library.push(cardObj);  
				fs.writeFile("cardLibrary.json", JSON.stringify(library, null, 2));

				// once it grabs the first card and puts it into an array it asks the user if they want to
				//  make any more cards
				inquirer.prompt([
				{
					type: "list",
					message: "Do you want to create another card??",
					choices: ["yes", "no"],
					name: "anotherCard"
				}
				]).then(function(appData) {  // The promise check after the user gives an answer

					// if the user says yes to creating anotherCard
					if(appData.anotherCard === "yes") {
						createCard();
					} else {
						// otherwise return to the main menu after 1 sec
						setTimeout(openMenu, 1000); 
					}
				});
				});
			} else {
				console.log("Whoops!");
			}

		})
}