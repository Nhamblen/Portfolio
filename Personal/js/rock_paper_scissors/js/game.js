// create two variables to track wins and losses
let humanScore = 0
let computerScore = 0

// get a random choice between rock paper or scissors with a function
function getComputerChoice () {
    const computerChoice = ['rock', 'paper', 'scissors'];
    let randomChoice = [Math.floor(Math.random()*computerChoice.length)];
    return (computerChoice[randomChoice]);

}


// get a choice from the user to pick rock paper or scissors with a function
function getUserChoice () {
    let userChoice = prompt ("Please enter a choice. Rock, Paper, or Scissors?").toLowerCase();
    if (userChoice === 'rock' || userChoice === 'paper' || userChoice === 'scissors'){
        return userChoice;
    }
    else {
        console.log("Error! Invalid choice!");
        getUserChoice();
    }
}


// takes user and computer choices as arguments and pass them through a function that plays a round, increments the score, and announces a winner
function playRound (userChoice, computerChoice) {
    if (userChoice === computerChoice){
        console.log (`It's a tie! ${capitalize(userChoice)} ties ${capitalize(computerChoice)}`);
    }

    else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ){
        console.log(`You win! ${capitalize(userChoice)} beats ${capitalize(computerChoice)}`);
    } else {
        console.log(`You lose! ${capitalize(computerChoice)} beats ${capitalize(userChoice)}`);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


const computerSelection = getComputerChoice();
const humanSelection = getUserChoice();

playRound(humanSelection, computerSelection);
