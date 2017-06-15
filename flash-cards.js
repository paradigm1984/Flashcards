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
createCard();

