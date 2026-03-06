// 英语每日打卡 - 个人中心页面
// 活力青春风格: 用户信息展示, 成就系统, 设置

import { useState } from 'react';
import { Edit2, Check, Star, Flame, BookOpen, Calendar, Trophy, ChevronRight } from 'lucide-react';
import { getUserProfile, saveUserProfile, calculateStreak } from '@/lib/storage';
import { toast } from 'sonner';

const AVATARS = ['🎓', '🦁', '🐯', '🦊', '🐧', '🦄', '🐉', '🌟', '🎯', '🚀', '💎', '🏆'];

export default function Profile() {
  const [profile, setProfile] = useState(() => getUserProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editAvatar, setEditAvatar] = useState(profile.avatar);
  const streak = calculateStreak();

  const handleSave = () => {
    const updated = { ...profile, name: editName.trim() || '学习达人', avatar: editAvatar };
    saveUserProfile(updated);
    setProfile(updated);
    setIsEditing(false);
    toast.success('个人信息已更新！');
  };

  // 成就系统
  const achievements = [
    { id: 1, icon: '🌱', title: '初学者', desc: '完成第一次打卡', unlocked: profile.totalDays >= 1 },
    { id: 2, icon: '🔥', title: '坚持一周', desc: '连续打卡7天', unlocked: profile.longestStreak >= 7 },
    { id: 3, icon: '📚', title: '词汇达人', desc: '累计学习50个单词', unlocked: profile.totalWords >= 50 },
    { id: 4, icon: '🏆', title: '月度冠军', desc: '本月打卡20天以上', unlocked: profile.totalDays >= 20 },
    { id: 5, icon: '💎', title: '完美学者', desc: '连续打卡30天', unlocked: profile.longestStreak >= 30 },
    { id: 6, icon: '🚀', title: '英语达人', desc: '累计打卡100天', unlocked: profile.totalDays >= 100 },
  ];

  const levelInfo = {
    '初学者': { color: 'text-gray-500', bg: 'bg-gray-100', progress: 10, next: '初级学员', nextAt: 7 },
    '初级学员': { color: 'text-green-600', bg: 'bg-green-100', progress: 30, next: '勤奋学生', nextAt: 20 },
    '勤奋学生': { color: 'text-blue-600', bg: 'bg-blue-100', progress: 55, next: '进阶学者', nextAt: 50 },
    '进阶学者': { color: 'text-purple-600', bg: 'bg-purple-100', progress: 75, next: '英语达人', nextAt: 100 },
    '英语达人': { color: 'text-orange-600', bg: 'bg-orange-100', progress: 100, next: '满级', nextAt: 100 },
  };

  const currentLevel = levelInfo[profile.level as keyof typeof levelInfo] || levelInfo['初学者'];

  return (
    <div className="container py-6 pb-24 md:pb-8">
      {/* 个人信息卡 */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex items-start gap-4">
          {/* 头像 */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl shadow-lg">
              {profile.avatar}
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-orange-500 flex items-center justify-center shadow-md"
              >
                <Edit2 size={12} className="text-white" />
              </button>
            )}
          </div>

          {/* 信息 */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  maxLength={12}
                  className="w-full bg-white/20 text-white placeholder-white/50 rounded-xl px-3 py-2 text-sm font-bold outline-none border border-white/30 focus:border-white/60"
                  placeholder="输入昵称"
                />
                <div className="flex flex-wrap gap-2">
                  {AVATARS.map(avatar => (
                    <button
                      key={avatar}
                      onClick={() => setEditAvatar(avatar)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all ${
                        editAvatar === avatar ? 'bg-white/40 scale-110' : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} className="flex items-center gap-1 bg-white text-blue-700 rounded-xl px-3 py-1.5 text-xs font-bold">
                    <Check size={12} /> 保存
                  </button>
                  <button onClick={() => setIsEditing(false)} className="bg-white/20 text-white rounded-xl px-3 py-1.5 text-xs font-bold">
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-white text-xl font-bold" style={{ fontFamily: 'Fredoka One' }}>{profile.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${currentLevel.bg} ${currentLevel.color}`}>
                    <Star size={10} className="inline mr-0.5" />
                    {profile.level}
                  </span>
                  <span className="text-blue-200 text-xs">加入于 {profile.joinDate}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 等级进度条 */}
        {!isEditing && (
          <div className="relative mt-4">
            <div className="flex justify-between text-xs text-blue-200 mb-1">
              <span>{profile.level}</span>
              <span>{currentLevel.next !== '满级' ? `距离${currentLevel.next}还需 ${Math.max(0, currentLevel.nextAt - profile.totalDays)} 天` : '已达最高等级！'}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-1000"
                style={{ width: `${currentLevel.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { icon: <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/streak-fire-QXVcRBWDMxD6PB6HFaeU6k.webp" alt="fire" className="w-6 h-6 object-contain" />, value: streak, label: '连续天', color: 'text-orange-500' },
          { icon: <Calendar size={20} className="text-blue-500" />, value: profile.totalDays, label: '累计天', color: 'text-blue-600' },
          { icon: <BookOpen size={20} className="text-green-500" />, value: profile.totalWords, label: '学单词', color: 'text-green-600' },
          { icon: <Trophy size={20} className="text-yellow-500" />, value: profile.longestStreak, label: '最长连续', color: 'text-yellow-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center card-hover">
            <div className="flex justify-center mb-1">{item.icon}</div>
            <p className={`text-xl font-bold ${item.color}`} style={{ fontFamily: 'Space Grotesk' }}>{item.value}</p>
            <p className="text-[10px] text-gray-400 font-semibold">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 成就系统 */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy size={18} className="text-yellow-500" />
          我的成就
          <span className="ml-auto text-xs text-gray-400">
            {achievements.filter(a => a.unlocked).length}/{achievements.length} 已解锁
          </span>
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`rounded-2xl p-3 text-center transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200'
                  : 'bg-gray-50 border-2 border-gray-100 opacity-50'
              }`}
            >
              <div className={`text-2xl mb-1 ${!achievement.unlocked && 'grayscale'}`}>
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
              <p className={`text-xs font-bold ${achievement.unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                {achievement.title}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 设置选项 */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">设置</h2>
        </div>
        {[
          { icon: '🎯', label: '每日目标', value: '5个单词/天', action: () => toast.info('功能开发中') },
          { icon: '🔔', label: '打卡提醒', value: '每天 20:00', action: () => toast.info('功能开发中') },
          { icon: '📊', label: '学习报告', value: '查看详情', action: () => toast.info('功能开发中') },
          { icon: '🌐', label: '单词难度', value: '七至九年级', action: () => toast.info('功能开发中') },
        ].map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="flex-1 text-sm font-semibold text-gray-700 text-left">{item.label}</span>
            <span className="text-xs text-gray-400">{item.value}</span>
            <ChevronRight size={14} className="text-gray-300" />
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-gray-300 mt-6">英语每日打卡 v1.0 · 坚持就是胜利</p>
    </div>
  );
}
