// 收藏功能类
class FavoriteManager {
    constructor() {
        this.favorites = this.loadFavorites();
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateFavoritesDisplay();
    }
    
    bindEvents() {
        // 为所有收藏按钮添加事件监听器
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const itemId = button.getAttribute('data-id');
                this.toggleFavorite(itemId, button);
            });
        });
    }
    
    toggleFavorite(itemId, button) {
        const index = this.favorites.indexOf(itemId);
        const isFavorited = index !== -1;
        
        if (isFavorited) {
            // 移除收藏
            this.favorites.splice(index, 1);
            this.showNotification('已取消收藏', 'success');
        } else {
            // 添加收藏
            this.favorites.push(itemId);
            this.showNotification('已添加收藏', 'success');
        }
        
        // 更新按钮状态
        this.updateButtonState(button, !isFavorited);
        
        // 保存到本地存储
        this.saveFavorites();
        
        // 更新收藏列表显示
        this.updateFavoritesDisplay();
    }
    
    updateButtonState(button, isFavorited) {
        if (isFavorited) {
            button.classList.add('favorited');
            button.querySelector('.favorite-icon').textContent = '★';
            button.querySelector('.favorite-text').textContent = '已收藏';
        } else {
            button.classList.remove('favorited');
            button.querySelector('.favorite-icon').textContent = '☆';
            button.querySelector('.favorite-text').textContent = '收藏';
        }
        
        // 添加动画效果
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }
    
    updateFavoritesDisplay() {
        const container = document.getElementById('favorites-container');
        const noFavorites = document.getElementById('no-favorites');
        
        // 清空容器
        container.innerHTML = '';
        
        if (this.favorites.length > 0) {
            noFavorites.style.display = 'none';
            
            this.favorites.forEach(id => {
                const itemElement = document.querySelector(`.item .favorite-btn[data-id="${id}"]`).closest('.item');
                const title = itemElement.querySelector('h3').textContent;
                
                const favoriteItem = document.createElement('div');
                favoriteItem.className = 'favorite-item';
                favoriteItem.innerHTML = `
                    <h4>${title}</h4>
                    <button class="remove-favorite" data-id="${id}">移除</button>
                `;
                
                container.appendChild(favoriteItem);
            });
            
            // 为移除按钮添加事件
            document.querySelectorAll('.remove-favorite').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = button.getAttribute('data-id');
                    const favButton = document.querySelector(`.favorite-btn[data-id="${id}"]`);
                    this.toggleFavorite(id, favButton);
                });
            });
        } else {
            noFavorites.style.display = 'block';
            container.appendChild(noFavorites);
        }
    }
    
    loadFavorites() {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
    
    showNotification(message, type = 'success') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification ${type === 'error' ? 'error' : ''}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // 显示通知
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 3秒后移除通知
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// 页面加载完成后初始化收藏管理器
document.addEventListener('DOMContentLoaded', function() {
    const favoriteManager = new FavoriteManager();
    
    // 初始化按钮状态（基于本地存储的收藏状态）
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        const itemId = button.getAttribute('data-id');
        const isFavorited = favoriteManager.favorites.includes(itemId);
        favoriteManager.updateButtonState(button, isFavorited);
    });
});