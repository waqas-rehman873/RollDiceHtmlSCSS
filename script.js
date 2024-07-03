//make   switchplayer  functions
//functions will perform one functionality
(() => {
    const diceImages = {
        1: "./assets/dice-1.png",
        2: "./assets/dice-2.png",
        3: "./assets/dice-3.png",
        4: "./assets/dice-4.png",
        5: "./assets/dice-5.png",
        6: "./assets/dice-6.png",
    };

    const $ = (selector) => document.getElementById(selector);

    document.addEventListener("DOMContentLoaded", function () {
        const modal = $("rulesGameModal");
        const player1 = $("player1");
        const player2 = $("player2");
        const diceimg1 = $("dice-1");
        const diceimg2 = $("dice-2");
        const player1Score = $("player1Score");
        const player2Score = $("player2Score");
        const player1TotalScore = $("player1TotalScore");
        const player2TotalScore = $("player2TotalScore");

        let totalScore = 0;
        let currentScore = 0;
        let dice1 = 0;
        let dice2 = 0;
        let gamePlaying = true;

        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };

        function rollingDice() {
            if (gamePlaying) {
                // dice2 = Math.floor(Math.random() * 6 + 1);
                // diceimg1.src = diceImages[dice1];
                // diceimg2.src = diceImages[dice2];
                diceRange();
                displayDice();
                calculateScore();
                currentScoreShow();
            }
        }
        function diceRange() {
            dice1 = range(1, 6);
            dice2 = range(1, 6);
            diceimg1.src = diceImages[dice1];
            diceimg2.src = diceImages[dice2];
        }
        function range(min, max) {
            return Math.floor(Math.random() * max) + min;
        }
        function displayDice() {
            diceimg1.style.display = "block";
            diceimg2.style.display = "block";
        }
        function currentScoreShow() {
            if (player1.classList.contains("active")) {
                player1Score.textContent = currentScore;
            } else {
                player1TotalScore;
                player2Score.textContent = currentScore;
            }
        }
        function calculateScore() {
            if (dice1 !== 1 && dice2 !== 1) {
                currentScore += dice1 + dice2;
            } else {
                currentScore = 0;
                switchPlayer();
            }
        }
        function switchPlayer() {
            if (gamePlaying) {
                selectingPlayer();
                clearCurrentScore();
            }
        }
        function selectingPlayer() {
            player1.classList.toggle("active");
            player2.classList.toggle("active");
        }
        function clearCurrentScore() {
            currentScore = 0;
            player1Score.textContent = "0";
            player2Score.textContent = "0";
        }

        function holdScore() {
            if (!gamePlaying) return;
            updateScores();
            checkForWinner();
        }
        function updateScores() {
            updateTotalScore();
            resetCurrentScore();
        }
        function updateTotalScore() {
            const currentPlayerScore = getCurrentPlayerTotalScore();
            totalScore = parseInt(currentPlayerScore.textContent);
            totalScore += currentScore;
            currentPlayerScore.textContent = totalScore;
        }
        function resetCurrentScore() {
            const currentScoreDisplay = getCurrentPlayerScoreDisplay();
            currentScore = 0;
            currentScoreDisplay.textContent = "0";
        }
        function getCurrentPlayerTotalScore() {
            return player1.classList.contains("active") ? player1TotalScore : player2TotalScore;
        }
        function getCurrentPlayerScoreDisplay() {
            return player1.classList.contains("active") ? player1Score : player2Score;
        }
        function checkForWinner() {
            const currentPlayerScore = getCurrentPlayerTotalScore();
            if (totalScore >= 100) {
                currentPlayerScore.textContent = "WINNER!";
                gamePlaying = false;
            } else {
                switchPlayer();
            }
        }
        function newGame() {
            gamePlaying = true;
            totalScore = 0;
            currentScore = 0;
            player1Score.textContent = "0";
            player2Score.textContent = "0";
            player1TotalScore.textContent = "0";
            player2TotalScore.textContent = "0";
            player1.classList.add("active");
            player2.classList.remove("active");
        }

        document.getElementById("newGame").addEventListener("click", newGame);
        document.getElementById("hold").addEventListener("click", holdScore);
        document.getElementById("rollDice").addEventListener("click", rollingDice);
    });
})();
