import React, { createContext, useContext, useState, useCallback } from 'react';
import { GameState, initialGameState, Policy, GamePhase } from '@/types/game';

interface RegionState {
  name: string;
  approval: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  description: string;
}

interface GameContextType {
  gameState: GameState;
  worldState: Record<string, RegionState>;
  setPlayerName: (name: string) => void;
  startCampaign: () => void;
  selectPolicy: (policy: Policy) => void;
  removePolicy: (policyId: string) => void;
  updateApproval: (change: number) => void;
  startDebate: () => void;
  updateDebateScore: (points: number) => void;
  startElection: () => void;
  setElectionResult: (result: 'win' | 'lose') => void;
  startGoverning: () => void;
  advanceDay: () => void;
  completeEvent: (eventId: string) => void;
  setCurrentEvent: (eventId: string | undefined) => void;
  setPhase: (phase: GamePhase) => void;
  resetGame: () => void;
  loadGameState: (state: GameState, world: Record<string, RegionState>) => void;
  updateWorldState: (eventCategory: string, approvalChange: number) => void;
  goToTitle: () => void;
}

const initialWorldState: Record<string, RegionState> = {
  north_america: { name: 'North America', approval: 50, sentiment: 'neutral', description: 'Allied nations' },
  south_america: { name: 'South America', approval: 50, sentiment: 'neutral', description: 'Trade partners' },
  europe: { name: 'Europe', approval: 50, sentiment: 'neutral', description: 'NATO allies' },
  africa: { name: 'Africa', approval: 50, sentiment: 'neutral', description: 'Developing relations' },
  asia: { name: 'Asia', approval: 50, sentiment: 'neutral', description: 'Economic competitors' },
  middle_east: { name: 'Middle East', approval: 50, sentiment: 'neutral', description: 'Complex relations' },
  oceania: { name: 'Oceania', approval: 50, sentiment: 'neutral', description: 'Pacific allies' },
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [worldState, setWorldState] = useState<Record<string, RegionState>>(initialWorldState);

  const setPlayerName = useCallback((name: string) => {
    setGameState(prev => ({ ...prev, playerName: name }));
  }, []);

  const startCampaign = useCallback(() => {
    setGameState(prev => ({ ...prev, phase: 'campaign' }));
  }, []);

  const selectPolicy = useCallback((policy: Policy) => {
    setGameState(prev => {
      if (prev.selectedPolicies.length >= 5) return prev;
      if (prev.selectedPolicies.some(p => p.id === policy.id)) return prev;
      const newApproval = Math.min(100, Math.max(0, prev.approvalRating + policy.support - policy.opposition));
      return {
        ...prev,
        selectedPolicies: [...prev.selectedPolicies, policy],
        approvalRating: newApproval,
      };
    });
  }, []);

  const removePolicy = useCallback((policyId: string) => {
    setGameState(prev => {
      const policy = prev.selectedPolicies.find(p => p.id === policyId);
      if (!policy) return prev;
      const newApproval = Math.min(100, Math.max(0, prev.approvalRating - policy.support + policy.opposition));
      return {
        ...prev,
        selectedPolicies: prev.selectedPolicies.filter(p => p.id !== policyId),
        approvalRating: newApproval,
      };
    });
  }, []);

  const updateApproval = useCallback((change: number) => {
    setGameState(prev => ({
      ...prev,
      approvalRating: Math.min(100, Math.max(0, prev.approvalRating + change)),
    }));
  }, []);

  const startDebate = useCallback(() => {
    setGameState(prev => ({ ...prev, phase: 'debate', debateScore: 0 }));
  }, []);

  const updateDebateScore = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      debateScore: prev.debateScore + points,
      approvalRating: Math.min(100, Math.max(0, prev.approvalRating + points)),
    }));
  }, []);

  const startElection = useCallback(() => {
    setGameState(prev => ({ ...prev, phase: 'election' }));
  }, []);

  const setElectionResult = useCallback((result: 'win' | 'lose') => {
    setGameState(prev => ({ ...prev, electionResult: result }));
  }, []);

  const startGoverning = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'governing',
      daysInOffice: 1,
      currentEventId: 'inauguration',
    }));
  }, []);

  const advanceDay = useCallback(() => {
    // Day by day simulation
    setGameState(prev => ({ ...prev, daysInOffice: prev.daysInOffice + 1 }));
  }, []);

  const completeEvent = useCallback((eventId: string) => {
    setGameState(prev => ({
      ...prev,
      eventsCompleted: [...prev.eventsCompleted, eventId],
    }));
  }, []);

  const setCurrentEvent = useCallback((eventId: string | undefined) => {
    setGameState(prev => ({ ...prev, currentEventId: eventId }));
  }, []);

  const setPhase = useCallback((phase: GamePhase) => {
    setGameState(prev => ({ ...prev, phase }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    setWorldState(initialWorldState);
  }, []);

  const loadGameState = useCallback((state: GameState, world: Record<string, RegionState>) => {
    setGameState(state);
    setWorldState(world || initialWorldState);
  }, []);

  const updateWorldState = useCallback((eventCategory: string, approvalChange: number) => {
    setWorldState(prev => {
      const newState = { ...prev };
      
      // Different events affect different regions
      const regionEffects: Record<string, string[]> = {
        diplomacy: ['europe', 'asia', 'middle_east'],
        crisis: ['north_america', 'europe'],
        opportunity: ['north_america', 'south_america', 'oceania'],
        domestic: ['north_america'],
      };

      const affectedRegions = regionEffects[eventCategory] || ['north_america'];
      
      affectedRegions.forEach(region => {
        if (newState[region]) {
          const newApproval = Math.min(100, Math.max(0, newState[region].approval + approvalChange / 2));
          newState[region] = {
            ...newState[region],
            approval: Math.round(newApproval),
            sentiment: newApproval > 60 ? 'positive' : newApproval < 40 ? 'negative' : 'neutral',
          };
        }
      });

      return newState;
    });
  }, []);

  const goToTitle = useCallback(() => {
    // Don't reset game state, just change phase to title
    setGameState(prev => ({ ...prev, phase: 'title' }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        worldState,
        setPlayerName,
        startCampaign,
        selectPolicy,
        removePolicy,
        updateApproval,
        startDebate,
        updateDebateScore,
        startElection,
        setElectionResult,
        startGoverning,
        advanceDay,
        completeEvent,
        setCurrentEvent,
        setPhase,
        resetGame,
        loadGameState,
        updateWorldState,
        goToTitle,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
