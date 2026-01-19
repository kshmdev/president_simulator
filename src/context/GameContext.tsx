import React, { createContext, useContext, useState, useCallback } from 'react';
import { GameState, initialGameState, Policy, GamePhase } from '@/types/game';

interface GameContextType {
  gameState: GameState;
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

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
    setGameState(prev => ({ ...prev, daysInOffice: prev.daysInOffice + 30 }));
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
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
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
