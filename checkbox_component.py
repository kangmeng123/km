import tkinter as tk
from tkinter import ttk


class MultiCheckbox(tk.Frame):
    """
    多选框组件
    """
    def __init__(self, parent, options, title="多选框", callback=None):
        super().__init__(parent)
        
        self.options = options
        self.title = title
        self.callback = callback
        self.checkboxes = []
        self.selected_values = []
        
        self.create_widgets()
        
    def create_widgets(self):
        # 创建标题标签
        title_label = tk.Label(self, text=self.title, font=("Arial", 14, "bold"))
        title_label.pack(pady=5)
        
        # 创建选项框架
        options_frame = tk.Frame(self)
        options_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # 创建复选框
        for option in self.options:
            var = tk.BooleanVar()
            cb = tk.Checkbutton(
                options_frame,
                text=option,
                variable=var,
                command=lambda v=var, o=option: self.on_checkbox_change(v, o)
            )
            cb.pack(anchor=tk.W, padx=10, pady=2)
            self.checkboxes.append((cb, var, option))
            
        # 创建全选/取消全选按钮
        button_frame = tk.Frame(self)
        button_frame.pack(fill=tk.X, pady=5)
        
        select_all_btn = tk.Button(
            button_frame,
            text="全选",
            command=self.select_all
        )
        select_all_btn.pack(side=tk.LEFT, padx=5)
        
        deselect_all_btn = tk.Button(
            button_frame,
            text="取消全选",
            command=self.deselect_all
        )
        deselect_all_btn.pack(side=tk.LEFT, padx=5)
        
        # 显示选中项的按钮
        show_selected_btn = tk.Button(
            button_frame,
            text="显示选中项",
            command=self.show_selected
        )
        show_selected_btn.pack(side=tk.LEFT, padx=5)
    
    def on_checkbox_change(self, var, option):
        """
        复选框状态改变时的回调函数
        """
        if var.get():
            if option not in self.selected_values:
                self.selected_values.append(option)
        else:
            if option in self.selected_values:
                self.selected_values.remove(option)
        
        if self.callback:
            self.callback(self.selected_values)
    
    def select_all(self):
        """
        全选复选框
        """
        for cb, var, option in self.checkboxes:
            var.set(True)
            if option not in self.selected_values:
                self.selected_values.append(option)
        
        if self.callback:
            self.callback(self.selected_values)
    
    def deselect_all(self):
        """
        取消全选复选框
        """
        for cb, var, option in self.checkboxes:
            var.set(False)
            if option in self.selected_values:
                self.selected_values.remove(option)
        
        if self.callback:
            self.callback(self.selected_values)
    
    def show_selected(self):
        """
        显示选中的项目
        """
        selected = self.get_selected()
        print(f"选中的项目: {selected}")
        return selected
    
    def get_selected(self):
        """
        获取选中的项目
        """
        return [option for cb, var, option in self.checkboxes if var.get()]


def main():
    # 创建主窗口
    root = tk.Tk()
    root.title("多选框示例")
    root.geometry("400x500")
    
    # 示例选项
    options = [
        "选项1",
        "选项2",
        "选项3",
        "选项4",
        "选项5",
        "选项A",
        "选项B",
        "选项C",
        "选项D",
        "选项E"
    ]
    
    # 回调函数 - 当选择改变时执行
    def on_selection_change(selected):
        print(f"当前选中: {selected}")
    
    # 创建多选框组件
    multi_checkbox = MultiCheckbox(
        root,
        options=options,
        title="请选择您的兴趣",
        callback=on_selection_change
    )
    multi_checkbox.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
    
    # 启动事件循环
    root.mainloop()


if __name__ == "__main__":
    main()