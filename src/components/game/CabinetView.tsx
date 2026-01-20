import React, { useState } from 'react';
import { CabinetMember, CabinetPosition } from '@/types/game';
import { getPositionDisplayName } from '@/data/cabinetCandidates';

interface CabinetViewProps {
  cabinet: CabinetMember[];
  onClose?: () => void;
}

type SortBy = 'position' | 'loyalty' | 'competence';

const CabinetView: React.FC<CabinetViewProps> = ({ cabinet, onClose }) => {
  const [sortBy, setSortBy] = useState<SortBy>('position');

  const sortedCabinet = [...cabinet].sort((a, b) => {
    switch (sortBy) {
      case 'loyalty':
        return b.loyalty - a.loyalty;
      case 'competence':
        return b.competence - a.competence;
      case 'position':
      default:
        return getPositionDisplayName(a.position).localeCompare(getPositionDisplayName(b.position));
    }
  });

  const getStatColor = (value: number): string => {
    if (value >= 80) return 'text-victory';
    if (value >= 60) return 'text-gold';
    return 'text-destructive';
  };

  const getPositionEmoji = (position: CabinetPosition): string => {
    const emojiMap: Record<CabinetPosition, string> = {
      chief_of_staff: '📋',
      secretary_of_state: '🌍',
      secretary_of_defense: '🛡️',
      attorney_general: '⚖️',
      secretary_of_treasury: '💰',
      national_security_advisor: '🔐',
      press_secretary: '📢',
      vice_president_advisor: '🤝',
    };
    return emojiMap[position] || '👔';
  };

  const getCabinetStats = () => {
    const avgLoyalty = Math.round(cabinet.reduce((sum, m) => sum + m.loyalty, 0) / cabinet.length);
    const avgCompetence = Math.round(cabinet.reduce((sum, m) => sum + m.competence, 0) / cabinet.length);
    const totalApprovalBonus = cabinet.reduce((sum, m) => sum + m.approvalBonus, 0);

    return { avgLoyalty, avgCompetence, totalApprovalBonus };
  };

  const stats = getCabinetStats();

  return (
    <div className="card-glass rounded-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👔</span>
          <div>
            <h2 className="headline-display text-2xl text-foreground">Your Cabinet</h2>
            <p className="text-muted-foreground text-sm">{cabinet.length} members of your administration</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted border border-border flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-3 gap-4 mb-8 p-6 rounded-lg bg-card/50 border border-border">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Avg Loyalty</p>
          <p className={`text-2xl font-bold ${getStatColor(stats.avgLoyalty)}`}>{stats.avgLoyalty}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Avg Competence</p>
          <p className={`text-2xl font-bold ${getStatColor(stats.avgCompetence)}`}>{stats.avgCompetence}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Approval Bonus</p>
          <p className="text-2xl font-bold text-primary">+{stats.totalApprovalBonus}%</p>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground flex items-center">Sort by:</span>
        {(['position', 'loyalty', 'competence'] as SortBy[]).map((sort) => (
          <button
            key={sort}
            onClick={() => setSortBy(sort)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === sort
                ? 'bg-primary text-primary-foreground border border-primary'
                : 'bg-card border border-border hover:border-primary/50 text-foreground'
            }`}
          >
            {sort === 'position' && '📋 Position'}
            {sort === 'loyalty' && '💚 Loyalty'}
            {sort === 'competence' && '🧠 Competence'}
          </button>
        ))}
      </div>

      {/* Cabinet Members List */}
      <div className="space-y-4">
        {sortedCabinet.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No cabinet members appointed yet</p>
          </div>
        ) : (
          sortedCabinet.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-2xl shrink-0">
                  {getPositionEmoji(member.position)}
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-primary font-medium mt-1">
                        {getPositionDisplayName(member.position)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">{member.background}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col gap-3 text-right shrink-0">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Loyalty</p>
                        <p className={`text-2xl font-bold ${getStatColor(member.loyalty)}`}>
                          {member.loyalty}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Competence</p>
                        <p className={`text-2xl font-bold ${getStatColor(member.competence)}`}>
                          {member.competence}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom stats row */}
                  <div className="flex gap-6 mt-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Approval Impact</p>
                      <p className="text-sm font-bold text-victory">+{member.approvalBonus}%</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground uppercase">Loyalty Assessment</p>
                      <p className="text-sm font-medium text-foreground">
                        {member.loyalty >= 80 && '✓ Highly Loyal'}
                        {member.loyalty >= 60 && member.loyalty < 80 && '→ Generally Supportive'}
                        {member.loyalty < 60 && '⚠ Questionable Loyalty'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Competence Level</p>
                      <p className="text-sm font-medium text-foreground">
                        {member.competence >= 80 && 'Excellent'}
                        {member.competence >= 60 && member.competence < 80 && 'Good'}
                        {member.competence < 60 && 'Adequate'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer info */}
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          A strong cabinet with high loyalty and competence ensures better outcomes during your presidency.
        </p>
      </div>
    </div>
  );
};

export default CabinetView;
