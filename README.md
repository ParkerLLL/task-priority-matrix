# 任务价值四象限分析工具

![任务价值四象限](https://img.shields.io/badge/任务管理-优先级分析-blue)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-brightgreen)
![Element Plus](https://img.shields.io/badge/Element%20Plus-latest-blue)
![Chart.js](https://img.shields.io/badge/Chart.js-latest-orange)

## 项目简介

任务价值四象限分析工具是一个帮助您识别和管理任务优先级的应用。通过评估任务的战略价值和实施成本，该工具将任务自动分类到四个象限中，帮助您做出更明智的决策，提高工作效率。

[在线体验](https://您的用户名.github.io/task-priority-matrix/)

![应用截图](https://via.placeholder.com/800x450.png?text=任务价值四象限应用截图)

## ✨ 主要功能

- 📝 添加任务并评估其战略价值和实施成本
- 📊 通过散点图直观展示任务在四象限中的分布
- 🔍 按象限筛选和管理任务列表
- 💾 数据自动保存到浏览器本地存储
- 🔄 支持添加、删除和重置任务

## 🔢 四象限划分

| 象限 | 特点 | 处理策略 |
|------|------|---------|
| 第一象限 | 高价值/低成本 | 优先处理 |
| 第二象限 | 高价值/高成本 | 规划资源 |
| 第三象限 | 低价值/低成本 | 资源允许时处理 |
| 第四象限 | 低价值/高成本 | 避免或推迟 |

## 🛠️ 技术栈

- **前端框架**: Vue.js 3
- **UI组件库**: Element Plus
- **图表库**: Chart.js
- **数据存储**: 浏览器本地存储 (localStorage)

## 🚀 快速开始

### 在线使用

直接访问 [https://您的用户名.github.io/task-priority-matrix/](https://您的用户名.github.io/task-priority-matrix/)

### 本地运行

1. 克隆仓库
   ```bash
   git clone https://github.com/您的用户名/task-priority-matrix.git
   ```

2. 进入项目目录
   ```bash
   cd task-priority-matrix
   ```

3. 使用任何HTTP服务器运行项目
   ```bash
   # 使用Python的HTTP服务器
   python -m http.server 8080
   # 或使用Node.js的http-server
   npx http-server
   ```

4. 在浏览器中访问 `http://localhost:8080`

## 📝 使用说明

### 添加任务

1. 在左侧表单中填写任务名称和描述
2. 使用滑块设置战略价值（0-10分）和实施成本（0-10分）
3. 点击"添加任务"按钮

### 查看四象限图表

右侧的散点图展示了所有任务在四象限中的分布，鼠标悬停可查看任务名称。

### 管理任务列表

在底部的任务列表中，您可以：
- 查看所有已添加的任务
- 使用顶部的单选按钮按象限筛选任务
- 点击"删除"按钮移除不需要的任务

## 🌟 示例数据

系统默认加载了四个示例任务：

1. 高管效能基线（第一象限）：战略价值 9，实施成本 2
2. 季度OKR报表（第二象限）：战略价值 7，实施成本 5
3. 临时数据提取（第四象限）：战略价值 3，实施成本 8
4. 模糊查询需求（第四象限）：战略价值 1，实施成本 9

## 📄 许可证

[MIT](LICENSE)

## 🤝 贡献

欢迎提交问题和改进建议！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request
