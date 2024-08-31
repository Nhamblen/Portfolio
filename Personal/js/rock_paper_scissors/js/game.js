// get a random choice between rock paper or scissors with a function
function getComputerChoice () {
    const computerChoice = ['Rock', 'Paper', 'Scissors'];
    let randomChoice = [Math.floor(Math.random()*computerChoice.length)];
    console.log(computerChoice[randomChoice]);

}


// get a choice from the user to pick rock paper or scissors with a function
function getUserChoice () {
    let userChoice = prompt ("Please enter a choice. Rock Paper or Scissors?");
    if (userChoice === 'Rock' || userChoice === 'Paper' || userChoice === 'Scissors')
        return userChoice;
    else {
        console.log("Error! Invalid choice!");
        getUserChoice();
    }
}

getUserChoice();

// create two variables to track wins and losses and print them



// takes player choices as arguments and pass them through a function that plays a round, increments the score, and announces a winner
