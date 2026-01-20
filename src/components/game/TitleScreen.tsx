import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/hooks/useAuth';
import { useGameSave } from '@/hooks/useGameSave';
import { GamePhase, Policy } from '@/types/game';

const TitleScreen: React.FC = () => {
  const { gameState, setPlayerName, startCampaign, loadGameState } = useGame();
  const { user, signOut, loading: authLoading } = useAuth();
  const { loadGame, deleteGame } = useGameSave();
  const navigate = useNavigate();
  
  const [name, setName] = useState(gameState.playerName || '');
  const [isStarting, setIsStarting] = useState(false);
  const [hasSave, setHasSave] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // Check for existing save when user is logged in
  useEffect(() => {
    const checkSave = async () => {
      if (user) {
        const save = await loadGame();
        setHasSave(!!save);
      } else {
        setHasSave(false);
      }
    };
    checkSave();
  }, [user, loadGame]);

  const handleStart = () => {
    if (name.trim()) {
      setIsStarting(true);
      setPlayerName(name.trim());
      setTimeout(() => {
        startCampaign();
      }, 1000);
    }
  };

  const handleContinue = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoadingSave(true);
    const save = await loadGame();
    if (save) {
      loadGameState(
        {
          phase: save.game_phase as GamePhase,
          playerName: save.player_name,
          approvalRating: save.approval_rating,
          campaignFunds: save.campaign_funds,
          selectedPolicies: save.selected_policies as Policy[],
          debateScore: save.debate_score,
          electionResult: save.election_result as 'win' | 'lose' | undefined,
          daysInOffice: save.days_in_office,
          eventsCompleted: save.events_completed,
          currentEventId: save.current_event_id || undefined,
          cabinet: [],
        },
        save.world_state as Record<string, { name: string; approval: number; sentiment: 'positive' | 'neutral' | 'negative'; description: string }>
      );
      setName(save.player_name);
    }
    setLoadingSave(false);
  };

  const handleNewGame = async () => {
    if (hasSave) {
      await deleteGame();
      setHasSave(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setHasSave(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-crimson/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-40 sm:w-96 h-40 sm:h-96 bg-navy-light/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[600px] h-64 sm:h-[600px] bg-gold/5 rounded-full blur-3xl" />
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

      {/* Auth status */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm px-2 sm:px-0">
        {authLoading ? (
          <span className="text-muted-foreground">Loading...</span>
        ) : user ? (
          <>
            <span className="text-muted-foreground truncate max-w-[120px] sm:max-w-none">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="text-gold hover:text-gold/80 transition-colors whitespace-nowrap"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 sm:px-6 md:px-8 w-full transition-all duration-1000 max-w-2xl mx-auto ${isStarting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        {/* Eagle emblem */}
        <div className="mb-6 sm:mb-8 animate-float">
          <span className="text-6xl sm:text-8xl inline-block">🦅</span>
        </div>

        {/* Title */}
        <h1 className="headline-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-2 sm:mb-4 text-gradient-gold leading-tight">
          PRESIDENT
        </h1>
        <h2 className="headline-display text-xl sm:text-3xl md:text-5xl lg:text-6xl mb-2 text-foreground leading-tight">
          SIMULATOR
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 font-light tracking-wide">
          Campaign. Debate. Govern. Make History.
        </p>

        {/* Continue game button */}
        {hasSave && (
          <button
            onClick={handleContinue}
            disabled={loadingSave}
            className="btn-gold px-6 sm:px-12 py-2 sm:py-4 text-sm sm:text-lg md:text-xl rounded-lg uppercase tracking-widest mb-4 sm:mb-6 w-full sm:w-auto"
          >
            {loadingSave ? 'Loading...' : 'Continue Campaign'}
          </button>
        )}

        {/* Name input */}
        <div className="w-full mb-6 sm:mb-8">
          <label className="block text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wider">
            {hasSave ? 'Or Start a New Game' : 'Enter Your Name, Candidate'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            placeholder="Your name..."
            className="w-full px-4 sm:px-6 py-2 sm:py-4 bg-muted/50 border border-border rounded-lg text-foreground text-center text-sm sm:text-lg md:text-xl font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Start button */}
        <button
          onClick={() => {
            if (hasSave) {
              handleNewGame().then(() => handleStart());
            } else {
              handleStart();
            }
          }}
          disabled={!name.trim()}
          className="btn-presidential px-6 sm:px-12 py-2 sm:py-4 text-sm sm:text-lg md:text-xl rounded-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
        >
          {hasSave ? 'New Game' : 'Begin Campaign'}
        </button>

        {/* Footer */}
        <p className="mt-12 sm:mt-16 text-muted-foreground/50 text-xs sm:text-sm">
          © 2026 Presidential Simulator • All decisions are fictional
        </p>
      </div>
    </div>
  );
};

export default TitleScreen;
