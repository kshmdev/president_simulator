import React from 'react';
import { useGame } from '@/context/GameContext';
import TitleScreen from './TitleScreen';
import CampaignPhase from './CampaignPhase';
import DebateNight from './DebateNight';
import ElectionDay from './ElectionDay';
import GoverningPhase from './GoverningPhase';
import GameOver from './GameOver';

const GameController: React.FC = () => {
  const { gameState } = useGame();

  switch (gameState.phase) {
    case 'title':
      return <TitleScreen />;
    case 'campaign':
      return <CampaignPhase />;
    case 'debate':
      return <DebateNight />;
    case 'election':
      return <ElectionDay />;
    case 'governing':
      return <GoverningPhase />;
    case 'gameOver':
      return <GameOver />;
    default:
      return <TitleScreen />;
  }
};

export default GameController;
