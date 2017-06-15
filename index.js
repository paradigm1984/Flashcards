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
				console.log("Thank you for using flashcard generator. Please come again!");
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

// CREATE CARD //
function createCard() {

	// prompts the user for the type of card they want to make
	inquirer.prompt([

	{
		type: "list",
		message: "What type of flashcard do you want to create???",
		choices: ["Basic Card", "Cloze Card"],
		name: "cardType"
	}
	]).then(function(appData) { // then captures that into a variable called cardType

		// grabs the card type from the array and puts it in a variable
		var cardType = appData.cardType;

		console.log(cardType);

		// BASIC CARD CREATION
		// if the card type variable from the user input is equal to Basic Card
		// run the inquirer prompt to grab the user info for their card
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
				]).then(function (cardData) { // after that is run, take the 

					// builds an object with the front and back info once it grabs the user input
					var basicObj = {            
						type:"BasicCard",
						front: cardData.front,
						back: cardData.back
					};

				// pushes the new card object to the JSON file called "./cardLibrary.json"
				library.push(basicObj);  
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
				inquirer.prompt([
				{
					type: "input",
					message: "Please fill out the full text of your trivia statement.",
					name: "text"
				},
				{
					type: "input",
					message: "Please fill out the portion of the text to cloze, replacing it with '___'.",
					name: "cloze"
				}
				]).then(function(cardData) {

					var clozeObj = {            
						type:"ClozeCard",
						front: cardData.text,
						back: cardData.cloze
					};

					
                    library.push(clozeObj);							
                    fs.writeFile("cardLibrary.json", JSON.stringify(library, null, 2)); 
                	
                    inquirer.prompt([
                    {
                    	type: "list",
						message: "Do you want to create another card??",
						choices: ["yes", "no"],
						name: "anotherCard"
                    }
                    ]).then(function(appData) {

                    	if(appData.anotherCard === "yes") {
                    		createCard();
                    	} else {
                    		setTimeout(openMenu, 1000);
                    	}
                    });
				});
			}

		});
}

// GET QUESTION -- needed for the askQustions function //
function getQuestion(card) {

	if(card.type === "BasicCard") {

		drawnCard = new BasicCard(card.front, card.back);
		return drawnCard.front;

	} else if(card.type === "ClozeCard") {

		drawnCard = new ClozeCard(card.text, card.cloze);
		return drawnCard.clozeRemoved();
	}
}

// ASK QUESTIONS //
function askQuestions() {

	// if the count is less than the length of the library
	// assign an index value to that question in the library
	if(count < library.length) {
		playedCard = getQuestion(library[count]);

		inquirer.prompt([
		{
			type: "input",
			message: playedCard,
			name: "question"
		}
		]).then(function(answer) {

			// if the answer of the question or answer.question either equaly the back side of the basic card
			// or the cloze side of the cloze card
			if(answer.question == library[count].back || answer.question == library[count].cloze) {

				console.log(colors.green("You are correct!!! Way to go!"));

			} else {

				// only a basic card has a .front so if its not undefined its a basic card
				if(drawnCard.front !== undefined) {

					console.log(colors.red("Sorry, incorrect. :(  The correct answer was ") + library[count].back + ".");
				} else {
					console.log(colors.red("Sorry, incorrect. :(  The correct answer was ") + library[count].cloze + ".");
				}

			}

			// increase the count
			count++;

			// call the function again to move to the next question. since we used an if statement, the function needs 
			// to be called within the function so that it keeps going. this allows the program to take user input in between
			// iterations of the function
			askQuestions();



		})
	} else {

		count = 0;

		// returns user to menu screen
		openMenu();
	}
}

// SHUFFLE DECK //

function shuffleDeck() {

	nenwDeck = library.slice(0);
}








