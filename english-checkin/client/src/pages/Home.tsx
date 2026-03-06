// 英语每日打卡 - 主页（今日打卡）
// 活力青春风格: 不对称布局, 橙红主色, 游戏化元素

import { useState, useEffect } from 'react';
import { CheckCircle, BookOpen, Zap, Calendar, Star, ArrowRight, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTodayWords, getWeekDates, formatDate, type Word } from '@/lib/wordData';
import { isTodayCheckedIn, doCheckin, calculateStreak, getUserProfile, getCheckinRecords } from '@/lib/storage';
import { toast } from 'sonner';

interface HomeProps {
  onNavigate: (page: string) => void;
  onStreakUpdate: () => void;
}

export default function Home({ onNavigate, onStreakUpdate }: HomeProps) {
  const [todayWords] = useState<Word[]>(() => getTodayWords(5));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedWords, setLearnedWords] = useState<Set<number>>(new Set());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [streak, setStreak] = useState(0);
  const [profile, setProfile] = useState(() => getUserProfile());
  const weekDates = getWeekDates();
  const checkinRecords = getCheckinRecords();
  const today = formatDate(new Date());
  const dateLabel = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });

  useEffect(() => {
    setIsCheckedIn(isTodayCheckedIn());
    setStreak(calculateStreak());
    setProfile(getUserProfile());
  }, []);

  const currentWord = todayWords[currentWordIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleMarkLearned = () => {
    const newLearned = new Set(learnedWords);
    newLearned.add(currentWord.id);
    setLearnedWords(newLearned);
    setIsFlipped(false);
    if (currentWordIndex < todayWords.length - 1) {
      setTimeout(() => setCurrentWordIndex(currentWordIndex + 1), 300);
    }
  };

  const handleCheckin = () => {
    if (isCheckedIn) {
      toast.info('今天已经打卡啦！明天继续加油！');
      return;
    }
    doCheckin(Array.from(learnedWords));
    setIsCheckedIn(true);
    setShowCelebration(true);
    const newStreak = calculateStreak();
    setStreak(newStreak);
    onStreakUpdate();
    toast.success(`打卡成功！连续 ${newStreak} 天！`, {
      description: `今天学习了 ${learnedWords.size} 个单词，继续保持！`,
    });
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const dayNames = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* 庆祝动效 */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-30px',
                animationDelay: `${Math.random() * 0.6}s`,
                animationDuration: `${0.7 + Math.random() * 0.9}s`,
              }}
            >
              {['🎉', '⭐', '🌟', '✨', '🎊', '🏆', '🎈', '💫'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}

      {/* 英雄区 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/30 to-blue-50/40">
        <div
          className="absolute inset-0 opacity-8 bg-cover bg-center"
          style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/hero-banner-B4tmJHChdqMetBT3aBiqD4.webp)` }}
        />
        {/* 装饰圆 */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl" />

        <div className="container relative py-8">
          {/* 日期标签 */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full shadow-sm">
              <Calendar size={14} />
              {dateLabel}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* 左侧主内容 */}
            <div className="flex-1 space-y-5">
              {/* 用户信息 */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-3xl shadow-lg shadow-orange-200">
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold">早上好，</p>
                  <h2 className="text-2xl text-gray-900 leading-tight" style={{ fontFamily: 'Fredoka One' }}>
                    {profile.name}
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-200 shadow-sm">
                  <Star size={11} fill="currentColor" />
                  {profile.level}
                </span>
              </div>

              {/* 统计三格 */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 card-hover">
                  <div className="mb-2">
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/streak-fire-QXVcRBWDMxD6PB6HFaeU6k.webp"
                      alt="fire" className="w-7 h-7 object-contain"
                    />
                  </div>
                  <p className="text-2xl font-bold text-orange-500" style={{ fontFamily: 'Space Grotesk' }}>{streak}</p>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">连续天数</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 card-hover">
                  <div className="mb-2"><BookOpen size={22} className="text-blue-500" /></div>
                  <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Space Grotesk' }}>{profile.totalWords}</p>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">已学单词</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100 card-hover">
                  <div className="mb-2"><Calendar size={22} className="text-green-500" /></div>
                  <p className="text-2xl font-bold text-green-600" style={{ fontFamily: 'Space Grotesk' }}>{profile.totalDays}</p>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">累计天数</p>
                </div>
              </div>

              {/* 本周打卡日历 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-600 mb-3 flex items-center gap-2">
                  <Calendar size={15} className="text-orange-500" />
                  本周打卡记录
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date, i) => {
                    const dateStr = formatDate(date);
                    const isToday = dateStr === today;
                    const isChecked = checkinRecords[dateStr]?.completed;
                    const isPast = date < new Date() && !isToday;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold text-gray-400">{dayNames[i]}</span>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all checkin-cell ${
                          isChecked ? 'checked text-white' :
                          isToday ? 'bg-orange-100 text-orange-600 border-2 border-orange-400 pulse-glow' :
                          isPast ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-300'
                        }`}>
                          {isChecked ? <CheckCircle size={15} /> : <span style={{ fontFamily: 'Space Grotesk' }}>{date.getDate()}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 右侧：今日状态卡 */}
            <div className="w-full lg:w-72 space-y-3">
              <div className={`rounded-3xl p-6 text-center shadow-xl ${
                isCheckedIn
                  ? 'bg-gradient-to-br from-green-400 to-emerald-600'
                  : 'bg-gradient-to-br from-orange-500 to-red-500'
              }`}>
                <div className="text-5xl mb-3">{isCheckedIn ? '✅' : '📚'}</div>
                <h3 className="text-white text-xl mb-1" style={{ fontFamily: 'Fredoka One' }}>
                  {isCheckedIn ? '今日已打卡！' : '今日待打卡'}
                </h3>
                <p className="text-white/80 text-sm mb-5">
                  {isCheckedIn
                    ? `已学习 ${learnedWords.size || todayWords.length} 个单词`
                    : `还有 ${todayWords.length - learnedWords.size} 个单词待学习`}
                </p>
                {!isCheckedIn ? (
                  <button
                    onClick={handleCheckin}
                    disabled={learnedWords.size === 0}
                    className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
                      learnedWords.size > 0
                        ? 'bg-white text-orange-600 hover:bg-orange-50 shadow-md'
                        : 'bg-white/30 text-white/60 cursor-not-allowed'
                    }`}
                  >
                    {learnedWords.size > 0 ? `立即打卡 (${learnedWords.size}/${todayWords.length})` : '先学习单词再打卡'}
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-semibold">
                    <CheckCircle size={16} />
                    继续保持！明天见
                  </div>
                )}
              </div>

              {/* 快捷入口 */}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => onNavigate('words')} className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:border-blue-300 transition-all card-hover text-left">
                  <BookOpen size={20} className="text-blue-500 mb-2" />
                  <p className="text-xs font-bold text-gray-700">单词库</p>
                  <p className="text-[10px] text-gray-400">30+ 单词</p>
                </button>
                <button onClick={() => onNavigate('leaderboard')} className="bg-white rounded-2xl p-4 shadow-sm border border-yellow-100 hover:border-yellow-300 transition-all card-hover text-left">
                  <span className="text-xl mb-2 block">🏆</span>
                  <p className="text-xs font-bold text-gray-700">排行榜</p>
                  <p className="text-[10px] text-gray-400">查看排名</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 今日单词学习区 */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl text-gray-900" style={{ fontFamily: 'Fredoka One' }}>
            今日单词
            <span className="ml-2 text-sm font-normal text-gray-400" style={{ fontFamily: 'Nunito' }}>
              {learnedWords.size}/{todayWords.length} 已掌握
            </span>
          </h2>
          <button
            onClick={() => { setCurrentWordIndex(0); setIsFlipped(false); setLearnedWords(new Set()); }}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-500 transition-colors font-semibold"
          >
            <RotateCcw size={14} />
            重置
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* 主单词卡 */}
          <div className="flex-1">
            {/* 进度条 */}
            <div className="flex gap-2 mb-5">
              {todayWords.map((word, i) => (
                <button
                  key={word.id}
                  onClick={() => { setCurrentWordIndex(i); setIsFlipped(false); }}
                  className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${
                    learnedWords.has(word.id) ? 'bg-green-400' :
                    i === currentWordIndex ? 'bg-orange-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* 3D翻转单词卡 */}
            <div className={`word-card-container ${isFlipped ? 'flipped' : ''}`} style={{ height: '300px' }}>
              <div className="word-card-inner relative w-full h-full">
                {/* 正面 */}
                <div
                  className="word-card-front absolute inset-0 rounded-3xl overflow-hidden cursor-pointer select-none"
                  onClick={handleFlip}
                  style={{ background: 'linear-gradient(135deg, #1B4F72 0%, #2471A3 60%, #1A5276 100%)' }}
                >
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/word-card-bg-Ur5ZBk6veNGKvsFFsgRa7W.webp)`,
                    backgroundSize: 'cover',
                  }} />
                  {/* 装饰圆 */}
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                    <span className="text-blue-300 text-xs font-bold uppercase tracking-[0.2em] mb-4 bg-white/10 px-3 py-1 rounded-full">
                      {currentWord.partOfSpeech} · {currentWord.level}
                    </span>
                    <h2 className="text-white text-5xl mb-3 drop-shadow-lg" style={{ fontFamily: 'Fredoka One' }}>
                      {currentWord.english}
                    </h2>
                    <p className="text-blue-200 text-base font-mono tracking-wide">{currentWord.phonetic}</p>
                    <div className="mt-8 flex items-center gap-2 text-blue-300/70 text-xs font-semibold">
                      <span>点击翻转查看释义</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>

                {/* 背面 */}
                <div
                  className="word-card-back absolute inset-0 rounded-3xl overflow-hidden cursor-pointer select-none"
                  onClick={handleFlip}
                  style={{ background: 'linear-gradient(135deg, #E74C3C 0%, #FF6B35 50%, #F39C12 100%)' }}
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full" />
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <span className="text-orange-100 text-xs font-bold uppercase tracking-[0.2em] mb-3 bg-white/15 px-3 py-1 rounded-full">中文释义</span>
                    <h2 className="text-white text-3xl font-bold mb-3 drop-shadow" style={{ fontFamily: 'Fredoka One' }}>
                      {currentWord.chinese}
                    </h2>
                    <div className="w-16 h-0.5 bg-white/30 my-3" />
                    <p className="text-orange-100 text-sm italic mb-1.5 max-w-xs">"{currentWord.example}"</p>
                    <p className="text-white/65 text-xs max-w-xs">{currentWord.exampleChinese}</p>
                    <div className="mt-5 flex flex-wrap gap-2 justify-center">
                      {currentWord.tags.map(tag => (
                        <span key={tag} className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={() => { setIsFlipped(false); setTimeout(() => setCurrentWordIndex(Math.max(0, currentWordIndex - 1)), 150); }}
                disabled={currentWordIndex === 0}
                className="w-12 h-12 rounded-2xl border-2 border-gray-200 text-gray-400 hover:border-gray-300 disabled:opacity-30 transition-all flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleMarkLearned}
                className={`flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  learnedWords.has(currentWord.id)
                    ? 'bg-green-100 text-green-600 border-2 border-green-200'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5'
                }`}
              >
                {learnedWords.has(currentWord.id) ? '✓ 已掌握' : '我学会了！'}
              </button>
              <button
                onClick={() => { setIsFlipped(false); setTimeout(() => setCurrentWordIndex(Math.min(todayWords.length - 1, currentWordIndex + 1)), 150); }}
                disabled={currentWordIndex === todayWords.length - 1}
                className="w-12 h-12 rounded-2xl border-2 border-gray-200 text-gray-400 hover:border-gray-300 disabled:opacity-30 transition-all flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* 右侧单词列表 */}
          <div className="w-full lg:w-64">
            <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wide">今日单词列表</h3>
            <div className="space-y-2">
              {todayWords.map((word, i) => (
                <button
                  key={word.id}
                  onClick={() => { setCurrentWordIndex(i); setIsFlipped(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                    i === currentWordIndex
                      ? 'bg-orange-50 border-2 border-orange-300 shadow-sm'
                      : 'bg-white border-2 border-gray-100 hover:border-orange-200'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    learnedWords.has(word.id) ? 'bg-green-100 text-green-600' :
                    i === currentWordIndex ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {learnedWords.has(word.id) ? '✓' : i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{word.english}</p>
                    <p className="text-xs text-gray-400 truncate">{word.chinese}</p>
                  </div>
                </button>
              ))}
            </div>

            {learnedWords.size > 0 && !isCheckedIn && (
              <button
                onClick={handleCheckin}
                className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all"
              >
                <Zap size={16} className="inline mr-2" />
                完成今日打卡！
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
