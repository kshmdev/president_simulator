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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        {/* Emoji */}
        <div className="text-8xl mb-6">{getEmoji()}</div>

        {/* Title */}
        <h1 className="headline-display text-4xl md:text-5xl text-gradient-gold mb-4">
          {getTitle()}
        </h1>

        {/* Player name */}
        <p className="text-xl text-foreground mb-6">
          {didWinElection ? `President ${playerName}` : `Candidate ${playerName}`}
        </p>

        {/* Message */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto">
          {getMessage()}
        </p>

        {/* Stats */}
        {didWinElection && (
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="stat-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Final Approval</p>
              <p className={`text-3xl font-bold ${approvalRating >= 50 ? 'text-victory' : 'text-destructive'}`}>
                {approvalRating}%
              </p>
            </div>
            <div className="stat-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Days in Office</p>
              <p className="text-3xl font-bold text-foreground">{daysInOffice}</p>
            </div>
            <div className="stat-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Legacy Grade</p>
              <p className={`text-3xl font-bold ${grade.color}`}>{grade.grade}</p>
            </div>
          </div>
        )}

        {/* Decisions summary */}
        {didWinElection && eventsCompleted.length > 0 && (
          <div className="card-glass rounded-xl p-6 mb-12 text-left">
            <h3 className="font-semibold text-foreground mb-3">Key Decisions Made: {eventsCompleted.length}</h3>
            <div className="flex flex-wrap gap-2">
              {eventsCompleted.map((eventId) => (
                <span
                  key={eventId}
                  className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground capitalize"
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
          className="btn-presidential px-12 py-4 rounded-lg text-lg uppercase tracking-wider"
        >
          Run Again
        </button>

        <p className="mt-8 text-muted-foreground/50 text-sm">
          © 2026 Presidential Simulator
        </p>
      </div>
    </div>
  );
};

export default GameOver;
