from flask import Flask, render_template_string, request, jsonify

app = Flask(__name__)

# HTML模板，包含多选框组件
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多选框组件</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .checkbox-container {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        
        .checkbox-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #333;
        }
        
        .checkbox-item {
            margin: 10px 0;
            padding: 8px;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            display: flex;
            align-items: center;
        }
        
        .checkbox-item:hover {
            background-color: #f9f9f9;
        }
        
        .checkbox-item input[type="checkbox"] {
            margin-right: 10px;
            transform: scale(1.2);
        }
        
        .checkbox-item label {
            cursor: pointer;
            flex-grow: 1;
        }
        
        .button-group {
            margin: 20px 0;
        }
        
        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            font-size: 14px;
        }
        
        button:hover {
            background-color: #0056b3;
        }
        
        #deselect-all {
            background-color: #6c757d;
        }
        
        #deselect-all:hover {
            background-color: #545b62;
        }
        
        #show-selected {
            background-color: #28a745;
        }
        
        #show-selected:hover {
            background-color: #1e7e34;
        }
        
        .selected-items {
            margin-top: 20px;
            padding: 15px;
            background-color: #e9f7ef;
            border-radius: 4px;
            border-left: 4px solid #28a745;
        }
        
        .selected-items h3 {
            margin-top: 0;
            color: #155724;
        }
        
        .selected-items ul {
            padding-left: 20px;
        }
        
        .selected-items li {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>多选框组件示例</h1>
    
    <div class="checkbox-container">
        <div class="checkbox-title">请选择您的兴趣爱好</div>
        
        <div class="button-group">
            <button type="button" id="select-all">全选</button>
            <button type="button" id="deselect-all">取消全选</button>
            <button type="button" id="show-selected">显示选中项</button>
        </div>
        
        <div id="checkboxes">
            {% for option in options %}
            <div class="checkbox-item">
                <input type="checkbox" id="option_{{ loop.index0 }}" value="{{ option }}">
                <label for="option_{{ loop.index0 }}">{{ option }}</label>
            </div>
            {% endfor %}
        </div>
    </div>
    
    <div class="selected-items" id="selected-items" style="display: none;">
        <h3>选中的项目：</h3>
        <ul id="selected-list"></ul>
    </div>

    <script>
        // 选择所有复选框
        document.getElementById('select-all').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            updateSelectedDisplay();
        });
        
        // 取消选择所有复选框
        document.getElementById('deselect-all').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            updateSelectedDisplay();
        });
        
        // 显示选中的项目
        document.getElementById('show-selected').addEventListener('click', function() {
            updateSelectedDisplay();
        });
        
        // 当复选框状态改变时更新选中项显示
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateSelectedDisplay();
            });
        });
        
        // 更新选中项显示
        function updateSelectedDisplay() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            const selectedContainer = document.getElementById('selected-items');
            const selectedList = document.getElementById('selected-list');
            
            if (checkboxes.length > 0) {
                selectedList.innerHTML = '';
                checkboxes.forEach(checkbox => {
                    const listItem = document.createElement('li');
                    listItem.textContent = checkbox.nextElementSibling.textContent;
                    selectedList.appendChild(listItem);
                });
                selectedContainer.style.display = 'block';
            } else {
                selectedContainer.style.display = 'none';
            }
        }
        
        // 隐藏选中项初始显示
        document.getElementById('selected-items').style.display = 'none';
    </script>
</body>
</html>
'''

@app.route('/')
def index():
    # 定义选项
    options = [
        '阅读',
        '音乐',
        '电影',
        '运动',
        '旅行',
        '美食',
        '编程',
        '绘画',
        '摄影',
        '游戏'
    ]
    return render_template_string(HTML_TEMPLATE, options=options)

@app.route('/get_selected', methods=['POST'])
def get_selected():
    selected = request.json.get('selected', [])
    print(f"选中的项目: {selected}")
    return jsonify({'status': 'success', 'selected': selected})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)