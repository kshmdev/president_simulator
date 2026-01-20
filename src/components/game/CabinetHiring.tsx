import React, { useState } from 'react';
import { CabinetCandidate, CabinetPosition, CabinetMember } from '@/types/game';
import { getCandidatesForPosition, getPositionDisplayName } from '@/data/cabinetCandidates';

interface CabinetHiringProps {
  position: CabinetPosition;
  onHire: (candidate: CabinetMember) => void;
  onCancel?: () => void;
}

const CabinetHiring: React.FC<CabinetHiringProps> = ({ position, onHire, onCancel }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<CabinetCandidate | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const candidates = getCandidatesForPosition(position);
  const positionName = getPositionDisplayName(position);

  const handleSelectCandidate = (candidate: CabinetCandidate) => {
    setSelectedCandidate(candidate);
    setShowConfirmation(true);
  };

  const handleConfirmHire = () => {
    if (selectedCandidate) {
      const newMember: CabinetMember = {
        id: selectedCandidate.id,
        name: selectedCandidate.name,
        position: selectedCandidate.position,
        loyalty: selectedCandidate.loyalty,
        competence: selectedCandidate.competence,
        background: selectedCandidate.background,
        approvalBonus: selectedCandidate.approvalBonus,
      };
      onHire(newMember);
    }
  };

  const getStatColor = (value: number): string => {
    if (value >= 80) return 'text-victory';
    if (value >= 60) return 'text-gold';
    return 'text-destructive';
  };

  const getControversyColor = (value: number): string => {
    if (value <= 15) return 'text-victory';
    if (value <= 25) return 'text-gold';
    return 'text-destructive';
  };

  return (
    <div className="card-glass rounded-xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">👔</span>
        <div>
          <h2 className="headline-display text-2xl text-foreground">Appoint {positionName}</h2>
          <p className="text-muted-foreground">Select your new cabinet member carefully. This decision will impact your administration.</p>
        </div>
      </div>

      {!showConfirmation ? (
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <button
              key={candidate.id}
              onClick={() => handleSelectCandidate(candidate)}
              className="w-full text-left p-6 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{candidate.background}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Loyalty:</span>
                      <span className={`text-sm font-bold ${getStatColor(candidate.loyalty)}`}>
                        {candidate.loyalty}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Competence:</span>
                      <span className={`text-sm font-bold ${getStatColor(candidate.competence)}`}>
                        {candidate.competence}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Controversy Risk:</span>
                      <span className={`text-sm font-bold ${getControversyColor(candidate.controversy)}`}>
                        {candidate.controversy <= 15 ? 'Low' : candidate.controversy <= 25 ? 'Medium' : 'High'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Approval Bonus:</span>
                      <span className="text-sm font-bold text-primary">
                        +{candidate.approvalBonus}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl shrink-0 group-hover:bg-primary/20 transition-colors">
                  👤
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-primary/10 border border-primary/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{selectedCandidate?.name}</h3>
                <p className="text-primary text-sm">{positionName}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{selectedCandidate?.background}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-card/50">
                <p className="text-xs text-muted-foreground uppercase">Loyalty</p>
                <p className={`text-2xl font-bold ${getStatColor(selectedCandidate?.loyalty || 0)}`}>
                  {selectedCandidate?.loyalty}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-card/50">
                <p className="text-xs text-muted-foreground uppercase">Competence</p>
                <p className={`text-2xl font-bold ${getStatColor(selectedCandidate?.competence || 0)}`}>
                  {selectedCandidate?.competence}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-card/50">
                <p className="text-xs text-muted-foreground uppercase">Controversy Risk</p>
                <p className={`text-2xl font-bold ${getControversyColor(selectedCandidate?.controversy || 0)}`}>
                  {(selectedCandidate?.controversy || 0) <= 15 ? 'Low' : (selectedCandidate?.controversy || 0) <= 25 ? 'Medium' : 'High'}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-card/50">
                <p className="text-xs text-muted-foreground uppercase">Approval Impact</p>
                <p className="text-2xl font-bold text-victory">
                  +{selectedCandidate?.approvalBonus}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 px-6 py-3 rounded-lg bg-muted hover:bg-muted/80 border border-border text-foreground transition-colors"
            >
              ← Choose Different Candidate
            </button>
            <button
              onClick={handleConfirmHire}
              className="flex-1 px-6 py-3 rounded-lg btn-presidential"
            >
              Confirm Appointment ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabinetHiring;
