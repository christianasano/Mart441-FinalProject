document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const player = {
        x: 50,
        y: 50,
        width: 20,
        height: 20,
        speed: 5
    };

    const stars = [];
    const starCount = 10;

    let score = 0;
    let startTime = 0;
    let gameOver = false;

    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawStars() {
        ctx.fillStyle = 'yellow';
        stars.forEach((star) => {
            if (!star.collected) {
                ctx.fillRect(star.x, star.y, star.width, star.height);
            }
        });
    }

    function generateStars() {
        for (let i = 0; i < starCount; i++) {
            const star = {
                x: Math.random() * (canvas.width - 20),
                y: Math.random() * (canvas.height - 20),
                width: 10,
                height: 10,
                collected: false
            };
            stars.push(star);
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        clearCanvas();
        drawStars();
        drawPlayer();
        drawScore();
        if (!gameOver) {
            drawTimer();
        }
    }

    function movePlayer(direction) {
        if (!gameOver) {
            switch (direction) {
                case 'ArrowUp':
                    player.y -= player.speed;
                    break;
                case 'ArrowDown':
                    player.y += player.speed;
                    break;
                case 'ArrowLeft':
                    player.x -= player.speed;
                    break;
                case 'ArrowRight':
                    player.x += player.speed;
                    break;
            }
        }
    }

    function checkCollision() {
        stars.forEach((star, index) => {
            if (!star.collected && player.x < star.x + star.width &&
                player.x + player.width > star.x &&
                player.y < star.y + star.height &&
                player.y + player.height > star.y) {
                star.collected = true;
                score++;
                stars.splice(index, 1); // Remove collected star from array
                if (stars.length === 0) {
                    gameOver = true;
                }
            }
        });
    }

    function drawScore() {
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.fillText('Score: ' + score, 10, 30);
    }

    function drawTimer() {
        const currentTime = Math.floor((Date.now() - startTime) / 1000);
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.fillText('Time: ' + currentTime + 's', canvas.width - 150, 30);
    }

    document.addEventListener('keydown', (e) => {
        movePlayer(e.key);
        checkCollision();
        update();
    });

    startTime = Date.now();
    generateStars(); // Initial star generation
    update(); // Initial draw
});
