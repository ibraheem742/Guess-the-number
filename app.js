let randomNumber = Math.floor(Math.random() * 100) + 1; 
const output = document.querySelector(`.output`);
const userGuessed = document.querySelector(`.userGuessed`);
const remainingAttempts = document.querySelector(`.remainingAttempts`);
const submit = document.querySelector(`.submit`);

console.log(randomNumber);

let prevGuess = [];
let totalAttempts = 5;
let game = true;

function checkGuess(userValue) {
  prevGuess.push(userValue);
  userGuessed.textContent = `Guessed: ${prevGuess.join(", ")}`;
  totalAttempts--;
  remainingAttempts.textContent = `Remaining Attempts: ${totalAttempts}`;
}

function endGame(message) {
  game = false;
  output.style.color = "red";
  output.textContent = message;
  submit.textContent = "New Game";
  document.querySelector(".userValue").disabled = true;
}

function newGame() {
  // reset variables
  randomNumber = Math.floor(Math.random() * 100) + 1;
  prevGuess = [];
  totalAttempts = 5;
  game = true;

  // reset UI
  userGuessed.textContent = "Guessed: ";
  remainingAttempts.textContent = `Remaining Attempts: ${totalAttempts}`;
  output.textContent = "Game restarted! Guess a number 1–100.";
  output.style.color = "white";
  document.querySelector(".userValue").disabled = false;
  submit.textContent = "Submit";

  console.log("New Random:", randomNumber); // for testing
}

submit.addEventListener("click", function () {

  if (submit.textContent === "New Game") {
    newGame();
    return;
  }

  if (!game) return;

  const inputEl = document.querySelector(`.userValue`);
  const userValue = Number(inputEl.value);

  if (!userValue || isNaN(userValue) || userValue < 1 || userValue > 100) {
    output.style.color = "red";
    output.innerHTML = `"${inputEl.value}" is not a Valid Number`;
    inputEl.value = "";
    return;
  }

  checkGuess(userValue);

  if (userValue < randomNumber) {
    output.style.color = "white";
    output.innerHTML = "Try a higher number.";
  } else if (userValue > randomNumber) {
    output.style.color = "white";
    output.innerHTML = "Try a lower number.";
  } else {
    output.style.color = "yellow";
    endGame("You won 🎉");
    return;
  }

  if (totalAttempts === 0) {
    endGame(`Game Over! The number was ${randomNumber}`);
  }

  inputEl.value = ""; // clear field after attempt
});
