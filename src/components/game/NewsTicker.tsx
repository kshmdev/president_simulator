import React, { useState, useEffect } from 'react';

interface NewsTickerProps {
  playerName: string;
  phase: string;
  approvalRating: number;
  daysInOffice: number;
}

const NewsTicker: React.FC<NewsTickerProps> = ({ playerName, phase, approvalRating, daysInOffice }) => {
  const [currentNews, setCurrentNews] = useState<string[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  const generateNews = () => {
    const baseNews = [
      `📰 BREAKING: ${playerName} administration approval at ${approvalRating}%`,
      `📊 Day ${daysInOffice} of the ${playerName} presidency`,
    ];

    const phaseNews: Record<string, string[]> = {
      campaign: [
        `🎤 ${playerName} rallies supporters across the nation`,
        `📊 Polls show tight race ahead of primary season`,
        `💼 Economic concerns top voter priorities`,
      ],
      debate: [
        `🎤 Debate night draws record viewership`,
        `📺 Analysts predict intense policy discussions`,
        `🗳️ Voters tune in to hear candidates' positions`,
      ],
      election: [
        `🗳️ Polls opening across all 50 states`,
        `📊 Record voter turnout expected today`,
        `🇺🇸 Nation watches as votes are counted`,
      ],
      governing: [
        `🏛️ Congress awaits White House direction`,
        `🌍 World leaders watch American policy closely`,
        approvalRating > 60 ? `📈 ${playerName} enjoying strong public support` : 
        approvalRating < 40 ? `📉 Public confidence in administration wavering` :
        `⚖️ Public opinion remains divided on key issues`,
      ],
    };

    return [...baseNews, ...(phaseNews[phase] || phaseNews.campaign)];
  };

  useEffect(() => {
    const news = generateNews();
    setCurrentNews(news);
    setAnimationKey(prev => prev + 1);
  }, [playerName, phase, approvalRating, daysInOffice]);

  // Restart animation periodically for continuous effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 20000); // Match animation duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news-ticker py-2 overflow-hidden relative">
      <div 
        key={animationKey}
        className="whitespace-nowrap"
        style={{
          animation: 'marquee 20s linear infinite',
        }}
      >
        {currentNews.map((news, index) => (
          <span key={index} className="mx-8 inline-block">
            {news}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {currentNews.map((news, index) => (
          <span key={`dup-${index}`} className="mx-8 inline-block">
            {news}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
