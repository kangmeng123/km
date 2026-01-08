"""
简单多选框组件 - 使用tkinter实现
"""
import tkinter as tk
from tkinter import ttk


class SimpleCheckboxGroup:
    def __init__(self, parent, options, title="多选框"):
        self.parent = parent
        self.options = options
        self.title = title
        self.vars = []
        
        # 创建主框架
        self.frame = ttk.LabelFrame(parent, text=title, padding=(10, 5))
        
        # 创建复选框
        for i, option in enumerate(options):
            var = tk.BooleanVar()
            self.vars.append(var)
            cb = ttk.Checkbutton(self.frame, text=option, variable=var)
            cb.grid(row=i, column=0, sticky='w', pady=2)
    
    def pack(self, **kwargs):
        self.frame.pack(**kwargs)
    
    def get_selected(self):
        """获取选中的选项"""
        selected = []
        for i, var in enumerate(self.vars):
            if var.get():
                selected.append(self.options[i])
        return selected
    
    def select_all(self):
        """全选"""
        for var in self.vars:
            var.set(True)
    
    def deselect_all(self):
        """取消全选"""
        for var in self.vars:
            var.set(False)


def main():
    root = tk.Tk()
    root.title("简单多选框组件示例")
    root.geometry("300x400")
    
    # 示例选项
    options = ["苹果", "香蕉", "橙子", "葡萄", "草莓", "蓝莓", "猕猴桃"]
    
    # 创建多选框组
    checkbox_group = SimpleCheckboxGroup(root, options, "选择您喜欢的水果")
    checkbox_group.pack(padx=20, pady=20, fill='x')
    
    # 按钮框架
    button_frame = ttk.Frame(root)
    button_frame.pack(padx=20, pady=10, fill='x')
    
    # 操作按钮
    ttk.Button(
        button_frame, 
        text="全选", 
        command=checkbox_group.select_all
    ).pack(side='left', padx=5)
    
    ttk.Button(
        button_frame, 
        text="清空", 
        command=checkbox_group.deselect_all
    ).pack(side='left', padx=5)
    
    def show_selected():
        selected = checkbox_group.get_selected()
        result_label.config(text=f"选中: {', '.join(selected) if selected else '无'}")
    
    ttk.Button(
        button_frame, 
        text="显示选中", 
        command=show_selected
    ).pack(side='left', padx=5)
    
    # 结果显示标签
    result_label = ttk.Label(root, text="选中: 无", foreground="blue")
    result_label.pack(pady=10)
    
    root.mainloop()


if __name__ == "__main__":
    main()