"""
简单多选框实现
提供多选框的基本功能和操作方法
"""


class CheckboxGroup:
    """
    多选框组类
    """
    def __init__(self, options, title="多选框"):
        """
        初始化多选框组
        :param options: 选项列表
        :param title: 标题
        """
        self.options = options
        self.title = title
        self.selected = [False] * len(options)  # 跟踪每个选项的选择状态
    
    def toggle(self, index):
        """
        切换指定索引的选项
        :param index: 选项索引
        """
        if 0 <= index < len(self.options):
            self.selected[index] = not self.selected[index]
            return True
        return False
    
    def set_selection(self, index, value):
        """
        设置指定索引的选项状态
        :param index: 选项索引
        :param value: 状态值(True/False)
        """
        if 0 <= index < len(self.options):
            self.selected[index] = bool(value)
            return True
        return False
    
    def select_all(self):
        """全选"""
        self.selected = [True] * len(self.options)
    
    def deselect_all(self):
        """取消全选"""
        self.selected = [False] * len(self.options)
    
    def get_selected(self):
        """
        获取选中的选项
        :return: 选中的选项列表
        """
        return [option for option, is_selected in zip(self.options, self.selected) if is_selected]
    
    def get_selected_indices(self):
        """
        获取选中选项的索引
        :return: 选中选项的索引列表
        """
        return [i for i, is_selected in enumerate(self.selected) if is_selected]
    
    def get_state(self):
        """
        获取所有选项的状态
        :return: 选项和状态的元组列表
        """
        return [(option, is_selected) for option, is_selected in zip(self.options, self.selected)]
    
    def set_multiple(self, indices, value=True):
        """
        批量设置多个选项的状态
        :param indices: 索引列表
        :param value: 状态值
        """
        for index in indices:
            self.set_selection(index, value)


# 示例用法
def example_usage():
    # 创建选项列表
    fruits = ["苹果", "香蕉", "橙子", "葡萄", "草莓"]
    
    # 创建多选框组
    checkbox_group = CheckboxGroup(fruits, "选择喜欢的水果")
    
    # 选择前三个选项
    checkbox_group.set_multiple([0, 1, 2], True)
    print("选择前三个选项后:")
    print(f"选中的选项: {checkbox_group.get_selected()}")
    print()
    
    # 切换第一个选项
    checkbox_group.toggle(0)
    print("切换第一个选项后:")
    print(f"选中的选项: {checkbox_group.get_selected()}")
    print()
    
    # 全选
    checkbox_group.select_all()
    print("全选后:")
    print(f"选中的选项: {checkbox_group.get_selected()}")
    print()
    
    # 取消全选
    checkbox_group.deselect_all()
    print("取消全选后:")
    print(f"选中的选项: {checkbox_group.get_selected()}")
    print()
    
    # 单独设置几个选项
    checkbox_group.set_selection(1, True)
    checkbox_group.set_selection(3, True)
    print("选择香蕉和葡萄后:")
    print(f"选中的选项: {checkbox_group.get_selected()}")
    print(f"所有选项状态: {checkbox_group.get_state()}")


if __name__ == "__main__":
    example_usage()