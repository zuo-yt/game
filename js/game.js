// ===== 皮肤数据 =====
const skins = {
    c: [
        { name: '小黄蛋', icon: '🟡' },
        { name: '小蓝蛋', icon: '🔵' },
        { name: '小粉蛋', icon: '🩷' },
        { name: '小绿蛋', icon: '🟢' },
        { name: '小橙蛋', icon: '🟠' }
    ],
    b: [
        { name: '波波蛋', icon: '🌊' },
        { name: '泡泡蛋', icon: '🫧' },
        { name: '甜甜蛋', icon: '🍭' },
        { name: '闪闪蛋', icon: '✨' },
        { name: '暖暖蛋', icon: '☀️' }
    ],
    a: [
        { name: '滑板蛋', icon: '🛹' },
        { name: '耳机蛋', icon: '🎧' },
        { name: '帽子蛋', icon: '🧢' },
        { name: '眼镜蛋', icon: '🕶️' },
        { name: '背包蛋', icon: '🎒' }
    ],
    s: [
        { name: '小丑蛋仔', icon: '🤡' },
        { name: '忍者蛋仔', icon: '🥷' },
        { name: '魔法蛋仔', icon: '🪄' },
        { name: '骑士蛋仔', icon: '🛡️' },
        { name: '宇航蛋仔', icon: '🧑‍🚀' }
    ],
    ss: [
        { name: '凤凰蛋仔', icon: '🔥' },
        { name: '龙蛋仔', icon: '🐉' },
        { name: '独角兽', icon: '🦄' },
        { name: '冰雪女王', icon: '❄️' },
        { name: '雷霆蛋仔', icon: '⚡' }
    ],
    sss: [
        { name: '银河王者', icon: '🌌' },
        { name: '彩虹传说', icon: '🌈' },
        { name: '钻石皇冠', icon: '💎' },
        { name: '天使蛋仔', icon: '👼' },
        { name: '恶魔蛋仔', icon: '😈' }
    ]
};
const rarityOrder = ['c', 'b', 'a', 's', 'ss', 'sss'];

// ===== 魅力值定义 =====
const charmValues = { c: 1, b: 5, a: 20, s: 100, ss: 500, sss: 2000 };

// ===== 礼品列表 =====
const giftList = [
    { name: '蛋仔盲盒', price: 69.8, icon: '🎁' },
    { name: '尖叫饮料', price: 5, icon: '🥤' },
    { name: '烤冷面', price: 6, icon: '🍜' },
    { name: '西瓜', price: 20, icon: '🍉' },
    { name: '头饰', price: 10, icon: '🎀' },
    { name: '上衣', price: 100, icon: '👕' },
    { name: '裤子', price: 100, icon: '👖' },
    { name: '鞋子', price: 100, icon: '👟' },
    { name: '糖果', price: 10, icon: '🍬' }
];

// ===== 密码和奖励配置 =====
const BONUS_PASSWORD = '20190101';
const BONUS_CONFIG = {
    hair: { coins: 500, name: '洗头', icon: '💇' },
    bath: { coins: 1000, name: '洗澡', icon: '🛁' }
};
let pendingBonusType = null;

// ===== 小学一年级完整生字表（约300字）=====
const pinyinData = {
    // 上册
    '一': 'yī', '二': 'èr', '三': 'sān', '四': 'sì', '五': 'wǔ', '六': 'liù', '七': 'qī', '八': 'bā', '九': 'jiǔ', '十': 'shí',
    '上': 'shàng', '下': 'xià', '大': 'dà', '小': 'xiǎo', '多': 'duō', '少': 'shǎo', '左': 'zuǒ', '右': 'yòu', '早': 'zǎo', '书': 'shū',
    '人': 'rén', '口': 'kǒu', '手': 'shǒu', '足': 'zú', '耳': 'ěr', '目': 'mù', '山': 'shān', '水': 'shuǐ', '火': 'huǒ', '土': 'tǔ',
    '日': 'rì', '月': 'yuè', '田': 'tián', '禾': 'hé', '竹': 'zhú', '石': 'shí', '刀': 'dāo', '力': 'lì', '米': 'mǐ', '豆': 'dòu',
    '天': 'tiān', '地': 'dì', '花': 'huā', '草': 'cǎo', '树': 'shù', '木': 'mù', '叶': 'yè', '云': 'yún', '风': 'fēng', '雨': 'yǔ',
    '鸟': 'niǎo', '虫': 'chóng', '鱼': 'yú', '马': 'mǎ', '牛': 'niú', '羊': 'yáng', '犬': 'quǎn', '皮': 'pí', '毛': 'máo', '牙': 'yá',
    '我': 'wǒ', '你': 'nǐ', '他': 'tā', '她': 'tā', '们': 'men', '是': 'shì', '的': 'de', '有': 'yǒu', '在': 'zài', '不': 'bù',
    '了': 'le', '也': 'yě', '就': 'jiù', '都': 'dōu', '会': 'huì', '能': 'néng', '说': 'shuō', '听': 'tīng', '看': 'kàn', '想': 'xiǎng',
    '来': 'lái', '去': 'qù', '出': 'chū', '入': 'rù', '开': 'kāi', '关': 'guān', '坐': 'zuò', '立': 'lì', '走': 'zǒu', '跑': 'pǎo',
    '爸': 'bà', '妈': 'mā', '爷': 'yé', '奶': 'nǎi', '哥': 'gē', '弟': 'dì', '姐': 'jiě', '妹': 'mèi', '老': 'lǎo', '师': 'shī',
    '学': 'xué', '生': 'shēng', '校': 'xiào', '班': 'bān', '同': 'tóng', '友': 'yǒu', '字': 'zì', '词': 'cí', '句': 'jù', '文': 'wén',
    '白': 'bái', '红': 'hóng', '黄': 'huáng', '蓝': 'lán', '绿': 'lǜ', '黑': 'hēi', '灰': 'huī', '金': 'jīn', '银': 'yín', '彩': 'cǎi',
    '春': 'chūn', '夏': 'xià', '秋': 'qiū', '冬': 'dōng', '东': 'dōng', '西': 'xī', '南': 'nán', '北': 'běi', '前': 'qián', '后': 'hòu',
    '里': 'lǐ', '外': 'wài', '高': 'gāo', '低': 'dī', '长': 'cháng', '短': 'duǎn', '宽': 'kuān', '窄': 'zhǎi', '厚': 'hòu', '薄': 'báo',
    '正': 'zhèng', '反': 'fǎn', '对': 'duì', '错': 'cuò', '真': 'zhēn', '假': 'jiǎ', '好': 'hǎo', '坏': 'huài', '新': 'xīn', '旧': 'jiù',
    '快': 'kuài', '慢': 'màn', '冷': 'lěng', '热': 'rè', '明': 'míng', '暗': 'àn', '干': 'gān', '净': 'jìng', '脏': 'zāng', '乱': 'luàn',
    // 下册
    '飞': 'fēi', '机': 'jī', '车': 'chē', '船': 'chuán', '路': 'lù', '桥': 'qiáo', '灯': 'dēng', '塔': 'tǎ', '城': 'chéng', '村': 'cūn',
    '家': 'jiā', '门': 'mén', '窗': 'chuāng', '房': 'fáng', '屋': 'wū', '床': 'chuáng', '桌': 'zhuō', '椅': 'yǐ', '柜': 'guì', '箱': 'xiāng',
    '衣': 'yī', '服': 'fu', '鞋': 'xié', '帽': 'mào', '袜': 'wà', '巾': 'jīn', '被': 'bèi', '枕': 'zhěn', '席': 'xí', '毯': 'tǎn',
    '饭': 'fàn', '菜': 'cài', '肉': 'ròu', '蛋': 'dàn', '汤': 'tāng', '面': 'miàn', '包': 'bāo', '饼': 'bǐng', '果': 'guǒ', '瓜': 'guā',
    '桃': 'táo', '梨': 'lí', '杏': 'xìng', '李': 'lǐ', '橘': 'jú', '苹': 'píng', '葡': 'pú', '萄': 'táo', '萝': 'luó', '卜': 'bo',
    '茄': 'qié', '椒': 'jiāo', '葱': 'cōng', '蒜': 'suàn', '姜': 'jiāng', '盐': 'yán', '油': 'yóu', '酱': 'jiàng', '醋': 'cù', '茶': 'chá',
    '杯': 'bēi', '瓶': 'píng', '碗': 'wǎn', '盘': 'pán', '筷': 'kuài', '勺': 'sháo', '叉': 'chā', '刀': 'dāo', '壶': 'hú', '盆': 'pén',
    '猫': 'māo', '狗': 'gǒu', '猪': 'zhū', '鸡': 'jī', '鸭': 'yā', '鹅': 'é', '兔': 'tù', '虎': 'hǔ', '狮': 'shī', '象': 'xiàng',
    '猴': 'hóu', '鹿': 'lù', '熊': 'xióng', '狼': 'láng', '鼠': 'shǔ', '蛇': 'shé', '蛙': 'wā', '龟': 'guī', '鹤': 'hè', '鹰': 'yīng',
    '燕': 'yàn', '鸦': 'yā', '鹊': 'què', '蝶': 'dié', '蜂': 'fēng', '蚁': 'yǐ', '龙': 'lóng', '凤': 'fèng', '麒': 'qí', '麟': 'lín',
    '球': 'qiú', '拍': 'pāi', '跑': 'pǎo', '跳': 'tiào', '踢': 'tī', '打': 'dǎ', '拔': 'bá', '画': 'huà', '写': 'xiě',
    '读': 'dú', '背': 'bèi', '唱': 'chàng', '玩': 'wán', '乐': 'lè', '笑': 'xiào', '哭': 'kū', '闹': 'nào', '静': 'jìng',
    '星': 'xīng', '亮': 'liàng', '阳': 'yáng', '光': 'guāng', '空': 'kōng', '气': 'qì', '清': 'qīng', '洁': 'jié', '美': 'měi', '丽': 'lì',
    '爱': 'ài', '情': 'qíng', '心': 'xīn', '思': 'sī', '念': 'niàn', '记': 'jì', '忘': 'wàng', '知': 'zhī', '识': 'shí', '懂': 'dǒng',
    '事': 'shì', '物': 'wù', '品': 'pǐn', '样': 'yàng', '种': 'zhǒng', '类': 'lèi', '群': 'qún', '众': 'zhòng', '个': 'gè',
    '只': 'zhī', '条': 'tiáo', '头': 'tóu', '尾': 'wěi', '身': 'shēn', '体': 'tǐ', '脸': 'liǎn', '眼': 'yǎn', '鼻': 'bí', '舌': 'shé'
};

// ===== 小学英语完整词汇表（约500词）=====
const englishWordBank = [
    // 一年级
    { word: 'apple', meaning: '苹果' }, { word: 'banana', meaning: '香蕉' }, { word: 'cat', meaning: '猫' }, { word: 'dog', meaning: '狗' },
    { word: 'egg', meaning: '蛋' }, { word: 'fish', meaning: '鱼' }, { word: 'girl', meaning: '女孩' }, { word: 'boy', meaning: '男孩' },
    { word: 'hand', meaning: '手' }, { word: 'ice', meaning: '冰' }, { word: 'jump', meaning: '跳' }, { word: 'kite', meaning: '风筝' },
    { word: 'lion', meaning: '狮子' }, { word: 'milk', meaning: '牛奶' }, { word: 'nose', meaning: '鼻子' }, { word: 'orange', meaning: '橙子' },
    { word: 'pig', meaning: '猪' }, { word: 'queen', meaning: '女王' }, { word: 'rabbit', meaning: '兔子' }, { word: 'sun', meaning: '太阳' },
    { word: 'tree', meaning: '树' }, { word: 'umbrella', meaning: '雨伞' }, { word: 'violin', meaning: '小提琴' }, { word: 'water', meaning: '水' },
    { word: 'box', meaning: '盒子' }, { word: 'yellow', meaning: '黄色' }, { word: 'zoo', meaning: '动物园' }, { word: 'book', meaning: '书' },
    { word: 'car', meaning: '汽车' }, { word: 'door', meaning: '门' }, { word: 'eye', meaning: '眼睛' }, { word: 'food', meaning: '食物' },
    // 二年级
    { word: 'happy', meaning: '开心的' }, { word: 'sad', meaning: '伤心的' }, { word: 'angry', meaning: '生气的' }, { word: 'tired', meaning: '累的' },
    { word: 'hungry', meaning: '饿的' }, { word: 'thirsty', meaning: '渴的' }, { word: 'hot', meaning: '热的' }, { word: 'cold', meaning: '冷的' },
    { word: 'big', meaning: '大的' }, { word: 'small', meaning: '小的' }, { word: 'tall', meaning: '高的' }, { word: 'short', meaning: '矮的' },
    { word: 'long', meaning: '长的' }, { word: 'new', meaning: '新的' }, { word: 'old', meaning: '旧的' }, { word: 'young', meaning: '年轻的' },
    { word: 'red', meaning: '红色' }, { word: 'blue', meaning: '蓝色' }, { word: 'green', meaning: '绿色' }, { word: 'white', meaning: '白色' },
    { word: 'black', meaning: '黑色' }, { word: 'pink', meaning: '粉色' }, { word: 'purple', meaning: '紫色' }, { word: 'brown', meaning: '棕色' },
    { word: 'family', meaning: '家庭' }, { word: 'mother', meaning: '妈妈' }, { word: 'father', meaning: '爸爸' }, { word: 'sister', meaning: '姐妹' },
    { word: 'brother', meaning: '兄弟' }, { word: 'grandma', meaning: '奶奶' }, { word: 'grandpa', meaning: '爷爷' }, { word: 'friend', meaning: '朋友' },
    // 三年级
    { word: 'teacher', meaning: '老师' }, { word: 'student', meaning: '学生' }, { word: 'school', meaning: '学校' }, { word: 'classroom', meaning: '教室' },
    { word: 'desk', meaning: '课桌' }, { word: 'chair', meaning: '椅子' }, { word: 'pencil', meaning: '铅笔' }, { word: 'ruler', meaning: '尺子' },
    { word: 'eraser', meaning: '橡皮' }, { word: 'pen', meaning: '钢笔' }, { word: 'bag', meaning: '书包' }, { word: 'window', meaning: '窗户' },
    { word: 'morning', meaning: '早晨' }, { word: 'afternoon', meaning: '下午' }, { word: 'evening', meaning: '晚上' }, { word: 'night', meaning: '夜晚' },
    { word: 'today', meaning: '今天' }, { word: 'tomorrow', meaning: '明天' }, { word: 'yesterday', meaning: '昨天' }, { word: 'week', meaning: '周' },
    { word: 'month', meaning: '月' }, { word: 'year', meaning: '年' }, { word: 'spring', meaning: '春天' }, { word: 'summer', meaning: '夏天' },
    { word: 'autumn', meaning: '秋天' }, { word: 'winter', meaning: '冬天' }, { word: 'sunny', meaning: '晴朗的' }, { word: 'rainy', meaning: '下雨的' },
    { word: 'cloudy', meaning: '多云的' }, { word: 'windy', meaning: '有风的' }, { word: 'snowy', meaning: '下雪的' }, { word: 'weather', meaning: '天气' },
    // 四年级
    { word: 'breakfast', meaning: '早餐' }, { word: 'lunch', meaning: '午餐' }, { word: 'dinner', meaning: '晚餐' }, { word: 'rice', meaning: '米饭' },
    { word: 'bread', meaning: '面包' }, { word: 'cake', meaning: '蛋糕' }, { word: 'noodle', meaning: '面条' }, { word: 'chicken', meaning: '鸡肉' },
    { word: 'beef', meaning: '牛肉' }, { word: 'vegetable', meaning: '蔬菜' }, { word: 'tomato', meaning: '番茄' }, { word: 'potato', meaning: '土豆' },
    { word: 'candy', meaning: '糖果' }, { word: 'juice', meaning: '果汁' }, { word: 'coffee', meaning: '咖啡' }, { word: 'tea', meaning: '茶' },
    { word: 'bedroom', meaning: '卧室' }, { word: 'living room', meaning: '客厅' }, { word: 'kitchen', meaning: '厨房' }, { word: 'bathroom', meaning: '浴室' },
    { word: 'sofa', meaning: '沙发' }, { word: 'table', meaning: '桌子' }, { word: 'phone', meaning: '电话' }, { word: 'TV', meaning: '电视' },
    { word: 'computer', meaning: '电脑' }, { word: 'clock', meaning: '时钟' }, { word: 'lamp', meaning: '灯' }, { word: 'picture', meaning: '图片' },
    { word: 'bed', meaning: '床' }, { word: 'wall', meaning: '墙' }, { word: 'floor', meaning: '地板' },
    // 五年级
    { word: 'Monday', meaning: '星期一' }, { word: 'Tuesday', meaning: '星期二' }, { word: 'Wednesday', meaning: '星期三' }, { word: 'Thursday', meaning: '星期四' },
    { word: 'Friday', meaning: '星期五' }, { word: 'Saturday', meaning: '星期六' }, { word: 'Sunday', meaning: '星期日' }, { word: 'weekend', meaning: '周末' },
    { word: 'math', meaning: '数学' }, { word: 'English', meaning: '英语' }, { word: 'Chinese', meaning: '语文' }, { word: 'music', meaning: '音乐' },
    { word: 'art', meaning: '美术' }, { word: 'PE', meaning: '体育' }, { word: 'science', meaning: '科学' },
    { word: 'read', meaning: '读' }, { word: 'write', meaning: '写' }, { word: 'speak', meaning: '说' }, { word: 'listen', meaning: '听' },
    { word: 'sing', meaning: '唱' }, { word: 'dance', meaning: '跳舞' }, { word: 'draw', meaning: '画' }, { word: 'swim', meaning: '游泳' },
    { word: 'run', meaning: '跑' }, { word: 'walk', meaning: '走' }, { word: 'fly', meaning: '飞' }, { word: 'sleep', meaning: '睡觉' },
    { word: 'cook', meaning: '做饭' }, { word: 'clean', meaning: '打扫' }, { word: 'wash', meaning: '洗' }, { word: 'study', meaning: '学习' },
    // 六年级
    { word: 'hospital', meaning: '医院' }, { word: 'cinema', meaning: '电影院' }, { word: 'library', meaning: '图书馆' }, { word: 'park', meaning: '公园' },
    { word: 'museum', meaning: '博物馆' }, { word: 'store', meaning: '商店' }, { word: 'restaurant', meaning: '餐厅' }, { word: 'hotel', meaning: '酒店' },
    { word: 'station', meaning: '车站' }, { word: 'airport', meaning: '机场' }, { word: 'bridge', meaning: '桥' }, { word: 'river', meaning: '河' },
    { word: 'mountain', meaning: '山' }, { word: 'forest', meaning: '森林' }, { word: 'lake', meaning: '湖' }, { word: 'island', meaning: '岛' },
    { word: 'country', meaning: '国家' }, { word: 'city', meaning: '城市' }, { word: 'village', meaning: '村庄' }, { word: 'street', meaning: '街道' },
    { word: 'doctor', meaning: '医生' }, { word: 'nurse', meaning: '护士' }, { word: 'driver', meaning: '司机' }, { word: 'farmer', meaning: '农民' },
    { word: 'worker', meaning: '工人' }, { word: 'pilot', meaning: '飞行员' }, { word: 'police', meaning: '警察' }, { word: 'scientist', meaning: '科学家' },
    { word: 'artist', meaning: '艺术家' }, { word: 'singer', meaning: '歌手' }, { word: 'writer', meaning: '作家' }, { word: 'dancer', meaning: '舞者' }
];

// 游戏数据
let gameData = { coins: 0, charm: 0, collected: {}, history: [], stats: { c: 0, b: 0, a: 0, s: 0, ss: 0, sss: 0 }, totalDraws: 0 };
let mathData = { questions: [], currentIndex: 0, correct: 0, wrong: 0, earned: 0, timer: null, timeLeft: 120 };
let chineseIndex = 0;
let chineseCorrect = 0;
let englishIndex = 0;
let pendingGift = null;

// ===== 初始化 =====
function init() {
    createStars();
    loadGameData();
    updateDisplay();
    updateCollection();
    updateStats();
}
function createStars() {
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        document.getElementById('stars').appendChild(star);
    }
}
function loadGameData() { const s = localStorage.getItem('eggPartyGame'); if (s) gameData = JSON.parse(s); }
function saveGameData() { localStorage.setItem('eggPartyGame', JSON.stringify(gameData)); }
function updateDisplay() { document.getElementById('coinAmount').textContent = gameData.coins; document.getElementById('charmAmount').textContent = gameData.charm; }

// ===== 数学题 =====
function startMathQuiz() {
    mathData = { questions: [], currentIndex: 0, correct: 0, wrong: 0, earned: 0, timer: null, timeLeft: 120 };
    for (let i = 0; i < 20; i++) {
        let a, b, op, ans;
        do {
            a = Math.floor(Math.random() * 20);
            b = Math.floor(Math.random() * 20);
            op = Math.random() > 0.5 ? '+' : '-';
            if (op === '+') ans = a + b;
            else { if (a < b) [a, b] = [b, a]; ans = a - b; }
        } while (ans > 20 || ans < 0);
        mathData.questions.push({ a, b, op, ans });
    }
    document.getElementById('mathModal').classList.add('active');
    document.getElementById('mathCorrect').textContent = '0';
    document.getElementById('mathWrong').textContent = '0';
    document.getElementById('mathEarned').textContent = '0';
    showMathQuestion();
    startMathTimer();
}
function showMathQuestion() {
    const q = mathData.questions[mathData.currentIndex];
    document.getElementById('mathQuestion').textContent = `${q.a} ${q.op} ${q.b} = ?`;
    document.getElementById('mathCurrent').textContent = mathData.currentIndex + 1;
    document.getElementById('mathInput').value = '';
    document.getElementById('mathInput').focus();
}
function submitMathAnswer() {
    const ans = parseInt(document.getElementById('mathInput').value);
    if (isNaN(ans)) return;
    const q = mathData.questions[mathData.currentIndex];
    if (ans === q.ans) {
        mathData.correct++;
        mathData.earned += 5;
        document.getElementById('mathCorrect').textContent = mathData.correct;
        document.getElementById('mathEarned').textContent = mathData.earned;
        gameData.coins += 5;
        saveGameData();
        updateDisplay();
    } else {
        mathData.wrong++;
        document.getElementById('mathWrong').textContent = mathData.wrong;
    }
    mathData.currentIndex++;
    if (mathData.currentIndex >= 20 || mathData.timeLeft <= 0) finishMathQuiz();
    else showMathQuestion();
}
function startMathTimer() {
    updateMathTimerDisplay();
    mathData.timer = setInterval(() => { mathData.timeLeft--; updateMathTimerDisplay(); if (mathData.timeLeft <= 0) finishMathQuiz(); }, 1000);
}
function updateMathTimerDisplay() { const m = Math.floor(mathData.timeLeft / 60), s = mathData.timeLeft % 60; document.getElementById('mathTimer').textContent = `${m}:${s.toString().padStart(2, '0')}`; }
function finishMathQuiz() {
    clearInterval(mathData.timer);
    document.getElementById('mathModal').classList.remove('active');
    const timeUsed = 120 - mathData.timeLeft;
    let mult = 1, bonus = '';
    if (timeUsed <= 60) { mult = 2; bonus = '⚡ 极速完成！×2倍奖励'; }
    else if (timeUsed <= 90) { mult = 1.5; bonus = '🚀 快速完成！×1.5倍奖励'; }
    else { bonus = `⏱️ 用时: ${Math.floor(timeUsed/60)}分${timeUsed%60}秒`; }
    let extraBonus = 0;
    if (mathData.correct === 20) { extraBonus = 100; bonus += '<br>🏆 全部答对！额外+100蛋币'; }
    const efficiencyReward = Math.floor(mathData.earned * mult);
    const totalReward = efficiencyReward + extraBonus;
    let title = '', icon = '';
    if (mathData.correct === 20) { title = '满分！天才数学家！'; icon = '🏆'; }
    else if (mathData.correct >= 18) { title = '太棒了！接近满分！'; icon = '🎉'; }
    else if (mathData.correct >= 15) { title = '优秀！数学高手！'; icon = '👍'; }
    else if (mathData.correct >= 10) { title = '不错！继续加油！'; icon = '💪'; }
    else { title = '还需努力！'; icon = '📚'; }
    gameData.coins += (efficiencyReward - mathData.earned) + extraBonus;
    saveGameData();
    updateDisplay();
    showResult(icon, title, `正确 ${mathData.correct}/20 题`, `共获得 ${totalReward} 蛋币`, bonus);
}
function closeMathQuiz() { clearInterval(mathData.timer); document.getElementById('mathModal').classList.remove('active'); }

// ===== 语文题 =====
function startChineseQuiz() { chineseIndex = 0; chineseCorrect = 0; document.getElementById('chineseModal').classList.add('active'); showChineseQuestion(); }
function showChineseQuestion() {
    const chars = Object.keys(pinyinData);
    const char = chars[Math.floor(Math.random() * chars.length)];
    const correctPinyin = pinyinData[char];
    const allPinyins = Object.values(pinyinData).filter(p => p !== correctPinyin);
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
        const w = allPinyins[Math.floor(Math.random() * allPinyins.length)];
        if (!wrongOptions.includes(w)) wrongOptions.push(w);
    }
    document.getElementById('chineseChar').textContent = char;
    document.getElementById('chineseCurrent').textContent = chineseIndex + 1;
    const opts = [correctPinyin, ...wrongOptions].sort(() => Math.random() - 0.5);
    const container = document.getElementById('pinyinOptions');
    container.innerHTML = '';
    opts.forEach(o => {
        const btn = document.createElement('div');
        btn.className = 'pinyin-option';
        btn.textContent = o;
        btn.onclick = () => selectPinyin(o, correctPinyin, btn);
        container.appendChild(btn);
    });
}
function selectPinyin(sel, correct, btn) {
    document.querySelectorAll('.pinyin-option').forEach(o => o.style.pointerEvents = 'none');
    if (sel === correct) { btn.classList.add('correct'); gameData.coins += 5; chineseCorrect++; saveGameData(); updateDisplay(); }
    else { btn.classList.add('wrong'); document.querySelectorAll('.pinyin-option').forEach(o => { if (o.textContent === correct) o.classList.add('correct'); }); }
    setTimeout(() => {
        chineseIndex++;
        if (chineseIndex < 10) showChineseQuestion();
        else {
            closeChineseQuiz();
            const totalReward = chineseCorrect * 5 + 50;
            const bonus = chineseCorrect === 10 ? '🎉 全部答对！' : `答对 ${chineseCorrect}/10 题`;
            showResult('📖', '语文挑战完成！', `完成10道题目`, `+${totalReward} 蛋币`, bonus);
            gameData.coins += 50;
            saveGameData();
            updateDisplay();
        }
    }, 1000);
}
function closeChineseQuiz() { document.getElementById('chineseModal').classList.remove('active'); }

// ===== 英语题 =====
function startEnglishQuiz() { englishIndex = 0; document.getElementById('englishModal').classList.add('active'); showEnglishQuestion(); }
function showEnglishQuestion() {
    const data = englishWordBank[Math.floor(Math.random() * englishWordBank.length)];
    document.getElementById('englishWord').textContent = data.word;
    document.getElementById('englishMeaning').textContent = data.meaning;
    document.getElementById('englishCurrent').textContent = englishIndex + 1;
    document.getElementById('speechResult').innerHTML = '';
    document.getElementById('speakBtn').classList.remove('recording');
    document.getElementById('speakBtn').textContent = '🎤 开始朗读';
    window.currentEnglishWord = data.word;
}
function playWordSound() {
    const word = window.currentEnglishWord;
    const audioSources = [
        `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=1`,
        `https://tts.baidu.com/text2audio?tex=${encodeURIComponent(word)}&cuid=baike&lan=en&ctp=1&pdt=301&vol=9&rate=32&per=0`,
        `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw&q=${encodeURIComponent(word)}`
    ];
    if (typeof speechSynthesis !== 'undefined') {
        try {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            utterance.onerror = () => tryAudioSources(audioSources, 0);
            speechSynthesis.speak(utterance);
            return;
        } catch(e) {}
    }
    tryAudioSources(audioSources, 0);
}
function tryAudioSources(sources, index) {
    if (index >= sources.length) {
        const res = document.getElementById('speechResult');
        res.className = 'speech-result fail';
        res.textContent = '⚠️ 语音播放失败，请检查网络';
        return;
    }
    const audio = new Audio(sources[index]);
    audio.onended = () => {};
    audio.onerror = () => tryAudioSources(sources, index + 1);
    audio.play().catch(() => tryAudioSources(sources, index + 1));
}
function startSpeaking() {
    const btn = document.getElementById('speakBtn');
    btn.classList.add('recording');
    btn.textContent = '🔴 录音中...';
    const isWechat = /MicroMessenger/i.test(navigator.userAgent);
    // 微信环境和不支持环境：不朗读单词，直接模拟录制成功
    if (isWechat || (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window))) {
        setTimeout(() => {
            btn.classList.remove('recording');
            btn.textContent = '🎤 开始朗读';
            document.getElementById('speechResult').className = 'speech-result success';
            document.getElementById('speechResult').textContent = '✅ 朗读正确！';
            gameData.coins += 8;
            saveGameData();
            updateDisplay();
            setTimeout(nextEnglishQuestion, 1500);
        }, 2000);
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    let fallbackTimer = setTimeout(() => {
        recognition.stop();
        btn.classList.remove('recording');
        btn.textContent = '🎤 开始朗读';
        document.getElementById('speechResult').className = 'speech-result success';
        document.getElementById('speechResult').textContent = '✅ 朗读正确！';
        gameData.coins += 8;
        saveGameData();
        updateDisplay();
        setTimeout(nextEnglishQuestion, 1500);
    }, 8000);
    recognition.onresult = (e) => {
        clearTimeout(fallbackTimer);
        const spoken = e.results[0][0].transcript.toLowerCase();
        const expected = window.currentEnglishWord.toLowerCase();
        btn.classList.remove('recording');
        btn.textContent = '🎤 开始朗读';
        const res = document.getElementById('speechResult');
        if (spoken.includes(expected) || levenshteinDistance(spoken, expected) <= 2) { res.className = 'speech-result success'; res.textContent = `✅ 正确！你说了: "${spoken}"`; gameData.coins += 8; saveGameData(); updateDisplay(); }
        else { res.className = 'speech-result fail'; res.textContent = `❌ 你说了: "${spoken}"，应为: "${expected}"`; }
        setTimeout(nextEnglishQuestion, 1500);
    };
    recognition.onerror = (e) => {
        clearTimeout(fallbackTimer);
        btn.classList.remove('recording');
        btn.textContent = '🎤 开始朗读';
        document.getElementById('speechResult').className = 'speech-result fail';
        document.getElementById('speechResult').textContent = '⚠️ 识别失败，请重试';
    };
    recognition.start();
}
function levenshteinDistance(a, b) {
    // 初始化矩阵
    const m = [];
    for (let i = 0; i <= b.length; i++) m[i] = [i];
    for (let j = 0; j <= a.length; j++) m[0][j] = j;

    // 计算编辑距离
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            m[i][j] = b[i-1] === a[j-1]
                ? m[i-1][j-1]  // 字符相同，不增加距离
                : Math.min(m[i-1][j-1]+1, m[i][j-1]+1, m[i-1][j]+1);  // 取最小编辑代价
        }
    }
    return m[b.length][a.length];
}
function nextEnglishQuestion() { englishIndex++; if (englishIndex < 10) showEnglishQuestion(); else { closeEnglishQuiz(); showResult('🔤', '英语挑战完成！', '完成10道题目', '+50 蛋币', ''); gameData.coins += 50; saveGameData(); updateDisplay(); } }
function closeEnglishQuiz() { document.getElementById('englishModal').classList.remove('active'); }

// ===== 结果弹窗 =====
function showResult(icon, title, stats, reward, bonus) {
    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultStats').textContent = stats;
    document.getElementById('resultReward').textContent = reward;
    const b = document.getElementById('resultBonus');
    if (bonus) { b.textContent = bonus; b.style.display = 'block'; } else b.style.display = 'none';
    document.getElementById('resultModal').classList.add('active');
}
function closeResultModal() { document.getElementById('resultModal').classList.remove('active'); }

// ===== 抽奖系统 =====
function getRandomSkin() {
    const rand = Math.random() * 100;
    let rarity;
    if (rand < 0.5) rarity = 'sss';
    else if (rand < 2.5) rarity = 'ss';
    else if (rand < 10.5) rarity = 's';
    else if (rand < 25.5) rarity = 'a';
    else if (rand < 55.5) rarity = 'b';
    else rarity = 'c';
    const list = skins[rarity];
    const idx = Math.floor(Math.random() * list.length);
    return { rarity, name: list[idx].name, icon: list[idx].icon, index: idx };
}
function drawSingle() {
    if (gameData.coins < 10) { showResult('💸', '蛋币不足', `当前蛋币: ${gameData.coins}`, '需要 10 蛋币', '请先答题获取蛋币'); return; }
    gameData.coins -= 10;
    const skin = getRandomSkin();
    addSkinToCollection(skin);
    gameData.stats[skin.rarity]++;
    gameData.totalDraws++;
    saveGameData();
    updateDisplay();
    showDrawAnimation([skin], 'single');
}
function drawTen() {
    if (gameData.coins < 90) { showResult('💸', '蛋币不足', `当前蛋币: ${gameData.coins}`, '需要 90 蛋币', '请先答题获取蛋币'); return; }
    gameData.coins -= 90;
    const results = [];
    for (let i = 0; i < 10; i++) {
        const skin = getRandomSkin();
        results.push(skin);
        addSkinToCollection(skin);
        gameData.stats[skin.rarity]++;
        gameData.totalDraws++;
    }
    saveGameData();
    updateDisplay();
    showDrawAnimation(results, 'ten');
}
function addSkinToCollection(skin) {
    const key = `${skin.rarity}_${skin.index}`;
    if (!gameData.collected[key]) {
        gameData.collected[key] = { ...skin, count: 0 };
    }
    gameData.collected[key].count++;
    gameData.charm += charmValues[skin.rarity];
}

// ===== 抽卡动画 =====
function showDrawAnimation(skinList, drawType) {
    const overlay = document.getElementById('drawOverlay');
    overlay.innerHTML = '';
    overlay.classList.add('active');
    const container = document.createElement('div');
    container.className = 'draw-card-container';
    overlay.appendChild(container);
    const btnContainer = document.createElement('div');
    btnContainer.className = 'draw-btn-container';
    overlay.appendChild(btnContainer);
    const retryBtn = document.createElement('button');
    retryBtn.className = 'retry-draw-btn';
    if (drawType === 'single') {
        retryBtn.textContent = '再抽1次 (10蛋币)';
        retryBtn.onclick = (e) => { e.stopPropagation(); overlay.classList.remove('active'); drawSingle(); };
    } else {
        retryBtn.textContent = '再抽10次 (90蛋币)';
        retryBtn.onclick = (e) => { e.stopPropagation(); overlay.classList.remove('active'); drawTen(); };
    }
    btnContainer.appendChild(retryBtn);
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-draw-btn';
    closeBtn.textContent = '✕ 关闭';
    closeBtn.onclick = (e) => { e.stopPropagation(); overlay.classList.remove('active'); updateCollection(); updateStats(); };
    btnContainer.appendChild(closeBtn);
    let lastIndex = skinList.length - 1;
    skinList.forEach((skin, i) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'draw-card';
            const rarityUpper = skin.rarity.toUpperCase();
            card.innerHTML = `
                <div class="draw-card-inner">
                    <div class="draw-card-front"></div>
                    <div class="draw-card-back rarity-${skin.rarity}">
                        <div class="rarity-badge ${skin.rarity}">${rarityUpper}</div>
                        <div class="skin-fallback rarity-${skin.rarity}">${skin.icon}</div>
                        <div class="skin-name-bottom">${skin.name}</div>
                    </div>
                </div>
            `;
            container.appendChild(card);
            setTimeout(() => {
                card.classList.add('opened');
                if (skin.rarity === 'sss') { createParticles(card, skin.rarity); createSSSFlash(); }
                else if (skin.rarity === 'ss') { createParticles(card, skin.rarity); createSSLightBeams(); }
                if (i === lastIndex) { setTimeout(() => btnContainer.classList.add('show'), 500); }
            }, 100);
        }, i * 300);
    });
}
function createParticles(card, rarity) {
    const colors = rarity === 'sss' ? ['#ff5252', '#ffd700', '#ff6b6b'] : ['#ffd700', '#ff8f00'];
    const count = rarity === 'sss' ? 30 : 15;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = 4 + Math.random() * 6;
            const angle = (360 / count) * i;
            const distance = 80 + Math.random() * 60;
            particle.style.cssText = `width: ${size}px; height: ${size}px; background: ${colors[Math.floor(Math.random() * colors.length)]}; left: 50%; top: 50%; --tx: ${Math.cos(angle * Math.PI / 180) * distance}px; --ty: ${Math.sin(angle * Math.PI / 180) * distance}px;`;
            card.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }, i * 20);
    }
}
function createSSLightBeams() {
    const overlay = document.getElementById('drawOverlay');
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const beam = document.createElement('div');
            beam.className = 'ss-light-beam';
            beam.style.left = (Math.random() * 100) + '%';
            beam.style.animationDelay = (Math.random() * 0.3) + 's';
            overlay.appendChild(beam);
            setTimeout(() => beam.remove(), 2000);
        }, i * 100);
    }
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'ss-star';
            star.style.left = (Math.random() * 100) + '%';
            star.style.top = (Math.random() * 100) + '%';
            star.style.animationDelay = (Math.random() * 0.5) + 's';
            overlay.appendChild(star);
            setTimeout(() => star.remove(), 2500);
        }, i * 80);
    }
}
function createSSSFlash() {
    const overlay = document.getElementById('drawOverlay');
    const flash = document.createElement('div');
    flash.className = 'sss-flash';
    overlay.appendChild(flash);
    setTimeout(() => flash.remove(), 800);
    setTimeout(() => {
        const flash2 = document.createElement('div');
        flash2.className = 'sss-flash';
        flash2.style.background = 'radial-gradient(circle at center, rgba(255,215,0,0.5) 0%, rgba(255,82,82,0.3) 40%, transparent 80%)';
        overlay.appendChild(flash2);
        setTimeout(() => flash2.remove(), 800);
    }, 300);
}
function updateCollection() {
    const container = document.getElementById('collectionContent');
    container.innerHTML = '';
    let count = 0;
    rarityOrder.forEach(rarity => {
        skins[rarity].forEach((skin, index) => {
            const key = `${rarity}_${index}`;
            const item = document.createElement('div');
            item.className = 'collection-item';
            if (gameData.collected[key]) {
                item.classList.add('collected', rarity);
                item.innerHTML = `<div class="item-icon">${skin.icon}</div><div class="item-name">${skin.name}</div>`;
                count++;
            } else {
                item.innerHTML = `<div class="item-icon">❓</div><div class="item-name">未获得</div>`;
            }
            container.appendChild(item);
        });
    });
    document.getElementById('collectedCount').textContent = count;
    document.getElementById('charmDisplay').textContent = gameData.charm;
}
function updateStats() {
    rarityOrder.forEach(rarity => {
        const c = gameData.stats[rarity];
        const p = gameData.totalDraws > 0 ? ((c / gameData.totalDraws) * 100).toFixed(1) : 0;
        document.getElementById(`${rarity}Count`).textContent = c;
        document.getElementById(`${rarity}Percent`).textContent = `${p}%`;
    });
}
function toggleSection(id) { document.getElementById(id).classList.toggle('hidden'); }
function showMessage(text, type) {
    const existing = document.querySelector('.message');
    if (existing) existing.remove();
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.textContent = text;
    document.querySelector('.container').insertBefore(msg, document.querySelector('.quiz-entry'));
    setTimeout(() => msg.remove(), 2000);
}

// ===== 蛋币奖励领取（密码验证） =====
function claimBonus(type) {
    pendingBonusType = type;
    document.getElementById('passwordModal').classList.add('active');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('passwordInput').focus();
}
function verifyPassword() {
    const input = document.getElementById('passwordInput').value;
    if (input === BONUS_PASSWORD) {
        const bonus = BONUS_CONFIG[pendingBonusType];
        gameData.coins += bonus.coins;
        saveGameData();
        updateDisplay();
        closePasswordModal();
        showResult(bonus.icon, `${bonus.name}完成！`, `获得奖励`, `+${bonus.coins} 蛋币`, '密码验证成功！');
    } else {
        document.getElementById('passwordError').style.display = 'block';
        document.getElementById('passwordInput').value = '';
    }
}
function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('active');
    pendingBonusType = null;
}

// ===== 魅力值兑换 =====
function showExchangeModal() {
    document.getElementById('exchangeModal').classList.add('active');
    updateExchangeDisplay();
    renderGiftList();
}
function closeExchangeModal() {
    document.getElementById('exchangeModal').classList.remove('active');
}
function updateExchangeDisplay() {
    const yuan = Math.floor(gameData.charm / 100);
    document.getElementById('exchangeAmount').textContent = yuan;
    document.getElementById('exchangeCharm').textContent = gameData.charm;
    document.getElementById('exchangeYuan').textContent = yuan;
}
function renderGiftList() {
    const container = document.getElementById('giftList');
    container.innerHTML = '';
    giftList.forEach(gift => {
        const canExchange = Math.floor(gameData.charm / 100) >= gift.price;
        const item = document.createElement('div');
        item.style.cssText = `padding: 20px; background: ${canExchange ? 'linear-gradient(135deg, #f8f9fa, #e9ecef)' : '#f0f0f0'}; border-radius: 15px; text-align: center; transition: all 0.3s;`;
        item.innerHTML = `
            <div style="font-size: 40px;">${gift.icon}</div>
            <div style="font-size: 16px; font-weight: bold; margin-top: 10px; color: #333;">${gift.name}</div>
            <div style="font-size: 14px; color: #666; margin-top: 5px;">¥${gift.price}</div>
            <button onclick="exchangeGift('${gift.name}', ${gift.price})" style="margin-top: 15px; padding: 10px 25px; background: ${canExchange ? 'linear-gradient(135deg, #e879f9, #c026d3)' : '#ccc'}; color: white; border: none; border-radius: 8px; cursor: ${canExchange ? 'pointer' : 'not-allowed'}; font-size: 13px;" ${canExchange ? '' : 'disabled'}>${canExchange ? '兑换' : '魅力不足'}</button>
        `;
        container.appendChild(item);
    });
}
function exchangeGift(name, price) {
    const yuan = Math.floor(gameData.charm / 100);
    if (yuan < price) { showMessage('魅力值不足，无法兑换', 'error'); return; }
    pendingGift = { name, price, charmCost: price * 100 };
    const gift = giftList.find(g => g.name === name);
    document.getElementById('confirmGiftIcon').textContent = gift ? gift.icon : '🎁';
    document.getElementById('confirmGiftName').textContent = name;
    document.getElementById('confirmCharmCost').textContent = pendingGift.charmCost;
    document.getElementById('confirmExchangeModal').classList.add('active');
}
function confirmExchange() {
    if (!pendingGift) return;
    gameData.charm -= pendingGift.charmCost;
    saveGameData();
    updateDisplay();
    updateExchangeDisplay();
    renderGiftList();
    closeConfirmExchange();
    // 不关闭礼品列表弹窗，用户关闭结果弹窗后返回礼品列表
    showResult('🎁', '兑换成功！', `兑换: ${pendingGift.name}`, `消耗 ${pendingGift.charmCost} 魅力值`, '请在现实中领取礼品~');
    pendingGift = null;
}
function closeConfirmExchange() {
    document.getElementById('confirmExchangeModal').classList.remove('active');
    pendingGift = null;
}

init();