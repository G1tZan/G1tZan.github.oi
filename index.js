var character = document.getElementById("character");
var result = document.getElementById("result");
var game = document.getElementById("game");
var score = document.getElementById("score");
var finalScore = document.getElementById("finalScore");
var count = 0;
var sound = document.getElementById("sound");
var isJumping = false;

function gameOver() {
    document.getElementById("gameOverSound").play();
}

function jump() {
    if (!isJumping) {
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
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function restartGame() {
    location.reload();
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && document.getElementById("startScreen").style.display === "block") {
        event.preventDefault();
        startGame(); // Start the game on Enter key press
    } else if (event.code === "Space") {
        event.preventDefault();
        jump(); // Jump on Space key press
    }
});

var cacti = document.querySelectorAll(".cactus");

setInterval(function checkCollision() {
    cacti.forEach(function (cactus) {
        var cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
        var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
        if ((cactusLeft < 60) && (characterBottom < 80)) {
            result.style.display = "block";
            game.style.display = "none";
            finalScore.innerHTML = `Score: ${count}`;
            gameOver();
        }
    });
}, 10);

setInterval(function updateScore() {
    count++;
    score.innerHTML = `Score: ${count}`;
}, 1000);
