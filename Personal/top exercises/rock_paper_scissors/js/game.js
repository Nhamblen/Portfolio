// create two variables to track wins and losses
let userScore = 0;
let computerScore = 0;

// get a random choice between rock paper or scissors with a function
function getComputerChoice () {
    const computerChoice = ['rock', 'paper', 'scissors'];
    let randomChoice = Math.floor(Math.random()*computerChoice.length);
    return (computerChoice[randomChoice]);

}

// take user and computer choices as arguments and pass them through a function that plays a round, increments the score, and announces a winner
function playRound (userChoice, computerChoice) {
    let resultMessage;

    if (userChoice === computerChoice){
        resultMessage = `It's a tie! ${capitalize(userChoice)} ties ${capitalize(computerChoice)}`;
    }

    else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ){
        resultMessage = `You win! ${capitalize(userChoice)} beats ${capitalize(computerChoice)}`;
        userScore += 1;
    } else {
        resultMessage = `You lose! ${capitalize(computerChoice)} beats ${capitalize(userChoice)}`;
        computerScore += 1;
    }

    // Update result and score on the page
    document.getElementById('result').textContent = resultMessage;
    document.getElementById('score').textContent = `User: ${userScore} | Computer: ${computerScore}`;
}

// captialize the first letter in the rock, paper or scissors console.log string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById('rock').addEventListener('click', () => playRound('rock', getComputerChoice()));
document.getElementById('paper').addEventListener('click', () => playRound('paper', getComputerChoice()));
document.getElementById('scissors').addEventListener('click', () => playRound('scissors', getComputerChoice()));
