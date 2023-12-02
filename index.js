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
        var jumpCount = 0;
        var jumpInterval = setInterval(function () {
            var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
            if ((characterBottom < 170) && (jumpCount < 20)) {
                character.style.bottom = (characterBottom + 10) + "px";
            } else if (jumpCount >= 15) {
                var fallInterval = setInterval(function () {
                    var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
                    if ((characterBottom > 0)) {
                        character.style.bottom = (characterBottom - 10) + "px";
                    } else {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                }, 15);
                clearInterval(jumpInterval);
            }
            jumpCount++;
        }, 20);
    }
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("game").style.display = "block";
    }
}

function restartGame() {
    gameStarted = false; // Reset the gameStarted flag
    count = 0; // Reset the score
    score.innerHTML = "Score: 0"; // Update the score display
    result.style.display = "none"; // Hide the result
    finalScore.innerHTML = ""; // Clear the final score
    document.getElementById("game").style.display = "block"; // Show the game
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault();
        if (!gameStarted) {
            startGame();
        } else {
            jump();
        }
    }
});

var cacti = document.querySelectorAll(".cactus");

setInterval(function checkCollision() {
    if (gameStarted) {
        cacti.forEach(function (cactus) {
            var cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
            var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
            if ((cactusLeft < 60) && (characterBottom < 80)) {
                result.style.display = "block";
                game.style.display = "none";
                finalScore.innerHTML = `Score: ${count}`;
                gameOver();
                gameStarted = false; // Set game as not started on collision
            }
        });
    }
}, 10);

setInterval(function updateScore() {
    if (gameStarted) {
        count++;
        score.innerHTML = `Score: ${count}`;
    }
}, 1000);
