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

            let score = 0;
            let gameInterval;

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
                drawScore();
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

            function drawScore() {
                ctx.fillStyle = 'black';
                ctx.font = '24px Arial';
                ctx.fillText('Score: ' + score, 10, 30);
            }

            function startGame() {
                gameInterval = setInterval(update, 1000 / 60); // Update at 60fps
            }

            function restartGame() {
                clearInterval(gameInterval); // Stop the game loop
                score = 0;
                player.x = 50;
                player.y = 50;
                startGame();
            }

            document.addEventListener('keydown', (e) => {
                movePlayer(e.key);
            });

            document.getElementById('restartButton').addEventListener('click', restartGame);

            startGame(); // Start the game initially
        });