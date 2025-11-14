// 游戏变量
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const scoreElement = document.getElementById('score-value');
const livesElement = document.getElementById('lives-value');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const likeBtn = document.getElementById('like-btn');
const likeCount = document.querySelector('.like-count');

let gameRunning = false;
let score = 0;
let lives = 3;
let player;
let enemies = [];
let bullets = [];
let enemySpawnTimer = 0;
let keys = {};
let likeCountValue = 0;
let isLiked = false;

// 玩家飞机类
class Player {
    constructor() {
        this.width = 50;
        this.height = 40;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 20;
        this.speed = 6;
        this.color = '#0ff';
    }

    update() {
        // 处理键盘输入
        if (keys['ArrowLeft'] && this.x > 0) {
            this.x -= this.speed;
        }
        if (keys['ArrowRight'] && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
        if (keys['ArrowUp'] && this.y > 0) {
            this.y -= this.speed;
        }
        if (keys['ArrowDown'] && this.y < canvas.height - this.height) {
            this.y += this.speed;
        }
    }

    draw() {
        // 绘制赛博朋克风格的飞机
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        
        // 添加霓虹效果
        ctx.strokeStyle = '#f0f';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 绘制驾驶舱
        ctx.fillStyle = '#00f';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 15, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 敌机类
class Enemy {
    constructor() {
        this.width = 40;
        this.height = 30;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        this.speed = 2 + Math.random() * 3;
        this.color = '#f0f';
    }

    update() {
        this.y += this.speed;
    }

    draw() {
        // 绘制赛博朋克风格的敌机
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        
        // 添加霓虹效果
        ctx.strokeStyle = '#0ff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 绘制驾驶舱
        ctx.fillStyle = '#f00';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 10, 6, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 初始化游戏
function initGame() {
    player = new Player();
    enemies = [];
    bullets = [];
    score = 0;
    lives = 3;
    updateUI();
}

// 检测碰撞
function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

// 更新游戏对象
function updateGameObjects() {
    // 更新玩家
    player.update();
    
    // 更新子弹
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update();
        
        // 移除超出屏幕的子弹
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            continue;
        }
        
        // 检测子弹与敌机的碰撞
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (checkCollision(bullets[i], enemies[j])) {
                // 移除子弹和敌机
                bullets.splice(i, 1);
                enemies.splice(j, 1);
                score += 10;
                updateUI();
                
                // 添加爆炸粒子效果
                addParticle(enemies[j].x + enemies[j].width/2, enemies[j].y + enemies[j].height/2, '#f0f', 10);
                break;
            }
        }
    }
    
    // 更新敌机
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update();
        
        // 检测敌机与玩家的碰撞
        if (checkCollision(player, enemies[i])) {
            // 添加碰撞粒子效果
            addParticle(player.x + player.width/2, player.y + player.height/2, '#0ff', 15);
            
            enemies.splice(i, 1);
            lives--;
            updateUI();
            
            if (lives <= 0) {
                gameOver();
            }
            continue;
        }
        
        // 检测敌机是否到达底部
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            lives--;
            updateUI();
            
            if (lives <= 0) {
                gameOver();
            }
        }
    }
    
    // 生成新敌机
    enemySpawnTimer++;
    if (enemySpawnTimer > 60) { // 每60帧生成一个敌机
        enemies.push(new Enemy());
        enemySpawnTimer = 0;
    }
}

// 更新UI
function updateUI() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
}

// 子弹类
class Bullet {
    constructor(x, y) {
        this.width = 5;
        this.height = 15;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.color = '#0f0';
    }

    update() {
        this.y -= this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 添加霓虹效果
        ctx.strokeStyle = '#0ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

// 键盘事件监听
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    // 空格键发射子弹
    if (e.key === ' ' && gameRunning) {
        bullets.push(new Bullet(player.x + player.width / 2 - 2.5, player.y));
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// 游戏循环
function gameLoop() {
    if (!gameRunning) return;
    
    // 清除画布
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制背景效果
    drawBackground();
    
    // 绘制粒子效果
    drawParticles();
    
    // 更新游戏对象
    updateGameObjects();
    
    // 绘制玩家
    player.draw();
    
    // 绘制子弹
    for (let bullet of bullets) {
        bullet.draw();
    }
    
    // 绘制敌机
    for (let enemy of enemies) {
        enemy.draw();
    }
    
    // 继续游戏循环
    requestAnimationFrame(gameLoop);
}

// 绘制背景效果
function drawBackground() {
    // 绘制网格线
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // 垂直线
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // 水平线
    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// 粒子系统
const particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = color;
        this.life = 30;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }
    
    draw() {
        ctx.globalAlpha = this.life / 30;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// 添加粒子
function addParticle(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// 绘制粒子
function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// 游戏结束
function gameOver() {
    gameRunning = false;
    finalScoreElement.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

// 开始游戏
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameRunning = true;
    initGame();
    gameLoop();
});

// 重新开始游戏
restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    gameRunning = true;
    initGame();
    gameLoop();
});

// 点赞功能
likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    
    if (isLiked) {
        likeCountValue++;
        likeBtn.classList.add('liked');
        const heart = document.querySelector('.heart');
        heart.textContent = '♥';
    } else {
        likeCountValue--;
        likeBtn.classList.remove('liked');
        const heart = document.querySelector('.heart');
        heart.textContent = '♡';
    }
    
    likeCount.textContent = likeCountValue;
});