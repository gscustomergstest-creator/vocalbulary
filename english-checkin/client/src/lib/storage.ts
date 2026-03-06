// 英语每日打卡 - 本地存储管理
import { formatDate } from './wordData';

export interface CheckinRecord {
  date: string;
  wordsLearned: number[];
  completed: boolean;
  score?: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  totalDays: number;
  currentStreak: number;
  longestStreak: number;
  totalWords: number;
  joinDate: string;
  level: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  streak: number;
  totalWords: number;
  isCurrentUser?: boolean;
}

const STORAGE_KEYS = {
  CHECKIN_RECORDS: 'english_checkin_records',
  USER_PROFILE: 'english_user_profile',
  LEARNED_WORDS: 'english_learned_words',
  QUIZ_SCORES: 'english_quiz_scores',
};

// 获取打卡记录
export function getCheckinRecords(): Record<string, CheckinRecord> {
  const data = localStorage.getItem(STORAGE_KEYS.CHECKIN_RECORDS);
  return data ? JSON.parse(data) : {};
}

// 保存打卡记录
export function saveCheckinRecord(record: CheckinRecord): void {
  const records = getCheckinRecords();
  records[record.date] = record;
  localStorage.setItem(STORAGE_KEYS.CHECKIN_RECORDS, JSON.stringify(records));
}

// 今日是否已打卡
export function isTodayCheckedIn(): boolean {
  const records = getCheckinRecords();
  const today = formatDate(new Date());
  return records[today]?.completed === true;
}

// 执行今日打卡
export function doCheckin(wordIds: number[], score?: number): void {
  const today = formatDate(new Date());
  saveCheckinRecord({
    date: today,
    wordsLearned: wordIds,
    completed: true,
    score,
  });
  
  // 更新用户统计
  updateUserStats();
}

// 计算连续打卡天数
export function calculateStreak(): number {
  const records = getCheckinRecords();
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = formatDate(date);
    
    if (records[dateStr]?.completed) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  
  return streak;
}

// 获取用户资料
export function getUserProfile(): UserProfile {
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (data) return JSON.parse(data);
  
  // 默认用户资料
  return {
    name: '学习达人',
    avatar: '🎓',
    totalDays: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalWords: 0,
    joinDate: formatDate(new Date()),
    level: '初学者',
  };
}

// 保存用户资料
export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

// 更新用户统计数据
export function updateUserStats(): void {
  const profile = getUserProfile();
  const records = getCheckinRecords();
  const streak = calculateStreak();
  
  const totalDays = Object.values(records).filter(r => r.completed).length;
  const totalWords = Object.values(records).reduce((sum, r) => sum + (r.wordsLearned?.length || 0), 0);
  
  profile.totalDays = totalDays;
  profile.currentStreak = streak;
  profile.longestStreak = Math.max(profile.longestStreak, streak);
  profile.totalWords = totalWords;
  
  // 根据总天数更新等级
  if (totalDays >= 100) profile.level = '英语达人';
  else if (totalDays >= 50) profile.level = '进阶学者';
  else if (totalDays >= 20) profile.level = '勤奋学生';
  else if (totalDays >= 7) profile.level = '初级学员';
  else profile.level = '初学者';
  
  saveUserProfile(profile);
}

// 获取已学单词ID列表
export function getLearnedWordIds(): number[] {
  const records = getCheckinRecords();
  const allIds = new Set<number>();
  Object.values(records).forEach(r => {
    r.wordsLearned?.forEach(id => allIds.add(id));
  });
  return Array.from(allIds);
}

// 模拟排行榜数据
export function getLeaderboard(): LeaderboardEntry[] {
  const profile = getUserProfile();
  const streak = calculateStreak();
  const totalWords = getLearnedWordIds().length;
  
  const mockData: LeaderboardEntry[] = [
    { rank: 1, name: '小明同学', avatar: '🌟', streak: 45, totalWords: 225 },
    { rank: 2, name: '英语小达人', avatar: '🏆', streak: 38, totalWords: 190 },
    { rank: 3, name: '努力的小红', avatar: '🎯', streak: 32, totalWords: 160 },
    { rank: 4, name: '学霸小李', avatar: '📚', streak: 28, totalWords: 140 },
    { rank: 5, name: '坚持就是胜利', avatar: '💪', streak: 21, totalWords: 105 },
  ];
  
  // 插入当前用户
  const currentUser: LeaderboardEntry = {
    rank: 0,
    name: profile.name,
    avatar: profile.avatar,
    streak,
    totalWords,
    isCurrentUser: true,
  };
  
  const allEntries = [...mockData, currentUser].sort((a, b) => b.streak - a.streak);
  allEntries.forEach((entry, i) => { entry.rank = i + 1; });
  
  return allEntries;
}

// 保存测验分数
export function saveQuizScore(score: number, total: number): void {
  const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES) || '[]');
  scores.push({ date: formatDate(new Date()), score, total, percentage: Math.round((score / total) * 100) });
  localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(scores));
}

// 获取最近测验分数
export function getRecentQuizScores(): Array<{ date: string; score: number; total: number; percentage: number }> {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES) || '[]').slice(-7);
}
