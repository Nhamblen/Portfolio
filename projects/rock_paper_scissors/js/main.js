// Author Name: Noah Hamblen
// File Name: main.js

// Enables strict mode to catch common coding mistakes and prevent the use of potentially unsafe features.
"use strict";

// two variables to track wins and losses
let user_score = 0;
let computer_score = 0;
// two variables to track rounds played and the max rounds
let rounds_played = 0;
const total_rounds = 5;
// set the score text at the start of loading the page
document.getElementById("score").textContent = "User: 0 | Computer: 0";

// get a random choice between rock paper or scissors with a function
function get_computer_choice() {
  const computer_choice = ["rock", "paper", "scissors"];
  let random_choice = Math.floor(Math.random() * computer_choice.length);
  return computer_choice[random_choice];
}

// take user and computer choices as arguments and pass them through a function that plays a round, increments the score, and announces a winner
function play_round(user_choice, computer_choice) {
  rounds_played++; // increment the rounds played

  let result_message; // variable to show message of round win or loss

  // includes logic of the game whether its a win, loss, or tie
  if (user_choice === computer_choice) {
    result_message = `It's a tie! ${capitalize(user_choice)} ties ${capitalize(
      computer_choice
    )}`;
  } else if (
    (user_choice === "rock" && computer_choice === "scissors") ||
    (user_choice === "paper" && computer_choice === "rock") ||
    (user_choice === "scissors" && computer_choice === "paper")
  ) {
    result_message = `You win! ${capitalize(user_choice)} beats ${capitalize(
      computer_choice
    )}`;
    user_score += 1;
  } else {
    result_message = `You lose! ${capitalize(
      computer_choice
    )} beats ${capitalize(user_choice)}`;
    computer_score += 1;
  }

  // update result and score on the page
  document.getElementById("result").textContent = result_message;
  document.getElementById(
    "score"
  ).textContent = `User: ${user_score} | Computer: ${computer_score}`;

  // determine the animation to apply based on the result
  let userImg = document.getElementById(`${user_choice}_img`);
  let computerImg = document.getElementById(`${computer_choice}_img`);

  // remove previous animations
  userImg.classList.remove("animate_crush", "animate_cover", "animate_cut");
  computerImg.classList.remove("animate_crush", "animate_cover", "animate_cut");

  // apply animation classes and sounds if you win
  if (result_message.includes("win")) {
    if (user_choice === "rock" && computer_choice === "scissors") {
      userImg.classList.add("animate_crush");
      play_sound("rock");
    } else if (user_choice === "paper" && computer_choice === "rock") {
      userImg.classList.add("animate_cover");
      play_sound("paper");
    } else if (user_choice === "scissors" && computer_choice === "paper") {
      userImg.classList.add("animate_cut");
      play_sound("scissors");
    }
  }

  if (check_game_over()) {
    display_results();
  }
}

// captialize the first letter in the rock, paper or scissors string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// checks if the game should continue or not
function check_game_over() {
  if (rounds_played >= total_rounds) {
    return true; // game over
  }
  return false; // game continues
}

// displays the final message
function display_results() {
  let final_message;

  if (user_score > computer_score) {
    final_message = "YOU WIN THE GAME! 🎉";
    play_sound("win_game", 0.3);
    trigger_confetti(); // Call the confetti function
  } else if (user_score === computer_score) {
    final_message = "You tied the game. 🤔";
    play_sound("tie_game", 0.3);
  } else {
    final_message = "You lose the game. 😭";
    play_sound("lose_game", 0.3);
  }

  // update the final result message on the page
  document.getElementById("result").textContent = final_message;
}

function trigger_confetti() {
  const duration = 3 * 1000; // 3 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 300 * (timeLeft / duration);
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2, // Confetti slightly above screen center
        },
      })
    );
  }, 250);
}

// takes the sound file and plays it with function
function play_sound(sound, volume = 1.0) {
  const audio = new Audio(`sounds/${sound}.wav`); // path to the sound file
  audio.volume = volume; // Set the volume (default is 1.0, max volume)
  audio.play();
}

// resets the scores, rounds played, and text content on the page
function reset_game() {
  user_score = 0;
  computer_score = 0;
  rounds_played = 0;
  document.getElementById("result").textContent = "";
  document.getElementById("score").textContent = "User: 0 | Computer: 0";
}

// inputs rock as user_choice and plays a round with the HTML button if game is not over with check_game_over function
document.getElementById("rock").addEventListener("click", () => {
  if (!check_game_over()) {
    play_round("rock", get_computer_choice());
  }
});

// inputs paper as user_choice and plays a round with the HTML button if game is not over with check_game_over function
document.getElementById("paper").addEventListener("click", () => {
  if (!check_game_over()) {
    play_round("paper", get_computer_choice());
  }
});

// inputs scissors as user_choice and plays a round with the HTML button if game is not over with check_game_over function
document.getElementById("scissors").addEventListener("click", () => {
  if (!check_game_over()) {
    play_round("scissors", get_computer_choice());
  }
});

// resets the game with the HTML button and reset_game function
document.getElementById("reset").addEventListener("click", () => reset_game());
