export type GamePhase = 'title' | 'campaign' | 'debate' | 'election' | 'governing' | 'gameOver';

export interface Policy {
  id: string;
  name: string;
  category: 'economy' | 'healthcare' | 'education' | 'environment' | 'security';
  description: string;
  support: number; // -20 to +20 approval change
  opposition: number; // Risk of losing votes
}

export interface DebateQuestion {
  id: string;
  question: string;
  answers: DebateAnswer[];
}

export interface DebateAnswer {
  text: string;
  impact: number; // -15 to +15 approval change
  response: string;
}

export interface GovernmentEvent {
  id: string;
  title: string;
  description: string;
  category: 'crisis' | 'opportunity' | 'diplomacy' | 'domestic';
  choices: EventChoice[];
}

export interface EventChoice {
  text: string;
  consequence: string;
  approvalChange: number;
  nextEventId?: string;
}

export interface GameState {
  phase: GamePhase;
  playerName: string;
  approvalRating: number;
  campaignFunds: number;
  selectedPolicies: Policy[];
  debateScore: number;
  electionResult?: 'win' | 'lose';
  daysInOffice: number;
  eventsCompleted: string[];
  currentEventId?: string;
}

export const initialGameState: GameState = {
  phase: 'title',
  playerName: '',
  approvalRating: 50,
  campaignFunds: 100000,
  selectedPolicies: [],
  debateScore: 0,
  daysInOffice: 0,
  eventsCompleted: [],
};
