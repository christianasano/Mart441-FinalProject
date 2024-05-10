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

    const shapes = ['circle', 'triangle', 'square']; // Define different shapes
    const stars = [];
    const starCount = 1; // Reduced number of stars

    let score = 0;
    let startTime = Date.now(); // Track the start time of the game

    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawStars() {
        ctx.fillStyle = 'yellow';
        stars.forEach((star) => {
            if (!star.collected) {
                drawShape(star); 
            }
        });
    }

    function generateStars() {
        for (let i = 0; i < starCount; i++) {
            const star = {
                x: Math.random() * (canvas.width - 20),
                y: Math.random() * (canvas.height - 20),
                shape: shapes[Math.floor(Math.random() * shapes.length)], // Random shape selection
                size: 8, // Fixed size for simplicity
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
        drawTime(); // Draw the time
        requestAnimationFrame(update); // Request the next frame
    }

    function movePlayer(direction) {
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

    function checkCollision() {
        stars.forEach((star, index) => {
            if (!star.collected && player.x < star.x + star.size &&
                player.x + player.width > star.x &&
                player.y < star.y + star.size &&
                player.y + player.height > star.y) {
                star.collected = true;
                score++;
                stars.splice(index, 1); // Remove collected star from array
            }
        });
    }

    function drawShape(star) {
        ctx.beginPath();
        switch (star.shape) {
            case 'circle':
                ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
                break;
            case 'triangle':
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x + star.size, star.y);
                ctx.lineTo(star.x + star.size / 2, star.y + star.size);
                ctx.closePath();
                break;
            case 'square':
                ctx.fillRect(star.x, star.y, star.size, star.size);
                break;
        }
        ctx.fill();
    }

    function drawScore() {
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.fillText('Score: ' + score, 10, 30);
    }

    function drawTime() {
        const currentTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.fillText('Time: ' + currentTime + 's', canvas.width - 150, 30);
    }

    document.addEventListener('keydown', (e) => {
        movePlayer(e.key);
        checkCollision();
    });

    generateStars(); // Initial star generation
    update(); // Initial draw
});
