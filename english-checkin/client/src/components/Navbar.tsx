// 英语每日打卡 - 顶部导航组件
// 活力青春风格: 橙红主色, Fredoka One字体, 圆润设计

import { BookOpen, Trophy, BarChart2, User, Home } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  streak: number;
}

export default function Navbar({ currentPage, onNavigate, streak }: NavbarProps) {
  const navItems = [
    { id: 'home', label: '今日打卡', icon: Home },
    { id: 'words', label: '单词学习', icon: BookOpen },
    { id: 'stats', label: '学习统计', icon: BarChart2 },
    { id: 'leaderboard', label: '排行榜', icon: Trophy },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-bold" style={{ fontFamily: 'Fredoka One' }}>E</span>
            </div>
            <div>
              <h1 className="text-lg leading-tight text-gray-900" style={{ fontFamily: 'Fredoka One' }}>
                英语打卡
              </h1>
            </div>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                  style={{ fontFamily: 'Nunito' }}
                >
                  <Icon size={15} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* 连续打卡天数 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full px-3 py-1.5">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345100900/GzCHRcPQ7jFtQ3EEPMsmwW/streak-fire-QXVcRBWDMxD6PB6HFaeU6k.webp"
                alt="streak"
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-bold text-orange-600 font-number" style={{ fontFamily: 'Space Grotesk' }}>
                {streak}
              </span>
              <span className="text-xs text-orange-500 font-semibold hidden sm:block" style={{ fontFamily: 'Nunito' }}>天连续</span>
            </div>
          </div>
        </div>
      </div>

      {/* 移动端底部导航 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-lg">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? 'text-orange-500' : 'text-gray-400'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
