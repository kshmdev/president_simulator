import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';

const TitleScreen: React.FC = () => {
  const { setPlayerName, startCampaign } = useGame();
  const [name, setName] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (name.trim()) {
      setIsStarting(true);
      setPlayerName(name.trim());
      setTimeout(() => {
        startCampaign();
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-crimson/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-light/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Stars decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isStarting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        {/* Eagle emblem */}
        <div className="mb-8 animate-float">
          <span className="text-8xl">🦅</span>
        </div>

        {/* Title */}
        <h1 className="headline-display text-5xl md:text-7xl lg:text-8xl mb-4 text-gradient-gold">
          PRESIDENTIAL
        </h1>
        <h2 className="headline-display text-3xl md:text-5xl lg:text-6xl mb-2 text-foreground">
          SIMULATOR
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 font-light tracking-wide">
          Campaign. Debate. Govern. Make History.
        </p>

        {/* Name input */}
        <div className="max-w-md mx-auto mb-8">
          <label className="block text-sm text-muted-foreground mb-2 uppercase tracking-wider">
            Enter Your Name, Candidate
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            placeholder="Your name..."
            className="w-full px-6 py-4 bg-muted/50 border border-border rounded-lg text-foreground text-center text-xl font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={!name.trim()}
          className="btn-presidential px-12 py-4 text-xl rounded-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Begin Campaign
        </button>

        {/* Footer */}
        <p className="mt-16 text-muted-foreground/50 text-sm">
          © 2024 Presidential Simulator • All decisions are fictional
        </p>
      </div>
    </div>
  );
};

export default TitleScreen;
