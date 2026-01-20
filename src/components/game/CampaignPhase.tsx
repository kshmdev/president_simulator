import React from 'react';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/hooks/useAuth';
import { useGameSave } from '@/hooks/useGameSave';
import { policies, getCategoryColor, getCategoryIcon } from '@/data/policies';
import { Policy } from '@/types/game';
import NewsTicker from './NewsTicker';

const CampaignPhase: React.FC = () => {
  const { gameState, selectPolicy, removePolicy, startDebate, goToTitle } = useGame();
  const { user } = useAuth();
  const { saveGame } = useGameSave();
  const { playerName, approvalRating, selectedPolicies } = gameState;

  const categories = ['economy', 'healthcare', 'education', 'environment', 'security'] as const;

  const canProceed = selectedPolicies.length >= 3;

  const handleSaveAndExit = async () => {
    if (user) {
      await saveGame(gameState, {});
    }
    goToTitle();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Campaign Headquarters</p>
              <h1 className="headline-display text-2xl text-foreground">
                {playerName} for President
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="stat-card">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Approval</p>
                <p className="text-2xl font-bold text-gold">{approvalRating}%</p>
              </div>
              <div className="stat-card">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Policies</p>
                <p className="text-2xl font-bold text-primary">{selectedPolicies.length}/5</p>
              </div>
              <button
                onClick={handleSaveAndExit}
                className="px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-lg text-sm transition-colors"
              >
                {user ? '💾 Save & Exit' : '← Exit'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* News ticker */}
      <NewsTicker 
        playerName={playerName} 
        phase="campaign" 
        approvalRating={approvalRating} 
        daysInOffice={0} 
      />

      <main className="container mx-auto px-4 py-8 pb-32">
        {/* Instructions */}
        <div className="card-glass rounded-xl p-6 mb-8 animate-slide-up">
          <h2 className="headline-display text-xl mb-2 text-foreground">Build Your Platform</h2>
          <p className="text-muted-foreground">
            Select 3-5 policies to run on. Each policy affects your approval rating based on voter support and opposition.
            Choose wisely – your platform will define your campaign.
          </p>
        </div>

        {/* Selected policies */}
        {selectedPolicies.length > 0 && (
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Your Platform</h3>
            <div className="flex flex-wrap gap-3">
              {selectedPolicies.map((policy) => (
                <button
                  key={policy.id}
                  onClick={() => removePolicy(policy.id)}
                  className="group flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-sm hover:bg-primary/30 transition-all"
                >
                  <span>{getCategoryIcon(policy.category)}</span>
                  <span className="text-foreground">{policy.name}</span>
                  <span className="text-muted-foreground group-hover:text-destructive transition-colors">✕</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Policy categories */}
        <div className="space-y-8">
          {categories.map((category, catIndex) => (
            <div key={category} className="animate-slide-up" style={{ animationDelay: `${0.1 + catIndex * 0.05}s` }}>
              <h3 className="text-lg font-semibold mb-4 capitalize flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                <span className={getCategoryColor(category)}>{category}</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {policies
                  .filter((p) => p.category === category)
                  .map((policy) => (
                    <PolicyCard
                      key={policy.id}
                      policy={policy}
                      isSelected={selectedPolicies.some((p) => p.id === policy.id)}
                      onSelect={() => selectPolicy(policy)}
                      disabled={selectedPolicies.length >= 5 && !selectedPolicies.some((p) => p.id === policy.id)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proceed button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <div className="container mx-auto flex justify-center">
            <button
              onClick={startDebate}
              disabled={!canProceed}
              className="btn-gold px-12 py-4 rounded-lg text-lg uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {canProceed ? 'Proceed to Debate Night →' : `Select ${3 - selectedPolicies.length} more policies`}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

interface PolicyCardProps {
  policy: Policy;
  isSelected: boolean;
  onSelect: () => void;
  disabled: boolean;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy, isSelected, onSelect, disabled }) => {
  return (
    <button
      onClick={onSelect}
      disabled={disabled || isSelected}
      className={`text-left p-4 rounded-lg border transition-all ${
        isSelected
          ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
          : disabled
          ? 'bg-muted/30 border-border opacity-50 cursor-not-allowed'
          : 'bg-card border-border hover:border-primary/50 hover:bg-card/80'
      }`}
    >
      <h4 className="font-semibold text-foreground mb-1">{policy.name}</h4>
      <p className="text-sm text-muted-foreground mb-3">{policy.description}</p>
      <div className="flex items-center gap-4 text-xs">
        <span className="text-victory">+{policy.support} support</span>
        <span className="text-destructive">-{policy.opposition} opposition</span>
      </div>
      {isSelected && (
        <div className="mt-2 text-xs text-primary font-medium">✓ In your platform</div>
      )}
    </button>
  );
};

export default CampaignPhase;
