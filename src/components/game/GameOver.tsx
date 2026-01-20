import React from 'react';
import { useGame } from '@/context/GameContext';

const GameOver: React.FC = () => {
  const { gameState, resetGame } = useGame();
  const { playerName, approvalRating, daysInOffice, eventsCompleted, electionResult } = gameState;

  const didWinElection = electionResult === 'win';
  const completedFullTerm = eventsCompleted.length >= 8 && approvalRating > 20;

  const getTitle = () => {
    if (!didWinElection) return 'Campaign Ended';
    if (approvalRating <= 20) return 'Impeached';
    if (completedFullTerm && approvalRating >= 70) return 'Legendary President';
    if (completedFullTerm && approvalRating >= 50) return 'Successful Presidency';
    if (completedFullTerm) return 'Controversial Legacy';
    return 'End of Term';
  };

  const getMessage = () => {
    if (!didWinElection) {
      return "Your campaign fell short, but the spirit of democracy lives on. Perhaps another day, another election...";
    }
    if (approvalRating <= 20) {
      return "With approval at rock bottom, your party has abandoned you. Congress begins impeachment proceedings. Your presidency ends in disgrace.";
    }
    if (completedFullTerm && approvalRating >= 70) {
      return `President ${playerName} leaves office as one of the greatest leaders in American history. Schools will be named after you, and your portrait will hang in the halls of power for generations.`;
    }
    if (completedFullTerm && approvalRating >= 50) {
      return `A solid presidency that historians will view favorably. You made tough decisions and led the nation through challenging times with competence and grace.`;
    }
    if (completedFullTerm) {
      return `Your presidency was marked by both achievements and failures. History's judgment remains uncertain, but you served your country to the best of your ability.`;
    }
    return `Your time in office has come to an end. The nation moves forward, shaped by the decisions you made.`;
  };

  const getEmoji = () => {
    if (!didWinElection) return '📊';
    if (approvalRating <= 20) return '⚖️';
    if (completedFullTerm && approvalRating >= 70) return '🏆';
    if (completedFullTerm && approvalRating >= 50) return '🎖️';
    return '📜';
  };

  const getGrade = () => {
    if (!didWinElection) return { grade: 'N/A', color: 'text-muted-foreground' };
    if (approvalRating >= 80) return { grade: 'A+', color: 'text-victory' };
    if (approvalRating >= 70) return { grade: 'A', color: 'text-victory' };
    if (approvalRating >= 60) return { grade: 'B+', color: 'text-gold' };
    if (approvalRating >= 50) return { grade: 'B', color: 'text-gold' };
    if (approvalRating >= 40) return { grade: 'C', color: 'text-accent' };
    if (approvalRating >= 30) return { grade: 'D', color: 'text-destructive' };
    return { grade: 'F', color: 'text-destructive' };
  };

  const grade = getGrade();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-0" style={{ background: 'var(--gradient-hero)' }}>
      <div className="w-full max-w-2xl mx-auto text-center animate-fade-in">
        {/* Emoji */}
        <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">{getEmoji()}</div>

        {/* Title */}
        <h1 className="headline-display text-2xl sm:text-4xl md:text-5xl text-gradient-gold mb-3 sm:mb-4 break-words">
          {getTitle()}
        </h1>

        {/* Player name */}
        <p className="text-base sm:text-xl text-foreground mb-4 sm:mb-6 break-words">
          {didWinElection ? `President ${playerName}` : `Candidate ${playerName}`}
        </p>

        {/* Message */}
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-12 max-w-lg mx-auto px-2 break-words">
          {getMessage()}
        </p>

        {/* Stats */}
        {didWinElection && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
            <div className="stat-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Final Approval</p>
              <p className={`text-2xl sm:text-3xl font-bold ${approvalRating >= 50 ? 'text-victory' : 'text-destructive'}`}>
                {approvalRating}%
              </p>
            </div>
            <div className="stat-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Days in Office</p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{daysInOffice}</p>
            </div>
            <div className="stat-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Legacy Grade</p>
              <p className={`text-2xl sm:text-3xl font-bold ${grade.color}`}>{grade.grade}</p>
            </div>
          </div>
        )}

        {/* Decisions summary */}
        {didWinElection && eventsCompleted.length > 0 && (
          <div className="card-glass rounded-xl p-4 sm:p-6 mb-8 sm:mb-12 text-left">
            <h3 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">Key Decisions Made: {eventsCompleted.length}</h3>
            <div className="flex flex-wrap gap-2">
              {eventsCompleted.map((eventId) => (
                <span
                  key={eventId}
                  className="px-3 py-1 bg-muted rounded-full text-xs sm:text-sm text-muted-foreground capitalize"
                >
                  {eventId.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Play again button */}
        <button
          onClick={resetGame}
          className="btn-presidential px-6 sm:px-12 py-2 sm:py-4 rounded-lg text-sm sm:text-lg uppercase tracking-wider w-full sm:w-auto"
        >
          Run Again
        </button>

        <p className="mt-6 sm:mt-8 text-muted-foreground/50 text-xs sm:text-sm">
          © 2026 Presidential Simulator
        </p>
      </div>
    </div>
  );
};

export default GameOver;
