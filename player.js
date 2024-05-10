document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const player = {
        x: 50,
        y: 50,
        width: 20,
        height: 20,
        speed: 100 // Increase speed to 10 pixels per move
    };

    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        clearCanvas();
        drawPlayer();
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

    document.addEventListener('keydown', (e) => {
        movePlayer(e.key);
        update();
    });

    update(); // Initial draw
});
