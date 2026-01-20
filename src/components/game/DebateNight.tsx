import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/hooks/useAuth';
import { useGameSave } from '@/hooks/useGameSave';
import { debateQuestions } from '@/data/debates';
import { DebateAnswer } from '@/types/game';

const DebateNight: React.FC = () => {
  const { gameState, updateDebateScore, startElection, goToTitle } = useGame();
  const { user } = useAuth();
  const { saveGame } = useGameSave();
  const { playerName, approvalRating, debateScore } = gameState;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<DebateAnswer | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = debateQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === debateQuestions.length - 1;

  const handleAnswer = (answer: DebateAnswer) => {
    setSelectedAnswer(answer);
    setShowResponse(true);
    updateDebateScore(answer.impact);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsTransitioning(true);
      setTimeout(() => {
        startElection();
      }, 1000);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResponse(false);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-background debate-stage">
      {/* Debate header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
            <div className="min-w-0">
              <p className="text-primary text-xs sm:text-sm uppercase tracking-wider font-semibold">🔴 LIVE</p>
              <h1 className="headline-display text-lg sm:text-2xl text-foreground truncate">Presidential Debate</h1>
            </div>
            <div className="flex flex-row items-center gap-3 sm:gap-6 flex-wrap">
              <div className="stat-card">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Approval</p>
                <p className="text-xl sm:text-2xl font-bold text-gold">{approvalRating}%</p>
              </div>
              <div className="stat-card">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Debate Score</p>
                <p className={`text-xl sm:text-2xl font-bold ${debateScore >= 0 ? 'text-victory' : 'text-destructive'}`}>
                  {debateScore > 0 ? '+' : ''}{debateScore}
                </p>
              </div>
              <button
                onClick={async () => {
                  if (user) await saveGame(gameState, {});
                  goToTitle();
                }}
                className="px-3 sm:px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-lg text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                {user ? '💾 Save & Exit' : '← Exit'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full progress-bar transition-all duration-500"
          style={{ width: `${((currentQuestionIndex + 1) / debateQuestions.length) * 100}%` }}
        />
      </div>

      <main className={`container mx-auto px-4 py-6 sm:py-12 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Question counter */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider">
            Question {currentQuestionIndex + 1} of {debateQuestions.length}
          </span>
        </div>

        {/* Question card */}
        <div className="w-full">
          <div className="card-glass rounded-xl p-4 sm:p-8 mb-6 sm:mb-8 animate-slide-up">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-secondary flex items-center justify-center text-xl sm:text-2xl shrink-0">
                🎤
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Moderator asks:</p>
                <p className="text-base sm:text-lg md:text-2xl text-foreground font-medium leading-relaxed break-words">
                  "{currentQuestion.question}"
                </p>
              </div>
            </div>
          </div>

          {/* Answer options */}
          {!showResponse ? (
            <div className="space-y-2 sm:space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-center text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">Choose your response, {playerName}:</p>
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer)}
                  className="w-full text-left p-4 sm:p-6 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all group"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-muted flex items-center justify-center text-xs sm:text-sm font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <p className="text-sm sm:text-base text-foreground flex-1 break-words">{answer.text}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Response display */
            <div className="space-y-4 sm:space-y-6 animate-slide-up">
              {/* Your answer */}
              <div className="p-4 sm:p-6 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-xs sm:text-sm text-primary mb-2 font-semibold">Your Response:</p>
                <p className="text-sm sm:text-base text-foreground break-words">{selectedAnswer?.text}</p>
              </div>

              {/* Reaction */}
              <div className="p-4 sm:p-6 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="text-lg sm:text-2xl">📺</span>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                    Audience Reaction
                  </p>
                </div>
                <p className="text-base sm:text-lg text-foreground break-words">{selectedAnswer?.response}</p>
                <div className="mt-3 sm:mt-4 flex items-center gap-2">
                  <span className={`text-base sm:text-lg font-bold ${(selectedAnswer?.impact ?? 0) >= 0 ? 'text-victory' : 'text-destructive'}`}>
                    {(selectedAnswer?.impact ?? 0) > 0 ? '+' : ''}{selectedAnswer?.impact} points
                  </span>
                </div>
              </div>

              {/* Next button */}
              <div className="flex justify-center pt-2 sm:pt-4">
                <button
                  onClick={handleNext}
                  className="btn-presidential px-6 sm:px-12 py-2 sm:py-4 rounded-lg text-sm sm:text-lg uppercase tracking-wider w-full sm:w-auto"
                >
                  {isLastQuestion ? 'Proceed to Election Day →' : 'Next Question →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DebateNight;
