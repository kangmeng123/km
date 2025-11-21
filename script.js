class LikeApp {
    constructor() {
        this.likeCount = 0;
        this.totalLikes = 0;
        this.clickTimes = [];
        this.combo = 0;
        this.lastClickTime = 0;
        this.messages = [];
        
        this.initElements();
        this.bindEvents();
        this.loadFromStorage();
        this.startStatsUpdate();
    }
    
    initElements() {
        this.heartBtn = document.getElementById('heart-btn');
        this.countElement = document.getElementById('count');
        this.totalLikesElement = document.getElementById('total-likes');
        this.clickRateElement = document.getElementById('click-rate');
        this.comboElement = document.getElementById('combo');
        this.floatingHearts = document.getElementById('floating-hearts');
        this.messageInput = document.getElementById('message-input');
        this.sendBtn = document.getElementById('send-btn');
        this.messagesContainer = document.getElementById('messages');
    }
    
    bindEvents() {
        this.heartBtn.addEventListener('click', () => this.handleLike());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    handleLike() {
        const now = Date.now();
        
        // 更新点赞数
        this.likeCount++;
        this.totalLikes++;
        this.updateDisplay();
        
        // 添加动画效果
        this.heartBtn.classList.add('liked');
        this.createRipple();
        this.createFloatingHeart();
        
        // 计算连击
        if (now - this.lastClickTime < 1000) {
            this.combo++;
        } else {
            this.combo = 1;
        }
        this.lastClickTime = now;
        
        // 记录点击时间（用于计算点击速度）
        this.clickTimes.push(now);
        this.clickTimes = this.clickTimes.filter(time => now - time < 5000);
        
        // 震动反馈（如果支持）
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // 保存到本地存储
        this.saveToStorage();
        
        // 移除动画类
        setTimeout(() => {
            this.heartBtn.classList.remove('liked');
        }, 800);
    }
    
    createRipple() {
        const ripple = this.heartBtn.querySelector('.ripple');
        ripple.classList.remove('active');
        void ripple.offsetWidth; // 触发重排
        ripple.classList.add('active');
        
        setTimeout(() => {
            ripple.classList.remove('active');
        }, 600);
    }
    
    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        
        // 随机位置
        const startX = Math.random() * 100;
        heart.style.left = startX + '%';
        heart.style.bottom = '0';
        
        this.floatingHearts.appendChild(heart);
        
        // 动画结束后移除元素
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
    
    sendMessage() {
        const text = this.messageInput.value.trim();
        if (!text) return;
        
        const message = {
            text: text,
            time: new Date().toLocaleTimeString('zh-CN')
        };
        
        this.messages.unshift(message);
        this.displayMessages();
        this.messageInput.value = '';
        
        // 保存到本地存储
        this.saveToStorage();
    }
    
    displayMessages() {
        this.messagesContainer.innerHTML = '';
        
        this.messages.slice(0, 10).forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <div class="message-text">${this.escapeHtml(message.text)}</div>
                <div class="message-time">${message.time}</div>
            `;
            this.messagesContainer.appendChild(messageElement);
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    startStatsUpdate() {
        setInterval(() => {
            this.updateStats();
        }, 100);
    }
    
    updateStats() {
        const now = Date.now();
        
        // 计算点击速度（每秒）
        const recentClicks = this.clickTimes.filter(time => now - time < 1000);
        const clickRate = recentClicks.length;
        
        // 更新显示
        this.clickRateElement.textContent = clickRate;
        this.comboElement.textContent = this.combo;
    }
    
    updateDisplay() {
        this.countElement.textContent = this.likeCount;
        this.totalLikesElement.textContent = this.totalLikes;
        this.comboElement.textContent = this.combo;
    }
    
    saveToStorage() {
        const data = {
            likeCount: this.likeCount,
            totalLikes: this.totalLikes,
            messages: this.messages
        };
        localStorage.setItem('likeAppData', JSON.stringify(data));
    }
    
    loadFromStorage() {
        const savedData = localStorage.getItem('likeAppData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.likeCount = data.likeCount || 0;
                this.totalLikes = data.totalLikes || 0;
                this.messages = data.messages || [];
                this.updateDisplay();
                this.displayMessages();
            } catch (e) {
                console.error('Failed to load saved data:', e);
            }
        }
    }
    
    reset() {
        if (confirm('确定要重置所有数据吗？')) {
            this.likeCount = 0;
            this.totalLikes = 0;
            this.combo = 0;
            this.clickTimes = [];
            this.messages = [];
            this.updateDisplay();
            this.displayMessages();
            localStorage.removeItem('likeAppData');
        }
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new LikeApp();
    
    // 添加双击重置功能（隐藏功能）
    let clickCount = 0;
    let clickTimer;
    
    document.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 5) {
            app.reset();
            clickCount = 0;
        }
        
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 2000);
    });
    
    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            app.handleLike();
        }
    });
});