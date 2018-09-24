// Variables

let buttons = document.querySelectorAll('.choice-button');
let playerScore = document.querySelector('#player-score');
let computerScore = document.querySelector('#computer-score');
let messages = document.querySelector('#gamelog-messages');
let emptyMessage = document.querySelector('#message-empty');
let modal = document.querySelector('#modal');
let modalHeading = document.querySelector('#modal-heading');
let modalText = document.querySelector('#modal-text');
let modalYes = document.querySelector('#replay');
let modalNo = document.querySelector('#end-game');
let modalEnd = document.querySelector('#modal-end');



let turn;
let winner;
let playerChoice;
let computerChoice;
let gameInProgress;

turn = 1;

let gameLoseMessage = (playerSelection, computerSelection) => `You Lose! ${computerSelection.capitalize()} beats ${playerSelection.capitalize()}.`;
let gameWinMessage = (playerSelection, computerSelection) => `You Win! ${playerSelection.capitalize()} beats ${computerSelection.capitalize()}.`;
let gameDrawMessage = (playerSelection, _) => `It's a draw! You both chose ${playerChoice}`;
// Event listeners

buttons.forEach( (button) => {
	button.addEventListener('click', (e) =>{
		playerChoice = e.srcElement.dataset.choice;
		playRound(playerChoice);
	});
});

modalYes.addEventListener('click', restartGame);

modalNo.addEventListener('click', endGame);



String.prototype.capitalize = function() {

	return this.charAt(0).toUpperCase() + this.slice(1);

}

// Functions

//updates the score
function incrementScore(player){

	let score = Number(player.textContent);
	player.innerText = score + 1;

}
// get random computer choice 
function computerPlay() {

	let choice = Math.floor((Math.random() * 27 + 9) / 9);
	switch (choice) {
	case 1:
		return 'rock';
	case 2:
		return 'paper';
	case 3:
		return 'scissors';
	};

}
// decieds who won the game
function gameOutcome(playerSelection, computerSelection){

	if (playerSelection === computerSelection){
		return "tie"
	} else if (playerSelection === 'rock'){
		if (computerSelection === 'paper'){
			return 'computer';
		} else {
			return 'player';
		}
	} else if (playerSelection === 'paper'){
		if (computerSelection === 'rock'){
			return 'player';
		} else {
			return 'computer';
		}
	} else {
		if (computerSelection === 'rock'){
			return 'computer';
		} else {
			return 'player';
		}
	}

}
// create DOM element for message
function createMessage(){
	let message = document.createElement('p');
	message.classList.add('gamelog-message','removable-message');
	return message;
}
// inserts text in message element
function updateMessageText(message, typeMessage, playerChoice, computerChoice){
	message.innerText = `Turn ${turn}:  ${typeMessage(playerChoice, computerChoice)}`;
	turn += 1;
	return message;
}
// updates the scores and pushes new message in logs
function updateData(winner, playerChoice, computerChoice){

	let message = createMessage();
	if (winner == 'player'){
		message = updateMessageText(message, gameWinMessage, playerChoice, computerChoice);
		incrementScore(playerScore);
	} else if (winner == 'computer'){
		message = updateMessageText(message, gameLoseMessage, playerChoice, computerChoice);		
		incrementScore(computerScore);
	} else {
		message = updateMessageText(message, gameDrawMessage, playerChoice, computerChoice);
	}
	messages.appendChild(message);

}
//	removes all messages that were created during the game
function removeLogMessages(){
	let removableMessages = document.querySelectorAll('.removable-message');
	removableMessages.forEach( (message) => {
		message.parentElement.removeChild(message);
	});
}

function updateModal(heading, text){
	modal.classList.remove('visually-hidden');
	modalHeading.innerText = heading;
	modalText.innerText = text;
}

function restartGame(){
	turn = 1;
	removeLogMessages();
	computerScore.innerText = 0;
	playerScore.innerText = 0;
	modal.classList.add('visually-hidden');
	emptyMessage.classList.remove('visually-hidden');
}

function endGame(){
	modal.classList.add('visually-hidden');
	modalEnd.classList.remove('visually-hidden');	
}





// main function

function playRound(playerChoice){
	computerChoice = computerPlay();
	// decide who is the winner
	winner = gameOutcome(playerChoice, computerChoice);
	// update information on the screen
	updateData(winner, playerChoice, computerChoice);
	// hide empty message in game log
	emptyMessage.classList.add('visually-hidden');

	if(playerScore.innerText == '5'){
		updateModal('Congratulations!','You won!');
	} else if (computerScore.innerText =='5'){
		updateModal('I got bad news for you, buddy!', 'You lost :(');
	}			
}
