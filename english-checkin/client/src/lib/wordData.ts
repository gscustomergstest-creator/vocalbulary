// 英语每日打卡 - 单词数据库
// 按中学英语课程分级整理

export interface Word {
  id: number;
  english: string;
  phonetic: string;
  chinese: string;
  partOfSpeech: string;
  example: string;
  exampleChinese: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  tags: string[];
}

export const wordDatabase: Word[] = [
  // 七年级词汇
  { id: 1, english: 'adventure', phonetic: '/ədˈventʃər/', chinese: '冒险；历险', partOfSpeech: 'n.', example: 'Life is a great adventure.', exampleChinese: '生活是一场伟大的冒险。', level: 'A2', tags: ['生活', '七年级'] },
  { id: 2, english: 'beautiful', phonetic: '/ˈbjuːtɪfl/', chinese: '美丽的；漂亮的', partOfSpeech: 'adj.', example: 'She has a beautiful smile.', exampleChinese: '她有一个美丽的微笑。', level: 'A1', tags: ['描述', '七年级'] },
  { id: 3, english: 'celebrate', phonetic: '/ˈselɪbreɪt/', chinese: '庆祝；庆贺', partOfSpeech: 'v.', example: 'We celebrate the New Year together.', exampleChinese: '我们一起庆祝新年。', level: 'A2', tags: ['活动', '七年级'] },
  { id: 4, english: 'delicious', phonetic: '/dɪˈlɪʃəs/', chinese: '美味的；可口的', partOfSpeech: 'adj.', example: 'The pizza is delicious.', exampleChinese: '这个披萨很美味。', level: 'A1', tags: ['食物', '七年级'] },
  { id: 5, english: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', chinese: '环境；自然环境', partOfSpeech: 'n.', example: 'We must protect the environment.', exampleChinese: '我们必须保护环境。', level: 'A2', tags: ['自然', '七年级'] },
  { id: 6, english: 'friendship', phonetic: '/ˈfrendʃɪp/', chinese: '友谊；友情', partOfSpeech: 'n.', example: 'True friendship is very precious.', exampleChinese: '真正的友谊是非常珍贵的。', level: 'A1', tags: ['社交', '七年级'] },
  { id: 7, english: 'generous', phonetic: '/ˈdʒenərəs/', chinese: '慷慨的；大方的', partOfSpeech: 'adj.', example: 'He is very generous with his time.', exampleChinese: '他在时间上非常慷慨。', level: 'A2', tags: ['品格', '七年级'] },
  { id: 8, english: 'happiness', phonetic: '/ˈhæpɪnəs/', chinese: '幸福；快乐', partOfSpeech: 'n.', example: 'Money cannot buy happiness.', exampleChinese: '金钱买不到幸福。', level: 'A1', tags: ['情感', '七年级'] },
  // 八年级词汇
  { id: 9, english: 'imagination', phonetic: '/ɪˌmædʒɪˈneɪʃn/', chinese: '想象力；想象', partOfSpeech: 'n.', example: 'Children have a vivid imagination.', exampleChinese: '孩子们有丰富的想象力。', level: 'A2', tags: ['思维', '八年级'] },
  { id: 10, english: 'journey', phonetic: '/ˈdʒɜːrni/', chinese: '旅行；旅程', partOfSpeech: 'n.', example: 'The journey took three hours.', exampleChinese: '这段旅程花了三个小时。', level: 'A1', tags: ['旅行', '八年级'] },
  { id: 11, english: 'knowledge', phonetic: '/ˈnɒlɪdʒ/', chinese: '知识；学问', partOfSpeech: 'n.', example: 'Knowledge is power.', exampleChinese: '知识就是力量。', level: 'A2', tags: ['学习', '八年级'] },
  { id: 12, english: 'language', phonetic: '/ˈlæŋɡwɪdʒ/', chinese: '语言；语言文字', partOfSpeech: 'n.', example: 'English is a global language.', exampleChinese: '英语是一种全球语言。', level: 'A1', tags: ['语言', '八年级'] },
  { id: 13, english: 'magnificent', phonetic: '/mæɡˈnɪfɪsnt/', chinese: '壮丽的；宏伟的', partOfSpeech: 'adj.', example: 'The view from the mountain is magnificent.', exampleChinese: '从山上看到的景色壮丽无比。', level: 'B1', tags: ['描述', '八年级'] },
  { id: 14, english: 'necessary', phonetic: '/ˈnesəseri/', chinese: '必要的；必需的', partOfSpeech: 'adj.', example: 'Exercise is necessary for good health.', exampleChinese: '锻炼对健康是必要的。', level: 'A2', tags: ['生活', '八年级'] },
  { id: 15, english: 'opportunity', phonetic: '/ˌɒpəˈtjuːnɪti/', chinese: '机会；时机', partOfSpeech: 'n.', example: 'Don\'t miss this great opportunity.', exampleChinese: '不要错过这个好机会。', level: 'B1', tags: ['生活', '八年级'] },
  { id: 16, english: 'patience', phonetic: '/ˈpeɪʃns/', chinese: '耐心；忍耐', partOfSpeech: 'n.', example: 'Learning a language requires patience.', exampleChinese: '学习一门语言需要耐心。', level: 'A2', tags: ['品格', '八年级'] },
  // 九年级词汇
  { id: 17, english: 'qualification', phonetic: '/ˌkwɒlɪfɪˈkeɪʃn/', chinese: '资格；资历；学历', partOfSpeech: 'n.', example: 'She has the right qualifications for the job.', exampleChinese: '她具备这份工作所需的资格。', level: 'B1', tags: ['职业', '九年级'] },
  { id: 18, english: 'responsible', phonetic: '/rɪˈspɒnsɪbl/', chinese: '负责任的；有责任感的', partOfSpeech: 'adj.', example: 'Be responsible for your actions.', exampleChinese: '对你的行为负责。', level: 'B1', tags: ['品格', '九年级'] },
  { id: 19, english: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', chinese: '重要的；有意义的', partOfSpeech: 'adj.', example: 'This is a significant discovery.', exampleChinese: '这是一个重要的发现。', level: 'B1', tags: ['描述', '九年级'] },
  { id: 20, english: 'technology', phonetic: '/tekˈnɒlədʒi/', chinese: '技术；科技', partOfSpeech: 'n.', example: 'Technology changes our daily life.', exampleChinese: '科技改变了我们的日常生活。', level: 'B1', tags: ['科技', '九年级'] },
  { id: 21, english: 'understand', phonetic: '/ˌʌndəˈstænd/', chinese: '理解；明白；懂得', partOfSpeech: 'v.', example: 'I understand your feelings.', exampleChinese: '我理解你的感受。', level: 'A1', tags: ['交流', '七年级'] },
  { id: 22, english: 'volunteer', phonetic: '/ˌvɒlənˈtɪər/', chinese: '志愿者；义工', partOfSpeech: 'n./v.', example: 'She volunteers at the local hospital.', exampleChinese: '她在当地医院做志愿者。', level: 'A2', tags: ['社会', '八年级'] },
  { id: 23, english: 'wonderful', phonetic: '/ˈwʌndərfl/', chinese: '精彩的；绝妙的', partOfSpeech: 'adj.', example: 'We had a wonderful time at the party.', exampleChinese: '我们在派对上度过了美好的时光。', level: 'A1', tags: ['描述', '七年级'] },
  { id: 24, english: 'excellent', phonetic: '/ˈeksələnt/', chinese: '优秀的；卓越的', partOfSpeech: 'adj.', example: 'She got excellent grades in the exam.', exampleChinese: '她在考试中取得了优异的成绩。', level: 'A1', tags: ['描述', '七年级'] },
  { id: 25, english: 'achieve', phonetic: '/əˈtʃiːv/', chinese: '实现；达到；取得', partOfSpeech: 'v.', example: 'Hard work helps you achieve your goals.', exampleChinese: '努力工作帮助你实现目标。', level: 'A2', tags: ['学习', '八年级'] },
  { id: 26, english: 'challenge', phonetic: '/ˈtʃælɪndʒ/', chinese: '挑战；难题', partOfSpeech: 'n./v.', example: 'Every challenge is an opportunity to grow.', exampleChinese: '每一个挑战都是成长的机会。', level: 'A2', tags: ['生活', '八年级'] },
  { id: 27, english: 'communicate', phonetic: '/kəˈmjuːnɪkeɪt/', chinese: '交流；沟通；传达', partOfSpeech: 'v.', example: 'It\'s important to communicate clearly.', exampleChinese: '清晰地沟通很重要。', level: 'A2', tags: ['交流', '八年级'] },
  { id: 28, english: 'culture', phonetic: '/ˈkʌltʃər/', chinese: '文化；文明', partOfSpeech: 'n.', example: 'China has a rich culture.', exampleChinese: '中国有着丰富的文化。', level: 'A2', tags: ['文化', '八年级'] },
  { id: 29, english: 'determine', phonetic: '/dɪˈtɜːrmɪn/', chinese: '决定；确定；查明', partOfSpeech: 'v.', example: 'Your attitude determines your success.', exampleChinese: '你的态度决定你的成功。', level: 'B1', tags: ['品格', '九年级'] },
  { id: 30, english: 'encourage', phonetic: '/ɪnˈkʌrɪdʒ/', chinese: '鼓励；激励；支持', partOfSpeech: 'v.', example: 'Teachers encourage students to read more.', exampleChinese: '老师鼓励学生多读书。', level: 'A2', tags: ['教育', '八年级'] },
];

// 获取今日单词（基于日期轮换）
export function getTodayWords(count: number = 5): Word[] {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const startIndex = (dayOfYear * count) % wordDatabase.length;
  const result: Word[] = [];
  for (let i = 0; i < count; i++) {
    result.push(wordDatabase[(startIndex + i) % wordDatabase.length]);
  }
  return result;
}

// 获取随机单词
export function getRandomWords(count: number): Word[] {
  const shuffled = [...wordDatabase].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 格式化日期
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// 获取本周日期列表
export function getWeekDates(): Date[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

// 获取本月日期列表
export function getMonthDates(): Date[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
}
