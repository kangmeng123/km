"""
命令行多选框组件
提供一个简单的命令行界面来模拟多选框功能
"""


class CommandLineCheckbox:
    def __init__(self, options, title="多选框"):
        self.options = options
        self.title = title
        self.selected = [False] * len(options)  # 跟踪每个选项的选择状态
    
    def display(self):
        """显示多选框选项"""
        print(f"\n{self.title}")
        print("-" * len(self.title))
        for i, (option, is_selected) in enumerate(zip(self.options, self.selected)):
            checkbox = "[x]" if is_selected else "[ ]"
            print(f"{i + 1}. {checkbox} {option}")
        print()
    
    def toggle(self, index):
        """切换指定索引的选项"""
        if 0 <= index < len(self.options):
            self.selected[index] = not self.selected[index]
        else:
            print("无效的选项编号！")
    
    def select_all(self):
        """全选"""
        self.selected = [True] * len(self.options)
    
    def deselect_all(self):
        """取消全选"""
        self.selected = [False] * len(self.options)
    
    def get_selected(self):
        """获取选中的选项"""
        return [option for option, is_selected in zip(self.options, self.selected) if is_selected]
    
    def get_selected_indices(self):
        """获取选中选项的索引"""
        return [i for i, is_selected in enumerate(self.selected) if is_selected]


def main():
    # 示例选项
    options = [
        "苹果",
        "香蕉", 
        "橙子",
        "葡萄",
        "草莓",
        "蓝莓",
        "猕猴桃"
    ]
    
    # 创建多选框
    checkbox = CommandLineCheckbox(options, "选择您喜欢的水果")
    
    while True:
        checkbox.display()
        print("操作选项:")
        print("1-7. 切换对应选项")
        print("a. 全选")
        print("c. 清空选择")
        print("s. 显示当前选中项")
        print("q. 退出")
        
        choice = input("\n请输入您的选择: ").strip().lower()
        
        if choice == 'q':
            print("退出程序。")
            break
        elif choice == 'a':
            checkbox.select_all()
        elif choice == 'c':
            checkbox.deselect_all()
        elif choice == 's':
            selected = checkbox.get_selected()
            if selected:
                print(f"当前选中: {', '.join(selected)}")
            else:
                print("当前没有选中任何项")
        elif choice.isdigit() and 1 <= int(choice) <= len(options):
            index = int(choice) - 1
            checkbox.toggle(index)
        else:
            print("无效的输入，请重试。")


if __name__ == "__main__":
    main()