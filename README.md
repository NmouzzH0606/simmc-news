# 满香日报 (Simmc News)

一个简单的新闻网站，支持使用 Markdown 文件作为新闻内容。

![满香日报截图](https://picsum.photos/id/42/800/400)

## 功能特点

- 使用 HTML, CSS 和 JavaScript 构建
- 支持添加 Markdown 文件作为新闻文章
- 响应式设计，适配各种设备
- 支持新闻分类和筛选
- 简洁美观的用户界面
- 支持设置头条新闻

## 如何使用

### 安装依赖

```bash
npm install
```

### 启动服务器

```bash
npm start
```

或者使用开发模式（自动重启）：

```bash
npm run dev
```

服务器启动后，访问 http://localhost:3000 即可查看网站。

### 添加新闻文章

有两种方法可以添加新闻文章：

1. **通过网页上传**：
   - 访问 http://localhost:3000/upload.html
   - 填写新闻信息并上传

2. **手动添加**：
   - 将 Markdown 文件放入 `news` 目录
   - Markdown 文件应该包含以下格式的元数据：

```markdown
---
title: 文章标题
category: 文章分类
date: 发布日期 (YYYY-MM-DD)
author: 作者名称
image: 图片URL
excerpt: 文章摘要
featured: true/false
---

# 正文内容

这里是文章的正文内容...
```

## 目录结构

```
├── css/
│   └── style.css          # 样式文件
├── js/
│   └── main.js            # JavaScript 主文件
├── news/                  # 新闻文章目录
├── index.html             # 主页
├── upload.html            # 上传页面
├── server.js              # 服务器文件
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js
- Express
- Marked (Markdown 解析)

## 部署

### 本地部署

1. 克隆仓库
```bash
git clone https://github.com/NmouzzH0606/simmc-news.git
cd simmc-news
```

2. 安装依赖
```bash
npm install
```

3. 启动服务器
```bash
npm start
```

### 线上部署

可以部署到任何支持 Node.js 的平台，如 Heroku、Vercel、Netlify 等。

## 贡献

欢迎提交 Pull Request 或创建 Issue。

## 许可证

MIT 