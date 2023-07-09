let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("startBtn").addEventListener("click", startGame);
  document.getElementById("resetBtn").addEventListener("click", resetGame);
});

function startGame() {
  setGame();
  document.getElementById("startBtn").disabled = true;
}

function resetGame() {
    gameOver = true;
    score = 0;
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("board").innerHTML = "";
    document.getElementById("score").classList.remove("hidden"); // Remove the "hidden" class
    document.getElementById("startBtn").disabled = false;
    hideGameOver();
  }
  

function setGame() {
  gameOver = false;
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  setInterval(setMole, 1000);
  setInterval(setPlant, 2000);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) {
    return;
  }
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "./Images/monty-mole.png";
  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) {
    return;
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "./Images/piranha-plant.png";
  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }

  if (this == currMoleTile) {
    score += 10;
    document.getElementById("score").innerText = "Score: " + score.toString();
  } else if (this == currPlantTile) {
    gameOver = true;

    document.getElementById("finalScore").innerText = score.toString();
    document.getElementById("gameOverMessage").classList.remove("hidden");

    // Remove mole and plant images
    currMoleTile.innerHTML = "";
    currPlantTile.innerHTML = "";

    // Hide the score
    document.getElementById("score").classList.add("hidden");

    // Add a listener to the game over message so that it can be hidden
    document.getElementById("gameOverMessage").addEventListener("click", hideGameOver);
  }
}

function hideGameOver() {
  document.getElementById("gameOverMessage").classList.add("hidden");

  // Show the final score
  document.getElementById("finalScore").classList.remove("hidden");

  // Remove the event listener
  document.getElementById("gameOverMessage").removeEventListener("click", hideGameOver);
}
