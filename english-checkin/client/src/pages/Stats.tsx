// 英语每日打卡 - 学习统计页面
// 活力青春风格: 数据可视化, 进度环, 打卡热力图

import { useMemo } from 'react';
import { TrendingUp, Calendar, BookOpen, Zap, Award } from 'lucide-react';
import { getCheckinRecords, getUserProfile, getRecentQuizScores } from '@/lib/storage';
import { getMonthDates, formatDate } from '@/lib/wordData';

export default function Stats() {
  const profile = getUserProfile();
  const records = getCheckinRecords();
  const quizScores = getRecentQuizScores();
  const monthDates = getMonthDates();
  const today = formatDate(new Date());

  // 本月打卡天数
  const monthCheckinCount = useMemo(() => {
    return monthDates.filter(d => records[formatDate(d)]?.completed).length;
  }, [monthDates, records]);

  // 月完成率
  const monthProgress = Math.round((monthCheckinCount / monthDates.length) * 100);

  // 本周打卡天数
  const weekCheckinCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (records[formatDate(d)]?.completed) count++;
    }
    return count;
  }, [records]);

  // 进度环SVG
  const CircularProgress = ({ value, max, color, size = 100 }: { value: number; max: number; color: string; size?: number }) => {
    const percentage = Math.min((value / max) * 100, 100);
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    return (
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#f3f4f6" strokeWidth="8" />
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
    );
  };

  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

  return (
    <div className="container py-6 pb-24 md:pb-8">
      <h1 className="text-2xl text-gray-900 mb-6" style={{ fontFamily: 'Fredoka One' }}>学习统计</h1>

      {/* 核心数据卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: '连续打卡', value: profile.currentStreak, unit: '天', icon: '🔥', color: 'from-orange-400 to-red-500', textColor: 'text-orange-600' },
          { label: '累计打卡', value: profile.totalDays, unit: '天', icon: '📅', color: 'from-blue-400 to-blue-600', textColor: 'text-blue-600' },
          { label: '已学单词', value: profile.totalWords, unit: '个', icon: '📚', color: 'from-green-400 to-emerald-500', textColor: 'text-green-600' },
          { label: '最长连续', value: profile.longestStreak, unit: '天', icon: '🏆', color: 'from-yellow-400 to-orange-400', textColor: 'text-yellow-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className={`text-3xl font-bold ${item.textColor}`} style={{ fontFamily: 'Space Grotesk' }}>{item.value}</p>
            <p className="text-xs text-gray-400 font-semibold mt-1">{item.label} ({item.unit})</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 本月打卡热力图 */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={18} className="text-orange-500" />
              本月打卡记录
            </h2>
            <span className="text-sm font-bold text-orange-500" style={{ fontFamily: 'Space Grotesk' }}>
              {monthCheckinCount}/{monthDates.length}天
            </span>
          </div>

          {/* 星期标题 */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayNames.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400">{d}</div>
            ))}
          </div>

          {/* 日历格子 */}
          <div className="grid grid-cols-7 gap-1">
            {/* 填充月初空格 */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {monthDates.map((date) => {
              const dateStr = formatDate(date);
              const isChecked = records[dateStr]?.completed;
              const isToday = dateStr === today;
              const isFuture = date > new Date();
              
              return (
                <div
                  key={dateStr}
                  className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    isChecked
                      ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-sm'
                      : isToday
                      ? 'bg-orange-100 text-orange-600 border-2 border-orange-400'
                      : isFuture
                      ? 'bg-gray-50 text-gray-200'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>

          {/* 图例 */}
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-gradient-to-br from-orange-400 to-red-500" />
              已打卡
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-gray-100" />
              未打卡
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-orange-100 border-2 border-orange-400" />
              今天
            </div>
          </div>
        </div>

        {/* 右侧统计 */}
        <div className="space-y-4">
          {/* 本月进度环 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-orange-500" />
              本月完成率
            </h3>
            <div className="flex items-center justify-center">
              <div className="relative">
                <CircularProgress value={monthCheckinCount} max={monthDates.length} color="#FF6B35" size={120} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-orange-500" style={{ fontFamily: 'Space Grotesk' }}>{monthProgress}%</span>
                  <span className="text-xs text-gray-400">完成率</span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500">本月已打卡 <span className="font-bold text-orange-500">{monthCheckinCount}</span> 天</p>
            </div>
          </div>

          {/* 本周进度 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Zap size={16} className="text-blue-500" />
              本周打卡
            </h3>
            <div className="flex items-center justify-center">
              <div className="relative">
                <CircularProgress value={weekCheckinCount} max={7} color="#1B4F72" size={120} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-blue-700" style={{ fontFamily: 'Space Grotesk' }}>{weekCheckinCount}/7</span>
                  <span className="text-xs text-gray-400">天</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 测验成绩 */}
      {quizScores.length > 0 && (
        <div className="mt-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award size={18} className="text-yellow-500" />
            近期测验成绩
          </h2>
          <div className="space-y-3">
            {quizScores.slice().reverse().map((score, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs text-gray-400 w-20 font-semibold">{score.date}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${score.percentage}%`,
                      background: score.percentage >= 80 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : score.percentage >= 60 ? 'linear-gradient(90deg, #f97316, #ea580c)' : 'linear-gradient(90deg, #ef4444, #dc2626)',
                    }}
                  />
                </div>
                <span className="text-sm font-bold w-12 text-right" style={{ fontFamily: 'Space Grotesk', color: score.percentage >= 80 ? '#22c55e' : score.percentage >= 60 ? '#f97316' : '#ef4444' }}>
                  {score.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {quizScores.length === 0 && (
        <div className="mt-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 border border-orange-100 text-center">
          <BookOpen size={32} className="text-orange-300 mx-auto mb-2" />
          <p className="text-gray-500 font-semibold text-sm">还没有测验记录</p>
          <p className="text-gray-400 text-xs mt-1">去单词库页面开始测验吧！</p>
        </div>
      )}
    </div>
  );
}
