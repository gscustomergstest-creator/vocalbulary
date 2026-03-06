// 英语每日打卡 - 主应用
// 活力青春风格: 单页面应用, 状态驱动导航

import { useState, useCallback } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Words from './pages/Words';
import Stats from './pages/Stats';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import { calculateStreak } from './lib/storage';

type Page = 'home' | 'words' | 'stats' | 'leaderboard' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [streak, setStreak] = useState(() => calculateStreak());

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStreakUpdate = useCallback(() => {
    setStreak(calculateStreak());
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} onStreakUpdate={handleStreakUpdate} />;
      case 'words':
        return <Words />;
      case 'stats':
        return <Stats />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onNavigate={handleNavigate} onStreakUpdate={handleStreakUpdate} />;
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-center" richColors />
          <div className="min-h-screen bg-background">
            <Navbar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              streak={streak}
            />
            <main>
              {renderPage()}
            </main>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
