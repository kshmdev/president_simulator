export interface VersionEntry {
  version: string;
  date: string;
  changes: string[];
}

export const versionHistory: VersionEntry[] = [
  {
    version: "1.0.0",
    date: "January 20, 2026",
    changes: [
      "Initial release of President Simulator",
      "Campaign phase with policy selection",
      "Debate night mechanics",
      "Election day voting system",
      "Governing phase with event-driven gameplay",
      "Cabinet hiring and management system",
      "Approval rating system with real-time feedback",
      "World map state tracking",
      "Game save and load functionality",
      "News ticker with dynamic updates",
      "Admin authentication system",
    ],
  },
];
