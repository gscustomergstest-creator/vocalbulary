// 英语每日打卡 - 排行榜页面
// 活力青春风格: 游戏化排名, 奖章展示

import { useMemo } from 'react';
import { Trophy, Flame, BookOpen, Crown } from 'lucide-react';
import { getLeaderboard } from '@/lib/storage';

export default function Leaderboard() {
  const leaderboard = useMemo(() => getLeaderboard(), []);
  
  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const medalColors = [
    { bg: 'from-yellow-400 to-amber-500', text: 'text-yellow-700', border: 'border-yellow-300', shadow: 'shadow-yellow-200' },
    { bg: 'from-gray-300 to-gray-400', text: 'text-gray-600', border: 'border-gray-300', shadow: 'shadow-gray-200' },
    { bg: 'from-orange-300 to-amber-400', text: 'text-orange-700', border: 'border-orange-300', shadow: 'shadow-orange-200' },
  ];

  const rankIcons = ['🥇', '🥈', '🥉'];

  return (
    <div className="container py-6 pb-24 md:pb-8">
      {/* 标题 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5 mb-3">
          <Trophy size={14} className="text-yellow-500" />
          <span className="text-xs font-bold text-yellow-700">本周排行榜</span>
        </div>
        <h1 className="text-3xl text-gray-900" style={{ fontFamily: 'Fredoka One' }}>学习达人榜</h1>
        <p className="text-sm text-gray-400 mt-1">坚持打卡，超越自己！</p>
      </div>

      {/* 前三名展示台 */}
      <div className="flex items-end justify-center gap-4 mb-8">
        {/* 第二名 */}
        {topThree[1] && (
          <div className={`flex flex-col items-center ${topThree[1].isCurrentUser ? 'ring-2 ring-orange-400 ring-offset-2 rounded-3xl' : ''}`}>
            <div className="relative mb-2">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${medalColors[1].bg} flex items-center justify-center text-3xl shadow-lg ${medalColors[1].shadow} border-2 ${medalColors[1].border}`}>
                {topThree[1].avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs">
                🥈
              </div>
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 text-center w-28 h-28 flex flex-col justify-center">
              <p className="text-xs font-bold text-gray-700 truncate">{topThree[1].name}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/streak-fire-QXVcRBWDMxD6PB6HFaeU6k.webp" alt="fire" className="w-4 h-4 object-contain" />
                <span className="text-lg font-bold text-orange-500" style={{ fontFamily: 'Space Grotesk' }}>{topThree[1].streak}</span>
              </div>
              <p className="text-[10px] text-gray-400">连续天</p>
            </div>
          </div>
        )}

        {/* 第一名 */}
        {topThree[0] && (
          <div className={`flex flex-col items-center -mt-4 ${topThree[0].isCurrentUser ? 'ring-2 ring-orange-400 ring-offset-2 rounded-3xl' : ''}`}>
            <Crown size={24} className="text-yellow-500 mb-1" />
            <div className="relative mb-2">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${medalColors[0].bg} flex items-center justify-center text-4xl shadow-xl ${medalColors[0].shadow} border-2 ${medalColors[0].border}`}>
                {topThree[0].avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-yellow-200 flex items-center justify-center text-sm">
                🥇
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl px-4 py-3 shadow-md border border-yellow-200 text-center w-32 h-32 flex flex-col justify-center">
              <p className="text-xs font-bold text-gray-700 truncate">{topThree[0].name}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/streak-fire-QXVcRBWDMxD6PB6HFaeU6k.webp" alt="fire" className="w-5 h-5 object-contain" />
                <span className="text-2xl font-bold text-orange-500" style={{ fontFamily: 'Space Grotesk' }}>{topThree[0].streak}</span>
              </div>
              <p className="text-[10px] text-gray-400">连续天</p>
            </div>
          </div>
        )}

        {/* 第三名 */}
        {topThree[2] && (
          <div className={`flex flex-col items-center ${topThree[2].isCurrentUser ? 'ring-2 ring-orange-400 ring-offset-2 rounded-3xl' : ''}`}>
            <div className="relative mb-2">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${medalColors[2].bg} flex items-center justify-center text-3xl shadow-lg ${medalColors[2].shadow} border-2 ${medalColors[2].border}`}>
                {topThree[2].avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-orange-200 flex items-center justify-center text-xs">
                🥉
              </div>
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 text-center w-28 h-28 flex flex-col justify-center">
              <p className="text-xs font-bold text-gray-700 truncate">{topThree[2].name}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/streak-fire-QXVcRBWDMxD6PB6HFaeU6k.webp" alt="fire" className="w-4 h-4 object-contain" />
                <span className="text-lg font-bold text-orange-500" style={{ fontFamily: 'Space Grotesk' }}>{topThree[2].streak}</span>
              </div>
              <p className="text-[10px] text-gray-400">连续天</p>
            </div>
          </div>
        )}
      </div>

      {/* 成就徽章展示 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-5 border border-blue-100 mb-6">
        <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2 text-sm">
          <span>🏅</span> 成就徽章
        </h3>
        <div className="flex items-center justify-center">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/achievement-badge-Fbkr4wLW82qvPjE4McdyJ4.webp"
            alt="成就徽章"
            className="w-48 h-48 object-contain"
          />
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">坚持打卡解锁更多成就！</p>
      </div>

      {/* 完整排行榜 */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Trophy size={16} className="text-yellow-500" />
            完整排名
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-4 transition-all ${
                entry.isCurrentUser ? 'bg-orange-50 border-l-4 border-orange-400' : 'hover:bg-gray-50'
              }`}
            >
              {/* 排名 */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                entry.rank === 2 ? 'bg-gray-100 text-gray-600' :
                entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
                'bg-gray-50 text-gray-400'
              }`} style={{ fontFamily: 'Space Grotesk' }}>
                {entry.rank <= 3 ? rankIcons[entry.rank - 1] : entry.rank}
              </div>

              {/* 头像 */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-xl flex-shrink-0">
                {entry.avatar}
              </div>

              {/* 名字 */}
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm truncate ${entry.isCurrentUser ? 'text-orange-700' : 'text-gray-800'}`}>
                  {entry.name}
                  {entry.isCurrentUser && <span className="ml-2 text-xs bg-orange-200 text-orange-700 px-1.5 py-0.5 rounded-full">我</span>}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <BookOpen size={10} />
                    {entry.totalWords} 词
                  </span>
                </div>
              </div>

              {/* 连续天数 */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/streak-fire-QXVcRBWDMxD6PB6HFaeU6k.webp" alt="fire" className="w-5 h-5 object-contain" />
                <span className="font-bold text-orange-500 text-sm" style={{ fontFamily: 'Space Grotesk' }}>{entry.streak}</span>
                <span className="text-xs text-gray-400">天</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">排名基于连续打卡天数，每日更新</p>
    </div>
  );
}
