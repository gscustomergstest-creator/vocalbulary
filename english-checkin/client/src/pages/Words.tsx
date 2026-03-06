// 英语每日打卡 - 单词学习页面
// 活力青春风格: 单词卡片浏览、搜索、测验功能

import { useState, useMemo } from 'react';
import { Search, BookOpen, Volume2, ChevronLeft, ChevronRight, Brain } from 'lucide-react';
import { wordDatabase, type Word } from '@/lib/wordData';
import { getLearnedWordIds, saveQuizScore } from '@/lib/storage';
import { toast } from 'sonner';

type ViewMode = 'browse' | 'quiz';
type FilterLevel = 'all' | 'A1' | 'A2' | 'B1' | 'B2';

export default function Words() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<FilterLevel>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // 测验状态
  const [quizWords, setQuizWords] = useState<Word[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<boolean[]>([]);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const learnedIds = getLearnedWordIds();

  const filteredWords = useMemo(() => {
    return wordDatabase.filter(word => {
      const matchSearch = !searchQuery || 
        word.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.chinese.includes(searchQuery);
      const matchLevel = filterLevel === 'all' || word.level === filterLevel;
      return matchSearch && matchLevel;
    });
  }, [searchQuery, filterLevel]);

  const levelColors: Record<string, string> = {
    A1: 'bg-green-100 text-green-700',
    A2: 'bg-blue-100 text-blue-700',
    B1: 'bg-orange-100 text-orange-700',
    B2: 'bg-red-100 text-red-700',
  };

  // 生成测验选项
  const generateQuizOptions = (word: Word): string[] => {
    const correct = word.chinese;
    const others = wordDatabase
      .filter(w => w.id !== word.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.chinese);
    return [correct, ...others].sort(() => Math.random() - 0.5);
  };

  const startQuiz = () => {
    const words = [...wordDatabase].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizWords(words);
    setQuizIndex(0);
    setQuizAnswers([]);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setQuizOptions(generateQuizOptions(words[0]));
    setViewMode('quiz');
  };

  const handleQuizAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === quizWords[quizIndex].chinese;
    const newAnswers = [...quizAnswers, isCorrect];
    setQuizAnswers(newAnswers);

    setTimeout(() => {
      if (quizIndex + 1 < quizWords.length) {
        const nextWord = quizWords[quizIndex + 1];
        setQuizIndex(quizIndex + 1);
        setQuizOptions(generateQuizOptions(nextWord));
        setSelectedAnswer(null);
      } else {
        const score = newAnswers.filter(Boolean).length;
        saveQuizScore(score, quizWords.length);
        setQuizFinished(true);
        toast.success(`测验完成！得分 ${score}/${quizWords.length}`);
      }
    }, 1000);
  };

  if (viewMode === 'quiz') {
    if (quizFinished) {
      const score = quizAnswers.filter(Boolean).length;
      const percentage = Math.round((score / quizWords.length) * 100);
      return (
        <div className="container py-8 pb-24 md:pb-8">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-4">{percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}</div>
            <h2 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: 'Fredoka One' }}>测验完成！</h2>
            <p className="text-gray-500 mb-6">你答对了 {score}/{quizWords.length} 道题</p>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: percentage >= 80 ? '#22c55e' : percentage >= 60 ? '#f97316' : '#ef4444' }}>
                {percentage}%
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mt-3">
                <div 
                  className="h-3 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, #FF6B35, #F7931E)'
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span><span>100%</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={startQuiz} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg shadow-orange-200">
                再来一次
              </button>
              <button onClick={() => setViewMode('browse')} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold">
                返回单词库
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQuizWord = quizWords[quizIndex];
    return (
      <div className="container py-8 pb-24 md:pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setViewMode('browse')} className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
              <ChevronLeft size={18} /> 退出测验
            </button>
            <span className="text-sm font-bold text-gray-500" style={{ fontFamily: 'Space Grotesk' }}>
              {quizIndex + 1} / {quizWords.length}
            </span>
          </div>

          <div className="flex gap-1 mb-6">
            {quizWords.map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full transition-all ${
                i < quizIndex ? (quizAnswers[i] ? 'bg-green-400' : 'bg-red-400') : i === quizIndex ? 'bg-orange-400' : 'bg-gray-200'
              }`} />
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-center mb-6 shadow-xl">
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">选择正确的中文释义</p>
            <h2 className="text-white text-4xl mb-2" style={{ fontFamily: 'Fredoka One' }}>{currentQuizWord.english}</h2>
            <p className="text-blue-300 font-mono text-sm">{currentQuizWord.phonetic}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {quizOptions.map((option, i) => {
              const isCorrect = option === currentQuizWord.chinese;
              const isSelected = option === selectedAnswer;
              let btnClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300';
              if (selectedAnswer) {
                if (isCorrect) btnClass = 'bg-green-50 border-2 border-green-400 text-green-700';
                else if (isSelected) btnClass = 'bg-red-50 border-2 border-red-400 text-red-700';
                else btnClass = 'bg-white border-2 border-gray-100 text-gray-400';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleQuizAnswer(option)}
                  className={`w-full p-4 rounded-2xl font-semibold text-left transition-all ${btnClass}`}
                >
                  <span className="inline-block w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-xs font-bold text-center leading-6 mr-3">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 pb-24 md:pb-8">
      {/* 头部 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-gray-900" style={{ fontFamily: 'Fredoka One' }}>单词库</h1>
          <p className="text-sm text-gray-400 mt-0.5">{wordDatabase.length} 个单词 · {learnedIds.length} 个已掌握</p>
        </div>
        <button
          onClick={startQuiz}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all"
        >
          <Brain size={16} />
          开始测验
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索单词或中文..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-gray-200 focus:border-orange-400 outline-none text-sm font-semibold bg-white transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'A1', 'A2', 'B1', 'B2'] as FilterLevel[]).map(level => (
            <button
              key={level}
              onClick={() => setFilterLevel(level)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                filterLevel === level
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white border-2 border-gray-200 text-gray-500 hover:border-orange-300'
              }`}
            >
              {level === 'all' ? '全部' : level}
            </button>
          ))}
        </div>
      </div>

      {/* 单词详情弹出 */}
      {selectedWord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelectedWord(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'Fredoka One' }}>{selectedWord.english}</h2>
                <p className="text-gray-400 font-mono text-sm">{selectedWord.phonetic}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${levelColors[selectedWord.level]}`}>{selectedWord.level}</span>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 mb-4">
              <p className="text-orange-800 font-bold text-lg">{selectedWord.partOfSpeech} {selectedWord.chinese}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-gray-600 text-sm italic mb-1">"{selectedWord.example}"</p>
              <p className="text-gray-400 text-xs">{selectedWord.exampleChinese}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedWord.tags.map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-lg">{tag}</span>
              ))}
            </div>
            <button onClick={() => setSelectedWord(null)} className="w-full mt-4 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm">
              关闭
            </button>
          </div>
        </div>
      )}

      {/* 单词列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredWords.map(word => {
          const isLearned = learnedIds.includes(word.id);
          return (
            <button
              key={word.id}
              onClick={() => setSelectedWord(word)}
              className="bg-white rounded-2xl p-4 shadow-sm border-2 border-gray-100 hover:border-orange-200 transition-all card-hover text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Fredoka One' }}>{word.english}</h3>
                  <p className="text-xs text-gray-400 font-mono">{word.phonetic}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {isLearned && <span className="text-green-500 text-xs font-bold">✓</span>}
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${levelColors[word.level]}`}>{word.level}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm font-semibold">{word.partOfSpeech} {word.chinese}</p>
              <p className="text-gray-400 text-xs mt-1 truncate italic">"{word.example}"</p>
            </button>
          );
        })}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-semibold">没有找到匹配的单词</p>
        </div>
      )}
    </div>
  );
}
