var character = document.getElementById("character");
var result = document.getElementById("result");
var game = document.getElementById("game");
var score = document.getElementById("score");
var finalScore = document.getElementById("finalScore");
var count = 0;
var sound = document.getElementById("sound");
var isJumping = false;
var gameStarted = false; // Track if the game has started

function gameOver() {
    document.getElementById("gameOverSound").play();
}

function jump() {
    if (gameStarted && !isJumping) {
        isJumping = true;
        sound.play();
        // Rest of the jump logic...
    }
}

function startGame() {
    gameStarted = true; // Set the game as started when starting the game
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function restartGame() {
    location.reload();
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !gameStarted) { // Start the game only if it hasn't started
        event.preventDefault();
        startGame();
        jump();
    }
});

var cacti = document.querySelectorAll(".cactus");

setInterval(function checkCollision() {
    // Collision detection logic...
}, 10);

setInterval(function updateScore() {
    if (gameStarted) {
        count++;
        score.innerHTML = `Score: ${count}`;
    }
}, 1000);
