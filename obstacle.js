document.addEventListener('DOMContentLoaded', () => {
    // Existing code here...

    function checkCollision() {
        stars.forEach((star, index) => {
            // Collision detection with stars
            if (!star.collected && player.x < star.x + star.width &&
                player.x + player.width > star.x &&
                player.y < star.y + star.height &&
                player.y + player.height > star.y) {
                star.collected = true;
                score++;
                stars.splice(index, 1); // Remove collected star from array
                if (stars.length === 0) {
                    gameOver = true;
                    clearInterval(timerInterval);
                }
            }
        });

        // Collision detection with obstacles
        obstacles.forEach((obstacle, index) => {
            if (player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y) {
                alert('Game Over! You collided with an obstacle.');
                obstacles = []; // Reset obstacles
                gameOver = true; // Set game over
                clearInterval(timerInterval); // Stop the game loop
            }
        });
    }

    // Existing code here...
});
