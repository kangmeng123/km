// 圣诞主题网页交互功能

// 雪花控制
let snowActive = true;
const snowToggle = document.getElementById('snowToggle');
const snowflakes = document.querySelectorAll('.snowflake');

snowToggle.addEventListener('click', () => {
    snowActive = !snowActive;
    snowflakes.forEach(flake => {
        flake.style.display = snowActive ? 'block' : 'none';
    });
    snowToggle.textContent = snowActive ? '隐藏雪花' : '显示雪花';
});

// 灯光控制
let lightsActive = true;
const lightsToggle = document.getElementById('lightsToggle');
const treeDecorations = document.querySelectorAll('.tree-decoration');

lightsToggle.addEventListener('click', () => {
    lightsActive = !lightsActive;
    treeDecorations.forEach(decoration => {
        if (lightsActive) {
            decoration.style.animation = 'blink 2s infinite';
            decoration.style.backgroundColor = getRandomBrightColor();
        } else {
            decoration.style.animation = 'none';
            decoration.style.backgroundColor = '#FF4500';
        }
    });
    lightsToggle.textContent = lightsActive ? '关闭灯光' : '开启灯光';
});

// 随机颜色函数
function getRandomBrightColor() {
    const colors = ['#FFD700', '#FF4500', '#00FF7F', '#1E90FF', '#FF69B4', '#9370DB'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 点击摆件动画
const figurines = document.querySelectorAll('.figurine');
figurines.forEach(figurine => {
    figurine.addEventListener('click', () => {
        figurine.style.transform = 'scale(1.1)';
        setTimeout(() => {
            figurine.style.transform = '';
        }, 300);
    });
});

// 圣诞树闪烁
setInterval(() => {
    if (lightsActive) {
        treeDecorations.forEach(decoration => {
            decoration.style.backgroundColor = getRandomBrightColor();
        });
    }
}, 3000);

// 鼠标跟随雪花效果
document.addEventListener('mousemove', (e) => {
    if (!snowActive) return;
    
    const newSnowflake = document.createElement('div');
    newSnowflake.className = 'snowflake';
    newSnowflake.textContent = '❄';
    newSnowflake.style.left = e.pageX + 'px';
    newSnowflake.style.top = e.pageY + 'px';
    newSnowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    newSnowflake.style.zIndex = '200';
    newSnowflake.style.position = 'fixed';
    newSnowflake.style.pointerEvents = 'none';
    
    document.body.appendChild(newSnowflake);
    
    setTimeout(() => {
        newSnowflake.remove();
    }, 2000);
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});