# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个纯前端小游戏项目 - **蛋仔派对皮肤盲盒**，包含答题挑战和抽卡收集系统。

## 项目结构

```
game/
├── dz.html          # 主游戏文件（包含HTML、CSS、JS）
├── README.md        # 项目说明
└── docs/            # 规则文档目录（待创建）
```

## 开发命令

- **运行游戏**: 直接在浏览器打开 `dz.html`
- **无需构建/编译**: 纯静态 HTML 文件

## 按需加载规则

| 关键词 | 规则文档位置 |
|--------|-------------|
| 抽卡概率、盲盒机制、皮肤系统 | `docs/skin-system.md` |
| 答题挑战、数学语文英语题目 | `docs/quiz-system.md` |

## 文件读取忽略规则

参考 `.gitignore`，主要忽略：
- 无外部依赖目录（无 vendor、node_modules）
- 无构建输出目录
- `.git/` 目录

## 技术架构

### 游戏核心模块

1. **答题系统**（`dz.html:445-613`）
   - 数学挑战：100道加减法题目，10分钟限时
   - 语文挑战：一年级生字拼音选择
   - 英语挑战：小学词汇朗读识别

2. **抽卡系统**（`dz.html:628-813`）
   - 单抽：10蛋币
   - 十连抽：90蛋币
   - 概率：C(45%) > B(30%) > A(15%) > S(10%) > SS(2%) > SSS(0.5%)

3. **数据持久化**
   - 使用 `localStorage` 存储 `gameData`
   - 包含：蛋币、魅力值、收集记录、抽奖统计

### CSS 架构

- 响应式设计：支持手机端（`@media max-width: 600px`）
- 稀有度颜色：C(gray) > B(green) > A(blue) > S(purple) > SS(gold) > SSS(red-gold)
- 动画效果：卡牌翻转、粒子特效、光束特效

## 代码风格

- 单文件架构，所有代码集中在 `dz.html`
- 函数命名：小驼峰（如 `startMathQuiz`、`getRandomSkin`）
- 变量命名：语义化（如 `gameData`、`mathData`）
- 注释风格：使用 `// ===== 模块名 =====` 分隔大块