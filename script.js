// 现代圣诞主题交互功能

// 雪花动画控制
const snowflakes = document.querySelectorAll('.snowflake');
let snowAnimation = true;

// 点击摆件动画
const figurines = document.querySelectorAll('.figurine');
figurines.forEach(figurine => {
    figurine.addEventListener('click', () => {
        // 暂停原始浮动动画
        figurine.style.animation = 'none';
        
        // 执行点击动画
        figurine.style.transform = 'translateY(-20px) scale(1.05)';
        figurine.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            figurine.style.transform = '';
            // 恢复原始动画
            figurine.style.animation = '';
        }, 300);
    });
});

// 鼠标悬停效果
figurines.forEach(figurine => {
    figurine.addEventListener('mouseenter', () => {
        figurine.style.filter = 'brightness(1.2)';
    });
    
    figurine.addEventListener('mouseleave', () => {
        figurine.style.filter = 'brightness(1)';
    });
});

// 点击礼物盒动画
const giftBoxes = document.querySelectorAll('.gift-box');
giftBoxes.forEach(box => {
    box.addEventListener('click', () => {
        box.style.transform = 'translateY(-10px) scale(1.1)';
        box.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            box.style.transform = '';
        }, 200);
    });
});

// 点击背景山动画
const mountain = document.querySelector('.mountain');
if (mountain) {
    mountain.addEventListener('click', () => {
        mountain.style.transform = 'translateY(-10px)';
        mountain.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            mountain.style.transform = '';
        }, 300);
    });
}

// 鼠标移动时的视差效果
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // 为摆件添加轻微的视差效果
    figurines.forEach((figurine, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 10;
        figurine.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // 为背景元素添加视差效果
    const winterScene = document.querySelector('.winter-scene');
    if (winterScene) {
        const x = (mouseX - 0.5) * 5;
        const y = (mouseY - 0.5) * 3;
        winterScene.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// 节日灯光闪烁效果
const lights = document.querySelectorAll('.light');
setInterval(() => {
    lights.forEach(light => {
        const colors = ['#fdcb6e', '#e17055', '#00b894', '#74b9ff', '#fd79a8'];
        light.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    });
}, 2000);

// 随机改变雪花颜色
setInterval(() => {
    snowflakes.forEach(snowflake => {
        const opacity = 0.6 + Math.random() * 0.4;
        snowflake.style.opacity = opacity;
    });
}, 5000);

// 窗口大小变化时重新调整
window.addEventListener('resize', () => {
    // 可以在这里添加响应式调整逻辑
    console.log('窗口大小已调整');
});

// 页面加载完成动画
window.addEventListener('load', () => {
    // 为整个容器添加淡入效果
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);
    
    // 为摆件添加延迟进入动画
    setTimeout(() => {
        figurines.forEach((figurine, index) => {
            figurine.style.opacity = '0';
            figurine.style.transform = 'translateY(20px)';
            figurine.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                figurine.style.opacity = '1';
                figurine.style.transform = 'translateY(0)';
            }, 300 + index * 200);
        });
    }, 500);
});