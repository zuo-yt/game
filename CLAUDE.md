# CLAUDE.md

本文件为 Claude Code 提供项目指导，在处理本仓库代码时请遵循以下指令。

## 项目概述

这是一个纯前端小游戏项目 - **蛋仔派对皮肤盲盒**，包含答题挑战和抽卡收集系统，面向小学生用户。

## 项目结构

```
game/
├── index.html       # 主游戏页面（HTML结构）
├── css/style.css    # 样式文件
├── js/game.js       # 游戏逻辑脚本
├── images/          # 图片资源（favicon等）
└── docs/            # 规则文档目录
    ├── skin-system.md      # 皮肤与抽卡规则
    ├── quiz-system.md      # 答题挑战规则
    └── achievement-system.md # 成就称号规则
```

## 开发命令

- **运行游戏**: 直接在浏览器打开 `index.html`
- **无需构建/编译**: 纯静态 HTML 文件，无依赖

## 按需加载规则

| 关键词 | 规则文档位置 |
|--------|-------------|
| 抽卡概率、盲盒机制、皮肤列表、魅力值、兑换商城 | `docs/skin-system.md` |
| 答题挑战、数学语文英语题目、难度配置、生存模式、闯关模式、每日奖励 | `docs/quiz-system.md` |
| 成就系统、称号系统、解锁条件、弹窗庆贺 | `docs/achievement-system.md` |

## 文件读取忽略规则

参考 `.gitignore`，主要忽略：
- `.git/` 目录
- 无外部依赖目录（无 vendor、node_modules）
- 无构建输出目录

## 技术架构

### 游戏核心模块

1. **皮肤系统**（`js/game.js:291-335`）
   - 30款皮肤：C/B/A/S/SS/SSS 各5款
   - 概率：C(42%) > B(30%) > A(15%) > S(8%) > SS(4%) > SSS(1%)
   - 魅力值：C(1) > B(5) > A(20) > S(100) > SS(250) > SSS(1000)

2. **答题系统**（`js/game.js`）
   - 数学挑战：三档难度，20题，运算数2/3个
   - 语文挑战：拼音选择，字库100/200/300
   - 英语挑战：语音识别，词汇分年级

3. **游戏模式**
   - 生存模式：60秒限时，连击加成
   - 闯关模式：10关递进，3条生命

4. **成就系统**（`js/game.js:500-522`）
   - 20个成就，10个称号
   - 解锁后弹出庆贺弹窗

5. **数据持久化**
   - 使用 `localStorage` 存储 `gameData`
   - 包含：蛋币、魅力值、收集记录、成就称号等

### CSS 架构

- 响应式设计：支持手机端（`@media max-width: 600px`）
- 稀有度颜色：C(gray) > B(green) > A(blue) > S(purple) > SS(gold) > SSS(red-gold)
- 动画效果：卡牌翻转、粒子特效、光束特效、成就弹窗动画

## 代码风格

- 函数命名：小驼峰（如 `startMathQuiz`、`getRandomSkin`）
- 变量命名：语义化（如 `gameData`、`mathData`）
- 注释风格：使用 `// ===== 模块名 =====` 分隔大块
- 常量定义：使用 `const` 如 `SKINS`、`ACHIEVEMENTS`、`TITLES`

## 关键配置常量

| 常量名 | 位置 | 说明 |
|--------|------|------|
| `skins` | game.js:292 | 皮肤列表 |
| `charmValues` | game.js:339 | 魅力值定义 |
| `BONUS_CONFIG` | game.js:362 | 每日奖励配置 |
| `DIFFICULTY_CONFIG` | game.js:475 | 难度配置 |
| `ACHIEVEMENTS` | game.js:501 | 成就列表 |
| `TITLES` | game.js:525 | 称号列表 |
| `giftList` | game.js:342 | 礼品列表 |