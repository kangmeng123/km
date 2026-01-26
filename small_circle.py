import matplotlib.pyplot as plt
import numpy as np

# 创建一个小圈
fig, ax = plt.subplots(figsize=(3, 3))

# 定义圆的参数
theta = np.linspace(0, 2*np.pi, 100)
radius = 1
x = radius * np.cos(theta)
y = radius * np.sin(theta)

# 绘制圆
ax.plot(x, y)
ax.set_aspect('equal')
ax.set_title('小圈')

# 保存图像
plt.savefig('/home/admin/iflow-cli-dev-service/iflow-workspace/km/small_circle.png', dpi=100)
print('小圈已生成并保存为 small_circle.png')