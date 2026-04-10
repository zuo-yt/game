// ===== 音效系统 =====
let audioCtx = null;

// 初始化音频上下文（需要在用户交互后调用）
function initAudioContext() {
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.log('AudioContext not supported');
        }
    }
    // 微信浏览器需要 resume
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// 用户首次交互时初始化音频
document.addEventListener('touchstart', initAudioContext, { once: true });
document.addEventListener('click', initAudioContext, { once: true });

function playDrawSound() {
    if (!audioCtx) return;
    try {
        // 抽卡音效 - 短促的魔法音
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {}
}
function playFlipSound() {
    if (!audioCtx) return;
    try {
        // 翻卡音效 - 真实翻书声
        const now = audioCtx.currentTime;

        // 1. 纸页拍打声 - 轻柔的"扑"（低频噪声脉冲）
        const flapBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.04, audioCtx.sampleRate);
        const flapData = flapBuffer.getChannelData(0);
        for (let i = 0; i < flapData.length; i++) {
            // 低频噪声，模拟纸页拍打
            const t = i / flapData.length;
            flapData[i] = (Math.random() * 2 - 1) * Math.sin(t * Math.PI * 2) * Math.exp(-t * 15);
        }
        const flapSource = audioCtx.createBufferSource();
        flapSource.buffer = flapBuffer;
        const flapFilter = audioCtx.createBiquadFilter();
        flapFilter.type = 'lowpass';
        flapFilter.frequency.value = 800;
        const flapGain = audioCtx.createGain();
        flapGain.gain.setValueAtTime(0.25, now);
        flapGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
        flapSource.connect(flapFilter);
        flapFilter.connect(flapGain);
        flapGain.connect(audioCtx.destination);
        flapSource.start(now);
        flapSource.stop(now + 0.04);

        // 2. 纸张摩擦声 - 翻页过程的质感（主要音色）
        const rustleBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.15, audioCtx.sampleRate);
        const rustleData = rustleBuffer.getChannelData(0);
        for (let i = 0; i < rustleData.length; i++) {
            // 带调制的噪声，模拟纸张摩擦的不均匀质感
            const t = i / rustleData.length;
            const envelope = Math.sin(t * Math.PI) * Math.exp(-t * 3); // 中间强，两端弱
            rustleData[i] = (Math.random() * 2 - 1) * envelope * 0.4;
        }
        const rustleSource = audioCtx.createBufferSource();
        rustleSource.buffer = rustleBuffer;
        const rustleFilter = audioCtx.createBiquadFilter();
        rustleFilter.type = 'bandpass';
        rustleFilter.frequency.setValueAtTime(1500, now);
        rustleFilter.frequency.linearRampToValueAtTime(3000, now + 0.08);
        rustleFilter.Q.value = 1.5;
        const rustleGain = audioCtx.createGain();
        rustleGain.gain.setValueAtTime(0, now);
        rustleGain.gain.linearRampToValueAtTime(0.18, now + 0.02);
        rustleGain.gain.setValueAtTime(0.18, now + 0.08);
        rustleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        rustleSource.connect(rustleFilter);
        rustleFilter.connect(rustleGain);
        rustleGain.connect(audioCtx.destination);
        rustleSource.start(now);
        rustleSource.stop(now + 0.15);

        // 3. 书页落定声 - 翻页结束的轻微"啪"
        const settleBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.03, audioCtx.sampleRate);
        const settleData = settleBuffer.getChannelData(0);
        for (let i = 0; i < settleData.length; i++) {
            const t = i / settleData.length;
            settleData[i] = (Math.random() * 2 - 1) * Math.exp(-t * 20) * 0.3;
        }
        const settleSource = audioCtx.createBufferSource();
        settleSource.buffer = settleBuffer;
        const settleFilter = audioCtx.createBiquadFilter();
        settleFilter.type = 'lowpass';
        settleFilter.frequency.value = 600;
        const settleGain = audioCtx.createGain();
        settleGain.gain.setValueAtTime(0.15, now + 0.12);
        settleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        settleSource.connect(settleFilter);
        settleFilter.connect(settleGain);
        settleGain.connect(audioCtx.destination);
        settleSource.start(now + 0.12);
        settleSource.stop(now + 0.15);
    } catch(e) {}
}
function playRareSound(rarity) {
    if (!audioCtx) return;
    try {
        // 高稀有度音效 - 喜庆庆祝音效
        const now = audioCtx.currentTime;

    if (rarity === 'sss') {
        // SSS级 - 盛大庆典音效（约2秒）
        // 1. 开场号角 - 宏大开场
        const fanfareOsc = audioCtx.createOscillator();
        const fanfareGain = audioCtx.createGain();
        fanfareOsc.type = 'triangle';
        fanfareOsc.frequency.setValueAtTime(400, now);
        fanfareOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
        fanfareGain.gain.setValueAtTime(0.3, now);
        fanfareGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        fanfareOsc.connect(fanfareGain);
        fanfareGain.connect(audioCtx.destination);
        fanfareOsc.start(now);
        fanfareOsc.stop(now + 0.2);

        // 2. 主和弦序列 - 节日彩铃感（五音递进）
        const melodyNotes = [523, 659, 784, 1047, 1319]; // C-E-G-C'-E' 大和弦
        melodyNotes.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            const startTime = now + 0.2 + i * 0.15;
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
            gain.gain.setValueAtTime(0.25, startTime + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.18);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.18);
        });

        // 3. 高频闪烁层 - 魔法星光感
        for (let i = 0; i < 8; i++) {
            const sparkleOsc = audioCtx.createOscillator();
            const sparkleGain = audioCtx.createGain();
            sparkleOsc.type = 'sine';
            const startTime = now + 0.3 + i * 0.12;
            sparkleOsc.frequency.setValueAtTime(1500 + Math.random() * 500, startTime);
            sparkleGain.gain.setValueAtTime(0, startTime);
            sparkleGain.gain.linearRampToValueAtTime(0.08, startTime + 0.01);
            sparkleGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
            sparkleOsc.connect(sparkleGain);
            sparkleGain.connect(audioCtx.destination);
            sparkleOsc.start(startTime);
            sparkleOsc.stop(startTime + 0.1);
        }

        // 4. 收尾余音 - 华丽渐弱
        const finalOsc = audioCtx.createOscillator();
        const finalGain = audioCtx.createGain();
        finalOsc.type = 'sine';
        finalOsc.frequency.setValueAtTime(800, now + 1);
        finalOsc.frequency.exponentialRampToValueAtTime(400, now + 1.8);
        finalGain.gain.setValueAtTime(0.15, now + 1);
        finalGain.gain.exponentialRampToValueAtTime(0.01, now + 1.8);
        finalOsc.connect(finalGain);
        finalGain.connect(audioCtx.destination);
        finalOsc.start(now + 1);
        finalOsc.stop(now + 1.8);

    } else if (rarity === 'ss') {
        // SS级 - 华丽庆祝音效（约1秒）
        // 1. 开场短号角
        const introOsc = audioCtx.createOscillator();
        const introGain = audioCtx.createGain();
        introOsc.type = 'triangle';
        introOsc.frequency.setValueAtTime(500, now);
        introOsc.frequency.exponentialRampToValueAtTime(900, now + 0.1);
        introGain.gain.setValueAtTime(0.25, now);
        introGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        introOsc.connect(introGain);
        introGain.connect(audioCtx.destination);
        introOsc.start(now);
        introOsc.stop(now + 0.15);

        // 2. 主和弦三连音（节日感）
        const chordNotes = [523, 659, 784]; // C-E-G
        chordNotes.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            const startTime = now + 0.15 + i * 0.12;
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.2, startTime);
            gain.gain.setValueAtTime(0.2, startTime + 0.06);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.15);
        });

        // 3. 高频闪烁点缀
        for (let i = 0; i < 4; i++) {
            const sparkleOsc = audioCtx.createOscillator();
            const sparkleGain = audioCtx.createGain();
            sparkleOsc.type = 'sine';
            const startTime = now + 0.2 + i * 0.15;
            sparkleOsc.frequency.setValueAtTime(1800 + i * 100, startTime);
            sparkleGain.gain.setValueAtTime(0.06, startTime);
            sparkleGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
            sparkleOsc.connect(sparkleGain);
            sparkleGain.connect(audioCtx.destination);
            sparkleOsc.start(startTime);
            sparkleOsc.stop(startTime + 0.1);
        }

        // 4. 收尾余音
        const endOsc = audioCtx.createOscillator();
        const endGain = audioCtx.createGain();
        endOsc.type = 'sine';
        endOsc.frequency.setValueAtTime(600, now + 0.6);
        endOsc.frequency.exponentialRampToValueAtTime(300, now + 0.95);
        endGain.gain.setValueAtTime(0.12, now + 0.6);
        endGain.gain.exponentialRampToValueAtTime(0.01, now + 0.95);
        endOsc.connect(endGain);
        endGain.connect(audioCtx.destination);
        endOsc.start(now + 0.6);
        endOsc.stop(now + 0.95);

    } else if (rarity === 's') {
        // S级 - 小庆祝音效（约0.6秒）
        // 1. 开场短促上扬
        const introOsc = audioCtx.createOscillator();
        const introGain = audioCtx.createGain();
        introOsc.type = 'triangle';
        introOsc.frequency.setValueAtTime(400, now);
        introOsc.frequency.exponentialRampToValueAtTime(700, now + 0.08);
        introGain.gain.setValueAtTime(0.2, now);
        introGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        introOsc.connect(introGain);
        introGain.connect(audioCtx.destination);
        introOsc.start(now);
        introOsc.stop(now + 0.12);

        // 2. 双音和弦（简洁庆祝感）
        [523, 659].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            const startTime = now + 0.12 + i * 0.08;
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.18, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.12);
        });

        // 3. 小尾音
        const tailOsc = audioCtx.createOscillator();
        const tailGain = audioCtx.createGain();
        tailOsc.type = 'sine';
        tailOsc.frequency.setValueAtTime(500, now + 0.35);
        tailOsc.frequency.exponentialRampToValueAtTime(300, now + 0.58);
        tailGain.gain.setValueAtTime(0.1, now + 0.35);
        tailGain.gain.exponentialRampToValueAtTime(0.01, now + 0.58);
        tailOsc.connect(tailGain);
        tailGain.connect(audioCtx.destination);
        tailOsc.start(now + 0.35);
        tailOsc.stop(now + 0.58);
    }
    } catch(e) {}
}

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
const charmValues = { c: 1, b: 5, a: 20, s: 100, ss: 250, sss: 1000 };

// ===== 礼品列表 =====
const giftList = [
    { name: '1元代金券', price: 1, image: 'images/voucher-1.png' },
    { name: '5元代金券', price: 5, image: 'images/voucher-5.png' },
    { name: '10元代金券', price: 10, image: 'images/voucher-10.png' },
    { name: '20元代金券', price: 20, image: 'images/voucher-20.png' },
    { name: '50元代金券', price: 50, image: 'images/voucher-50.png' },
    { name: '100元代金券', price: 100, image: 'images/voucher-100.png' },
    { name: '蛋仔盲盒', price: 69.8, image: 'images/blindbox.png' },
    { name: '尖叫饮料', price: 5, image: 'images/drink.png' },
    { name: '烤冷面', price: 6, image: 'images/noodles.png' },
    { name: '西瓜', price: 20, image: 'images/watermelon.png' },
    { name: '头饰', price: 10, image: 'images/hairpin.png' },
    { name: '上衣', price: 100, image: 'images/shirt.png' },
    { name: '裤子', price: 100, image: 'images/pants.png' },
    { name: '鞋子', price: 100, image: 'images/shoes.png' },
    { name: '糖果', price: 10, image: 'images/candy.png' }
];

// ===== 密码和奖励配置 =====
const BONUS_PASSWORD = '20190101';
const BONUS_CONFIG = {
    hair: { coins: 500, name: '洗头', icon: '💇' },
    bath: { coins: 1000, name: '洗澡', icon: '🛁' },
    clean: { coins: 100, name: '打扫', icon: '🧹' }
};
let pendingBonusType = null;

// ===== 语文字库难度分级（各级别独立，无重叠）=====
// 1-5画汉字（300字）：基础高频单字，覆盖数字、方位、人体、自然等核心场景
const pinyinEasy = {
    // 1画（2字）
    '一': 'yī', '乙': 'yǐ',
    // 2画（24字）
    '二': 'èr', '十': 'shí', '卜': 'bǔ', '八': 'bā', '人': 'rén', '入': 'rù', '儿': 'ér', '几': 'jǐ', '九': 'jiǔ', '力': 'lì',
    '刀': 'dāo', '又': 'yòu', '乃': 'nǎi', '丁': 'dīng', '厂': 'chǎng', '卜': 'bo', '七': 'qī', '刁': 'diāo', '了': 'le', '乜': 'miē',
    '八': 'bā', '匕': 'bǐ', '卜': 'bǔ', '乂': 'yì',
    // 3画（50字）
    '三': 'sān', '上': 'shàng', '下': 'xià', '口': 'kǒu', '土': 'tǔ', '士': 'shì', '夕': 'xī', '大': 'dà', '女': 'nǚ', '子': 'zǐ',
    '寸': 'cùn', '小': 'xiǎo', '山': 'shān', '川': 'chuān', '工': 'gōng', '己': 'jǐ', '已': 'yǐ', '巳': 'sì', '巾': 'jīn', '千': 'qiān',
    '乞': 'qǐ', '万': 'wàn', '丈': 'zhàng', '三': 'sān', '丸': 'wán', '凡': 'fán', '亡': 'wáng', '门': 'mén', '广': 'guǎng', '弓': 'gōng',
    '子': 'zǐ', '也': 'yě', '飞': 'fēi', '习': 'xí', '马': 'mǎ', '幺': 'yāo', '久': 'jiǔ', '及': 'jí', '个': 'gè', '义': 'yì',
    '之': 'zhī', '尸': 'shī', '亏': 'kuī', '与': 'yǔ', '才': 'cái', '叉': 'chā', '士': 'shì', '弋': 'yì', '于': 'yú', '亏': 'kuī',
    // 4画（100字）
    '丰': 'fēng', '王': 'wáng', '木': 'mù', '五': 'wǔ', '少': 'shǎo', '太': 'tài', '天': 'tiān', '夫': 'fū', '元': 'yuán', '无': 'wú',
    '云': 'yún', '专': 'zhuān', '扎': 'zhā', '艺': 'yì', '木': 'mù', '支': 'zhī', '不': 'bù', '犬': 'quǎn', '歹': 'dǎi', '车': 'chē',
    '牙': 'yá', '比': 'bǐ', '互': 'hù', '切': 'qiē', '瓦': 'wǎ', '止': 'zhǐ', '日': 'rì', '中': 'zhōng', '贝': 'bèi', '内': 'nèi',
    '水': 'shuǐ', '见': 'jiàn', '午': 'wǔ', '牛': 'niú', '手': 'shǒu', '毛': 'máo', '气': 'qì', '壬': 'rén', '升': 'shēng', '长': 'cháng',
    '仁': 'rén', '什': 'shén', '片': 'piàn', '仆': 'pú', '化': 'huà', '仇': 'chóu', '币': 'bì', '仍': 'réng', '仅': 'jǐn', '斤': 'jīn',
    '爪': 'zhǎo', '反': 'fǎn', '介': 'jiè', '父': 'fù', '勿': 'wù', '匀': 'yún', '勾': 'gōu', '欠': 'qiàn', '风': 'fēng', '丹': 'dān',
    '卞': 'biàn', '文': 'wén', '方': 'fāng', '火': 'huǒ', '斗': 'dòu', '户': 'hù', '心': 'xīn', '尹': 'yǐn', '尺': 'chǐ', '丑': 'chǒu',
    '巴': 'bā', '办': 'bàn', '予': 'yǔ', '书': 'shū', '毋': 'wú', '双': 'shuāng', '幻': 'huàn', '邓': 'dèng', '队': 'duì', '凤': 'fèng',
    '孔': 'kǒng', '巴': 'bā', '斤': 'jīn', '厄': 'è', '引': 'yǐn', '允': 'yǔn', '友': 'yǒu', '尤': 'yóu', '匹': 'pǐ', '巴': 'bā',
    '孔': 'kǒng', '少': 'shào', '区': 'qū', '专': 'zhuān', '历': 'lì', '友': 'yǒu', '仁': 'rén', '元': 'yuán', '木': 'mù', '王': 'wáng',
    // 5画（124字，补足300字）
    '玉': 'yù', '末': 'mò', '未': 'wèi', '示': 'shì', '甘': 'gān', '世': 'shì', '古': 'gǔ', '节': 'jié', '本': 'běn', '术': 'shù',
    '可': 'kě', '丙': 'bǐng', '左': 'zuǒ', '厉': 'lì', '石': 'shí', '右': 'yòu', '布': 'bù', '龙': 'lóng', '平': 'píng', '灭': 'miè',
    '打': 'dǎ', '东': 'dōng', '巧': 'qiǎo', '扑': 'pū', '北': 'běi', '卡': 'kǎ', '扔': 'rēng', '占': 'zhàn', '业': 'yè', '旧': 'jiù',
    '帅': 'shuài', '归': 'guī', '且': 'qiě', '旦': 'dàn', '目': 'mù', '叶': 'yè', '甲': 'jiǎ', '申': 'shēn', '叮': 'dīng', '电': 'diàn',
    '号': 'hào', '田': 'tián', '由': 'yóu', '史': 'shǐ', '只': 'zhī', '央': 'yāng', '兄': 'xiōng', '叼': 'diāo', '叫': 'jiào', '另': 'lìng',
    '叨': 'dāo', '叹': 'tàn', '四': 'sì', '生': 'shēng', '失': 'shī', '禾': 'hé', '丘': 'qiū', '付': 'fù', '仗': 'zhàng', '代': 'dài',
    '仙': 'xiān', '们': 'men', '仪': 'yí', '白': 'bái', '仔': 'zǎi', '他': 'tā', '斥': 'chì', '瓜': 'guā', '乎': 'hū', '丛': 'cóng',
    '令': 'lìng', '用': 'yòng', '甩': 'shuǎi', '印': 'yìn', '乐': 'lè', '句': 'jù', '匆': 'cōng', '册': 'cè', '犯': 'fàn', '外': 'wài',
    '处': 'chù', '冬': 'dōng', '鸟': 'niǎo', '务': 'wù', '包': 'bāo', '饥': 'jī', '主': 'zhǔ', '市': 'shì', '立': 'lì', '闪': 'shǎn',
    '兰': 'lán', '半': 'bàn', '汁': 'zhī', '汇': 'huì', '头': 'tóu', '汉': 'hàn', '宁': 'níng', '穴': 'xué', '它': 'tā', '讨': 'tǎo',
    '写': 'xiě', '让': 'ràng', '礼': 'lǐ', '训': 'xùn', '议': 'yì', '讯': 'xùn', '出': 'chū', '奶': 'nǎi', '奴': 'nú', '加': 'jiā',
    '召': 'zhào', '皮': 'pí', '边': 'biān', '发': 'fā', '孕': 'yùn', '圣': 'shèng', '对': 'duì', '台': 'tái', '矛': 'máo', '纠': 'jiū',
    '母': 'mǔ', '幼': 'yòu', '丝': 'sī', '辽': 'liáo', '奶': 'nǎi', '击': 'jī', '正': 'zhèng', '扒': 'bā', '扑': 'pū', '扒': 'pá',
    '去': 'qù', '甘': 'gān', '世': 'shì', '古': 'gǔ', '石': 'shí', '布': 'bù', '平': 'píng', '灭': 'miè', '左': 'zuǒ', '右': 'yòu',
    '卡': 'qiǎ', '占': 'zhàn', '业': 'yè', '旧': 'jiù', '旦': 'dàn', '目': 'mù', '叶': 'yè', '申': 'shēn', '叮': 'dīng', '电': 'diàn'
};

// 6-10画汉字（300字）：扩展常用字，覆盖生活、学习、交通等场景
const pinyinNormal = {
    // 6画（60字）
    '匡': 'kuāng', '邦': 'bāng', '邢': 'xíng', '邪': 'xié', '尧': 'yáo', '则': 'zé', '刚': 'gāng', '网': 'wǎng', '肉': 'ròu', '年': 'nián',
    '朱': 'zhū', '先': 'xiān', '丢': 'diū', '舌': 'shé', '竹': 'zhú', '迁': 'qiān', '乔': 'qiáo', '伟': 'wěi', '传': 'chuán', '乒': 'pīng',
    '乓': 'pāng', '休': 'xiū', '伍': 'wǔ', '伏': 'fú', '优': 'yōu', '伐': 'fá', '延': 'yán', '件': 'jiàn', '任': 'rèn', '伤': 'shāng',
    '价': 'jià', '份': 'fèn', '华': 'huá', '仰': 'yǎng', '仿': 'fǎng', '伙': 'huǒ', '伪': 'wěi', '自': 'zì', '血': 'xuè', '向': 'xiàng',
    '似': 'sì', '后': 'hòu', '行': 'xíng', '舟': 'zhōu', '全': 'quán', '会': 'huì', '杀': 'shā', '合': 'hé', '兆': 'zhào', '企': 'qǐ',
    '众': 'zhòng', '爷': 'yé', '伞': 'sǎn', '创': 'chuàng', '肌': 'jī', '朵': 'duǒ', '杂': 'zá', '危': 'wēi', '旬': 'xún', '旨': 'zhǐ',
    // 7画（60字）
    '麦': 'mài', '玖': 'jiǔ', '玛': 'mǎ', '形': 'xíng', '进': 'jìn', '戒': 'jiè', '吞': 'tūn', '远': 'yuǎn', '违': 'wéi', '韧': 'rèn',
    '韧': 'rèn', '运': 'yùn', '扶': 'fú', '抚': 'fǔ', '坛': 'tán', '技': 'jì', '坏': 'huài', '扰': 'rǎo', '拒': 'jù', '找': 'zhǎo',
    '批': 'pī', '扳': 'bān', '扮': 'bàn', '抢': 'qiǎng', '孝': 'xiào', '均': 'jūn', '抛': 'pāo', '投': 'tóu', '坟': 'fén', '抗': 'kàng',
    '坊': 'fāng', '抖': 'dǒu', '护': 'hù', '壳': 'ké', '志': 'zhì', '扭': 'niǔ', '块': 'kuài', '声': 'shēng', '把': 'bǎ', '报': 'bào',
    '拟': 'nǐ', '却': 'què', '抒': 'shū', '劫': 'jié', '芙': 'fú', '芜': 'wú', '苇': 'wěi', '芽': 'yá', '花': 'huā', '芹': 'qín',
    '芬': 'fēn', '苍': 'cāng', '芳': 'fāng', '严': 'yán', '芦': 'lú', '克': 'kè', '苏': 'sū', '杆': 'gān', '杠': 'gàng', '杜': 'dù',
    // 8画（60字）
    '玩': 'wán', '环': 'huán', '青': 'qīng', '现': 'xiàn', '表': 'biǎo', '规': 'guī', '抹': 'mǒ', '拢': 'lǒng', '拔': 'bá', '拣': 'jiǎn',
    '担': 'dān', '坦': 'tǎn', '抽': 'chōu', '拐': 'guǎi', '拖': 'tuō', '拍': 'pāi', '者': 'zhě', '顶': 'dǐng', '拆': 'chāi', '拎': 'līn',
    '幸': 'xìng', '坡': 'pō', '坦': 'tǎn', '披': 'pī', '抬': 'tái', '抵': 'dǐ', '抱': 'bào', '抿': 'mǐn', '抹': 'mǒ', '抽': 'chōu',
    '招': 'zhāo', '拜': 'bài', '拢': 'lǒng', '拣': 'jiǎn', '放': 'fàng', '斧': 'fǔ', '欣': 'xīn', '杯': 'bēi', '杵': 'chǔ', '枚': 'méi',
    '板': 'bǎn', '松': 'sōng', '杭': 'háng', '枋': 'fāng', '构': 'gòu', '析': 'xī', '林': 'lín', '枚': 'méi', '果': 'guǒ', '枝': 'zhī',
    '枞': 'cōng', '枢': 'shū', '枣': 'zǎo', '枫': 'fēng', '枭': 'xiāo', '柜': 'guì', '枰': 'píng', '枳': 'zhǐ', '拐': 'guǎi', '架': 'jià',
    // 9画（60字）
    '珊': 'shān', '珐': 'fà', '珍': 'zhēn', '玲': 'líng', '珉': 'mín', '玻': 'bō', '毒': 'dú', '型': 'xíng', '拭': 'shì', '挂': 'guà',
    '封': 'fēng', '持': 'chí', '拷': 'kǎo', '拱': 'gǒng', '项': 'xiàng', '垮': 'kuǎ', '挎': 'kuà', '城': 'chéng', '挠': 'náo', '政': 'zhèng',
    '赴': 'fù', '赵': 'zhào', '挡': 'dǎng', '拽': 'zhuài', '挺': 'tǐng', '括': 'kuò', '拾': 'shí', '指': 'zhǐ', '按': 'àn', '持': 'chí',
    '挎': 'kuà', '建': 'jiàn', '哇': 'wā', '哈': 'hā', '炭': 'tàn', '罚': 'fá', '咫': 'zhǐ', '怎': 'zěn', '牲': 'shēng', '选': 'xuǎn',
    '适': 'shì', '秒': 'miǎo', '香': 'xiāng', '种': 'zhǒng', '秋': 'qiū', '科': 'kē', '重': 'zhòng', '竿': 'gān', '段': 'duàn', '便': 'biàn',
    '俩': 'liǎ', '贷': 'dài', '顺': 'shùn', '修': 'xiū', '保': 'bǎo', '促': 'cù', '俄': 'é', '侮': 'wǔ', '俭': 'jiǎn', '俗': 'sú',
    // 10画（60字，补足300字）
    '艳': 'yàn', '袁': 'yuán', '哥': 'gē', '鬲': 'gé', '孬': 'nāo', '套': 'tào', '乘': 'chéng', '匿': 'nì', '顽': 'wán', '赶': 'gǎn',
    '进': 'jìn', '过': 'guò', '起': 'qǐ', '盐': 'yán', '眠': 'mián', '眬': 'lóng', '眛': 'mèi', '真': 'zhēn', '眠': 'mián', '砧': 'zhēn',
    '破': 'pò', '砥': 'dǐ', '砟': 'zhǎ', '砧': 'zhēn', '砩': 'fú', '砌': 'qì', '砷': 'shēn', '砸': 'zá', '砰': 'pēng', '砝': 'fǎ',
    '砸': 'zá', '栖': 'qī', '桎': 'zhì', '桠': 'yā', '桡': 'ráo', '桢': 'zhēn', '档': 'dàng', '桤': 'qī', '桥': 'qiáo', '桦': 'huà',
    '桧': 'guì', '桨': 'jiǎng', '桩': 'zhuāng', '梃': 'tǐng', '梆': 'bāng', '桉': 'ān', '栩': 'xǔ', '栗': 'lì', '枸': 'gǒu', '栖': 'qī',
    '柴': 'chái', '桌': 'zhuō', '桎': 'zhì', '桐': 'tóng', '桑': 'sāng', '桓': 'huán', '桔': 'jú', '桠': 'yā', '桂': 'guì', '桃': 'táo'
};

// 10画以上汉字（300字）：进阶字，覆盖科技、商业、法律、艺术等场景
const pinyinHard = {
    // 11画（60字）
    '球': 'qiú', '理': 'lǐ', '捧': 'pěng', '堵': 'dǔ', '堆': 'duī', '描': 'miáo', '域': 'yù', '掩': 'yǎn', '捷': 'jié', '排': 'pái',
    '掉': 'diào', '推': 'tuī', '接': 'jiē', '控': 'kòng', '掷': 'zhì', '掸': 'dǎn', '掺': 'chān', '掼': 'guàn', '授': 'shòu', '探': 'tàn',
    '掘': 'jué', '接': 'jiē', '教': 'jiào', '娶': 'qǔ', '娶': 'qǔ', '基': 'jī', '坚': 'jiān', '堆': 'duī', '堂': 'táng', '堵': 'dǔ',
    '堆': 'duī', '硕': 'shuò', '硖': 'xiá', '硗': 'qiāo', '硙': 'wèi', '硒': 'xī', '硎': 'xíng', '硕': 'shuò', '硐': 'dòng', '硅': 'guī',
    '硪': 'wò', '硖': 'xiá', '杆': 'gǎn', '桶': 'tǒng', '梾': 'lái', '梓': 'zǐ', '梗': 'gěng', '梿': 'lián', '梢': 'shāo', '梅': 'méi',
    '栀': 'zhī', '检': 'jiǎn', '棂': 'líng', '梳': 'shū', '梵': 'fàn', '梏': 'gù', '梓': 'zǐ', '梗': 'gěng', '梢': 'shāo', '梦': 'mèng',
    // 12画（60字）
    '掰': 'bāi', '接': 'jiē', '提': 'tí', '敞': 'chǎng', '散': 'sàn', '敦': 'dūn', '敢': 'gǎn', '敬': 'jìng', '棘': 'jí', '暂': 'zàn',
    '拟': 'nǐ', '确': 'què', '硫': 'liú', '确': 'què', '雁': 'yàn', '殖': 'zhí', '裂': 'liè', '雄': 'xióng', '厨': 'chú', '确': 'què',
    '暂': 'zàn', '琼': 'qióng', '斑': 'bān', '替': 'tì', '款': 'kuǎn', '堪': 'kān', '搭': 'dā', '塔': 'tǎ', '越': 'yuè', '趁': 'chèn',
    '趋': 'qū', '超': 'chāo', '提': 'tí', '堤': 'dī', '博': 'bó', '揭': 'jiē', '喜': 'xǐ', '彭': 'péng', '揣': 'chuāi', '插': 'chā',
    '揪': 'jiū', '搜': 'sōu', '煮': 'zhǔ', '援': 'yuán', '搀': 'chān', '搁': 'gē', '搓': 'cuō', '搅': 'jiǎo', '握': 'wò', '搔': 'sāo',
    '揉': 'róu', '斯': 'sī', '期': 'qī', '欺': 'qī', '联': 'lián', '散': 'sàn', '惹': 'rě', '葬': 'zàng', '葛': 'gé', '董': 'dǒng',
    // 13画（60字）
    '瑞': 'ruì', '搜': 'sōu', '搞': 'gǎo', '想': 'xiǎng', '愚': 'yú', '盟': 'méng', '歇': 'xiē', '暗': 'àn', '照': 'zhào', '跨': 'kuà',
    '跳': 'tiào', '跪': 'guì', '路': 'lù', '跳': 'tiào', '跟': 'gēn', '跺': 'duò', '跪': 'guì', '跤': 'jiāo', '跨': 'kuà', '搬': 'bān',
    '摇': 'yáo', '搞': 'gǎo', '提': 'tí', '斟': 'zhēn', '蒜': 'suàn', '勤': 'qín', '蓝': 'lán', '献': 'xiàn', '楠': 'nán', '楔': 'xiē',
    '椿': 'chūn', '楷': 'kǎi', '榄': 'lǎn', '想': 'xiǎng', '歇': 'xiē', '暗': 'àn', '照': 'zhào', '跨': 'kuà', '跳': 'tiào', '跪': 'guì',
    '碗': 'wǎn', '雷': 'léi', '零': 'líng', '雾': 'wù', '雹': 'báo', '输': 'shū', '督': 'dū', '龄': 'líng', '鉴': 'jiàn', '睛': 'jīng',
    '睡': 'shuì', '睬': 'cǎi', '鄙': 'bǐ', '愚': 'yú', '暖': 'nuǎn', '盟': 'méng', '歇': 'xiē', '暗': 'àn', '照': 'zhào', '跨': 'kuà',
    // 14画（60字）
    '碧': 'bì', '墙': 'qiáng', '撇': 'piě', '嘉': 'jiā', '摧': 'cuī', '截': 'jié', '誓': 'shì', '境': 'jìng', '摘': 'zhāi', '摔': 'shuāi',
    '摔': 'shuāi', '愿': 'yuàn', '需': 'xū', '弊': 'bì', '裳': 'shang', '颗': 'kē', '嗽': 'sòu', '蜻': 'qīng', '蜡': 'là', '蝇': 'yíng',
    '蜘': 'zhī', '幔': 'màn', '遭': 'zāo', '酷': 'kù', '酿': 'niàng', '酸': 'suān', '磁': 'cí', '愿': 'yuàn', '需': 'xū', '弊': 'bì',
    '裳': 'shang', '颗': 'kē', '嗽': 'sòu', '蜻': 'qīng', '蜡': 'là', '蝇': 'yíng', '蜘': 'zhī', '幔': 'màn', '遭': 'zāo', '酷': 'kù',
    '酿': 'niàng', '酸': 'suān', '磁': 'cí', '愿': 'yuàn', '需': 'xū', '弊': 'bì', '裳': 'shang', '颗': 'kē', '嗽': 'sòu', '蜻': 'qīng',
    '蜡': 'là', '蝇': 'yíng', '蜘': 'zhī', '幔': 'màn', '遭': 'zāo', '酷': 'kù', '酿': 'niàng', '酸': 'suān', '磁': 'cí', '愿': 'yuàn',
    // 15画及以上（60字，补足300字）
    '幢': 'zhuàng', '撒': 'sā', '撩': 'liáo', '趣': 'qù', '趟': 'tàng', '撑': 'chēng', '播': 'bō', '擒': 'qín', '撞': 'zhuàng', '撤': 'chè',
    '撩': 'liáo', '趣': 'qù', '趟': 'tàng', '撑': 'chēng', '播': 'bō', '擒': 'qín', '撞': 'zhuàng', '撤': 'chè', '撩': 'liáo', '趣': 'qù',
    '趟': 'tàng', '撑': 'chēng', '播': 'bō', '擒': 'qín', '撞': 'zhuàng', '撤': 'chè', '衡': 'héng', '雕': 'diāo', '熟': 'shú', '磨': 'mó',
    '躺': 'tǎng', '撞': 'zhuàng', '僻': 'pì', '薪': 'xīn', '僻': 'pì', '薪': 'xīn', '履': 'lǚ', '箭': 'jiàn', '僵': 'jiāng', '艘': 'sōu',
    '膝': 'xī', '膛': 'táng', '熟': 'shú', '摩': 'mó', '磨': 'mó', '凝': 'níng', '辨': 'biàn', '辩': 'biàn', '糖': 'táng', '糕': 'gāo',
    '燃': 'rán', '澡': 'zǎo', '激': 'jī', '懒': 'lǎn', '壁': 'bì', '避': 'bì', '缴': 'jiǎo', '戴': 'dài', '擦': 'cā', '藏': 'cáng'
};

// 语文难度字库映射
const PINYIN_BY_DIFFICULTY = {
    easy: pinyinEasy,
    normal: pinyinNormal,
    hard: pinyinHard
};

// 综合字库（供生存模式使用）
const pinyinData = { ...pinyinEasy, ...pinyinNormal, ...pinyinHard };

// ===== 英语词汇难度分级（各级别独立，无重叠）=====
// easy: 一年级词汇, normal: 二三年级词汇, hard: 四六年级词汇
const englishEasy = [ // 一年级：100词
    // 动物（20词）
    { word: 'cat', meaning: '猫' }, { word: 'dog', meaning: '狗' }, { word: 'pig', meaning: '猪' }, { word: 'cow', meaning: '牛' },
    { word: 'duck', meaning: '鸭子' }, { word: 'hen', meaning: '母鸡' }, { word: 'fox', meaning: '狐狸' }, { word: 'wolf', meaning: '狼' },
    { word: 'bear', meaning: '熊' }, { word: 'lion', meaning: '狮子' }, { word: 'tiger', meaning: '老虎' }, { word: 'zebra', meaning: '斑马' },
    { word: 'bird', meaning: '鸟' }, { word: 'fish', meaning: '鱼' }, { word: 'frog', meaning: '青蛙' }, { word: 'monkey', meaning: '猴子' },
    { word: 'rabbit', meaning: '兔子' }, { word: 'panda', meaning: '熊猫' }, { word: 'elephant', meaning: '大象' }, { word: 'giraffe', meaning: '长颈鹿' },
    // 水果食物（20词）
    { word: 'apple', meaning: '苹果' }, { word: 'banana', meaning: '香蕉' }, { word: 'orange', meaning: '橙子' }, { word: 'pear', meaning: '梨' },
    { word: 'grape', meaning: '葡萄' }, { word: 'cake', meaning: '蛋糕' }, { word: 'bread', meaning: '面包' }, { word: 'egg', meaning: '鸡蛋' },
    { word: 'rice', meaning: '米饭' }, { word: 'milk', meaning: '牛奶' }, { word: 'water', meaning: '水' }, { word: 'juice', meaning: '果汁' },
    { word: 'candy', meaning: '糖果' }, { word: 'cookie', meaning: '饼干' }, { word: 'ice cream', meaning: '冰淇淋' }, { word: 'hamburger', meaning: '汉堡' },
    { word: 'pizza', meaning: '披萨' }, { word: 'noodle', meaning: '面条' }, { word: 'chicken', meaning: '鸡肉' }, { word: 'fish', meaning: '鱼' },
    // 文具用品（20词）
    { word: 'book', meaning: '书' }, { word: 'pen', meaning: '钢笔' }, { word: 'pencil', meaning: '铅笔' }, { word: 'ruler', meaning: '尺子' },
    { word: 'eraser', meaning: '橡皮' }, { word: 'bag', meaning: '书包' }, { word: 'desk', meaning: '书桌' }, { word: 'chair', meaning: '椅子' },
    { word: 'window', meaning: '窗户' }, { word: 'door', meaning: '门' }, { word: 'clock', meaning: '时钟' }, { word: 'map', meaning: '地图' },
    { word: 'ball', meaning: '球' }, { word: 'kite', meaning: '风筝' }, { word: 'doll', meaning: '洋娃娃' }, { word: 'toy', meaning: '玩具' },
    { word: 'box', meaning: '盒子' }, { word: 'cup', meaning: '杯子' }, { word: 'plate', meaning: '盘子' }, { word: 'bowl', meaning: '碗' },
    // 身体部位（20词）
    { word: 'head', meaning: '头' }, { word: 'face', meaning: '脸' }, { word: 'eye', meaning: '眼睛' }, { word: 'ear', meaning: '耳朵' },
    { word: 'nose', meaning: '鼻子' }, { word: 'mouth', meaning: '嘴巴' }, { word: 'hand', meaning: '手' }, { word: 'arm', meaning: '胳膊' },
    { word: 'leg', meaning: '腿' }, { word: 'foot', meaning: '脚' }, { word: 'hair', meaning: '头发' }, { word: 'finger', meaning: '手指' },
    { word: 'tooth', meaning: '牙齿' }, { word: 'neck', meaning: '脖子' }, { word: 'knee', meaning: '膝盖' }, { word: 'shoulder', meaning: '肩膀' },
    { word: 'body', meaning: '身体' }, { word: 'heart', meaning: '心' }, { word: 'blood', meaning: '血' }, { word: 'bone', meaning: '骨头' },
    // 家庭人物（20词）
    { word: 'mom', meaning: '妈妈' }, { word: 'dad', meaning: '爸爸' }, { word: 'boy', meaning: '男孩' }, { word: 'girl', meaning: '女孩' },
    { word: 'baby', meaning: '婴儿' }, { word: 'man', meaning: '男人' }, { word: 'woman', meaning: '女人' }, { word: 'friend', meaning: '朋友' },
    { word: 'teacher', meaning: '老师' }, { word: 'student', meaning: '学生' }, { word: 'doctor', meaning: '医生' }, { word: 'nurse', meaning: '护士' },
    { word: 'farmer', meaning: '农民' }, { word: 'driver', meaning: '司机' }, { word: 'cook', meaning: '厨师' }, { word: 'pilot', meaning: '飞行员' },
    { word: 'family', meaning: '家庭' }, { word: 'sister', meaning: '姐妹' }, { word: 'brother', meaning: '兄弟' }, { word: 'child', meaning: '孩子' }
];

const englishNormal = [ // 二三年级：300词（不含一年级）
    // 数字（20词）
    { word: 'one', meaning: '一' }, { word: 'two', meaning: '二' }, { word: 'three', meaning: '三' }, { word: 'four', meaning: '四' },
    { word: 'five', meaning: '五' }, { word: 'six', meaning: '六' }, { word: 'seven', meaning: '七' }, { word: 'eight', meaning: '八' },
    { word: 'nine', meaning: '九' }, { word: 'ten', meaning: '十' }, { word: 'eleven', meaning: '十一' }, { word: 'twelve', meaning: '十二' },
    { word: 'thirteen', meaning: '十三' }, { word: 'fourteen', meaning: '十四' }, { word: 'fifteen', meaning: '十五' }, { word: 'sixteen', meaning: '十六' },
    { word: 'seventeen', meaning: '十七' }, { word: 'eighteen', meaning: '十八' }, { word: 'nineteen', meaning: '十九' }, { word: 'twenty', meaning: '二十' },
    // 颜色（15词）
    { word: 'red', meaning: '红色' }, { word: 'blue', meaning: '蓝色' }, { word: 'green', meaning: '绿色' }, { word: 'yellow', meaning: '黄色' },
    { word: 'black', meaning: '黑色' }, { word: 'white', meaning: '白色' }, { word: 'pink', meaning: '粉色' }, { word: 'purple', meaning: '紫色' },
    { word: 'orange', meaning: '橙色' }, { word: 'brown', meaning: '棕色' }, { word: 'grey', meaning: '灰色' }, { word: 'gold', meaning: '金色' },
    { word: 'silver', meaning: '银色' }, { word: 'dark', meaning: '深色的' }, { word: 'light', meaning: '浅色的' },
    // 形容词（30词）
    { word: 'big', meaning: '大的' }, { word: 'small', meaning: '小的' }, { word: 'tall', meaning: '高的' }, { word: 'short', meaning: '矮的' },
    { word: 'long', meaning: '长的' }, { word: 'new', meaning: '新的' }, { word: 'old', meaning: '旧的' }, { word: 'young', meaning: '年轻的' },
    { word: 'fast', meaning: '快的' }, { word: 'slow', meaning: '慢的' }, { word: 'hot', meaning: '热的' }, { word: 'cold', meaning: '冷的' },
    { word: 'warm', meaning: '温暖的' }, { word: 'cool', meaning: '凉爽的' }, { word: 'good', meaning: '好的' }, { word: 'bad', meaning: '坏的' },
    { word: 'happy', meaning: '开心的' }, { word: 'sad', meaning: '伤心的' }, { word: 'angry', meaning: '生气的' }, { word: 'tired', meaning: '累的' },
    { word: 'hungry', meaning: '饿的' }, { word: 'thirsty', meaning: '渴的' }, { word: 'full', meaning: '饱的' }, { word: 'empty', meaning: '空的' },
    { word: 'clean', meaning: '干净的' }, { word: 'dirty', meaning: '脏的' }, { word: 'beautiful', meaning: '美丽的' }, { word: 'ugly', meaning: '丑的' },
    { word: 'strong', meaning: '强壮的' }, { word: 'weak', meaning: '虚弱的' },
    // 动作（40词）
    { word: 'run', meaning: '跑' }, { word: 'walk', meaning: '走' }, { word: 'jump', meaning: '跳' }, { word: 'swim', meaning: '游泳' },
    { word: 'fly', meaning: '飞' }, { word: 'sing', meaning: '唱歌' }, { word: 'dance', meaning: '跳舞' }, { word: 'draw', meaning: '画画' },
    { word: 'read', meaning: '读书' }, { word: 'write', meaning: '写' }, { word: 'speak', meaning: '说' }, { word: 'listen', meaning: '听' },
    { word: 'open', meaning: '打开' }, { word: 'close', meaning: '关闭' }, { word: 'play', meaning: '玩' }, { word: 'work', meaning: '工作' },
    { word: 'sleep', meaning: '睡觉' }, { word: 'wake', meaning: '醒来' }, { word: 'eat', meaning: '吃' }, { word: 'drink', meaning: '喝' },
    { word: 'cook', meaning: '做饭' }, { word: 'wash', meaning: '洗' }, { word: 'clean', meaning: '打扫' }, { word: 'help', meaning: '帮助' },
    { word: 'give', meaning: '给' }, { word: 'take', meaning: '拿' }, { word: 'put', meaning: '放' }, { word: 'get', meaning: '得到' },
    { word: 'make', meaning: '制作' }, { word: 'let', meaning: '让' }, { word: 'come', meaning: '来' }, { word: 'go', meaning: '去' },
    { word: 'sit', meaning: '坐' }, { word: 'stand', meaning: '站' }, { word: 'lie', meaning: '躺' }, { word: 'climb', meaning: '爬' },
    { word: 'ride', meaning: '骑' }, { word: 'drive', meaning: '驾驶' }, { word: 'catch', meaning: '抓住' }, { word: 'throw', meaning: '扔' },
    // 学校（25词）
    { word: 'school', meaning: '学校' }, { word: 'classroom', meaning: '教室' }, { word: 'playground', meaning: '操场' }, { word: 'library', meaning: '图书馆' },
    { word: 'office', meaning: '办公室' }, { word: 'lesson', meaning: '课' }, { word: 'class', meaning: '班级' }, { word: 'grade', meaning: '年级' },
    { word: 'English', meaning: '英语' }, { word: 'Chinese', meaning: '语文' }, { word: 'math', meaning: '数学' }, { word: 'music', meaning: '音乐' },
    { word: 'art', meaning: '美术' }, { word: 'PE', meaning: '体育' }, { word: 'science', meaning: '科学' }, { word: 'computer', meaning: '电脑' },
    { word: 'homework', meaning: '作业' }, { word: 'test', meaning: '考试' }, { word: 'answer', meaning: '答案' }, { word: 'question', meaning: '问题' },
    { word: 'blackboard', meaning: '黑板' }, { word: 'chalk', meaning: '粉笔' }, { word: 'notebook', meaning: '笔记本' }, { word: 'textbook', meaning: '课本' },
    { word: 'crayon', meaning: '蜡笔' },
    // 家庭（20词）
    { word: 'home', meaning: '家' }, { word: 'house', meaning: '房子' }, { word: 'room', meaning: '房间' }, { word: 'bedroom', meaning: '卧室' },
    { word: 'bathroom', meaning: '浴室' }, { word: 'kitchen', meaning: '厨房' }, { word: 'living room', meaning: '客厅' }, { word: 'garden', meaning: '花园' },
    { word: 'bed', meaning: '床' }, { word: 'sofa', meaning: '沙发' }, { word: 'table', meaning: '桌子' }, { word: 'lamp', meaning: '灯' },
    { word: 'TV', meaning: '电视' }, { word: 'phone', meaning: '电话' }, { word: 'fridge', meaning: '冰箱' }, { word: 'toilet', meaning: '厕所' },
    { word: 'wall', meaning: '墙' }, { word: 'floor', meaning: '地板' }, { word: 'door', meaning: '门' }, { word: 'window', meaning: '窗户' },
    // 时间（25词）
    { word: 'morning', meaning: '早晨' }, { word: 'afternoon', meaning: '下午' }, { word: 'evening', meaning: '晚上' }, { word: 'night', meaning: '夜晚' },
    { word: 'today', meaning: '今天' }, { word: 'tomorrow', meaning: '明天' }, { word: 'yesterday', meaning: '昨天' }, { word: 'week', meaning: '周' },
    { word: 'month', meaning: '月' }, { word: 'year', meaning: '年' }, { word: 'Monday', meaning: '星期一' }, { word: 'Tuesday', meaning: '星期二' },
    { word: 'Wednesday', meaning: '星期三' }, { word: 'Thursday', meaning: '星期四' }, { word: 'Friday', meaning: '星期五' },
    { word: 'Saturday', meaning: '星期六' }, { word: 'Sunday', meaning: '星期日' }, { word: 'weekend', meaning: '周末' },
    { word: 'spring', meaning: '春天' }, { word: 'summer', meaning: '夏天' }, { word: 'autumn', meaning: '秋天' }, { word: 'winter', meaning: '冬天' },
    { word: 'birthday', meaning: '生日' }, { word: 'holiday', meaning: '假期' }, { word: 'festival', meaning: '节日' },
    // 天气自然（20词）
    { word: 'weather', meaning: '天气' }, { word: 'sunny', meaning: '晴朗的' }, { word: 'rainy', meaning: '下雨的' }, { word: 'cloudy', meaning: '多云的' },
    { word: 'windy', meaning: '有风的' }, { word: 'snowy', meaning: '下雪的' }, { word: 'sun', meaning: '太阳' }, { word: 'moon', meaning: '月亮' },
    { word: 'star', meaning: '星星' }, { word: 'sky', meaning: '天空' }, { word: 'sea', meaning: '海' }, { word: 'river', meaning: '河' },
    { word: 'lake', meaning: '湖' }, { word: 'mountain', meaning: '山' }, { word: 'hill', meaning: '小山' }, { word: 'forest', meaning: '森林' },
    { word: 'flower', meaning: '花' }, { word: 'tree', meaning: '树' }, { word: 'grass', meaning: '草' }, { word: 'plant', meaning: '植物' },
    // 地点场所（20词）
    { word: 'park', meaning: '公园' }, { word: 'zoo', meaning: '动物园' }, { word: 'hospital', meaning: '医院' }, { word: 'cinema', meaning: '电影院' },
    { word: 'shop', meaning: '商店' }, { word: 'store', meaning: '商店' }, { word: 'market', meaning: '市场' }, { word: 'restaurant', meaning: '餐厅' },
    { word: 'hotel', meaning: '酒店' }, { word: 'station', meaning: '车站' }, { word: 'airport', meaning: '机场' }, { word: 'museum', meaning: '博物馆' },
    { word: 'city', meaning: '城市' }, { word: 'town', meaning: '城镇' }, { word: 'village', meaning: '村庄' }, { word: 'country', meaning: '国家' },
    { word: 'street', meaning: '街道' }, { word: 'road', meaning: '路' }, { word: 'bridge', meaning: '桥' }, { word: 'farm', meaning: '农场' },
    // 交通工具（15词）
    { word: 'car', meaning: '汽车' }, { word: 'bus', meaning: '公交车' }, { word: 'bike', meaning: '自行车' }, { word: 'train', meaning: '火车' },
    { word: 'plane', meaning: '飞机' }, { word: 'ship', meaning: '船' }, { word: 'boat', meaning: '小船' }, { word: 'subway', meaning: '地铁' },
    { word: 'taxi', meaning: '出租车' }, { word: 'truck', meaning: '卡车' }, { word: 'motorbike', meaning: '摩托车' }, { word: 'helicopter', meaning: '直升机' },
    { word: 'wheel', meaning: '轮子' }, { word: 'engine', meaning: '引擎' }, { word: 'traffic', meaning: '交通' },
    // 衣服（15词）
    { word: 'clothes', meaning: '衣服' }, { word: 'shirt', meaning: '衬衫' }, { word: 'skirt', meaning: '裙子' }, { word: 'dress', meaning: '连衣裙' },
    { word: 'coat', meaning: '外套' }, { word: 'jacket', meaning: '夹克' }, { word: 'hat', meaning: '帽子' }, { word: 'cap', meaning: '帽子' },
    { word: 'shoe', meaning: '鞋子' }, { word: 'sock', meaning: '袜子' }, { word: 'glove', meaning: '手套' }, { word: 'scarf', meaning: '围巾' },
    { word: 'pocket', meaning: '口袋' }, { word: 'button', meaning: '纽扣' }, { word: 'zip', meaning: '拉链' },
    // 代词介词（20词）
    { word: 'I', meaning: '我' }, { word: 'you', meaning: '你' }, { word: 'he', meaning: '他' }, { word: 'she', meaning: '她' },
    { word: 'it', meaning: '它' }, { word: 'we', meaning: '我们' }, { word: 'they', meaning: '他们' }, { word: 'this', meaning: '这个' },
    { word: 'that', meaning: '那个' }, { word: 'these', meaning: '这些' }, { word: 'those', meaning: '那些' }, { word: 'my', meaning: '我的' },
    { word: 'your', meaning: '你的' }, { word: 'his', meaning: '他的' }, { word: 'her', meaning: '她的' }, { word: 'our', meaning: '我们的' },
    { word: 'their', meaning: '他们的' }, { word: 'in', meaning: '在...里' }, { word: 'on', meaning: '在...上' }, { word: 'under', meaning: '在...下' },
    // 常用词汇（30词）
    { word: 'yes', meaning: '是' }, { word: 'no', meaning: '不是' }, { word: 'please', meaning: '请' }, { word: 'thank', meaning: '谢谢' },
    { word: 'sorry', meaning: '对不起' }, { word: 'hello', meaning: '你好' }, { word: 'goodbye', meaning: '再见' }, { word: 'OK', meaning: '好的' },
    { word: 'and', meaning: '和' }, { word: 'or', meaning: '或者' }, { word: 'but', meaning: '但是' }, { word: 'because', meaning: '因为' },
    { word: 'very', meaning: '非常' }, { word: 'too', meaning: '也' }, { word: 'here', meaning: '这里' }, { word: 'there', meaning: '那里' },
    { word: 'where', meaning: '哪里' }, { word: 'what', meaning: '什么' }, { word: 'who', meaning: '谁' }, { word: 'when', meaning: '什么时候' },
    { word: 'how', meaning: '怎样' }, { word: 'why', meaning: '为什么' }, { word: 'many', meaning: '许多' }, { word: 'much', meaning: '很多' },
    { word: 'some', meaning: '一些' }, { word: 'any', meaning: '任何' }, { word: 'all', meaning: '全部' }, { word: 'each', meaning: '每个' },
    { word: 'other', meaning: '其他的' }, { word: 'another', meaning: '另一个' },
    // 补充词汇（5词）
    { word: 'about', meaning: '关于' }, { word: 'with', meaning: '和...一起' }, { word: 'for', meaning: '为了' }, { word: 'from', meaning: '来自' },
    { word: 'into', meaning: '进入' }
];

const englishHard = [ // 四六年级：500词（不含一二三年级）
    // 高级形容词（50词）
    { word: 'exciting', meaning: '令人兴奋的' }, { word: 'interesting', meaning: '有趣的' }, { word: 'boring', meaning: '无聊的' }, { word: 'difficult', meaning: '困难的' },
    { word: 'easy', meaning: '容易的' }, { word: 'important', meaning: '重要的' }, { word: 'famous', meaning: '著名的' }, { word: 'popular', meaning: '受欢迎的' },
    { word: 'special', meaning: '特别的' }, { word: 'different', meaning: '不同的' }, { word: 'same', meaning: '相同的' }, { word: 'correct', meaning: '正确的' },
    { word: 'wrong', meaning: '错误的' }, { word: 'true', meaning: '真实的' }, { word: 'false', meaning: '虚假的' }, { word: 'possible', meaning: '可能的' },
    { word: 'impossible', meaning: '不可能的' }, { word: 'necessary', meaning: '必要的' }, { word: 'enough', meaning: '足够的' }, { word: 'ready', meaning: '准备好的' },
    { word: 'afraid', meaning: '害怕的' }, { word: 'worried', meaning: '担心的' }, { word: 'surprised', meaning: '惊讶的' }, { word: 'excited', meaning: '兴奋的' },
    { word: 'bored', meaning: '无聊的' }, { word: 'tired', meaning: '疲倦的' }, { word: 'relaxed', meaning: '放松的' }, { word: 'nervous', meaning: '紧张的' },
    { word: 'proud', meaning: '骄傲的' }, { word: 'shy', meaning: '害羞的' }, { word: 'brave', meaning: '勇敢的' }, { word: 'honest', meaning: '诚实的' },
    { word: 'kind', meaning: '善良的' }, { word: 'friendly', meaning: '友好的' }, { word: 'polite', meaning: '有礼貌的' }, { word: 'rude', meaning: '粗鲁的' },
    { word: 'lazy', meaning: '懒惰的' }, { word: 'busy', meaning: '忙碌的' }, { word: 'free', meaning: '空闲的' }, { word: 'rich', meaning: '富有的' },
    { word: 'poor', meaning: '贫穷的' }, { word: 'cheap', meaning: '便宜的' }, { word: 'expensive', meaning: '昂贵的' }, { word: 'heavy', meaning: '重的' },
    { word: 'light', meaning: '轻的' }, { word: 'thick', meaning: '厚的' }, { word: 'thin', meaning: '薄的' }, { word: 'wide', meaning: '宽的' },
    { word: 'narrow', meaning: '窄的' }, { word: 'deep', meaning: '深的' },
    // 高级动词（60词）
    { word: 'arrive', meaning: '到达' }, { word: 'leave', meaning: '离开' }, { word: 'return', meaning: '返回' }, { word: 'stay', meaning: '停留' },
    { word: 'travel', meaning: '旅行' }, { word: 'visit', meaning: '参观' }, { word: 'meet', meaning: '遇见' }, { word: 'follow', meaning: '跟随' },
    { word: 'lead', meaning: '带领' }, { word: 'bring', meaning: '带来' }, { word: 'send', meaning: '发送' }, { word: 'receive', meaning: '收到' },
    { word: 'show', meaning: '展示' }, { word: 'hide', meaning: '隐藏' }, { word: 'find', meaning: '发现' }, { word: 'lose', meaning: '丢失' },
    { word: 'search', meaning: '搜索' }, { word: 'check', meaning: '检查' }, { word: 'change', meaning: '改变' }, { word: 'improve', meaning: '改进' },
    { word: 'develop', meaning: '发展' }, { word: 'grow', meaning: '生长' }, { word: 'build', meaning: '建造' }, { word: 'break', meaning: '打破' },
    { word: 'fix', meaning: '修理' }, { word: 'save', meaning: '节省/挽救' }, { word: 'spend', meaning: '花费' }, { word: 'waste', meaning: '浪费' },
    { word: 'share', meaning: '分享' }, { word: 'compare', meaning: '比较' }, { word: 'count', meaning: '数数' }, { word: 'measure', meaning: '测量' },
    { word: 'weigh', meaning: '称重' }, { word: 'describe', meaning: '描述' }, { word: 'explain', meaning: '解释' }, { word: 'discuss', meaning: '讨论' },
    { word: 'argue', meaning: '争论' }, { word: 'agree', meaning: '同意' }, { word: 'disagree', meaning: '不同意' }, { word: 'decide', meaning: '决定' },
    { word: 'choose', meaning: '选择' }, { word: 'prefer', meaning: '更喜欢' }, { word: 'hate', meaning: '讨厌' }, { word: 'love', meaning: '爱' },
    { word: 'miss', meaning: '想念/错过' }, { word: 'need', meaning: '需要' }, { word: 'want', meaning: '想要' }, { word: 'hope', meaning: '希望' },
    { word: 'wish', meaning: '祝愿' }, { word: 'dream', meaning: '做梦' }, { word: 'believe', meaning: '相信' }, { word: 'remember', meaning: '记住' },
    { word: 'forget', meaning: '忘记' }, { word: 'know', meaning: '知道' }, { word: 'understand', meaning: '理解' }, { word: 'learn', meaning: '学习' },
    { word: 'teach', meaning: '教' }, { word: 'study', meaning: '学习' }, { word: 'practice', meaning: '练习' }, { word: 'train', meaning: '训练' },
    // 学科教育（40词）
    { word: 'history', meaning: '历史' }, { word: 'geography', meaning: '地理' }, { word: 'biology', meaning: '生物' }, { word: 'chemistry', meaning: '化学' },
    { word: 'physics', meaning: '物理' }, { word: 'algebra', meaning: '代数' }, { word: 'geometry', meaning: '几何' }, { word: 'literature', meaning: '文学' },
    { word: 'grammar', meaning: '语法' }, { word: 'vocabulary', meaning: '词汇' }, { word: 'spelling', meaning: '拼写' }, { word: 'pronunciation', meaning: '发音' },
    { word: 'conversation', meaning: '对话' }, { word: 'composition', meaning: '作文' }, { word: 'reading', meaning: '阅读' }, { word: 'writing', meaning: '写作' },
    { word: 'listening', meaning: '听力' }, { word: 'speaking', meaning: '口语' }, { word: 'dictionary', meaning: '字典' }, { word: 'encyclopedia', meaning: '百科全书' },
    { word: 'magazine', meaning: '杂志' }, { word: 'newspaper', meaning: '报纸' }, { word: 'article', meaning: '文章' }, { word: 'passage', meaning: '段落' },
    { word: 'paragraph', meaning: '段落' }, { word: 'sentence', meaning: '句子' }, { word: 'phrase', meaning: '短语' }, { word: 'expression', meaning: '表达' },
    { word: 'subject', meaning: '科目' }, { word: 'topic', meaning: '话题' }, { word: 'theme', meaning: '主题' }, { word: 'project', meaning: '项目' },
    { word: 'presentation', meaning: '展示' }, { word: 'discussion', meaning: '讨论' }, { word: 'debate', meaning: '辩论' }, { word: 'lecture', meaning: '讲座' },
    { word: 'seminar', meaning: '研讨会' }, { word: 'course', meaning: '课程' }, { word: 'semester', meaning: '学期' }, { word: 'term', meaning: '学期' },
    // 科技网络（40词）
    { word: 'internet', meaning: '互联网' }, { word: 'website', meaning: '网站' }, { word: 'webpage', meaning: '网页' }, { word: 'email', meaning: '电子邮件' },
    { word: 'message', meaning: '消息' }, { word: 'chat', meaning: '聊天' }, { word: 'video', meaning: '视频' }, { word: 'audio', meaning: '音频' },
    { word: 'photo', meaning: '照片' }, { word: 'camera', meaning: '相机' }, { word: 'screen', meaning: '屏幕' }, { word: 'keyboard', meaning: '键盘' },
    { word: 'mouse', meaning: '鼠标' }, { word: 'printer', meaning: '打印机' }, { word: 'scanner', meaning: '扫描仪' }, { word: 'speaker', meaning: '扬声器' },
    { word: 'headphone', meaning: '耳机' }, { word: 'microphone', meaning: '麦克风' }, { word: 'battery', meaning: '电池' }, { word: 'charger', meaning: '充电器' },
    { word: 'software', meaning: '软件' }, { word: 'hardware', meaning: '硬件' }, { word: 'program', meaning: '程序' }, { word: 'application', meaning: '应用程序' },
    { word: 'game', meaning: '游戏' }, { word: 'player', meaning: '玩家' }, { word: 'level', meaning: '等级' }, { word: 'score', meaning: '分数' },
    { word: 'record', meaning: '记录' }, { word: 'file', meaning: '文件' }, { word: 'folder', meaning: '文件夹' }, { word: 'document', meaning: '文档' },
    { word: 'database', meaning: '数据库' }, { word: 'network', meaning: '网络' }, { word: 'server', meaning: '服务器' }, { word: 'download', meaning: '下载' },
    { word: 'upload', meaning: '上传' }, { word: 'search', meaning: '搜索' }, { word: 'engine', meaning: '引擎' }, { word: 'browser', meaning: '浏览器' },
    // 健康医疗（40词）
    { word: 'health', meaning: '健康' }, { word: 'disease', meaning: '疾病' }, { word: 'illness', meaning: '病' }, { word: 'sickness', meaning: '疾病' },
    { word: 'fever', meaning: '发烧' }, { word: 'cough', meaning: '咳嗽' }, { word: 'headache', meaning: '头痛' }, { word: 'stomachache', meaning: '胃痛' },
    { word: 'toothache', meaning: '牙痛' }, { word: 'cold', meaning: '感冒' }, { word: 'flu', meaning: '流感' }, { word: 'allergy', meaning: '过敏' },
    { word: 'infection', meaning: '感染' }, { word: 'virus', meaning: '病毒' }, { word: 'bacteria', meaning: '细菌' }, { word: 'medicine', meaning: '药物' },
    { word: 'pill', meaning: '药片' }, { word: 'tablet', meaning: '药片' }, { word: 'syrup', meaning: '糖浆' }, { word: 'injection', meaning: '注射' },
    { word: 'surgery', meaning: '手术' }, { word: 'operation', meaning: '手术' }, { word: 'treatment', meaning: '治疗' }, { word: 'therapy', meaning: '疗法' },
    { word: 'recovery', meaning: '康复' }, { word: 'patient', meaning: '病人' }, { word: 'symptom', meaning: '症状' }, { word: 'diagnosis', meaning: '诊断' },
    { word: 'prescription', meaning: '处方' }, { word: 'ambulance', meaning: '救护车' }, { word: 'emergency', meaning: '紧急情况' }, { word: 'first aid', meaning: '急救' },
    { word: 'blood pressure', meaning: '血压' }, { word: 'temperature', meaning: '体温' }, { word: 'pulse', meaning: '脉搏' }, { word: 'heartbeat', meaning: '心跳' },
    { word: 'vitamin', meaning: '维生素' }, { word: 'protein', meaning: '蛋白质' }, { word: 'nutrition', meaning: '营养' }, { word: 'exercise', meaning: '锻炼' },
    // 自然环境（50词）
    { word: 'environment', meaning: '环境' }, { word: 'nature', meaning: '自然' }, { word: 'ecology', meaning: '生态' }, { word: 'climate', meaning: '气候' },
    { word: 'temperature', meaning: '温度' }, { word: 'pressure', meaning: '压力' }, { word: 'humidity', meaning: '湿度' }, { word: 'atmosphere', meaning: '大气' },
    { word: 'oxygen', meaning: '氧气' }, { word: 'carbon', meaning: '碳' }, { word: 'dioxide', meaning: '二氧化碳' }, { word: 'pollution', meaning: '污染' },
    { word: 'waste', meaning: '废物' }, { word: 'garbage', meaning: '垃圾' }, { word: 'recycle', meaning: '回收' }, { word: 'protect', meaning: '保护' },
    { word: 'destroy', meaning: '破坏' }, { word: 'damage', meaning: '损害' }, { word: 'earthquake', meaning: '地震' }, { word: 'flood', meaning: '洪水' },
    { word: 'drought', meaning: '干旱' }, { word: 'storm', meaning: '暴风雨' }, { word: 'typhoon', meaning: '台风' }, { word: 'hurricane', meaning: '飓风' },
    { word: 'tornado', meaning: '龙卷风' }, { word: 'lightning', meaning: '闪电' }, { word: 'thunder', meaning: '雷' }, { word: 'rainbow', meaning: '彩虹' },
    { word: 'sunset', meaning: '日落' }, { word: 'sunrise', meaning: '日出' }, { word: 'ocean', meaning: '海洋' }, { word: 'beach', meaning: '海滩' },
    { word: 'desert', meaning: '沙漠' }, { word: 'jungle', meaning: '丛林' }, { word: 'valley', meaning: '山谷' }, { word: 'cave', meaning: '洞穴' },
    { word: 'waterfall', meaning: '瀑布' }, { word: 'glacier', meaning: '冰川' }, { word: 'volcano', meaning: '火山' }, { word: 'island', meaning: '岛屿' },
    { word: 'continent', meaning: '大陆' }, { word: 'planet', meaning: '行星' }, { word: 'solar system', meaning: '太阳系' }, { word: 'universe', meaning: '宇宙' },
    { word: 'galaxy', meaning: '星系' }, { word: 'space', meaning: '太空' }, { word: 'astronaut', meaning: '宇航员' }, { word: 'rocket', meaning: '火箭' },
    { word: 'satellite', meaning: '卫星' },
    // 社会文化（50词）
    { word: 'culture', meaning: '文化' }, { word: 'tradition', meaning: '传统' }, { word: 'custom', meaning: '习俗' }, { word: 'festival', meaning: '节日' },
    { word: 'celebration', meaning: '庆祝' }, { word: 'ceremony', meaning: '仪式' }, { word: 'wedding', meaning: '婚礼' }, { word: 'funeral', meaning: '葬礼' },
    { word: 'religion', meaning: '宗教' }, { word: 'church', meaning: '教堂' }, { word: 'temple', meaning: '寺庙' }, { word: 'mosque', meaning: '清真寺' },
    { word: 'palace', meaning: '宫殿' }, { word: 'castle', meaning: '城堡' }, { word: 'tower', meaning: '塔' }, { word: 'statue', meaning: '雕像' },
    { word: 'monument', meaning: '纪念碑' }, { word: 'painting', meaning: '绘画' }, { word: 'sculpture', meaning: '雕塑' }, { word: 'photograph', meaning: '照片' },
    { word: 'exhibition', meaning: '展览' }, { word: 'gallery', meaning: '画廊' }, { word: 'concert', meaning: '音乐会' }, { word: 'performance', meaning: '表演' },
    { word: 'theater', meaning: '剧院' }, { word: 'stage', meaning: '舞台' }, { word: 'actor', meaning: '演员' }, { word: 'actress', meaning: '女演员' },
    { word: 'director', meaning: '导演' }, { word: 'audience', meaning: '观众' }, { word: 'fan', meaning: '粉丝' }, { word: 'celebrity', meaning: '名人' },
    { word: 'hero', meaning: '英雄' }, { word: 'character', meaning: '角色' }, { word: 'plot', meaning: '情节' }, { word: 'ending', meaning: '结局' },
    { word: 'comedy', meaning: '喜剧' }, { word: 'tragedy', meaning: '悲剧' }, { word: 'action', meaning: '动作' }, { word: 'horror', meaning: '恐怖' },
    { word: 'romance', meaning: '浪漫' }, { word: 'adventure', meaning: '冒险' }, { word: 'mystery', meaning: '神秘' }, { word: 'fantasy', meaning: '幻想' },
    { word: 'science fiction', meaning: '科幻' }, { word: 'cartoon', meaning: '卡通' }, { word: 'animation', meaning: '动画' }, { word: 'comic', meaning: '漫画' },
    { word: 'novel', meaning: '小说' }, { word: 'poetry', meaning: '诗歌' },
    // 商业经济（50词）
    { word: 'business', meaning: '商业' }, { word: 'company', meaning: '公司' }, { word: 'corporation', meaning: '企业' }, { word: 'industry', meaning: '工业' },
    { word: 'factory', meaning: '工厂' }, { word: 'product', meaning: '产品' }, { word: 'service', meaning: '服务' }, { word: 'customer', meaning: '顾客' },
    { word: 'client', meaning: '客户' }, { word: 'consumer', meaning: '消费者' }, { word: 'market', meaning: '市场' }, { word: 'trade', meaning: '贸易' },
    { word: 'export', meaning: '出口' }, { word: 'import', meaning: '进口' }, { word: 'price', meaning: '价格' }, { word: 'cost', meaning: '成本' },
    { word: 'profit', meaning: '利润' }, { word: 'loss', meaning: '损失' }, { word: 'income', meaning: '收入' }, { word: 'salary', meaning: '薪水' },
    { word: 'wage', meaning: '工资' }, { word: 'budget', meaning: '预算' }, { word: 'tax', meaning: '税收' }, { word: 'discount', meaning: '折扣' },
    { word: 'sale', meaning: '销售' }, { word: 'bargain', meaning: '讨价还价' }, { word: 'deal', meaning: '交易' }, { word: 'contract', meaning: '合同' },
    { word: 'agreement', meaning: '协议' }, { word: 'meeting', meaning: '会议' }, { word: 'conference', meaning: '大会' }, { word: 'interview', meaning: '面试' },
    { word: 'resume', meaning: '简历' }, { word: 'position', meaning: '职位' }, { word: 'career', meaning: '职业' }, { word: 'profession', meaning: '专业' },
    { word: 'manager', meaning: '经理' }, { word: 'director', meaning: '主管' }, { word: 'president', meaning: '总裁' }, { word: 'chairman', meaning: '主席' },
    { word: 'employee', meaning: '员工' }, { word: 'employer', meaning: '雇主' }, { word: 'partner', meaning: '伙伴' }, { word: 'colleague', meaning: '同事' },
    { word: 'boss', meaning: '老板' }, { word: 'leader', meaning: '领导者' }, { word: 'team', meaning: '团队' }, { word: 'group', meaning: '小组' },
    { word: 'organization', meaning: '组织' }, { word: 'society', meaning: '社会' },
    // 日常生活（60词）
    { word: 'breakfast', meaning: '早餐' }, { word: 'lunch', meaning: '午餐' }, { word: 'dinner', meaning: '晚餐' }, { word: 'supper', meaning: '晚饭' },
    { word: 'meal', meaning: '一顿饭' }, { word: 'dish', meaning: '菜肴' }, { word: 'recipe', meaning: '食谱' }, { word: 'ingredient', meaning: '配料' },
    { word: 'taste', meaning: '味道' }, { word: 'flavor', meaning: '风味' }, { word: 'smell', meaning: '气味' }, { word: 'appetite', meaning: '食欲' },
    { word: 'restaurant', meaning: '餐厅' }, { word: 'cafeteria', meaning: '自助餐厅' }, { word: 'menu', meaning: '菜单' }, { word: 'order', meaning: '点餐' },
    { word: 'bill', meaning: '账单' }, { word: 'tip', meaning: '小费' }, { word: 'receipt', meaning: '收据' }, { word: 'wallet', meaning: '钱包' },
    { word: 'purse', meaning: '手提包' }, { word: 'cash', meaning: '现金' }, { word: 'credit card', meaning: '信用卡' }, { word: 'check', meaning: '支票' },
    { word: 'shopping', meaning: '购物' }, { word: 'mall', meaning: '商场' }, { word: 'supermarket', meaning: '超市' }, { word: 'grocery', meaning: '杂货店' },
    { word: 'pharmacy', meaning: '药店' }, { word: 'bakery', meaning: '面包店' }, { word: 'butcher', meaning: '肉店' }, { word: 'post office', meaning: '邮局' },
    { word: 'bank', meaning: '银行' }, { word: 'library', meaning: '图书馆' }, { word: 'museum', meaning: '博物馆' }, { word: 'gym', meaning: '健身房' },
    { word: 'pool', meaning: '游泳池' }, { word: 'stadium', meaning: '体育场' }, { word: 'court', meaning: '球场' }, { word: 'field', meaning: '场地' },
    { word: 'match', meaning: '比赛' }, { word: 'competition', meaning: '竞赛' }, { word: 'tournament', meaning: '锦标赛' }, { word: 'championship', meaning: '冠军赛' },
    { word: 'medal', meaning: '奖牌' }, { word: 'trophy', meaning: '奖杯' }, { word: 'victory', meaning: '胜利' }, { word: 'defeat', meaning: '失败' },
    { word: 'champion', meaning: '冠军' }, { word: 'record', meaning: '记录' }, { word: 'score', meaning: '比分' }, { word: 'goal', meaning: '进球' },
    { word: 'point', meaning: '分数' }, { word: 'winner', meaning: '获胜者' }, { word: 'loser', meaning: '失败者' }, { word: 'referee', meaning: '裁判' },
    { word: 'coach', meaning: '教练' }, { word: 'athlete', meaning: '运动员' }, { word: 'player', meaning: '选手' }, { word: 'fan', meaning: '粉丝' },
    // 情感表达（50词）
    { word: 'emotion', meaning: '情感' }, { word: 'feeling', meaning: '感觉' }, { word: 'mood', meaning: '心情' }, { word: 'attitude', meaning: '态度' },
    { word: 'opinion', meaning: '观点' }, { word: 'idea', meaning: '想法' }, { word: 'thought', meaning: '思想' }, { word: 'mind', meaning: '头脑' },
    { word: 'soul', meaning: '灵魂' }, { word: 'spirit', meaning: '精神' }, { word: 'character', meaning: '性格' }, { word: 'personality', meaning: '个性' },
    { word: 'behavior', meaning: '行为' }, { word: 'action', meaning: '行动' }, { word: 'habit', meaning: '习惯' }, { word: 'hobby', meaning: '爱好' },
    { word: 'interest', meaning: '兴趣' }, { word: 'talent', meaning: '天赋' }, { word: 'skill', meaning: '技能' }, { word: 'ability', meaning: '能力' },
    { word: 'effort', meaning: '努力' }, { word: 'success', meaning: '成功' }, { word: 'failure', meaning: '失败' }, { word: 'mistake', meaning: '错误' },
    { word: 'experience', meaning: '经验' }, { word: 'memory', meaning: '记忆' }, { word: 'imagination', meaning: '想象力' }, { word: 'creativity', meaning: '创造力' },
    { word: 'wisdom', meaning: '智慧' }, { word: 'knowledge', meaning: '知识' }, { word: 'information', meaning: '信息' }, { word: 'fact', meaning: '事实' },
    { word: 'truth', meaning: '真相' }, { word: 'secret', meaning: '秘密' }, { word: 'mystery', meaning: '谜' }, { word: 'puzzle', meaning: '谜题' },
    { word: 'problem', meaning: '问题' }, { word: 'solution', meaning: '解决方案' }, { word: 'answer', meaning: '答案' }, { word: 'reason', meaning: '原因' },
    { word: 'result', meaning: '结果' }, { word: 'effect', meaning: '影响' }, { word: 'cause', meaning: '原因' }, { word: 'purpose', meaning: '目的' },
    { word: 'goal', meaning: '目标' }, { word: 'plan', meaning: '计划' }, { word: 'dream', meaning: '梦想' }, { word: 'ambition', meaning: '雄心' },
    { word: 'future', meaning: '未来' }, { word: 'past', meaning: '过去' },
    // 补充词汇（11词）
    { word: 'present', meaning: '现在' }, { word: 'recent', meaning: '最近的' }, { word: 'ancient', meaning: '古代的' },
    { word: 'modern', meaning: '现代的' }, { word: 'traditional', meaning: '传统的' }, { word: 'international', meaning: '国际的' },
    { word: 'national', meaning: '国家的' }, { word: 'local', meaning: '当地的' }, { word: 'public', meaning: '公共的' },
    { word: 'private', meaning: '私人的' }, { word: 'personal', meaning: '个人的' }
];

// 英语难度词汇映射
const ENGLISH_BY_DIFFICULTY = {
    easy: englishEasy,
    normal: englishNormal,
    hard: englishHard
};

// 保留原变量供生存模式使用（综合所有词汇）
const englishWordBank = [...englishEasy, ...englishNormal, ...englishHard];

// 游戏数据
let gameData = { coins: 0, charm: 0, totalCoins: 0, totalCharm: 0, collected: {}, history: [], stats: { c: 0, b: 0, a: 0, s: 0, ss: 0, sss: 0 }, totalDraws: 0, latestSkins: [], exchangeHistory: [], currentSkin: null, achievements: {}, currentTitle: null, survivalBest: 0, adventureLevel: 0, maxCombo: 0, mathPerfect: false, chinesePerfect: false, englishPerfect: false, unlockedTitles: [] };
let mathData = { questions: [], currentIndex: 0, correct: 0, wrong: 0, earned: 0, timer: null, timeLeft: 120 };
let chineseIndex = 0;
let chineseCorrect = 0;
let englishIndex = 0;
let englishCorrect = 0;
let pendingGift = null;

// ===== 蛋币精度函数 =====
// 所有蛋币计算保留一位小数
function roundCoin(value) {
    return Math.round(value * 10) / 10;
}

// ===== 难度配置 =====
const DIFFICULTY_CONFIG = {
    easy: { name: '简单', multiplier: 1, mathRange: 20, operands: 2, reward: '×1' },
    normal: { name: '普通', multiplier: 1.5, mathRange: 20, operands: 3, reward: '×1.5' },
    hard: { name: '困难', multiplier: 2, mathRange: 50, operands: 2, reward: '×2' }
};

// 不同挑战类型的难度描述
const CHALLENGE_DESC = {
    math: {
        easy: '20以内两数加减 · 2分钟',
        normal: '20以内三数运算 · 3分钟',
        hard: '50以内两数加减 · 2分钟'
    },
    chinese: {
        easy: '基础300字拼音（1-5画）',
        normal: '扩展300字拼音（6-10画）',
        hard: '进阶300字拼音（10画以上）'
    },
    english: {
        easy: '一年级词汇',
        normal: '二三年级词汇',
        hard: '四六年级词汇'
    }
};

// ===== 成就配置 =====
// 成就奖励等级：简单50，中等100，困难200
const ACHIEVEMENT_REWARD = { easy: 50, medium: 100, hard: 200 };

const ACHIEVEMENTS = [
    { id: 'first_sss', name: '欧皇降临', desc: '首次获得SSS皮肤', icon: '🌟', reward: ACHIEVEMENT_REWARD.hard, condition: (d) => d.stats.sss > 0 },
    { id: 'collect_10', name: '收藏家', desc: '收集10种皮肤', icon: '📦', reward: ACHIEVEMENT_REWARD.easy, condition: (d) => Object.keys(d.collected).length >= 10 },
    { id: 'collect_all', name: '大满贯', desc: '收集全部30种皮肤', icon: '🏆', reward: ACHIEVEMENT_REWARD.hard, condition: (d) => Object.keys(d.collected).length >= 30 },
    { id: 'math_master', name: '数学小天才', desc: '数学挑战满分', icon: '🔢', reward: ACHIEVEMENT_REWARD.medium, condition: (d) => d.mathPerfect },
    { id: 'chinese_master', name: '语文小博士', desc: '语文挑战连续10题全对', icon: '📖', reward: ACHIEVEMENT_REWARD.medium, condition: (d) => d.chinesePerfect },
    { id: 'english_master', name: '英语达人', desc: '英语挑战满分', icon: '🔤', reward: ACHIEVEMENT_REWARD.medium, condition: (d) => d.englishPerfect },
    { id: 'survival_20', name: '生存专家', desc: '生存模式答对20题', icon: '⏱️', reward: ACHIEVEMENT_REWARD.easy, condition: (d) => d.survivalBest >= 20 },
    { id: 'survival_50', name: '生存大师', desc: '生存模式答对50题', icon: '🔥', reward: ACHIEVEMENT_REWARD.hard, condition: (d) => d.survivalBest >= 50 },
    { id: 'adventure_5', name: '闯关新手', desc: '闯关模式通过5关', icon: '🎯', reward: ACHIEVEMENT_REWARD.easy, condition: (d) => d.adventureLevel >= 5 },
    { id: 'adventure_10', name: '闯关王者', desc: '闯关模式通关', icon: '👑', reward: ACHIEVEMENT_REWARD.hard, condition: (d) => d.adventureLevel >= 10 },
    { id: 'draw_100', name: '抽卡狂魔', desc: '累计抽卡100次', icon: '🎰', reward: ACHIEVEMENT_REWARD.easy, condition: (d) => d.totalDraws >= 100 },
    { id: 'draw_500', name: '赌神', desc: '累计抽卡500次', icon: '💎', reward: ACHIEVEMENT_REWARD.hard, condition: (d) => d.totalDraws >= 500 },
    { id: 'charm_1000', name: '魅力四射', desc: '累计获取1000魅力值', icon: '✨', reward: ACHIEVEMENT_REWARD.medium, condition: (d) => (d.totalCharm || d.charm) >= 1000 },
    { id: 'charm_10000', name: '魅力之王', desc: '累计获取10000魅力值', icon: '💫', reward: ACHIEVEMENT_REWARD.hard, condition: (d) => (d.totalCharm || d.charm) >= 10000 },
    { id: 'combo_10', name: '连击新手', desc: '达成10连击', icon: '⚡', reward: ACHIEVEMENT_REWARD.easy, condition: (d) => d.maxCombo >= 10 },
    { id: 'combo_30', name: '连击大师', desc: '达成30连击', icon: '💥', reward: ACHIEVEMENT_REWARD.hard, condition: (d) => d.maxCombo >= 30 },
    { id: 'rich', name: '富翁', desc: '累计获取10000蛋币', icon: '💰', reward: ACHIEVEMENT_REWARD.medium, condition: (d) => (d.totalCoins || d.coins) >= 10000 },
    { id: 'study_star', name: '学习之星', desc: '三种挑战各满分1次', icon: '⭐', reward: ACHIEVEMENT_REWARD.hard, condition: (d) => d.achievements.math_master && d.achievements.chinese_master && d.achievements.english_master },
    { id: 'ss_collector', name: 'SS收藏家', desc: '收集5种SS皮肤', icon: '🟡', reward: ACHIEVEMENT_REWARD.hard, condition: (d) => countRarity(d.collected, 'ss') >= 5 },
    { id: 's_collector', name: 'S收藏家', desc: '收集5种S皮肤', icon: '🟣', reward: ACHIEVEMENT_REWARD.medium, condition: (d) => countRarity(d.collected, 's') >= 5 }
];

// 称号列表（从成就转化）
const TITLES = [
    { id: 'first_sss', name: '欧皇', icon: '🌟' },
    { id: 'collect_all', name: '大满贯', icon: '🏆' },
    { id: 'math_master', name: '数学天才', icon: '🔢' },
    { id: 'chinese_master', name: '语文博士', icon: '📖' },
    { id: 'english_master', name: '英语达人', icon: '🔤' },
    { id: 'survival_50', name: '生存大师', icon: '🔥' },
    { id: 'adventure_10', name: '闯关王者', icon: '👑' },
    { id: 'draw_500', name: '赌神', icon: '💎' },
    { id: 'charm_10000', name: '魅力之王', icon: '💫' },
    { id: 'combo_30', name: '连击大师', icon: '💥' }
];

function countRarity(collected, rarity) {
    return Object.keys(collected).filter(k => k.startsWith(rarity + '_')).length;
}

// 当前挑战难度
let currentDifficulty = 'normal';
let currentChallengeType = null;

// 生存模式数据
let survivalData = { timer: null, timeLeft: 60, correct: 0, combo: 0, maxCombo: 0, currentQuestion: null, earned: 0 };

// 闯关模式数据
let adventureData = { level: 1, hearts: 3, correct: 0, currentQuestion: null };

// 当前弹窗类型
let currentAchievementTab = 'achievement';

// ===== 初始化 =====
function init() {
    createStars();
    loadGameData();
    // 默认无皮肤状态（currentSkin为null）
    updateDisplay();
    updateEggDisplay();
    updateAchievementCount();
    updateCollection();
    updateStats();
    updateLatestItems();
    updateExchangeDisplay();
    checkAchievements();
}

// 生成分享二维码
function generateShareQrcode() {
    const container = document.getElementById('shareQrcode');
    if (!container) return;

    // 清空容器
    container.innerHTML = '';

    // 使用 qrcode-generator 生成二维码
    const qr = qrcode(0, 'M');
    qr.addData('https://frame-srdi.upma.site/');
    qr.make();

    // 创建 table 格式的二维码
    container.innerHTML = qr.createImgTag(3, 80);

    // 或者使用 table 格式（更清晰）
    const size = 80;
    const cellSize = size / qr.getModuleCount();
    let html = '<table style="border:0;border-collapse:collapse;">';
    for (let row = 0; row < qr.getModuleCount(); row++) {
        html += '<tr>';
        for (let col = 0; col < qr.getModuleCount(); col++) {
            const color = qr.isDark(row, col) ? '#333' : '#fff';
            html += `<td style="width:${cellSize}px;height:${cellSize}px;background:${color};"></td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    container.innerHTML = html;
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

// ===== 难度选择 =====
function showChallengeMode(type) {
    currentChallengeType = type;
    const modal = document.getElementById('difficultyModal');
    const container = document.getElementById('difficultyOptions');

    let html = '';
    for (const [key, config] of Object.entries(DIFFICULTY_CONFIG)) {
        const desc = CHALLENGE_DESC[type]?.[key] || config.name;
        html += `<button class="difficulty-btn ${key}" onclick="startChallengeWithDifficulty('${key}')">
            <div class="difficulty-name">${config.name}</div>
            <div class="difficulty-desc">${desc}</div>
            <div class="difficulty-reward">奖励 ${config.reward}</div>
        </button>`;
    }
    container.innerHTML = html;
    modal.classList.add('active');
}
function closeDifficultyModal() {
    document.getElementById('difficultyModal').classList.remove('active');
}
function startChallengeWithDifficulty(difficulty) {
    currentDifficulty = difficulty;
    closeDifficultyModal();

    if (currentChallengeType === 'math') startMathQuiz();
    else if (currentChallengeType === 'chinese') startChineseQuiz();
    else if (currentChallengeType === 'english') startEnglishQuiz();
}

// ===== 生存模式 =====
function startSurvivalMode() {
    survivalData = { timer: null, timeLeft: 60, correct: 0, combo: 0, maxCombo: 0, currentQuestion: null, earned: 0 };
    document.getElementById('survivalModal').classList.add('active');
    document.getElementById('survivalCorrect').textContent = '0';
    document.getElementById('survivalCombo').textContent = '0';
    document.getElementById('survivalTimer').textContent = '60';
    generateSurvivalQuestion();
    startSurvivalTimer();
}
function startSurvivalTimer() {
    survivalData.timer = setInterval(() => {
        survivalData.timeLeft--;
        document.getElementById('survivalTimer').textContent = survivalData.timeLeft;
        if (survivalData.timeLeft <= 0) {
            endSurvivalMode();
        }
    }, 1000);
}
function generateSurvivalQuestion() {
    const types = ['math', 'chinese'];
    const type = types[Math.floor(Math.random() * types.length)];

    if (type === 'math') {
        const a = Math.floor(Math.random() * 20);
        const b = Math.floor(Math.random() * 20);
        const op = Math.random() > 0.5 ? '+' : '-';
        const answer = op === '+' ? a + b : (a >= b ? a - b : b - a);
        const displayA = op === '-' && a < b ? b : a;
        const displayB = op === '-' && a < b ? a : b;

        survivalData.currentQuestion = { type: 'math', answer };
        document.getElementById('survivalQuestion').textContent = `${displayA} ${op} ${displayB} = ?`;

        const options = [answer];
        while (options.length < 4) {
            const wrong = answer + Math.floor(Math.random() * 10) - 5;
            if (wrong !== answer && wrong >= 0 && !options.includes(wrong)) options.push(wrong);
        }
        options.sort(() => Math.random() - 0.5);
        document.getElementById('survivalOptions').innerHTML = options.map(o =>
            `<div class="survival-option" onclick="selectSurvivalAnswer(${o})">${o}</div>`
        ).join('');
    } else {
        const chars = Object.keys(pinyinData);
        const char = chars[Math.floor(Math.random() * chars.length)];
        const correctPinyin = pinyinData[char];

        survivalData.currentQuestion = { type: 'chinese', answer: correctPinyin };
        document.getElementById('survivalQuestion').textContent = char;

        const allPinyins = Object.values(pinyinData).filter(p => p !== correctPinyin);
        const options = [correctPinyin];
        while (options.length < 4) {
            const wrong = allPinyins[Math.floor(Math.random() * allPinyins.length)];
            if (!options.includes(wrong)) options.push(wrong);
        }
        options.sort(() => Math.random() - 0.5);
        document.getElementById('survivalOptions').innerHTML = options.map(o =>
            `<div class="survival-option" onclick="selectSurvivalAnswer('${o}')">${o}</div>`
        ).join('');
    }
}
function selectSurvivalAnswer(answer) {
    const correct = String(answer) === String(survivalData.currentQuestion.answer);
    const options = document.querySelectorAll('.survival-option');

    options.forEach(opt => {
        if (opt.textContent === String(survivalData.currentQuestion.answer)) {
            opt.classList.add('correct');
        } else if (opt.textContent === String(answer) && !correct) {
            opt.classList.add('wrong');
        }
        opt.style.pointerEvents = 'none';
    });

    if (correct) {
        survivalData.correct++;
        survivalData.combo++;
        if (survivalData.combo > survivalData.maxCombo) survivalData.maxCombo = survivalData.combo;

        // 更新历史最大连击
        if (survivalData.combo > gameData.maxCombo) {
            gameData.maxCombo = survivalData.combo;
            saveGameData();
            checkAchievements(); // 触发连击成就弹框
        }

        // 连击奖励：基础2蛋币，连击越高奖励越高
        let bonus = 2; // 基础2蛋币
        if (survivalData.combo >= 5) bonus = 3;
        if (survivalData.combo >= 10) bonus = 5;
        if (survivalData.combo >= 20) bonus = 8;
        if (survivalData.combo >= 30) bonus = 12;
        survivalData.earned += bonus; // 记录实际获得的蛋币
        addCoins(bonus);
        saveGameData();
        updateDisplay();

        // 连击动画
        const comboEl = document.getElementById('survivalCombo');
        comboEl.textContent = survivalData.combo;
        comboEl.classList.add('combo-fire');
        setTimeout(() => comboEl.classList.remove('combo-fire'), 300);
    } else {
        survivalData.combo = 0;
        document.getElementById('survivalCombo').textContent = '0';
    }

    document.getElementById('survivalCorrect').textContent = survivalData.correct;

    setTimeout(() => {
        if (survivalData.timeLeft > 0) {
            generateSurvivalQuestion();
        }
    }, 300);
}
function endSurvivalMode() {
    clearInterval(survivalData.timer);
    document.getElementById('survivalModal').classList.remove('active');

    // 更新最佳记录
    if (survivalData.correct > gameData.survivalBest) {
        gameData.survivalBest = survivalData.correct;
        saveGameData();
    }

    checkAchievements();

    // 显示实际获得的蛋币（已在答题过程中累加）
    showResult('⏱️', '生存结束！', `答对 ${survivalData.correct} 题 | 最高连击 ${survivalData.maxCombo}`, `+${survivalData.earned} 蛋币`, survivalData.maxCombo >= 20 ? '🔥 连击大师！' : '');
}
function closeSurvivalMode() {
    clearInterval(survivalData.timer);
    document.getElementById('survivalModal').classList.remove('active');
}

// ===== 闯关模式 =====
function startAdventureMode() {
    adventureData = { level: 1, hearts: 3, correct: 0, currentQuestion: null };
    document.getElementById('adventureModal').classList.add('active');
    updateAdventureUI();
    generateAdventureQuestion();
}
function updateAdventureUI() {
    document.getElementById('adventureLevel').textContent = adventureData.level;
    document.getElementById('adventureHearts').textContent = '❤️'.repeat(adventureData.hearts) + '🖤'.repeat(3 - adventureData.hearts);
}
function generateAdventureQuestion() {
    const level = adventureData.level;
    // 关卡难度映射：1-3关(easy), 4-7关(normal), 8-10关(hard)
    const difficulty = level <= 3 ? 'easy' : (level <= 7 ? 'normal' : 'hard');
    const config = DIFFICULTY_CONFIG[difficulty];

    // 完全对齐数学挑战难度配置
    const range = config.mathRange;
    const operands = config.operands;
    const ops = ['+', '-'];  // 统一使用加减运算

    let answer, questionText;

    if (operands === 2) {
        // 两数运算（easy/hard）
        const a = Math.floor(Math.random() * range);
        const b = Math.floor(Math.random() * range);
        const op = ops[Math.floor(Math.random() * ops.length)];

        if (op === '+') {
            answer = a + b;
            questionText = `${a} + ${b} = ?`;
        } else {
            // 减法确保结果非负
            const displayA = Math.max(a, b);
            const displayB = Math.min(a, b);
            answer = displayA - displayB;
            questionText = `${displayA} - ${displayB} = ?`;
        }
    } else {
        // 三数运算（normal）
        const a = Math.floor(Math.random() * range);
        const b = Math.floor(Math.random() * range);
        const c = Math.floor(Math.random() * range);
        const op1 = ops[Math.floor(Math.random() * ops.length)];
        const op2 = ops[Math.floor(Math.random() * ops.length)];

        // 计算三数运算结果（确保中间结果非负）
        let result1, displayA1, displayB1;
        if (op1 === '+') {
            result1 = a + b;
            displayA1 = a;
            displayB1 = b;
        } else {
            displayA1 = Math.max(a, b);
            displayB1 = Math.min(a, b);
            result1 = displayA1 - displayB1;
        }

        let finalAnswer, displayC;
        if (op2 === '+') {
            finalAnswer = result1 + c;
            displayC = c;
        } else {
            displayC = Math.min(result1, c);
            finalAnswer = result1 - displayC;
        }

        answer = finalAnswer;
        questionText = `${displayA1} ${op1} ${displayB1} ${op2} ${displayC} = ?`;
    }

    adventureData.currentQuestion = { answer };
    document.getElementById('adventureQuestion').textContent = questionText;

    // 生成选项
    const options = [answer];
    while (options.length < 4) {
        const wrong = answer + Math.floor(Math.random() * 10) - 5;
        if (wrong !== answer && wrong >= 0 && !options.includes(wrong)) options.push(wrong);
    }
    options.sort(() => Math.random() - 0.5);
    document.getElementById('adventureOptions').innerHTML = options.map(o =>
        `<div class="adventure-option" onclick="selectAdventureAnswer(${o})">${o}</div>`
    ).join('');
}
function selectAdventureAnswer(answer) {
    const correct = answer === adventureData.currentQuestion.answer;
    const options = document.querySelectorAll('.adventure-option');

    options.forEach(opt => {
        if (parseInt(opt.textContent) === adventureData.currentQuestion.answer) {
            opt.classList.add('correct');
        } else if (parseInt(opt.textContent) === answer && !correct) {
            opt.classList.add('wrong');
        }
        opt.style.pointerEvents = 'none';
    });

    if (correct) {
        adventureData.correct++;
        // 答对题目不直接给蛋币，通关才给

        if (adventureData.correct >= 5) {
            // 通关当前关卡（每关5题）
            adventureData.level++;
            adventureData.correct = 0;

            // 通关奖励10蛋币
            addCoins(10);

            if (adventureData.level > gameData.adventureLevel) {
                gameData.adventureLevel = adventureData.level;
            }
            saveGameData();

            if (adventureData.level > 10) {
                // 全部通关，额外+100蛋币
                setTimeout(() => {
                    closeAdventureMode();
                    addCoins(100);
                    saveGameData();
                    updateDisplay();
                    checkAchievements();
                    showResult('👑', '恭喜通关！', '闯过全部10关！', '+110 蛋币', '🏆 闯关王者！');
                }, 500);
                return;
            }
        }

        saveGameData();
        updateDisplay();
        updateAdventureUI();

        setTimeout(generateAdventureQuestion, 500);
    } else {
        adventureData.hearts--;
        updateAdventureUI();

        if (adventureData.hearts <= 0) {
            setTimeout(() => {
                closeAdventureMode();
                checkAchievements();
                showResult('💔', '闯关失败', `到达第 ${adventureData.level} 关`, '', '再接再厉！');
            }, 500);
        } else {
            setTimeout(generateAdventureQuestion, 500);
        }
    }
}
function closeAdventureMode() {
    document.getElementById('adventureModal').classList.remove('active');
}

// ===== 成就系统 =====
function showAchievementModal() {
    document.getElementById('achievementModal').classList.add('active');
    renderAchievementList();
}
function closeAchievementModal() {
    document.getElementById('achievementModal').classList.remove('active');
}
function switchAchievementTab(tab) {
    currentAchievementTab = tab;
    renderAchievementList();
}
function renderAchievementList() {
    const container = document.getElementById('achievementList');

    // 同步更新tab按钮状态
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach((btn, index) => {
        if ((index === 0 && currentAchievementTab === 'achievement') ||
            (index === 1 && currentAchievementTab === 'title')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (currentAchievementTab === 'achievement') {
        container.innerHTML = ACHIEVEMENTS.map(ach => {
            // 使用 gameData.achievements 作为唯一真相来源
            const unlocked = gameData.achievements[ach.id];
            return `<div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-item-icon">${unlocked ? ach.icon : '🔒'}</div>
                <div class="achievement-item-info">
                    <div class="achievement-item-name">${ach.name}</div>
                    <div class="achievement-item-desc">${ach.desc}</div>
                </div>
                <div class="achievement-item-status ${unlocked ? 'unlocked' : 'locked'}">${unlocked ? '已解锁' : '未解锁'}</div>
            </div>`;
        }).join('');
    } else {
        // 称号列表
        container.innerHTML = TITLES.map(title => {
            const unlocked = gameData.achievements[title.id];
            const equipped = gameData.currentTitle === title.id;
            return `<div class="achievement-item title-item ${unlocked ? 'unlocked' : 'locked'} ${equipped ? 'equipped' : ''}" onclick="equipTitle('${title.id}')">
                <div class="achievement-item-icon">${unlocked ? title.icon : '🔒'}</div>
                <div class="achievement-item-info">
                    <div class="achievement-item-name">${title.name}</div>
                    <div class="achievement-item-desc">${ACHIEVEMENTS.find(a => a.id === title.id)?.desc || ''}</div>
                </div>
                ${unlocked ? `<button class="equip-btn ${equipped ? 'equipped' : ''}">${equipped ? '已装备' : '装备'}</button>` : '<div class="achievement-item-status locked">未解锁</div>'}
            </div>`;
        }).join('');
    }
}
function equipTitle(titleId) {
    const title = TITLES.find(t => t.id === titleId);
    if (!title) return;

    const unlocked = ACHIEVEMENTS.find(a => a.id === titleId)?.condition(gameData);
    if (!unlocked) return;

    if (gameData.currentTitle === titleId) {
        gameData.currentTitle = null;
    } else {
        gameData.currentTitle = titleId;
    }
    saveGameData();
    updateEggDisplay();
    renderAchievementList();
}

function checkAchievements() {
    let newAchievements = [];
    let newTitles = [];

    ACHIEVEMENTS.forEach(ach => {
        if (!gameData.achievements[ach.id] && ach.condition(gameData)) {
            gameData.achievements[ach.id] = true;
            newAchievements.push(ach);

            // 发放成就奖励蛋币
            if (ach.reward) {
                addCoins(ach.reward);
            }

            // 检查是否解锁对应称号
            const title = TITLES.find(t => t.id === ach.id);
            if (title && !gameData.unlockedTitles?.includes(title.id)) {
                if (!gameData.unlockedTitles) gameData.unlockedTitles = [];
                gameData.unlockedTitles.push(title.id);
                newTitles.push(title);
            }
        }
    });

    if (newAchievements.length > 0 || newTitles.length > 0) {
        saveGameData();
        updateDisplay(); // 更新界面显示蛋币余额
    }

    // 先显示成就弹框，然后显示称号弹框
    if (newAchievements.length > 0) {
        pendingTitlesAfterAchievement = newTitles;
        showAchievementUnlock(newAchievements[0]);
    } else if (newTitles.length > 0) {
        showTitleUnlock(newTitles[0]);
    }

    updateAchievementCount();
}

// 待显示的称号队列
let pendingTitlesAfterAchievement = [];

// 显示成就解锁庆贺弹窗
let pendingAchievements = [];
function showAchievementUnlock(achievement) {
    if (!achievement) return;

    // 如果已有弹窗显示，加入队列
    if (document.getElementById('achievementUnlockModal').classList.contains('active')) {
        pendingAchievements.push(achievement);
        return;
    }

    document.getElementById('unlockIcon').textContent = achievement.icon;
    document.getElementById('unlockName').textContent = achievement.name;
    document.getElementById('unlockDesc').textContent = achievement.desc;
    document.getElementById('unlockReward').textContent = `+${achievement.reward || 50} 蛋币`;
    document.getElementById('achievementUnlockModal').classList.add('active');

    // 播放庆贺音效
    playUnlockSound();
}

function closeAchievementUnlock() {
    document.getElementById('achievementUnlockModal').classList.remove('active');

    // 检查是否有待显示的称号
    if (pendingTitlesAfterAchievement.length > 0) {
        const title = pendingTitlesAfterAchievement.shift();
        setTimeout(() => showTitleUnlock(title), 300);
        return;
    }

    // 检查是否有待显示的成就
    if (pendingAchievements.length > 0) {
        const next = pendingAchievements.shift();
        setTimeout(() => showAchievementUnlock(next), 300);
    }
}

// 显示称号解锁弹框
let pendingTitles = [];
let currentShowingTitle = null;
function showTitleUnlock(title) {
    if (!title) return;

    // 如果已有弹窗显示，加入队列
    if (document.getElementById('titleUnlockModal').classList.contains('active')) {
        pendingTitles.push(title);
        return;
    }

    currentShowingTitle = title;
    document.getElementById('titleUnlockIcon').textContent = title.icon;
    document.getElementById('titleUnlockName').textContent = title.name;
    document.getElementById('titleUnlockModal').classList.add('active');

    // 播放称号解锁音效
    playTitleUnlockSound();
}

function closeTitleUnlockAndEquip() {
    // 装备当前称号
    if (currentShowingTitle) {
        gameData.currentTitle = currentShowingTitle.id;
        saveGameData();
        updateEggDisplay();
    }
    closeTitleUnlock();
}

function closeTitleUnlock() {
    document.getElementById('titleUnlockModal').classList.remove('active');
    currentShowingTitle = null;

    // 检查是否有待显示的称号
    if (pendingTitles.length > 0) {
        const next = pendingTitles.shift();
        setTimeout(() => showTitleUnlock(next), 300);
    }
}

function playTitleUnlockSound() {
    if (!audioCtx) initAudioContext();
    if (!audioCtx) return;

    try {
        // 称号解锁特殊音效
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.15);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime + i * 0.15);
            gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime + i * 0.15 + 0.3);
            oscillator.start(audioCtx.currentTime + i * 0.15);
            oscillator.stop(audioCtx.currentTime + i * 0.15 + 0.3);
        });
    } catch(e) {}
}

function playUnlockSound() {
    // 使用 AudioContext 播放简单的解锁音效
    if (!audioCtx) initAudioContext();
    if (!audioCtx) return;

    try {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5

        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialDecayTo && gainNode.gain.exponentialDecayTo(0.01, audioCtx.currentTime + 0.5);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.5);
    } catch(e) {}
}
function updateAchievementCount() {
    // 使用 gameData.achievements 计算数量
    // 注意：不要在这里解锁成就，否则会绕过 checkAchievements 的奖励发放
    const unlocked = ACHIEVEMENTS.filter(a => gameData.achievements[a.id]).length;
    document.getElementById('achievementCount').textContent = `${unlocked}/${ACHIEVEMENTS.length}`;
}
function loadGameData() {
    try {
        const s = localStorage.getItem('eggPartyGame');
        if (s) {
            const saved = JSON.parse(s);
            gameData = { ...gameData, ...saved };
        }
    } catch(e) {
        console.log('localStorage not available');
    }
}

// 添加蛋币（同时累加总计，触发成就检查）
function addCoins(amount) {
    const oldTotal = gameData.totalCoins || 0;
    gameData.coins += amount;
    gameData.totalCoins = oldTotal + amount;

    // 检查是否达到蛋币成就阈值（10000）
    const thresholds = [10000];
    for (const t of thresholds) {
        if (oldTotal < t && gameData.totalCoins >= t) {
            checkAchievements();
            break;
        }
    }
}

// 添加魅力值（同时累加总计，触发成就检查）
function addCharm(amount) {
    const oldTotal = gameData.totalCharm || 0;
    gameData.charm += amount;
    gameData.totalCharm = oldTotal + amount;

    // 检查是否达到魅力值成就阈值（1000, 10000）
    const thresholds = [1000, 10000];
    for (const t of thresholds) {
        if (oldTotal < t && gameData.totalCharm >= t) {
            checkAchievements();
            break;
        }
    }
}

function saveGameData() {
    // 确保数值为整数，防止浮点数精度问题
    gameData.coins = roundCoin(gameData.coins);
    gameData.charm = roundCoin(gameData.charm);
    try {
        localStorage.setItem('eggPartyGame', JSON.stringify(gameData));
    } catch(e) {
        console.log('localStorage not available');
    }
}
function updateDisplay() {
    document.getElementById('coinAmount').textContent = roundCoin(gameData.coins);
    document.getElementById('charmAmount').textContent = roundCoin(gameData.charm);
    updateExchangeDisplay();
    updateStats();
}

// ===== 蛋仔展示 =====
function updateEggDisplay() {
    const overlay = document.getElementById('eggSkinOverlay');
    const nameEl = document.getElementById('eggDisplayName');
    const rarityEl = document.getElementById('eggDisplayRarity');
    const cardEl = document.getElementById('eggDisplayCard');
    const titleEl = document.getElementById('eggDisplayTitle');

    // 显示称号
    if (gameData.currentTitle) {
        const title = TITLES.find(t => t.id === gameData.currentTitle);
        if (title) {
            titleEl.textContent = `${title.icon} ${title.name}`;
            titleEl.style.display = 'block';
        }
    } else {
        titleEl.style.display = 'none';
    }

    const skin = gameData.currentSkin;
    if (!skin) {
        // 无皮肤状态 - 只展示蛋仔
        overlay.classList.remove('active');
        overlay.textContent = '';
        nameEl.textContent = '蛋仔';
        rarityEl.textContent = '';
        rarityEl.className = 'egg-display-rarity';
        cardEl.className = 'egg-display-card';
    } else {
        // 有皮肤状态 - 蛋仔+皮肤叠加
        overlay.classList.add('active');
        overlay.textContent = skin.icon;
        nameEl.textContent = skin.name;
        rarityEl.textContent = skin.rarity.toUpperCase();
        rarityEl.className = `egg-display-rarity ${skin.rarity}`;
        cardEl.className = `egg-display-card rarity-${skin.rarity}`;
    }
}
function changeSkin(rarity, index) {
    // 点击当前装备的皮肤 -> 取消装备（回到无皮肤状态）
    if (gameData.currentSkin && gameData.currentSkin.rarity === rarity && gameData.currentSkin.index === index) {
        gameData.currentSkin = null;
        saveGameData();
        updateEggDisplay();
        updateCollection();
        playFlipSound();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const skin = skins[rarity][index];
    if (!skin) return;
    gameData.currentSkin = { rarity, name: skin.name, icon: skin.icon, index };
    saveGameData();
    updateEggDisplay();
    updateCollection();
    playFlipSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 数学题 =====
function startMathQuiz() {
    const config = DIFFICULTY_CONFIG[currentDifficulty];
    const range = config.mathRange;
    const operands = config.operands;

    // 三数运算限时3分钟，两数运算限时2分钟
    const timeLimit = operands === 3 ? 180 : 120;
    mathData = { questions: [], currentIndex: 0, correct: 0, wrong: 0, earned: 0, timer: null, timeLeft: timeLimit };
    for (let i = 0; i < 20; i++) {
        let question;
        if (operands === 2) {
            // 两数运算：加减法
            let a, b, op, ans;
            do {
                a = Math.floor(Math.random() * (range + 1));
                b = Math.floor(Math.random() * (range + 1));
                op = Math.random() > 0.5 ? '+' : '-';
                if (op === '+') ans = a + b;
                else { if (a < b) [a, b] = [b, a]; ans = a - b; }
            } while (ans > range || ans < 0);
            question = { display: `${a} ${op} ${b} = ?`, ans };
        } else {
            // 三数运算：a + b ± c 或 a - b + c 等
            let a, b, c, op1, op2, ans;
            do {
                a = Math.floor(Math.random() * (range + 1));
                b = Math.floor(Math.random() * (range + 1));
                c = Math.floor(Math.random() * (range + 1));
                op1 = Math.random() > 0.5 ? '+' : '-';
                op2 = Math.random() > 0.5 ? '+' : '-';
                // 先计算第一步，确保中间结果不为负
                let mid;
                if (op1 === '+') mid = a + b;
                else { if (a < b) [a, b] = [b, a]; mid = a - b; }
                // 再计算第二步
                if (op2 === '+') ans = mid + c;
                else { if (mid < c) { c = Math.floor(Math.random() * (mid + 1)); } ans = mid - c; }
            } while (ans > range || ans < 0);
            question = { display: `${a} ${op1} ${b} ${op2} ${c} = ?`, ans };
        }
        mathData.questions.push(question);
    }
    // 动态更新奖励信息（根据难度倍率）
    const perQuestion = roundCoin(2 * config.multiplier);
    const perfectBonus = roundCoin(20 * config.multiplier);
    document.getElementById('mathRewardInfo').textContent = `每题+${perQuestion}蛋币 | 满分额外+${perfectBonus}蛋币`;

    document.getElementById('mathModal').classList.add('active');
    document.getElementById('mathCorrect').textContent = '0';
    document.getElementById('mathWrong').textContent = '0';
    document.getElementById('mathEarned').textContent = '0';
    showMathQuestion();
    startMathTimer();
}
function showMathQuestion() {
    const q = mathData.questions[mathData.currentIndex];
    document.getElementById('mathQuestion').textContent = q.display;
    document.getElementById('mathCurrent').textContent = mathData.currentIndex + 1;
    document.getElementById('mathInput').value = '';
    document.getElementById('mathInput').focus();
}
function submitMathAnswer() {
    const ans = parseInt(document.getElementById('mathInput').value);
    if (isNaN(ans)) return;
    const config = DIFFICULTY_CONFIG[currentDifficulty];
    const q = mathData.questions[mathData.currentIndex];
    const reward = roundCoin(2 * config.multiplier); // 每题2蛋币
    if (ans === q.ans) {
        mathData.correct++;
        mathData.earned += reward;
        document.getElementById('mathCorrect').textContent = mathData.correct;
        document.getElementById('mathEarned').textContent = mathData.earned;
        addCoins(reward);
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
    const config = DIFFICULTY_CONFIG[currentDifficulty]; // 修复：定义 config 变量
    const timeUsed = 120 - mathData.timeLeft;
    let mult = 1, bonus = '';
    if (timeUsed <= 60) { mult = 2; bonus = '⚡ 极速完成！×2倍奖励'; }
    else if (timeUsed <= 90) { mult = 1.5; bonus = '🚀 快速完成！×1.5倍奖励'; }
    else { bonus = `⏱️ 用时: ${Math.floor(timeUsed/60)}分${timeUsed%60}秒`; }
    let extraBonus = 0;
    if (mathData.correct === 20) {
        extraBonus = roundCoin(20 * config.multiplier); // 满分额外+20蛋币
        bonus += '<br>🏆 全部答对！额外+20蛋币';
        // 标记数学满分，checkAchievements 会检测并触发弹框
        gameData.mathPerfect = true;
    }
    // 效率加成：mathData.earned 是基础奖励（已含难度倍率），再乘效率倍率
    // 但这里只补发加成部分，因为基础奖励答题时已发
    const baseEarned = mathData.earned;
    const efficiencyBonus = roundCoin(baseEarned * (mult - 1)); // 只补发加成部分
    const totalReward = baseEarned + extraBonus + efficiencyBonus;
    let title = '', icon = '';
    if (mathData.correct === 20) { title = '满分！天才数学家！'; icon = '🏆'; }
    else if (mathData.correct >= 18) { title = '太棒了！接近满分！'; icon = '🎉'; }
    else if (mathData.correct >= 15) { title = '优秀！数学高手！'; icon = '👍'; }
    else if (mathData.correct >= 10) { title = '不错！继续加油！'; icon = '💪'; }
    else { title = '还需努力！'; icon = '📚'; }
    // 只补发效率加成和满分额外奖励（基础奖励答题时已发）
    addCoins(efficiencyBonus + extraBonus);
    saveGameData();
    updateDisplay();
    checkAchievements();
    showResult(icon, title, `正确 ${mathData.correct}/20 题`, `共获得 ${totalReward} 蛋币`, bonus);
}
function closeMathQuiz() { clearInterval(mathData.timer); document.getElementById('mathModal').classList.remove('active'); }

// ===== 语文题 =====
function startChineseQuiz() {
    chineseIndex = 0;
    chineseCorrect = 0;
    // 动态更新奖励信息（根据难度倍率）
    const config = DIFFICULTY_CONFIG[currentDifficulty];
    const perQuestion = roundCoin(2 * config.multiplier);
    const perfectBonus = roundCoin(10 * config.multiplier);
    document.getElementById('chineseRewardInfo').textContent = `每题+${perQuestion}蛋币 | 满分额外+${perfectBonus}蛋币`;

    document.getElementById('chineseModal').classList.add('active');
    showChineseQuestion();
}
function showChineseQuestion() {
    // 根据难度选择对应字库
    const currentPinyinData = PINYIN_BY_DIFFICULTY[currentDifficulty];
    const chars = Object.keys(currentPinyinData);
    const char = chars[Math.floor(Math.random() * chars.length)];
    const correctPinyin = currentPinyinData[char];
    // 错误选项也从对应难度字库中选取
    const allPinyins = Object.values(currentPinyinData).filter(p => p !== correctPinyin);
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
    const config = DIFFICULTY_CONFIG[currentDifficulty];
    const reward = roundCoin(2 * config.multiplier); // 每题2蛋币
    document.querySelectorAll('.pinyin-option').forEach(o => o.style.pointerEvents = 'none');
    if (sel === correct) {
        btn.classList.add('correct');
        addCoins(reward);
        chineseCorrect++;
        saveGameData();
        updateDisplay();
    } else {
        btn.classList.add('wrong');
        document.querySelectorAll('.pinyin-option').forEach(o => { if (o.textContent === correct) o.classList.add('correct'); });
    }
    setTimeout(() => {
        chineseIndex++;
        if (chineseIndex < 10) showChineseQuestion();
        else {
            closeChineseQuiz();
            const config = DIFFICULTY_CONFIG[currentDifficulty];
            const totalReward = roundCoin(chineseCorrect * 2 * config.multiplier); // 每题2蛋币
            let bonusText = `答对 ${chineseCorrect}/10 题`;

            // 标记语文满分
            if (chineseCorrect === 10) {
                gameData.chinesePerfect = true;
                addCoins(roundCoin(10 * config.multiplier)); // 满分额外+10蛋币
                bonusText = '🎉 全部答对！额外+10蛋币';
            }

            showResult('📖', '语文挑战完成！', `完成10道题目`, `+${totalReward + (chineseCorrect === 10 ? roundCoin(10 * config.multiplier) : 0)} 蛋币`, bonusText);
            saveGameData();
            updateDisplay();
            checkAchievements();
        }
    }, 1000);
}
function closeChineseQuiz() { document.getElementById('chineseModal').classList.remove('active'); }

// ===== 英语题 =====
function startEnglishQuiz() {
    englishIndex = 0;
    englishCorrect = 0;
    // 动态更新奖励信息（根据难度倍率）
    const config = DIFFICULTY_CONFIG[currentDifficulty];
    const perQuestion = roundCoin(5 * config.multiplier);
    const perfectBonus = roundCoin(25 * config.multiplier);
    document.getElementById('englishRewardInfo').textContent = `每题+${perQuestion}蛋币 | 满分额外+${perfectBonus}蛋币`;

    document.getElementById('englishModal').classList.add('active');
    showEnglishQuestion();
}
function showEnglishQuestion() {
    // 停止正在进行的录音
    if (currentMediaRecorder && currentMediaRecorder.state === 'recording') {
        clearTimeout(recordingTimer);
        currentMediaRecorder.stop();
    }

    // 根据难度选择对应词汇库
    const currentWordBank = ENGLISH_BY_DIFFICULTY[currentDifficulty];
    const data = currentWordBank[Math.floor(Math.random() * currentWordBank.length)];
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
// 录音状态管理
let currentMediaRecorder = null;
let currentStream = null;
let recordingTimer = null;

function startSpeaking() {
    const btn = document.getElementById('speakBtn');
    const res = document.getElementById('speechResult');

    // 如果正在录音，点击则停止录音
    if (currentMediaRecorder && currentMediaRecorder.state === 'recording') {
        clearTimeout(recordingTimer);
        currentMediaRecorder.stop();
        return;
    }

    res.innerHTML = '';

    // 检测浏览器是否支持录音
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        res.className = 'speech-result fail';
        res.textContent = '⚠️ 当前环境不支持录音，请使用现代浏览器';
        return;
    }

    btn.classList.add('recording');
    btn.textContent = '⏹️ 结束录音';

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            currentStream = stream;
            const mediaRecorder = new MediaRecorder(stream);
            currentMediaRecorder = mediaRecorder;
            const audioChunks = [];

            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

            mediaRecorder.onstop = () => {
                stream.getTracks().forEach(track => track.stop());
                btn.classList.remove('recording');
                btn.textContent = '🎤 开始朗读';
                currentMediaRecorder = null;
                currentStream = null;

                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);

                res.className = 'speech-result';
                res.style.background = '#fff3cd';
                res.style.color = '#856404';
                res.innerHTML = `
                    <div style="font-size:16px;margin-bottom:10px;">🎧 请听录音，对比标准发音</div>
                    <div style="display:flex;align-items:center;gap:15px;margin-bottom:15px;">
                        <div style="text-align:center;">
                            <div style="font-size:12px;color:#666;margin-bottom:5px;">标准发音</div>
                            <button onclick="playWordSound()" style="padding:10px 20px;background:#28a745;color:white;border:none;border-radius:8px;cursor:pointer;">🔊 播放</button>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:12px;color:#666;margin-bottom:5px;">你的录音</div>
                            <audio controls src="${audioUrl}" style="width:120px;height:36px;"></audio>
                        </div>
                    </div>
                    <div style="font-size:14px;margin-bottom:10px;">单词: <strong style="color:#667eea;font-size:20px;">${window.currentEnglishWord}</strong></div>
                    <div style="display:flex;gap:15px;justify-content:center;">
                        <button onclick="confirmEnglishCorrect()" style="padding:12px 30px;background:#28a745;color:white;border:none;border-radius:10px;cursor:pointer;font-size:16px;">✅ 发音正确</button>
                        <button onclick="confirmEnglishWrong()" style="padding:12px 30px;background:#dc3545;color:white;border:none;border-radius:10px;cursor:pointer;font-size:16px;">❌ 再试一次</button>
                    </div>
                `;
            };

            mediaRecorder.onerror = () => {
                stream.getTracks().forEach(track => track.stop());
                btn.classList.remove('recording');
                btn.textContent = '🎤 开始朗读';
                currentMediaRecorder = null;
                currentStream = null;
                res.className = 'speech-result fail';
                res.textContent = '⚠️ 录音失败，请重试';
            };

            mediaRecorder.start();
            // 最多10秒自动停止录音（保底）
            recordingTimer = setTimeout(() => {
                if (currentMediaRecorder && currentMediaRecorder.state === 'recording') {
                    currentMediaRecorder.stop();
                }
            }, 10000);
        })
        .catch(err => {
            btn.classList.remove('recording');
            btn.textContent = '🎤 开始朗读';
            currentMediaRecorder = null;
            currentStream = null;
            res.className = 'speech-result fail';
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                res.textContent = '⚠️ 麦克风权限被拒绝，请点击允许录音';
            } else {
                res.textContent = '⚠️ 无法访问麦克风: ' + err.message;
            }
        });
}

// 确认发音正确
function confirmEnglishCorrect() {
    const config = DIFFICULTY_CONFIG[currentDifficulty];
    const reward = roundCoin(5 * config.multiplier); // 每题5蛋币
    const res = document.getElementById('speechResult');
    res.className = 'speech-result success';
    res.style.background = '#d4edda';
    res.style.color = '#155724';
    res.textContent = '✅ 太棒了！发音正确！';
    englishCorrect++;
    addCoins(reward);
    saveGameData();
    updateDisplay();
    setTimeout(nextEnglishQuestion, 1500);
}

// 确认发音错误
function confirmEnglishWrong() {
    const res = document.getElementById('speechResult');
    res.className = 'speech-result';
    res.style.background = '#f8d7da';
    res.style.color = '#721c24';
    res.innerHTML = '❌ 别灰心，再试一次！<br><button onclick="startSpeaking()" style="margin-top:10px;padding:10px 25px;background:#667eea;color:white;border:none;border-radius:8px;cursor:pointer;">🎤 重新朗读</button>';
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
function nextEnglishQuestion() {
    englishIndex++;
    if (englishIndex < 10) {
        showEnglishQuestion();
    } else {
        closeEnglishQuiz();
        const config = DIFFICULTY_CONFIG[currentDifficulty];
        const totalReward = roundCoin(englishCorrect * 5 * config.multiplier); // 每题5蛋币
        let bonusText = `正确${englishCorrect}/10题`;

        // 标记英语满分
        if (englishCorrect === 10) {
            gameData.englishPerfect = true;
            addCoins(roundCoin(25 * config.multiplier)); // 满分额外+25蛋币
            bonusText = '🎉 全部正确！额外+25蛋币';
        }

        showResult('🔤', '英语挑战完成！', `完成10道题目`, `+${totalReward + (englishCorrect === 10 ? roundCoin(25 * config.multiplier) : 0)} 蛋币`, bonusText);
        saveGameData();
        updateDisplay();
        checkAchievements();
    }
}
function closeEnglishQuiz() {
    // 停止正在进行的录音
    if (currentMediaRecorder && currentMediaRecorder.state === 'recording') {
        clearTimeout(recordingTimer);
        currentMediaRecorder.stop();
    }
    document.getElementById('englishModal').classList.remove('active');
}

// ===== 结果弹窗 =====
function showResult(icon, title, stats, reward, bonus) {
    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultStats').innerHTML = stats;
    document.getElementById('resultReward').textContent = reward;
    const b = document.getElementById('resultBonus');
    if (bonus) { b.innerHTML = bonus; b.style.display = 'block'; } else b.style.display = 'none';
    document.getElementById('resultModal').classList.add('active');
}
function closeResultModal() { document.getElementById('resultModal').classList.remove('active'); }

// ===== 分享蛋仔展示 =====
async function shareEggDisplay() {
    const section = document.querySelector('.egg-display-section');
    const shareBtn = document.querySelector('.share-btn');
    const qrcodeArea = document.getElementById('shareQrcodeArea');

    // 隐藏分享按钮，显示二维码区域
    shareBtn.style.display = 'none';
    if (qrcodeArea) {
        generateShareQrcode(); // 生成二维码
        qrcodeArea.style.display = 'flex'; // 显示二维码
    }

    try {
        // 检测是否在微信浏览器
        const isWechat = /micromessenger/i.test(navigator.userAgent);

        // 使用 html2canvas 生成图片
        const canvas = await html2canvas(section, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        });

        const dataUrl = canvas.toDataURL('image/png');

        if (isWechat) {
            // 微信浏览器 - 显示分享提示
            showShareGuide(dataUrl);
        } else {
            // 非微信浏览器 - 直接下载
            downloadImage(dataUrl);
        }
    } catch (e) {
        console.error('分享失败:', e);
        showResult('❌', '分享失败', '请稍后再试', '', '');
    } finally {
        // 恢复分享按钮，隐藏二维码区域
        shareBtn.style.display = 'block';
        if (qrcodeArea) qrcodeArea.style.display = 'none';
    }
}

function showShareGuide(dataUrl) {
    // 创建图片分享遮罩 - 用户可长按图片保存或分享
    let overlay = document.getElementById('shareGuideOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'shareGuideOverlay';
        overlay.innerHTML = `
            <div class="share-guide-content">
                <div class="share-guide-title">🎁 分享蛋仔形象</div>
                <div class="share-guide-tip" id="shareGuideTip">点击下方按钮后，长按图片分享</div>
                <div class="share-preview-large" id="sharePreviewBox"><img id="sharePreviewImg"></div>
                <div class="share-guide-actions">
                    <button class="share-friend-btn" onclick="triggerShareGuide()">📤 分享给好友</button>
                    <button class="share-guide-btn" onclick="closeShareGuide()">✕ 关闭</button>
                </div>
            </div>
        `;
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.85);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px;
        `;
        const content = overlay.querySelector('.share-guide-content');
        content.style.cssText = `
            text-align: center;
            color: white;
            max-width: 90vw;
        `;
        const title = overlay.querySelector('.share-guide-title');
        title.style.cssText = `
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #ffd700;
        `;
        const tip = overlay.querySelector('.share-guide-tip');
        tip.style.cssText = `
            font-size: 14px;
            margin-bottom: 15px;
            color: #aaa;
        `;
        const preview = overlay.querySelector('.share-preview-large');
        preview.style.cssText = `
            margin: 15px auto;
            max-width: 320px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(255,215,0,0.3);
        `;
        const img = overlay.querySelector('#sharePreviewImg');
        img.style.cssText = `
            width: 100%;
            display: block;
            border-radius: 20px;
        `;
        const actions = overlay.querySelector('.share-guide-actions');
        actions.style.cssText = `
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 20px;
        `;
        const friendBtn = overlay.querySelector('.share-friend-btn');
        friendBtn.style.cssText = `
            padding: 12px 25px;
            background: linear-gradient(135deg, #07C160, #06AD56);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 14px;
            cursor: pointer;
            font-weight: bold;
        `;
        const closeBtn = overlay.querySelector('.share-guide-btn');
        closeBtn.style.cssText = `
            padding: 12px 25px;
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 14px;
            cursor: pointer;
        `;
        document.body.appendChild(overlay);
    }

    // 设置预览图片
    document.getElementById('sharePreviewImg').src = dataUrl;
    overlay.style.display = 'flex';

    // 保存当前图片URL供下载使用
    window.currentShareDataUrl = dataUrl;
}

// 点击"分享给好友"按钮，高亮图片区域引导用户长按
function triggerShareGuide() {
    const tipEl = document.getElementById('shareGuideTip');
    const previewBox = document.getElementById('sharePreviewBox');

    // 更新提示文字
    tipEl.textContent = '👆 请长按上方图片，选择"发送给朋友"';
    tipEl.style.color = '#ffd700';
    tipEl.style.fontSize = '16px';
    tipEl.style.fontWeight = 'bold';

    // 图片区域高亮闪烁效果
    previewBox.style.animation = 'pulse-highlight 1s ease-in-out 3';
    previewBox.style.borderColor = '#ffd700';
    previewBox.style.border = '3px solid #ffd700';

    // 添加动画样式（如果不存在）
    if (!document.getElementById('shareGuideAnimStyle')) {
        const style = document.createElement('style');
        style.id = 'shareGuideAnimStyle';
        style.textContent = `
            @keyframes pulse-highlight {
                0%, 100% { box-shadow: 0 10px 30px rgba(255,215,0,0.3); transform: scale(1); }
                50% { box-shadow: 0 0 40px rgba(255,215,0,0.8); transform: scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }
}

function closeShareGuide() {
    const overlay = document.getElementById('shareGuideOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function downloadImage(dataUrl) {
    const link = document.createElement('a');
    link.download = `蛋仔派对_${new Date().getTime()}.png`;
    link.href = dataUrl;
    link.click();
    showResult('📤', '分享成功', '图片已保存到相册', '快去分享给好友吧！', '');
}

function saveImageForShare(dataUrl) {
    // 在微信中，用户需要长按图片保存
    // 这里创建一个临时图片供用户长按保存
    let tempImg = document.getElementById('tempShareImg');
    if (!tempImg) {
        tempImg = document.createElement('img');
        tempImg.id = 'tempShareImg';
        tempImg.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
        `;
        document.body.appendChild(tempImg);
    }
    tempImg.src = dataUrl;
}

// ===== 抽奖系统 =====
function getRandomSkin() {
    const rand = Math.random() * 100;
    let rarity;
    // 概率：SSS 0.5%, SS 4.5%, S 8%, A 15%, B 30%, C 42%
    if (rand < 0.5) rarity = 'sss';
    else if (rand < 5) rarity = 'ss';
    else if (rand < 13) rarity = 's';
    else if (rand < 28) rarity = 'a';
    else if (rand < 58) rarity = 'b';
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
    updateCollection();
    updateLatestItems();
    showDrawAnimation([skin], 'single', true); // 卡牌翻完后检查成就
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
    updateCollection();
    updateLatestItems();
    showDrawAnimation(results, 'ten', true); // 卡牌翻完后检查成就
}
function addSkinToCollection(skin) {
    const key = `${skin.rarity}_${skin.index}`;
    if (!gameData.collected[key]) {
        gameData.collected[key] = { ...skin, count: 0 };
    }
    gameData.collected[key].count++;
    addCharm(charmValues[skin.rarity]);
    // 更新最新获得列表（保留最近10个）
    gameData.latestSkins.unshift({ ...skin, time: Date.now() });
    if (gameData.latestSkins.length > 10) gameData.latestSkins.pop();
}

// ===== 最新获得横条 =====
function updateLatestItems() {
    const container = document.getElementById('latestItems');
    if (!container) return;
    if (gameData.latestSkins.length === 0) {
        container.innerHTML = '<span class="latest-hint">抽卡获得皮肤后在此展示</span>';
        return;
    }
    container.innerHTML = gameData.latestSkins.slice(0, 10).map(skin =>
        `<div class="latest-item ${skin.rarity}" title="${skin.name}">${skin.icon}</div>`
    ).join('');
}

// ===== 抽卡动画 =====
function showDrawAnimation(skinList, drawType, checkAchievementAfter = false) {
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
    closeBtn.onclick = (e) => {
        e.stopPropagation();
        overlay.classList.remove('active');
        updateCollection();
        updateStats();
        updateLatestItems();
    };
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
                playFlipSound();  // 播放翻卡音效
                if (skin.rarity === 'sss') { createParticles(card, skin.rarity); createSSSFlash(); createConfetti(); createFireworks(); playRareSound('sss'); playCheerSound(); }
                else if (skin.rarity === 'ss') { createParticles(card, skin.rarity); createSSLightBeams(); createConfettiSS(); playRareSound('ss'); }
                else if (skin.rarity === 's') { playRareSound('s'); }
                if (i === lastIndex) {
                    setTimeout(() => btnContainer.classList.add('show'), 500);
                    // 在卡牌翻完后检查成就（在抽卡遮罩之上显示）
                    if (checkAchievementAfter) {
                        setTimeout(() => checkAchievements(), 600);
                    }
                }
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
function createConfetti() {
    // SSS级撒花特效 - 多种形状彩色纸屑
    const overlay = document.getElementById('drawOverlay');
    const shapes = ['heart', 'star', 'circle', 'ribbon', 'sparkle'];
    const colors = ['#ff5252', '#ffd700', '#ff69b4', '#ff8f00', '#e91e63', '#00bcd4', '#9c27b0', '#4caf50', '#ffeb3b', '#ff6b6b'];

    // 第一波撒花（50个）
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.className = `confetti confetti-${shape}`;
            if (shape === 'circle' || shape === 'ribbon') {
                confetti.style.background = color;
            }
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-5%';
            confetti.style.setProperty('--rotate', (Math.random() * 720 + 360) + 'deg');
            confetti.style.animationDuration = (2 + Math.random() * 1.5) + 's';
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            overlay.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3500);
        }, i * 40);
    }

    // 第二波撒花（30个，延迟0.5秒）
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.className = `confetti confetti-${shape}`;
            if (shape === 'circle' || shape === 'ribbon') {
                confetti.style.background = color;
            }
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-5%';
            confetti.style.setProperty('--rotate', (Math.random() * 720 - 360) + 'deg');
            confetti.style.animationDuration = (2.5 + Math.random() * 1) + 's';
            overlay.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, 500 + i * 50);
    }

    // 第三波中心爆发（20个，从中心向四周散开）
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti confetti-sparkle';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = '12px';
            confetti.style.height = '12px';
            confetti.style.left = '50%';
            confetti.style.top = '40%';
            confetti.style.marginLeft = '-6px';
            confetti.style.marginTop = '-6px';
            confetti.style.transition = 'all 1s ease-out';
            overlay.appendChild(confetti);

            // 动画：从中心向四周扩散
            const angle = (360 / 20) * i;
            const distance = 150 + Math.random() * 100;
            const tx = Math.cos(angle * Math.PI / 180) * distance;
            const ty = Math.sin(angle * Math.PI / 180) * distance;

            requestAnimationFrame(() => {
                confetti.style.transform = `translate(${tx}px, ${ty}px) scale(0.2)`;
                confetti.style.opacity = '0';
            });

            setTimeout(() => confetti.remove(), 1500);
        }, 300 + i * 30);
    }
}
function createConfettiSS() {
    // SS级撒花特效 - 持续5秒的彩色纸屑
    const overlay = document.getElementById('drawOverlay');
    const shapes = ['heart', 'star', 'circle', 'ribbon'];
    const colors = ['#ffd700', '#ff8f00', '#e91e63', '#9c27b0', '#ffeb3b', '#ff6b6b'];

    // 持续5秒撒花（每0.1秒一个，共50个）
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.className = `confetti confetti-${shape}`;
            if (shape === 'circle' || shape === 'ribbon') {
                confetti.style.background = color;
            } else {
                confetti.style.background = color;
            }
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-5%';
            confetti.style.setProperty('--rotate', (Math.random() * 720) + 'deg');
            confetti.style.animationDuration = '5s'; // 固定5秒
            confetti.style.animationDelay = '0s';
            overlay.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5500);
        }, i * 100); // 每0.1秒一个，总时长5秒
    }
}
function createFireworks() {
    // SSS级烟花礼炮特效 - 10个烟花，间隔1秒，总计10秒
    const overlay = document.getElementById('drawOverlay');

    // 鲜艳烟花颜色组（主色、亮色、深色）
    const fireworkColors = [
        ['#FF0000', '#FF4444', '#CC0000'],  // 鲜红
        ['#FFD700', '#FFEC8B', '#FFA500'],  // 金黄
        ['#FF1493', '#FF69B4', '#C71585'],  // 深粉红
        ['#00FF00', '#7CFC00', '#32CD32'],  // 鲜绿
        ['#00FFFF', '#40E0D0', '#00CED1'],  // 青色
        ['#FF4500', '#FF6347', '#DC143C'],  // 橙红
        ['#FFFF00', '#FFD700', '#FFA500'],  // 明黄
        ['#FF00FF', '#EE82EE', '#DA70D6'],  // 品红紫
        ['#00BFFF', '#87CEEB', '#1E90FF'],  // 天蓝
        ['#FFFFFF', '#F0F8FF', '#E6E6FA'],  // 纯白闪光
        ['#ADFF2F', '#9ACD32', '#6B8E23'],  // 黄绿
        ['#FF6B6B', '#FF8E8E', '#FF5252'],  // 珊瑚红
        ['#FFB6C1', '#FFC0CB', '#FF69B4'],  // 浅粉
        ['#7B68EE', '#6A5ACD', '#483D8B'],  // 蓝紫
        ['#40E0D0', '#48D1CC', '#20B2AA'],  // 青绿
    ];

    // 10个烟花，间隔1秒
    for (let idx = 0; idx < 10; idx++) {
        setTimeout(() => {
            // 随机位置
            const pos = {
                x: (15 + Math.random() * 70) + '%',
                y: (20 + Math.random() * 35) + '%'
            };
            const colorIdx = Math.floor(Math.random() * fireworkColors.length);
            const colors = fireworkColors[colorIdx];

            // 烟花升空轨迹
            const rocket = document.createElement('div');
            rocket.className = 'firework-rocket';
            const startX = (Math.random() * 100) + '%';
            rocket.style.left = pos.x;
            rocket.style.top = '100%';
            rocket.style.background = colors[0];
            rocket.style.width = '8px';
            rocket.style.height = '25px';
            rocket.style.borderRadius = '4px';
            overlay.appendChild(rocket);

            // 升空动画
            requestAnimationFrame(() => {
                rocket.style.transition = 'top 0.8s ease-out, opacity 0.8s ease-out';
                rocket.style.top = pos.y;
            });

            // 升空音效
            playRocketSound();

            // 烟花爆炸（升空后爆炸）
            setTimeout(() => {
                rocket.style.opacity = '0';
                setTimeout(() => rocket.remove(), 100);

                // 爆炸音效
                playFireworkExplosionSound();

                // 爆炸粒子（80-120个密集粒子）
                const particleCount = 80 + Math.floor(Math.random() * 40);
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'firework-particle';
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.left = pos.x;
                    particle.style.top = pos.y;
                    const size = 4 + Math.random() * 6;
                    particle.style.width = size + 'px';
                    particle.style.height = size + 'px';
                    particle.style.borderRadius = '50%';

                    // 添加拖尾效果
                    particle.style.boxShadow = `0 0 ${size}px ${colors[0]}`;

                    const angle = (360 / particleCount) * i + (Math.random() - 0.5) * 30;
                    const distance = 60 + Math.random() * 100;
                    const tx = Math.cos(angle * Math.PI / 180) * distance;
                    const ty = Math.sin(angle * Math.PI / 180) * distance - 20; // 稍微向上偏移

                    overlay.appendChild(particle);
                    requestAnimationFrame(() => {
                        particle.style.transition = 'all 1.2s ease-out';
                        particle.style.transform = `translate(${tx}px, ${ty}px)`;
                        particle.style.opacity = '0';
                    });
                    setTimeout(() => particle.remove(), 1300);
                }

                // 大型爆炸光环
                const ring = document.createElement('div');
                ring.className = 'firework-ring';
                ring.style.left = pos.x;
                ring.style.top = pos.y;
                ring.style.borderColor = colors[0];
                ring.style.width = '15px';
                ring.style.height = '15px';
                overlay.appendChild(ring);
                setTimeout(() => ring.remove(), 1000);

                // 爆炸闪光中心
                const flash = document.createElement('div');
                flash.className = 'firework-flash';
                flash.style.left = pos.x;
                flash.style.top = pos.y;
                flash.style.background = `radial-gradient(circle, ${colors[1]} 0%, transparent 70%)`;
                flash.style.width = '30px';
                flash.style.height = '30px';
                overlay.appendChild(flash);
                setTimeout(() => flash.remove(), 400);

                // 垂落粒子（模拟烟花落下的尾焰）
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const trail = document.createElement('div');
                        trail.className = 'firework-trail';
                        trail.style.background = colors[Math.floor(Math.random() * colors.length)];
                        trail.style.left = pos.x;
                        trail.style.top = pos.y;
                        trail.style.width = '3px';
                        trail.style.height = '15px';
                        trail.style.borderRadius = '2px';

                        const tx = (Math.random() - 0.5) * 60;
                        const ty = 50 + Math.random() * 100;

                        overlay.appendChild(trail);
                        requestAnimationFrame(() => {
                            trail.style.transition = 'all 1.5s ease-in';
                            trail.style.transform = `translate(${tx}px, ${ty}px)`;
                            trail.style.opacity = '0';
                        });
                        setTimeout(() => trail.remove(), 1600);
                    }, i * 50);
                }
            }, 800);
        }, idx * 1000); // 间隔1秒
    }
}
function playRocketSound() {
    // 烟花升空音效 - 嘶嘶的升空声
    const now = audioCtx.currentTime;

    // 升空嘶嘶声（高频噪声渐变）
    const hissBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.8, audioCtx.sampleRate);
    const hissData = hissBuffer.getChannelData(0);
    for (let i = 0; i < hissData.length; i++) {
        const t = i / hissData.length;
        hissData[i] = (Math.random() * 2 - 1) * 0.3 * (1 - t * 0.5) * Math.sin(t * Math.PI * 10);
    }
    const hissSource = audioCtx.createBufferSource();
    hissSource.buffer = hissBuffer;
    const hissFilter = audioCtx.createBiquadFilter();
    hissFilter.type = 'highpass';
    hissFilter.frequency.setValueAtTime(2000, now);
    hissFilter.frequency.linearRampToValueAtTime(4000, now + 0.8);
    const hissGain = audioCtx.createGain();
    hissGain.gain.setValueAtTime(0.15, now);
    hissGain.gain.linearRampToValueAtTime(0.08, now + 0.4);
    hissGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    hissSource.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(audioCtx.destination);
    hissSource.start(now);
    hissSource.stop(now + 0.8);

    // 升空嗡嗡声（低频）
    const buzzOsc = audioCtx.createOscillator();
    const buzzGain = audioCtx.createGain();
    buzzOsc.type = 'sine';
    buzzOsc.frequency.setValueAtTime(150, now);
    buzzOsc.frequency.linearRampToValueAtTime(300, now + 0.8);
    buzzGain.gain.setValueAtTime(0.05, now);
    buzzGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    buzzOsc.connect(buzzGain);
    buzzGain.connect(audioCtx.destination);
    buzzOsc.start(now);
    buzzOsc.stop(now + 0.8);
}
function playFireworkExplosionSound() {
    // 烟花爆炸音效 - 逼真的砰声+噼啪声
    const now = audioCtx.currentTime;

    // 1. 爆炸"砰"声（低频冲击波）
    const burstBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.12, audioCtx.sampleRate);
    const burstData = burstBuffer.getChannelData(0);
    for (let i = 0; i < burstData.length; i++) {
        const t = i / burstData.length;
        burstData[i] = (Math.random() * 2 - 1) * Math.exp(-t * 25) * 0.6;
    }
    const burstSource = audioCtx.createBufferSource();
    burstSource.buffer = burstBuffer;
    const burstFilter = audioCtx.createBiquadFilter();
    burstFilter.type = 'lowpass';
    burstFilter.frequency.setValueAtTime(1000, now);
    burstFilter.frequency.exponentialRampToValueAtTime(200, now + 0.1);
    const burstGain = audioCtx.createGain();
    burstGain.gain.setValueAtTime(0.5, now);
    burstGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    burstSource.connect(burstFilter);
    burstFilter.connect(burstGain);
    burstGain.connect(audioCtx.destination);
    burstSource.start(now);
    burstSource.stop(now + 0.12);

    // 2. 高频爆裂声（"啪"的尖锐音）
    const crackOsc = audioCtx.createOscillator();
    const crackGain = audioCtx.createGain();
    crackOsc.type = 'square';
    crackOsc.frequency.setValueAtTime(800, now + 0.02);
    crackOsc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
    crackGain.gain.setValueAtTime(0, now);
    crackGain.gain.setValueAtTime(0.25, now + 0.02);
    crackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    crackOsc.connect(crackGain);
    crackGain.connect(audioCtx.destination);
    crackOsc.start(now);
    crackOsc.stop(now + 0.08);

    // 3. 噼啪声序列（火花散落的声音）
    for (let i = 0; i < 15; i++) {
        const sparkleOsc = audioCtx.createOscillator();
        const sparkleGain = audioCtx.createGain();
        sparkleOsc.type = 'sine';
        const startTime = now + 0.05 + i * 0.04 + Math.random() * 0.02;
        sparkleOsc.frequency.setValueAtTime(1500 + Math.random() * 1000, startTime);
        sparkleOsc.frequency.exponentialRampToValueAtTime(500 + Math.random() * 300, startTime + 0.03);
        sparkleGain.gain.setValueAtTime(0, startTime - 0.01);
        sparkleGain.gain.setValueAtTime(0.08 + Math.random() * 0.05, startTime);
        sparkleGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.04);
        sparkleOsc.connect(sparkleGain);
        sparkleGain.connect(audioCtx.destination);
        sparkleOsc.start(startTime);
        sparkleOsc.stop(startTime + 0.05);
    }

    // 4. 回响余音（环境共鸣）
    const echoBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.4, audioCtx.sampleRate);
    const echoData = echoBuffer.getChannelData(0);
    for (let i = 0; i < echoData.length; i++) {
        const t = i / echoData.length;
        echoData[i] = (Math.random() * 2 - 1) * 0.1 * Math.exp(-t * 5) * Math.sin(t * Math.PI * 2);
    }
    const echoSource = audioCtx.createBufferSource();
    echoSource.buffer = echoBuffer;
    const echoFilter = audioCtx.createBiquadFilter();
    echoFilter.type = 'lowpass';
    echoFilter.frequency.value = 300;
    const echoGain = audioCtx.createGain();
    echoGain.gain.setValueAtTime(0.08, now + 0.1);
    echoGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    echoSource.connect(echoFilter);
    echoFilter.connect(echoGain);
    echoGain.connect(audioCtx.destination);
    echoSource.start(now + 0.1);
    echoSource.stop(now + 0.5);
}
function playCheerSound() {
    // 掌声和欢呼声 - SSS级庆祝音效（持续5秒）
    const now = audioCtx.currentTime;
    const duration = 5;

    // 1. 掌声 - 密集的噪声脉冲模拟拍手声（5秒）
    const clapBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * duration, audioCtx.sampleRate);
    const clapData = clapBuffer.getChannelData(0);
    for (let i = 0; i < clapData.length; i++) {
        const t = i / clapData.length;
        // 模拟不规则拍手节奏
        const clapPattern = Math.sin(t * 80) * 0.5 + Math.sin(t * 120) * 0.3 + Math.random() * 0.4;
        // 掌声包络：渐强 -> 持续 -> 渐弱
        const envelope = Math.pow(Math.sin(t * Math.PI), 0.5) * (1 + Math.sin(t * 20) * 0.2);
        clapData[i] = clapPattern * envelope * 0.25;
    }
    const clapSource = audioCtx.createBufferSource();
    clapSource.buffer = clapBuffer;
    const clapFilter = audioCtx.createBiquadFilter();
    clapFilter.type = 'bandpass';
    clapFilter.frequency.setValueAtTime(2000, now);
    clapFilter.Q.value = 1;
    const clapGain = audioCtx.createGain();
    clapGain.gain.setValueAtTime(0.3, now);
    clapGain.gain.setValueAtTime(0.35, now + 2);
    clapGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    clapSource.connect(clapFilter);
    clapFilter.connect(clapGain);
    clapGain.connect(audioCtx.destination);
    clapSource.start(now);
    clapSource.stop(now + duration);

    // 2. 欢呼声 - 人声模拟（5秒）
    const cheerBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * duration, audioCtx.sampleRate);
    const cheerData = cheerBuffer.getChannelData(0);
    for (let i = 0; i < cheerData.length; i++) {
        const t = i / cheerData.length;
        // 模拟人群欢呼的嘈杂声
        const voiceNoise = (Math.random() * 2 - 1);
        // 添加一些"哇"的声音感（中频共振）
        const vowel1 = Math.sin(t * Math.PI * 800) * 0.3;
        const vowel2 = Math.sin(t * Math.PI * 1200) * 0.2;
        const vowel3 = Math.sin(t * Math.PI * 2500) * 0.1;
        // 包络：渐强 -> 持续高潮 -> 渐弱
        const envelope = Math.pow(Math.min(1, t * 3), 0.5) * Math.exp(-t * 0.5);
        cheerData[i] = (voiceNoise * 0.4 + vowel1 + vowel2 + vowel3) * envelope * 0.3;
    }
    const cheerSource = audioCtx.createBufferSource();
    cheerSource.buffer = cheerBuffer;
    const cheerFilter = audioCtx.createBiquadFilter();
    cheerFilter.type = 'bandpass';
    cheerFilter.frequency.setValueAtTime(800, now);
    cheerFilter.frequency.linearRampToValueAtTime(1500, now + 1);
    cheerFilter.Q.value = 2;
    const cheerGain = audioCtx.createGain();
    cheerGain.gain.setValueAtTime(0, now);
    cheerGain.gain.linearRampToValueAtTime(0.25, now + 0.2);
    cheerGain.gain.setValueAtTime(0.25, now + 3);
    cheerGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    cheerSource.connect(cheerFilter);
    cheerFilter.connect(cheerGain);
    cheerGain.connect(audioCtx.destination);
    cheerSource.start(now);
    cheerSource.stop(now + duration);

    // 3. 口哨声 - 高频尖啸（5秒内8次）
    for (let i = 0; i < 8; i++) {
        const whistleOsc = audioCtx.createOscillator();
        const whistleGain = audioCtx.createGain();
        const whistleFilter = audioCtx.createBiquadFilter();
        whistleOsc.type = 'sine';
        const startTime = now + 0.3 + i * 0.55 + Math.random() * 0.15;
        // 口哨的颤音效果
        whistleOsc.frequency.setValueAtTime(1200 + Math.random() * 300, startTime);
        whistleOsc.frequency.linearRampToValueAtTime(1800 + Math.random() * 400, startTime + 0.1);
        whistleOsc.frequency.setValueAtTime(1600 + Math.random() * 200, startTime + 0.2);
        whistleOsc.frequency.linearRampToValueAtTime(1000 + Math.random() * 200, startTime + 0.4);
        whistleFilter.type = 'highpass';
        whistleFilter.frequency.value = 800;
        whistleGain.gain.setValueAtTime(0, startTime - 0.01);
        whistleGain.gain.linearRampToValueAtTime(0.08, startTime);
        whistleGain.gain.setValueAtTime(0.08, startTime + 0.15);
        whistleGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
        whistleOsc.connect(whistleFilter);
        whistleFilter.connect(whistleGain);
        whistleGain.connect(audioCtx.destination);
        whistleOsc.start(startTime);
        whistleOsc.stop(startTime + 0.5);
    }

    // 4. "哇哦"声效 - 群体惊呼（5秒内4次）
    for (let j = 0; j < 4; j++) {
        const wowBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.8, audioCtx.sampleRate);
        const wowData = wowBuffer.getChannelData(0);
        for (let i = 0; i < wowData.length; i++) {
            const t = i / wowData.length;
            const wow = Math.sin(t * Math.PI * 600) * 0.4 + Math.sin(t * Math.PI * 900) * 0.25;
            const envelope = Math.sin(t * Math.PI) * Math.exp(-t * 2);
            wowData[i] = (wow + (Math.random() * 2 - 1) * 0.2) * envelope * 0.3;
        }
        const wowSource = audioCtx.createBufferSource();
        wowSource.buffer = wowBuffer;
        const wowFilter = audioCtx.createBiquadFilter();
        wowFilter.type = 'bandpass';
        wowFilter.frequency.value = 700;
        wowFilter.Q.value = 2;
        const wowGain = audioCtx.createGain();
        const wowStartTime = now + 0.1 + j * 1.2;
        wowGain.gain.setValueAtTime(0.18, wowStartTime);
        wowGain.gain.exponentialRampToValueAtTime(0.01, wowStartTime + 0.8);
        wowSource.connect(wowFilter);
        wowFilter.connect(wowGain);
        wowGain.connect(audioCtx.destination);
        wowSource.start(wowStartTime);
        wowSource.stop(wowStartTime + 0.8);
    }
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
                // 点击换装
                item.style.cursor = 'pointer';
                item.onclick = () => changeSkin(rarity, index);
                // 高亮当前装备的皮肤
                if (gameData.currentSkin && gameData.currentSkin.rarity === rarity && gameData.currentSkin.index === index) {
                    item.style.boxShadow = '0 0 10px 3px #ffd700';
                    item.style.transform = 'scale(1.1)';
                }
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
    document.getElementById('passwordError').textContent = '密码错误，请重新输入';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('passwordInput').focus();
}
function verifyPassword() {
    const input = document.getElementById('passwordInput').value;
    if (input === BONUS_PASSWORD) {
        if (!pendingBonusType || !BONUS_CONFIG[pendingBonusType]) {
            document.getElementById('passwordError').textContent = '请先选择奖励类型';
            document.getElementById('passwordError').style.display = 'block';
            return;
        }
        const bonus = BONUS_CONFIG[pendingBonusType];
        addCoins(bonus.coins);
        saveGameData();
        updateDisplay();
        closePasswordModal();
        showResult(bonus.icon, `${bonus.name}完成！`, `获得奖励`, `+${bonus.coins} 蛋币`, '密码验证成功！');
    } else {
        document.getElementById('passwordError').textContent = '密码错误，请重新输入';
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
            <div style="width: 60px; height: 60px; margin: 0 auto; display: flex; align-items: center; justify-content: center;"><img src="${gift.image}" alt="${gift.name}" style="width: 100%; height: 100%; object-fit: contain;"></div>
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
    document.getElementById('confirmGiftIcon').innerHTML = gift ? `<img src="${gift.image}" alt="${gift.name}" style="width: 50px; height: 50px; object-fit: contain;">` : '🎁';
    document.getElementById('confirmGiftName').textContent = name;
    document.getElementById('confirmCharmCost').textContent = pendingGift.charmCost;
    document.getElementById('confirmExchangeModal').classList.add('active');
}
function confirmExchange() {
    if (!pendingGift) return;
    // 先保存需要的信息，再调用关闭函数
    const giftName = pendingGift.name;
    const charmCost = pendingGift.charmCost;
    // 保存兑换记录
    gameData.exchangeHistory.unshift({
        name: giftName,
        price: pendingGift.price,
        charmCost: charmCost,
        time: Date.now()
    });
    // 最多保留50条记录
    if (gameData.exchangeHistory.length > 50) gameData.exchangeHistory.pop();
    gameData.charm -= charmCost;
    saveGameData();
    updateDisplay();
    updateExchangeDisplay();
    renderGiftList();
    renderExchangeHistory();
    closeConfirmExchange();
    // 不关闭礼品列表弹窗，用户关闭结果弹窗后返回礼品列表
    showResult('🎁', '兑换成功！', `兑换: ${giftName}`, `消耗 ${charmCost} 魅力值`, '请在现实中领取礼品~');
}
function closeConfirmExchange() {
    document.getElementById('confirmExchangeModal').classList.remove('active');
    pendingGift = null;
}

// ===== 兑换记录 =====
function showExchangeHistory() {
    document.getElementById('exchangeHistoryModal').classList.add('active');
    renderExchangeHistory();
}
function closeExchangeHistory() {
    document.getElementById('exchangeHistoryModal').classList.remove('active');
}
function renderExchangeHistory() {
    const container = document.getElementById('exchangeHistoryList');
    if (!container) return;
    if (gameData.exchangeHistory.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#999;padding:40px;">暂无兑换记录</div>';
        return;
    }
    container.innerHTML = gameData.exchangeHistory.map(record => {
        const date = new Date(record.time);
        const dateStr = `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`;
        return `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 15px;background:#f8f9fa;border-radius:10px;margin-bottom:8px;">
                <div>
                    <div style="font-weight:bold;color:#333;">${record.name}</div>
                    <div style="font-size:12px;color:#999;">${dateStr}</div>
                </div>
                <div style="text-align:right;">
                    <div style="color:#c026d3;font-weight:bold;">-${record.charmCost}魅力</div>
                    <div style="font-size:12px;color:#666;">¥${record.price}</div>
                </div>
            </div>
        `;
    }).join('');
}

init();