import React from 'react';
import { GameProvider } from '@/context/GameContext';
import GameController from '@/components/game/GameController';

const Index: React.FC = () => {
  return (
    <GameProvider>
      <GameController />
    </GameProvider>
  );
};

export default Index;
