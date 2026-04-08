// ===== 音效系统 =====
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playDrawSound() {
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
}
function playFlipSound() {
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
}
function playRareSound(rarity) {
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
let gameData = { coins: 0, charm: 0, collected: {}, history: [], stats: { c: 0, b: 0, a: 0, s: 0, ss: 0, sss: 0 }, totalDraws: 0, latestSkins: [], exchangeHistory: [] };
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
    updateLatestItems();
    updateExchangeDisplay();
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
function loadGameData() {
    const s = localStorage.getItem('eggPartyGame');
    if (s) {
        const saved = JSON.parse(s);
        gameData = { ...gameData, ...saved };
    }
}
function saveGameData() { localStorage.setItem('eggPartyGame', JSON.stringify(gameData)); }
function updateDisplay() {
    document.getElementById('coinAmount').textContent = gameData.coins;
    document.getElementById('charmAmount').textContent = gameData.charm;
    updateExchangeDisplay();
}

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
    // 停止正在进行的录音
    if (currentMediaRecorder && currentMediaRecorder.state === 'recording') {
        clearTimeout(recordingTimer);
        currentMediaRecorder.stop();
    }

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
    const res = document.getElementById('speechResult');
    res.className = 'speech-result success';
    res.style.background = '#d4edda';
    res.style.color = '#155724';
    res.textContent = '✅ 太棒了！发音正确！';
    gameData.coins += 8;
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
function nextEnglishQuestion() { englishIndex++; if (englishIndex < 10) showEnglishQuestion(); else { closeEnglishQuiz(); showResult('🔤', '英语挑战完成！', '完成10道题目', '+50 蛋币', ''); gameData.coins += 50; saveGameData(); updateDisplay(); } }
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
    // 概率：SSS 1%, SS 4%, S 8%, A 15%, B 30%, C 42%
    if (rand < 1) rarity = 'sss';
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
    closeBtn.onclick = (e) => { e.stopPropagation(); overlay.classList.remove('active'); updateCollection(); updateStats(); updateLatestItems(); };
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