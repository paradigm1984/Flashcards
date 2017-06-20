
// Constructor function for the Cloze Card.
function ClozeCard(text, cloze) {
	// text.split to take out the cloze section
    this.text = text.split(cloze);
    this.cloze = cloze;

};

// Constructor that creates a prototype of ClozeCard to return the question missing cloze
function ClozeCardPrototype() {

    this.clozeRemoved = function () {

    	// template literals allow you to seperate sections of text and call them by array values
    	// this allows it to return the close but replaces the word with the cloze variable with ...
        return `${this.text[0]} ... ${this.text[1]}`;  
    };											
};

ClozeCard.prototype = new ClozeCardPrototype();

module.exports = ClozeCard; 