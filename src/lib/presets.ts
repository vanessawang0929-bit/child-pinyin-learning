export interface PresetWord {
  pinyin: string;
  hanzi: string;
}

export interface PresetItem {
  topic: string;
  titles: string[];
  words: {
    coreRoles: PresetWord[];
    commonItems: PresetWord[];
    environment: PresetWord[];
  };
}

export const PRESET_TOPICS: PresetItem[] = [
  {
    topic: '超市',
    titles: ['《走进超市》', '《超市购物乐》', '《小小购物员》'],
    words: {
      coreRoles: [
        { pinyin: 'shōu yín yuán', hanzi: '收银员' },
        { pinyin: 'guǎn lǐ yuán', hanzi: '管理员' },
        { pinyin: 'gù kè', hanzi: '顾客' },
        { pinyin: 'ān bǎo yuán', hanzi: '安保员' },
      ],
      commonItems: [
        { pinyin: 'tuī chē', hanzi: '推车' },
        { pinyin: 'gòu wù lán', hanzi: '购物篮' },
        { pinyin: 'píng guǒ', hanzi: '苹果' },
        { pinyin: 'niú nǎi', hanzi: '牛奶' },
        { pinyin: 'miàn bāo', hanzi: '面包' },
        { pinyin: 'shuǐ guǒ', hanzi: '水果' },
        { pinyin: 'cài yè', hanzi: '菜叶' },
        { pinyin: 'jī dàn', hanzi: '鸡蛋' },
      ],
      environment: [
        { pinyin: 'huò jià', hanzi: '货架' },
        { pinyin: 'chū kǒu', hanzi: '出口' },
        { pinyin: 'rù kǒu', hanzi: '入口' },
        { pinyin: 'shōu yín tái', hanzi: '收银台' },
        { pinyin: 'jià qián', hanzi: '价签' },
      ],
    },
  },
  {
    topic: '医院',
    titles: ['《快乐医院》', '《看医生》', '《健康小卫士》'],
    words: {
      coreRoles: [
        { pinyin: 'yī shēng', hanzi: '医生' },
        { pinyin: 'hù shi', hanzi: '护士' },
        { pinyin: 'bìng rén', hanzi: '病人' },
        { pinyin: 'bìng h人家属', hanzi: '病人家属' },
      ],
      commonItems: [
        { pinyin: 'tīng zhěn qì', hanzi: '听诊器' },
        { pinyin: 'yào', hanzi: '药' },
        { pinyin: 'bēi zi', hanzi: '杯子' },
        { pinyin: 'shuǐ hú', hanzi: '水壶' },
        { pinyin: 'chuáng', hanzi: '床' },
        { pinyin: 'zhěn liáo qì', hanzi: '诊疗器' },
        { pinyin: 'kǒu zhào', hanzi: '口罩' },
        { pinyin: 'xiě yā qì', hanzi: '血压器' },
      ],
      environment: [
        { pinyin: 'zhěn suǒ', hanzi: '诊所' },
        { pinyin: 'bìng fáng', hanzi: '病房' },
        { pinyin: 'zǒu láng', hanzi: '走廊' },
        { pinyin: 'dēng guāng', hanzi: '灯光' },
        { pinyin: 'chuāng hù', hanzi: '窗户' },
      ],
    },
  },
  {
    topic: '公园',
    titles: ['《公园玩耍》', '《春天的公园》', '《户外游戏》'],
    words: {
      coreRoles: [
        { pinyin: 'xiǎo péng yǒu', hanzi: '小朋友' },
        { pinyin: 'bà ba', hanzi: '爸爸' },
        { pinyin: 'mā ma', hanzi: '妈妈' },
        { pinyin: 'yé ye', hanzi: '爷爷' },
      ],
      commonItems: [
        { pinyin: ' qiū qiān', hanzi: '秋千' },
        { pinyin: 'huá tī', hanzi: '滑梯' },
        { pinyin: 'shā kēng', hanzi: '沙坑' },
        { pinyin: 'bèng chuang', hanzi: '蹦床' },
        { pinyin: 'huā duǒ', hanzi: '花朵' },
        { pinyin: 'cǎo pí', hanzi: '草坪' },
        { pinyin: 'fēng zheng', hanzi: '风筝' },
        { pinyin: ' qiú', hanzi: '球' },
      ],
      environment: [
        { pinyin: 'shù', hanzi: '树' },
        { pinyin: 'cháng yǐ', hanzi: '长椅' },
        { pinyin: 'lù dēng', hanzi: '路灯' },
        { pinyin: ' hú', hanzi: '湖' },
        { pinyin: 'xiǎo qiáo', hanzi: '小桥' },
      ],
    },
  },
  {
    topic: '学校',
    titles: ['《我的学校》', '《上课啦》', '《快乐学习》'],
    words: {
      coreRoles: [
        { pinyin: 'lǎo shī', hanzi: '老师' },
        { pinyin: 'tóng xué', hanzi: '同学' },
        { pinyin: 'xiào zhǎng', hanzi: '校长' },
        { pinyin: 'mén wèi', hanzi: '门卫' },
      ],
      commonItems: [
        { pinyin: 'shū bāo', hanzi: '书包' },
        { pinyin: 'bǐ', hanzi: '笔' },
        { pinyin: 'běn zǐ', hanzi: '本子' },
        { pinyin: 'kè zhuō', hanzi: '课桌' },
        { pinyin: 'hēi bǎn', hanzi: '黑板' },
        { pinyin: 'fěn bǐ', hanzi: '粉笔' },
        { pinyin: ' tú shū', hanzi: '图书' },
        { pinyin: 'wá wa', hanzi: '娃娃' },
      ],
      environment: [
        { pinyin: 'jiào shì', hanzi: '教室' },
        { pinyin: 'cāo chǎng', hanzi: '操场' },
        { pinyin: 'tīng táng', hanzi: '礼堂' },
        { pinyin: 'lóu tī', hanzi: '楼梯' },
        { pinyin: 'guó qí', hanzi: '国旗' },
      ],
    },
  },
  {
    topic: '餐厅',
    titles: ['《美味餐厅》', '《小小厨师》', '《美食之旅》'],
    words: {
      coreRoles: [
        { pinyin: 'chú shī', hanzi: '厨师' },
        { pinyin: 'fú wù yuán', hanzi: '服务员' },
        { pinyin: 'gù kè', hanzi: '顾客' },
        { pinyin: 'shōu yín yuán', hanzi: '收银员' },
      ],
      commonItems: [
        { pinyin: 'fàn wǎn', hanzi: '饭碗' },
        { pinyin: 'cài', hanzi: '菜' },
        { pinyin: 'tāng', hanzi: '汤' },
        { pinyin: 'jiǎn dāo', hanzi: '剪刀' },
        { pinyin: 'sháo zi', hanzi: '勺子' },
        { pinyin: 'kuài zi', hanzi: '筷子' },
        { pinyin: 'bēi zi', hanzi: '杯子' },
        { pinyin: 'pán zi', hanzi: '盘子' },
      ],
      environment: [
        { pinyin: 'zhuō yǐ', hanzi: '桌椅' },
        { pinyin: 'chú fáng', hanzi: '厨房' },
        { pinyin: 'mén', hanzi: '门' },
        { pinyin: 'chuang hù', hanzi: '窗户' },
        { pinyin: 'dēng', hanzi: '灯' },
      ],
    },
  },
  {
    topic: '图书馆',
    titles: ['《图书馆探险》', '《爱读书》', '《书本世界》'],
    words: {
      coreRoles: [
        { pinyin: ' tú shū guǎn lǐ yuán', hanzi: '图书馆管理员' },
        { pinyin: 'xiǎo dú zhě', hanzi: '小读者' },
        { pinyin: 'lǎo shī', hanzi: '老师' },
        { pinyin: 'bà ba mā ma', hanzi: '爸爸妈妈' },
      ],
      commonItems: [
        { pinyin: 'shū', hanzi: '书' },
        { pinyin: 'shū jià', hanzi: '书架' },
        { pinyin: 'zhuō zi', hanzi: '桌子' },
        { pinyin: 'yǐ zi', hanzi: '椅子' },
        { pinyin: 'bǐ jì běn', hanzi: '笔记本' },
        { pinyin: 'xiàng pí', hanzi: '橡皮' },
        { pinyin: 'qiān bǐ', hanzi: '铅笔' },
        { pinyin: 'shū qiān', hanzi: '书签' },
      ],
      environment: [
        { pinyin: 'mén', hanzi: '门' },
        { pinyin: 'chuāng', hanzi: '窗' },
        { pinyin: 'dēng', hanzi: '灯' },
        { pinyin: 'dì tǎn', hanzi: '地毯' },
        { pinyin: 'huà', hanzi: '画' },
      ],
    },
  },
  {
    topic: '消防局',
    titles: ['《消防员叔叔》', '《安全消防》', '《救火英雄》'],
    words: {
      coreRoles: [
        { pinyin: 'xiāo fáng yuán', hanzi: '消防员' },
        { pinyin: 'zhǐ huī yuán', hanzi: '指挥员' },
        { pinyin: 'jǐng chá', hanzi: '警察' },
        { pinyin: 'jiù hù rén yuán', hanzi: '救护人员' },
      ],
      commonItems: [
        { pinyin: 'shuǐ qiāng', hanzi: '水枪' },
        { pinyin: 'shuǐ dài', hanzi: '水带' },
        { pinyin: 'fáng huǒ yī', hanzi: '防火衣' },
        { pinyin: 'tou kuī', hanzi: '头盔' },
        { pinyin: 'fáng mián qì', hanzi: '防面器' },
        { pinyin: 'duò chē', hanzi: '舵车' },
        { pinyin: 'tī zi', hanzi: '梯子' },
        { pinyin: 'gōng jù', hanzi: '工具' },
      ],
      environment: [
        { pinyin: 'chē kù', hanzi: '车库' },
        { pinyin: 'tǎn bù', hanzi: '坦布' },
        { pinyin: 'cāo chǎng', hanzi: '操场' },
        { pinyin: 'bào jǐng qì', hanzi: '报警器' },
        { pinyin: 'mén', hanzi: '门' },
      ],
    },
  },
  {
    topic: '农场',
    titles: ['《开心农场》', '《乡村之旅》', '《小农夫》'],
    words: {
      coreRoles: [
        { pinyin: 'nóng fū', hanzi: '农夫' },
        { pinyin: 'mù yáng rén', hanzi: '牧羊人' },
        { pinyin: 'gē ge', hanzi: '哥哥' },
        { pinyin: 'jiě jie', hanzi: '姐姐' },
      ],
      commonItems: [
        { pinyin: 'niú', hanzi: '牛' },
        { pinyin: 'yáng', hanzi: '羊' },
        { pinyin: 'jī', hanzi: '鸡' },
        { pinyin: 'zhū', hanzi: '猪' },
        { pinyin: 'luó bo', hanzi: '萝卜' },
        { pinyin: 'bái cài', hanzi: '白菜' },
        { pinyin: 'yù mǐ', hanzi: '玉米' },
        { pinyin: 'gē zi', hanzi: '鸽子' },
      ],
      environment: [
        { pinyin: 'tián', hanzi: '田' },
        { pinyin: 'gēn', hanzi: '根' },
        { pinyin: 'mù wū', hanzi: '木屋' },
        { pinyin: 'shuǐ jǐng', hanzi: '水井' },
        { pinyin: 'lù', hanzi: '路' },
      ],
    },
  },
];