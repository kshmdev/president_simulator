import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/hooks/useAuth';
import { useGameSave } from '@/hooks/useGameSave';
import { getEventById } from '@/data/events';
import { EventChoice } from '@/types/game';
import WorldMap from './WorldMap';
import NewsTicker from './NewsTicker';

const GoverningPhase: React.FC = () => {
  const { 
    gameState, 
    worldState, 
    updateApproval, 
    completeEvent, 
    setCurrentEvent, 
    advanceDay, 
    setPhase, 
    goToTitle,
    updateWorldState 
  } = useGame();
  const { user } = useAuth();
  const { saveGame } = useGameSave();
  const { playerName, approvalRating, daysInOffice, currentEventId } = gameState;

  const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentEvent = currentEventId ? getEventById(currentEventId) : null;

  // Check for game end conditions
  useEffect(() => {
    if (approvalRating <= 20) {
      setPhase('gameOver');
    }
  }, [approvalRating, setPhase]);

  const handleChoice = (choice: EventChoice) => {
    setSelectedChoice(choice);
    setShowConsequence(true);
    updateApproval(choice.approvalChange);
    
    // Update world state based on event category
    if (currentEvent) {
      updateWorldState(currentEvent.category, choice.approvalChange);
    }
  };

  const handleContinue = () => {
    if (!currentEventId || !selectedChoice) return;

    completeEvent(currentEventId);
    advanceDay(); // Day by day

    if (selectedChoice.nextEventId) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentEvent(selectedChoice.nextEventId);
        setSelectedChoice(null);
        setShowConsequence(false);
        setIsTransitioning(false);
      }, 500);
    } else {
      // End of story - show victory screen
      setPhase('gameOver');
    }
  };

  const handleSaveAndExit = async () => {
    setIsSaving(true);
    if (user) {
      await saveGame(gameState, worldState);
    }
    goToTitle();
    setIsSaving(false);
  };

  const getCategoryBadge = (category: string) => {
    const badges = {
      crisis: { bg: 'bg-destructive/20', text: 'text-destructive', icon: '⚠️', label: 'CRISIS' },
      opportunity: { bg: 'bg-victory/20', text: 'text-victory', icon: '✨', label: 'OPPORTUNITY' },
      diplomacy: { bg: 'bg-secondary/20', text: 'text-secondary', icon: '🌍', label: 'DIPLOMACY' },
      domestic: { bg: 'bg-gold/20', text: 'text-gold', icon: '🏛️', label: 'DOMESTIC' },
    };
    return badges[category as keyof typeof badges] || badges.domestic;
  };

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading next event...</p>
      </div>
    );
  }

  const badge = getCategoryBadge(currentEvent.category);

  return (
    <div className="min-h-screen bg-background oval-office-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gold text-sm uppercase tracking-wider font-semibold">The Oval Office</p>
              <h1 className="headline-display text-2xl text-foreground">
                President {playerName}
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="stat-card">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Day in Office</p>
                <p className="text-2xl font-bold text-foreground">{daysInOffice}</p>
              </div>
              <div className="stat-card">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Approval</p>
                <p className={`text-2xl font-bold ${approvalRating >= 50 ? 'text-victory' : approvalRating >= 30 ? 'text-gold' : 'text-destructive'}`}>
                  {approvalRating}%
                </p>
              </div>
              <button
                onClick={handleSaveAndExit}
                disabled={isSaving}
                className="px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-lg text-sm transition-colors"
              >
                {isSaving ? 'Saving...' : user ? '💾 Save & Exit' : '← Exit'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* News ticker */}
      <NewsTicker 
        playerName={playerName} 
        phase="governing" 
        approvalRating={approvalRating} 
        daysInOffice={daysInOffice} 
      />

      {/* Approval warning */}
      {approvalRating < 30 && (
        <div className="bg-destructive/20 border-b border-destructive/50 px-4 py-2">
          <p className="text-center text-destructive text-sm font-medium">
            ⚠️ Warning: Your approval rating is critically low. The American people are losing faith.
          </p>
        </div>
      )}

      <main className={`container mx-auto px-4 py-8 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event card - takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="card-glass rounded-xl p-8 mb-8 animate-slide-up">
              {/* Category badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badge.bg} mb-6`}>
                <span>{badge.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${badge.text}`}>
                  {badge.label}
                </span>
              </div>

              {/* Event title and description */}
              <h2 className="headline-display text-3xl text-foreground mb-4">{currentEvent.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{currentEvent.description}</p>
            </div>

            {/* Choices or consequence */}
            {!showConsequence ? (
              <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <p className="text-center text-muted-foreground mb-4">What is your decision, Mr. President?</p>
                {currentEvent.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="w-full text-left p-6 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-foreground text-lg">{choice.text}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6 animate-slide-up">
                {/* Your decision */}
                <div className="p-6 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-sm text-primary mb-2 font-semibold">Your Decision:</p>
                  <p className="text-foreground text-lg">{selectedChoice?.text}</p>
                </div>

                {/* Consequence */}
                <div className="p-6 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📰</span>
                    <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                      The Aftermath
                    </p>
                  </div>
                  <p className="text-foreground text-lg leading-relaxed">{selectedChoice?.consequence}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className={`text-lg font-bold ${(selectedChoice?.approvalChange ?? 0) >= 0 ? 'text-victory' : 'text-destructive'}`}>
                      {(selectedChoice?.approvalChange ?? 0) > 0 ? '+' : ''}{selectedChoice?.approvalChange}% Approval
                    </span>
                  </div>
                </div>

                {/* Continue button */}
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleContinue}
                    className="btn-presidential px-12 py-4 rounded-lg text-lg uppercase tracking-wider"
                  >
                    {selectedChoice?.nextEventId ? 'Continue to Next Day →' : 'See Your Legacy'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* World Map sidebar */}
          <div className="lg:col-span-1">
            <WorldMap regions={worldState} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoverningPhase;
