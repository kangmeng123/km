// 积分中心页面交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 生成签到日历
    const calendarBody = document.querySelector('.calendar-body');
    
    // 模拟10月份的签到数据
    const daysInMonth = 31;
    const startDate = new Date(2024, 9, 1); // 10月1日
    const startDayOfWeek = startDate.getDay(); // 星期几开始 (0=周日, 1=周一, etc.)
    
    // 创建空白格子，填充到开始日期前
    for (let i = 0; i < startDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarBody.appendChild(emptyDay);
    }
    
    // 创建日期格子
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // 根据日期设置签到状态
        if (day <= 3) {
            // 前3天已签到
            dayElement.classList.add('checked');
            dayElement.innerHTML = `
                <div class="day-reward">+20</div>
                <div class="day-date">10.${day}</div>
            `;
        } else if (day >= 8 && day <= 13) {
            // 8-13号已签到
            dayElement.classList.add('checked');
            dayElement.innerHTML = `
                <div class="day-reward">+20</div>
                <div class="day-date">10.${day}</div>
            `;
        } else if (day >= 15 && day <= 21) {
            // 15-21号已签到
            dayElement.classList.add('checked');
            dayElement.innerHTML = `
                <div class="day-reward">+20</div>
                <div class="day-date">10.${day}</div>
            `;
        } else if (day >= 23 && day <= 27) {
            // 23-27号已签到
            dayElement.classList.add('checked');
            dayElement.innerHTML = `
                <div class="day-reward">+20</div>
                <div class="day-date">10.${day}</div>
            `;
        } else if (day >= 29 && day <= 31) {
            // 29-31号已签到
            dayElement.classList.add('checked');
            dayElement.innerHTML = `
                <div class="day-reward">+20</div>
                <div class="day-date">10.${day}</div>
            `;
        } else if (day === 14 || day === 22 || day === 28) {
            // 特殊奖励日
            dayElement.classList.add('reward');
            dayElement.innerHTML = `
                <div class="day-reward">+80</div>
                <div class="day-date">10.${day}</div>
            `;
        } else {
            // 未签到
            dayElement.classList.add('unchecked');
            dayElement.innerHTML = `
                <div class="day-reward">未签</div>
                <div class="day-date">10.${day}</div>
            `;
            // 添加签到功能
            dayElement.addEventListener('click', function() {
                if (!this.classList.contains('checked')) {
                    this.classList.remove('unchecked');
                    this.classList.add('checked');
                    this.innerHTML = `
                        <div class="day-reward">+20</div>
                        <div class="day-date">10.${day}</div>
                    `;
                    // 更新连续签到天数
                    updateCheckinDays();
                }
            });
        }
        
        calendarBody.appendChild(dayElement);
    }
    
    // 收起/展开日历功能
    const toggleBtn = document.querySelector('.toggle-btn');
    const calendarGrid = document.querySelector('.calendar-grid');
    let isCalendarVisible = true;
    
    toggleBtn.addEventListener('click', function() {
        if (isCalendarVisible) {
            calendarGrid.style.display = 'none';
            toggleBtn.textContent = '展开∨';
        } else {
            calendarGrid.style.display = 'block';
            toggleBtn.textContent = '收起^';
        }
        isCalendarVisible = !isCalendarVisible;
    });
    
    // 更新连续签到天数
    function updateCheckinDays() {
        // 简单计算连续签到天数的示例
        // 实际应用中可能需要更复杂的逻辑
        const checkedDays = document.querySelectorAll('.calendar-day.checked:not(.empty)').length;
        document.querySelector('.checkin-days').textContent = checkedDays + '天';
    }
    
    // 任务按钮点击事件
    const taskBtn = document.querySelector('.task-btn');
    taskBtn.addEventListener('click', function() {
        // 在实际应用中，这里可以跳转到任务页面或执行其他操作
        // 暂时用alert演示功能
        alert('开始完成任务：每日探索\n触发任意搜索功能');
    });
    
    // 返回按钮点击事件
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', function() {
        // 实际应用中可以返回上一页或执行其他操作
        // 暂时用alert演示功能
        alert('返回上一页');
    });
    
    // 积分明细链接点击事件
    const pointsDetailLink = document.querySelector('.points-detail');
    pointsDetailLink.addEventListener('click', function(e) {
        e.preventDefault();
        // 实际应用中可以跳转到积分明细页面
        // 暂时用alert演示功能
        alert('查看积分明细');
    });
    
    // 立即充值链接点击事件
    const rechargeLink = document.querySelector('.points-tip');
    rechargeLink.addEventListener('click', function() {
        // 实际应用中可以跳转到充值页面
        // 暂时用alert演示功能
        alert('跳转到充值页面');
    });
});