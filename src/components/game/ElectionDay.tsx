import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

interface StateResult {
  name: string;
  votes: number;
  called: boolean;
  winner: 'player' | 'opponent' | null;
}

const states: { name: string; votes: number }[] = [
  { name: 'California', votes: 54 },
  { name: 'Texas', votes: 40 },
  { name: 'Florida', votes: 30 },
  { name: 'New York', votes: 28 },
  { name: 'Pennsylvania', votes: 19 },
  { name: 'Illinois', votes: 19 },
  { name: 'Ohio', votes: 17 },
  { name: 'Georgia', votes: 16 },
  { name: 'North Carolina', votes: 16 },
  { name: 'Michigan', votes: 15 },
  { name: 'New Jersey', votes: 14 },
  { name: 'Virginia', votes: 13 },
  { name: 'Washington', votes: 12 },
  { name: 'Arizona', votes: 11 },
  { name: 'Massachusetts', votes: 11 },
  { name: 'Tennessee', votes: 11 },
  { name: 'Indiana', votes: 11 },
  { name: 'Missouri', votes: 10 },
  { name: 'Maryland', votes: 10 },
  { name: 'Wisconsin', votes: 10 },
];

const ElectionDay: React.FC = () => {
  const { gameState, setElectionResult, startGoverning, setPhase } = useGame();
  const { playerName, approvalRating } = gameState;

  const [stateResults, setStateResults] = useState<StateResult[]>(
    states.map((s) => ({ ...s, called: false, winner: null }))
  );
  const [playerVotes, setPlayerVotes] = useState(0);
  const [opponentVotes, setOpponentVotes] = useState(0);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);

  const totalVotes = states.reduce((sum, s) => sum + s.votes, 0);
  const votesToWin = Math.ceil(totalVotes / 2) + 1;

  // Simulate state results
  useEffect(() => {
    if (currentStateIndex >= states.length) {
      setTimeout(() => {
        setIsComplete(true);
        const won = playerVotes >= votesToWin;
        setElectionResult(won ? 'win' : 'lose');
        setTimeout(() => setShowFinalResult(true), 1500);
      }, 1000);
      return;
    }

    const timer = setTimeout(() => {
      const state = states[currentStateIndex];
      // Win probability based on approval rating (60% approval = 60% base win chance)
      const baseWinChance = approvalRating / 100;
      const randomFactor = Math.random() * 0.4 - 0.2; // -20% to +20% variance
      const winChance = baseWinChance + randomFactor;
      const playerWins = Math.random() < winChance;

      setStateResults((prev) =>
        prev.map((s, i) =>
          i === currentStateIndex
            ? { ...s, called: true, winner: playerWins ? 'player' : 'opponent' }
            : s
        )
      );

      if (playerWins) {
        setPlayerVotes((prev) => prev + state.votes);
      } else {
        setOpponentVotes((prev) => prev + state.votes);
      }

      setCurrentStateIndex((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentStateIndex, approvalRating, setElectionResult, playerVotes]);

  const handleContinue = () => {
    if (playerVotes >= votesToWin) {
      startGoverning();
    } else {
      setPhase('gameOver');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Election night header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
            <div className="min-w-0">
              <p className="text-primary text-xs sm:text-sm uppercase tracking-wider font-semibold">🔴 LIVE COVERAGE</p>
              <h1 className="headline-display text-lg sm:text-2xl text-foreground truncate">Election Night</h1>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-muted-foreground text-xs sm:text-sm">Votes needed to win</p>
              <p className="text-2xl sm:text-2xl font-bold text-gold">{votesToWin}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Vote counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
          <div className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${playerVotes >= votesToWin ? 'border-victory bg-victory/10' : 'border-secondary bg-secondary/10'}`}>
            <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-1">Candidate</p>
            <p className="headline-display text-lg sm:text-2xl text-foreground mb-2 truncate">{playerName}</p>
            <p className={`text-3xl sm:text-5xl font-bold transition-all animate-vote-count ${playerVotes >= votesToWin ? 'text-victory' : 'text-secondary'}`}>
              {playerVotes}
            </p>
            <p className="text-xs sm:text-base text-muted-foreground mt-1">Electoral Votes</p>
          </div>
          <div className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${opponentVotes >= votesToWin ? 'border-destructive bg-destructive/10' : 'border-primary bg-primary/10'}`}>
            <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-1">Opponent</p>
            <p className="headline-display text-lg sm:text-2xl text-foreground mb-2 truncate">Senator Richards</p>
            <p className={`text-3xl sm:text-5xl font-bold transition-all animate-vote-count ${opponentVotes >= votesToWin ? 'text-destructive' : 'text-primary'}`}>
              {opponentVotes}
            </p>
            <p className="text-xs sm:text-base text-muted-foreground mt-1">Electoral Votes</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
            <span>States Reporting: {stateResults.filter((s) => s.called).length}/{states.length}</span>
            <span>{Math.round((stateResults.filter((s) => s.called).length / states.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full flex">
              <div
                className="bg-secondary transition-all duration-500"
                style={{ width: `${(playerVotes / totalVotes) * 100}%` }}
              />
              <div
                className="bg-primary transition-all duration-500"
                style={{ width: `${(opponentVotes / totalVotes) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* State results grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-8">
          {stateResults.map((state, index) => (
            <div
              key={state.name}
              className={`p-2 sm:p-3 rounded-lg border transition-all duration-300 ${
                state.called
                  ? state.winner === 'player'
                    ? 'bg-secondary/20 border-secondary'
                    : 'bg-primary/20 border-primary'
                  : 'bg-card border-border opacity-50'
              } ${index === currentStateIndex ? 'ring-2 ring-gold animate-pulse' : ''}`}
            >
              <p className="font-medium text-xs sm:text-sm text-foreground truncate">{state.name}</p>
              <p className="text-sm sm:text-lg font-bold text-muted-foreground">{state.votes}</p>
              {state.called && (
                <p className={`text-xs font-semibold ${state.winner === 'player' ? 'text-secondary' : 'text-primary'}`}>
                  {state.winner === 'player' ? playerName.split(' ')[0] : 'Richards'}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Final result overlay */}
        {showFinalResult && (
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in px-4">
            <div className="text-center p-6 sm:p-12">
              {playerVotes >= votesToWin ? (
                <>
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🎉</div>
                  <h2 className="headline-display text-2xl sm:text-4xl md:text-6xl text-gradient-gold mb-3 sm:mb-4 break-words">
                    VICTORY!
                  </h2>
                  <p className="text-base sm:text-xl text-foreground mb-1 sm:mb-2 break-words">
                    Congratulations, President-Elect {playerName}!
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                    You won with {playerVotes} electoral votes.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">😔</div>
                  <h2 className="headline-display text-2xl sm:text-4xl md:text-6xl text-destructive mb-3 sm:mb-4 break-words">
                    DEFEAT
                  </h2>
                  <p className="text-base sm:text-xl text-foreground mb-1 sm:mb-2 break-words">
                    Senator Richards wins the presidency.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                    You received {playerVotes} electoral votes. You needed {votesToWin}.
                  </p>
                </>
              )}
              <button
                onClick={handleContinue}
                className="btn-presidential px-6 sm:px-12 py-2 sm:py-4 rounded-lg text-sm sm:text-lg uppercase tracking-wider w-full sm:w-auto"
              >
                {playerVotes >= votesToWin ? 'Begin Your Presidency →' : 'Try Again'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ElectionDay;
