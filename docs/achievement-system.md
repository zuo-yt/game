# 成就与称号系统规则

## 成就系统

### 成就奖励等级

| 难度 | 奖励 | 说明 |
|------|------|------|
| 简单 | +50 蛋币 | 基础成就 |
| 中等 | +100 蛋币 | 进阶成就 |
| 困难 | +200 蛋币 | 高难度成就 |

### 成就列表（共20个）

| ID | 名称 | 描述 | 图标 | 奖励 | 解锁条件 |
|------|------|------|------|------|---------|
| first_sss | 欧皇降临 | 首次获得SSS皮肤 | 🌟 | +200 | stats.sss > 0 |
| collect_10 | 收藏家 | 收集10种皮肤 | 📦 | +50 | 收集数 ≥ 10 |
| collect_all | 大满贯 | 收集全部30种皮肤 | 🏆 | +200 | 收集数 ≥ 30 |
| math_master | 数学小天才 | 数学挑战满分 | 🔢 | +100 | mathPerfect = true |
| chinese_master | 语文小博士 | 语文挑战连续10题全对 | 📖 | +100 | chinesePerfect = true |
| english_master | 英语达人 | 英语挑战满分 | 🔤 | +100 | englishPerfect = true |
| survival_20 | 生存专家 | 生存模式答对20题 | ⏱️ | +50 | survivalBest ≥ 20 |
| survival_50 | 生存大师 | 生存模式答对50题 | 🔥 | +200 | survivalBest ≥ 50 |
| adventure_5 | 闯关新手 | 闯关模式通过5关 | 🎯 | +50 | adventureLevel ≥ 5 |
| adventure_10 | 闯关王者 | 闯关模式通关 | 👑 | +200 | adventureLevel ≥ 10 |
| draw_100 | 抽卡狂魔 | 累计抽卡100次 | 🎰 | +50 | totalDraws ≥ 100 |
| draw_500 | 赌神 | 累计抽卡500次 | 💎 | +200 | totalDraws ≥ 500 |
| charm_1000 | 魅力四射 | 累计获取1000魅力值 | ✨ | +100 | (totalCharm或charm) ≥ 1000 |
| charm_10000 | 魅力之王 | 累计获取10000魅力值 | 💫 | +200 | (totalCharm或charm) ≥ 10000 |
| combo_10 | 连击新手 | 达成10连击 | ⚡ | +50 | maxCombo ≥ 10 |
| combo_30 | 连击大师 | 达成30连击 | 💥 | +200 | maxCombo ≥ 30 |
| rich | 富翁 | 累计获取10000蛋币 | 💰 | +100 | (totalCoins或coins) ≥ 10000 |
| study_star | 学习之星 | 三种挑战各满分1次 | ⭐ | +200 | math+chinese+english全满分 |
| ss_collector | SS收藏家 | 收集5种SS皮肤 | 🟡 | +200 | SS级收集 ≥ 5 |
| s_collector | S收藏家 | 收集5种S皮肤 | 🟣 | +100 | S级收集 ≥ 5 |

### 成就触发时机

| 触发场景 | 检测时机 |
|---------|---------|
| 抽卡获得SSS皮肤 | drawSingle/drawTen 执行后 |
| 收集进度变化 | drawSingle/drawTen 执行后 |
| 数学挑战完成 | closeMathQuiz 执行后 |
| 语文挑战完成 | closeChineseQuiz 执行后 |
| 英语挑战完成 | closeEnglishQuiz 执行后 |
| 生存模式结束 | endSurvivalMode 执行后 |
| 闯关模式通关 | closeAdventureMode 执行后 |
| 魅力值/蛋币变化 | updateDisplay 执行后 |
| 连击数更新 | 生存模式答题时实时检测 |

---

## 称号系统

### 称号列表（共10个）

称号与特定成就绑定，解锁对应成就后自动获得称号：

| ID | 名称 | 图标 | 关联成就 | 奖励 |
|------|------|------|---------|------|
| first_sss | 欧皇 | 🌟 | 欧皇降临 | +200 |
| collect_all | 大满贯 | 🏆 | 大满贯 | +200 |
| math_master | 数学天才 | 🔢 | 数学小天才 | +100 |
| chinese_master | 语文博士 | 📖 | 语文小博士 | +100 |
| english_master | 英语达人 | 🔤 | 英语达人 | +100 |
| survival_50 | 生存大师 | 🔥 | 生存大师 | +200 |
| adventure_10 | 闯关王者 | 👑 | 闯关王者 | +200 |
| draw_500 | 赌神 | 💎 | 赌神 | +200 |
| charm_10000 | 魅力之王 | 💫 | 魅力之王 | +200 |
| combo_30 | 连击大师 | 💥 | 连击大师 | +200 |

### 称号功能

- **装备称号**：在成就面板的"称号"标签页可装备已解锁的称号
- **显示位置**：装备的称号会显示在蛋仔形象正上方
- **换装联动**：称号与当前装备皮肤一同展示

---

## 弹窗庆贺系统

### 成就解锁弹窗

当解锁新成就时，弹出金色主题庆贺弹窗：

- **动画效果**：金色光晕脉冲、图标浮动、徽章闪光
- **音效**：解锁音效（音阶上升）
- **奖励显示**：显示获得的蛋币数量
- **按钮**：点击"太棒了！"关闭弹窗

### 称号解锁弹窗

当解锁新称号时，弹出紫色主题庆贺弹窗：

- **动画效果**：紫色光晕、皇冠旋转、3D翻转效果
- **音效**：称号解锁专属音效（C5-E5-G5-C6音阶）
- **按钮**：
  - "立即装备"：装备称号并关闭弹窗
  - "稍后再说"：仅关闭弹窗

### 弹窗队列

- 同时解锁多个成就/称号时，按队列顺序依次显示
- 成就弹窗优先，称号弹窗在后
- 弹窗之间间隔 300ms

---

## 数据持久化

### 存储结构

```javascript
gameData = {
    coins: 0,              // 当前蛋币余额
    charm: 0,              // 当前魅力值
    totalCoins: 0,         // 累计获取蛋币
    totalCharm: 0,         // 累计获取魅力值
    achievements: {},      // 已解锁成就 { id: true }
    currentTitle: null,    // 当前装备的称号ID
    unlockedTitles: [],    // 已解锁的称号列表
    mathPerfect: false,    // 数学满分标记
    chinesePerfect: false, // 语文满分标记
    englishPerfect: false, // 英语满分标记
    survivalBest: 0,       // 生存模式最佳成绩
    adventureLevel: 0,     // 闯关模式最高关卡
    maxCombo: 0,           // 最高连击数
    totalDraws: 0,         // 累计抽卡次数
    collected: {},         // 收集的皮肤
    stats: { c:0, b:0, a:0, s:0, ss:0, sss:0 }  // 各等级皮肤数量
}
```

### 存储方式

- 使用 `localStorage` 存储
- 键名：`eggGameData`
- 每次数据变化时自动保存