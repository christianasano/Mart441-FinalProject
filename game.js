document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restartButton');

    let gameRunning = false;

    restartButton.addEventListener('click', () => {
        restartGame();
    });

    function startGame() {
        gameRunning = true;
        // Your game initialization logic here...
    }

    function restartGame() {
        gameRunning = false;
        // Reset all game variables, clear canvas, etc.
        // Example:
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Reset score, positions, etc.
        startGame(); // Restart the game
    }

    startGame(); // Start the game initially
});

