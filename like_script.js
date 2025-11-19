document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.getElementById('likeButton');
    const likeCount = document.getElementById('likeCount');
    let count = 0;
    let isLiked = false;

    // 从 localStorage 获取初始点赞数和状态
    const savedCount = localStorage.getItem('likeCount');
    const savedIsLiked = localStorage.getItem('isLiked');
    
    if (savedCount) {
        count = parseInt(savedCount);
        likeCount.textContent = count;
    }
    
    if (savedIsLiked === 'true') {
        isLiked = true;
        likeButton.classList.add('liked');
    }

    likeButton.addEventListener('click', function() {
        if (isLiked) {
            // 取消点赞
            count--;
            isLiked = false;
            likeButton.classList.remove('liked');
        } else {
            // 点赞
            count++;
            isLiked = true;
            likeButton.classList.add('liked');
        }
        
        // 更新显示
        likeCount.textContent = count;
        
        // 保存到 localStorage
        localStorage.setItem('likeCount', count.toString());
        localStorage.setItem('isLiked', isLiked.toString());
        
        // 添加点击动画效果
        likeButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            likeButton.style.transform = 'scale(1)';
        }, 100);
    });
});