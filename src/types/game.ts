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

export interface CabinetMember {
  id: string;
  name: string;
  position: CabinetPosition;
  loyalty: number; // 0-100
  competence: number; // 0-100
  background: string;
  approvalBonus: number;
}

export type CabinetPosition = 
  | 'chief_of_staff'
  | 'secretary_of_state'
  | 'secretary_of_defense'
  | 'attorney_general'
  | 'secretary_of_treasury'
  | 'national_security_advisor'
  | 'press_secretary'
  | 'vice_president_advisor';

export interface CabinetCandidate {
  id: string;
  name: string;
  position: CabinetPosition;
  loyalty: number;
  competence: number;
  background: string;
  approvalBonus: number;
  controversy: number; // Risk of future scandals
}

export interface GovernmentEvent {
  id: string;
  title: string;
  description: string;
  category: 'crisis' | 'opportunity' | 'diplomacy' | 'domestic' | 'cabinet';
  choices: EventChoice[];
  triggerCabinetHiring?: CabinetPosition; // If set, triggers hiring UI for this position
}

export interface EventChoice {
  text: string;
  consequence: string;
  approvalChange: number;
  nextEventId?: string;
  fireCabinetMember?: CabinetPosition; // Fires the cabinet member in this position
  requiresCabinetHiring?: CabinetPosition; // Requires hiring before continuing
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
  cabinet: CabinetMember[];
  pendingCabinetPosition?: CabinetPosition;
}

export const initialCabinet: CabinetMember[] = [
  {
    id: 'cos-initial',
    name: 'James Patterson',
    position: 'chief_of_staff',
    loyalty: 75,
    competence: 80,
    background: 'Former campaign manager with 20 years in politics',
    approvalBonus: 2,
  },
  {
    id: 'sos-initial',
    name: 'Dr. Sarah Chen',
    position: 'secretary_of_state',
    loyalty: 60,
    competence: 90,
    background: 'Former ambassador with expertise in Asian affairs',
    approvalBonus: 3,
  },
  {
    id: 'sod-initial',
    name: 'General Marcus Williams',
    position: 'secretary_of_defense',
    loyalty: 70,
    competence: 85,
    background: 'Decorated veteran with command experience',
    approvalBonus: 2,
  },
  {
    id: 'ag-initial',
    name: 'David Morrison',
    position: 'attorney_general',
    loyalty: 65,
    competence: 75,
    background: 'Former federal prosecutor',
    approvalBonus: 1,
  },
  {
    id: 'sot-initial',
    name: 'Elizabeth Warren-Brooks',
    position: 'secretary_of_treasury',
    loyalty: 55,
    competence: 95,
    background: 'Wall Street veteran turned reformer',
    approvalBonus: 4,
  },
  {
    id: 'nsa-initial',
    name: 'Robert Kim',
    position: 'national_security_advisor',
    loyalty: 80,
    competence: 85,
    background: 'CIA veteran with extensive field experience',
    approvalBonus: 2,
  },
  {
    id: 'ps-initial',
    name: 'Amanda Torres',
    position: 'press_secretary',
    loyalty: 85,
    competence: 80,
    background: 'Former network news anchor',
    approvalBonus: 3,
  },
];

export const initialGameState: GameState = {
  phase: 'title',
  playerName: '',
  approvalRating: 50,
  campaignFunds: 100000,
  selectedPolicies: [],
  debateScore: 0,
  daysInOffice: 0,
  eventsCompleted: [],
  cabinet: initialCabinet,
};
